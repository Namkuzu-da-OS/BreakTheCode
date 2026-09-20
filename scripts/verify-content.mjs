import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const legacySource = fs.readFileSync(path.join(root, 'legacy', 'index.html'), 'utf8');

function loadJson(filename) {
  return JSON.parse(fs.readFileSync(path.join(root, 'data', filename), 'utf8'));
}

function readLegacyLiteral(name) {
  const match = new RegExp(`(?:const|let|var)\\s+${name}\\s*=`).exec(legacySource);
  assert.ok(match, `legacy/index.html must contain ${name}`);
  const expressionStart = match.index + match[0].lastIndexOf('=') + 1;
  const open = legacySource.slice(expressionStart).match(/[^\s]/)?.[0];
  const start = legacySource.indexOf(open, expressionStart);
  const close = open === '{' ? '}' : ']';
  let depth = 0;
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = start; index < legacySource.length; index += 1) {
    const char = legacySource[index];
    const next = legacySource[index + 1];
    if (lineComment) {
      if (char === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === '*' && next === '/') {
        blockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '/' && next === '/') {
      lineComment = true;
      index += 1;
      continue;
    }
    if (char === '/' && next === '*') {
      blockComment = true;
      index += 1;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === open) depth += 1;
    if (char === close) depth -= 1;
    if (depth === 0) {
      const literal = legacySource.slice(start, index + 1);
      return Function(`"use strict"; return (${literal});`)();
    }
  }
  assert.fail(`Unterminated ${name} literal in legacy/index.html`);
}

function wordCount(line) {
  return line.trim().split(/\s+/).filter(Boolean).length;
}

function assertCardLines(records, label) {
  for (const record of records) {
    assert.ok(
      record.cardLines.length >= 1 && record.cardLines.length <= 2,
      `${label} ${record.id} must have one or two card lines`
    );
    for (const line of record.cardLines) {
      assert.ok(line.trim(), `${label} ${record.id} has an empty card line`);
      assert.ok(wordCount(line) <= 6, `${label} ${record.id} card line exceeds six words: ${line}`);
    }
  }
}

// The six journey subtitles are the owner's own words (2026-09-19), not
// builder-written copy. They are asserted verbatim so no later pass can
// "improve" them.
const APPROVED_CHAPTER_SUBTITLES = {
  intro: 'Recognize the code',
  awakening: 'Question the automatic',
  patterns: 'See biology and conditioning',
  ancient: 'Compare what humans discovered',
  consciousness: 'Practice attention and perspective',
  potential: 'Live by conscious choice'
};

function assertApprovedSubtitles(records) {
  for (const record of records) {
    const expected = APPROVED_CHAPTER_SUBTITLES[record.id];
    assert.ok(expected, `chapter ${record.id} is not in the approved subtitle list`);
    assert.equal(
      record.cardSubtitle,
      expected,
      `chapter ${record.id} subtitle must read exactly "${expected}"`
    );
  }
}

const chapters = loadJson('chapters.json');
const texts = loadJson('texts.json');
const connections = loadJson('connections.json');
const paths = loadJson('paths.json');
const themes = loadJson('themes.json');

const legacyWisdomTexts = readLegacyLiteral('wisdomTexts');
const legacyRelationships = readLegacyLiteral('textRelationships');
const legacyPaths = readLegacyLiteral('studyPaths');
const legacyColors = readLegacyLiteral('connectionColors');
const legacyTexts = Object.entries(legacyWisdomTexts).flatMap(([era, group]) =>
  Object.entries(group.texts).map(([id, text]) => ({ era, eraName: group.name, id, ...text }))
);
const legacyQuoteCount = legacyTexts.reduce((sum, text) => sum + text.quotes.length, 0);
const extractedQuoteCount = texts.reduce((sum, text) => sum + text.quotes.length, 0);

assert.equal(chapters.length, 6, 'expected six chapters');
assert.deepEqual(
  chapters.map(({ id, n, title }) => ({ id, n, title })),
  [
    { id: 'intro', n: 1, title: 'Introduction' },
    { id: 'awakening', n: 2, title: 'The Awakening' },
    { id: 'patterns', n: 3, title: 'Breaking Patterns' },
    { id: 'ancient', n: 4, title: 'Ancient Wisdom' },
    { id: 'consciousness', n: 5, title: 'Expanding Consciousness' },
    { id: 'potential', n: 6, title: 'Full Potential' }
  ],
  'chapter order or titles changed'
);
assertCardLines(chapters, 'chapter');
assertApprovedSubtitles(chapters);
for (const chapter of chapters) {
  assert.ok(chapter.prose.length > 0, `chapter ${chapter.id} has no prose`);
  assert.ok(chapter.wisdomCard.textId, `chapter ${chapter.id} has no wisdom text id`);
  assert.ok(chapter.wisdomCard.quote, `chapter ${chapter.id} has no wisdom quote`);
  assert.ok(chapter.wisdomCard.context, `chapter ${chapter.id} has no wisdom context`);
}

// The checked-in legacy file contains 16 text records and 28 quotes. The packet's
// stated “28 texts” is the legacy quote count; preserve the source rather than
// manufacturing twelve text records that do not exist in legacy/index.html.
assert.equal(legacyTexts.length, 16, 'legacy text count changed; review the packet count note');
assert.equal(legacyQuoteCount, 28, 'legacy quote count changed');
assert.equal(texts.length, legacyTexts.length, 'text extraction does not match legacy/index.html');
assert.equal(extractedQuoteCount, legacyQuoteCount, 'quote extraction does not match legacy/index.html');
assertCardLines(texts, 'text');


// Quote replacements approved by the owner (2026-09-20) after the research desk
// found the originals could not be located in their attributed source. Each entry
// names the exact line being replaced, so a quote can only change in the one way
// that was signed off - any other drift still fails the build.
const APPROVED_QUOTE_CORRECTIONS = {
  'taoTeChing:0': {
    from: 'The Tao that can be named is not the eternal Tao.',
    to: 'The way that can be spoken of is not the constant way.'
  },
  'taoTeChing:2': {
    from: 'Nature does not hurry, yet everything is accomplished.',
    to: 'The Tao in its regular course does nothing, and so there is nothing which it does not do.'
  },
  'marcusAurelius:0': {
    from: 'You have power over your mind - not outside events. Realize this, and you will find strength.',
    to: 'If thou art pained by any external thing, it is not this thing that disturbs thee, but thy own judgment about it.'
  },
  'marcusAurelius:1': {
    from: 'Everything we hear is an opinion, not a fact. Everything we see is perspective, not truth.',
    to: 'Everything is opinion.'
  },
  'ibnArabi:0': {
    from: 'The self is an ocean without a shore. Gazing upon it has no beginning or end.',
    to: 'The self is an ocean without shore. Gazing upon it has no end in this world and the next.'
  },
  'emerson:1': {
    from: 'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.',
    to: 'Whoso would be a man must be a nonconformist.'
  },
  'tolle:0': {
    from: 'Realize deeply that the present moment is all you have. Make the NOW the primary focus of your life.',
    to: 'Realize deeply that the present moment is all you ever have. Make the NOW the primary focus of your life.'
  }
};
const appliedCorrections = [];

const correctedPeriods = [];
for (const [index, text] of texts.entries()) {
  const legacy = legacyTexts[index];
  // `period` is deliberately NOT frozen to the legacy value. Packet R corrects
  // dates against current scholarship, so a corrected date is the research desk
  // doing its job, not content loss. Everything that identifies the text is
  // still locked, and quote wording below is locked absolutely.
  assert.deepEqual(
    {
      id: text.id,
      era: text.era,
      eraName: text.eraName,
      title: text.title,
      tradition: text.tradition,
      keyTeaching: text.keyTeaching
    },
    {
      id: legacy.id,
      era: legacy.era,
      eraName: legacy.eraName,
      title: legacy.title,
      tradition: legacy.tradition,
      keyTeaching: legacy.keyTeaching
    },
    `text metadata changed for ${text.id}`
  );
  assert.ok(String(text.period || '').trim(), `text ${text.id} lost its period`);
  if (text.period !== legacy.period) correctedPeriods.push([text.id, legacy.period, text.period]);
  assert.equal(
    text.quotes.length,
    legacy.quotes.length,
    `quote count changed for ${text.id}`
  );
  text.quotes.forEach((quote, qi) => {
    const legacyQuote = legacy.quotes[qi];
    const approved = APPROVED_QUOTE_CORRECTIONS[`${text.id}:${qi}`];
    if (approved && legacyQuote.text === approved.from && quote.text === approved.to) {
      appliedCorrections.push([text.id, qi]);
      assert.equal(
        quote.context,
        legacyQuote.context,
        `corrected quote must keep its original context for ${text.id}`
      );
      assert.equal(
        quote.source.verified,
        true,
        `a corrected quote must be verified for ${text.id}`
      );
      return;
    }
    assert.equal(
      quote.text,
      legacyQuote.text,
      `quote wording changed for ${text.id} (quote ${qi + 1}) without an approved correction`
    );
    assert.equal(quote.context, legacyQuote.context, `quote context changed for ${text.id}`);
  });
  for (const quote of text.quotes) {
    assert.equal(typeof quote.source, 'object', `quote source missing for ${text.id}`);
    assert.equal(
      typeof quote.source.translator_or_edition,
      'string',
      `quote translator_or_edition must be a string for ${text.id}`
    );
    assert.equal(typeof quote.source.note, 'string', `quote source note must be a string for ${text.id}`);
    assert.equal(typeof quote.source.verified, 'boolean', `quote verified flag must be a boolean for ${text.id}`);
    if (quote.source.verified) {
      assert.ok(
        quote.source.translator_or_edition.trim(),
        `verified quote must name a translation or edition for ${text.id}`
      );
      assert.ok(quote.source.note.trim(), `verified quote must include a location note for ${text.id}`);
    }
  }
  assert.ok(!Object.hasOwn(text, 'icon'), `emoji icon leaked into text ${text.id}`);
}

assert.equal(paths.length, 4, 'expected four study paths');
assert.deepEqual(
  paths,
  legacyPaths.map(({ icon, ...studyPath }) => studyPath),
  'study paths changed while removing icons'
);
for (const studyPath of paths) {
  assert.ok(!Object.hasOwn(studyPath, 'icon'), `emoji icon leaked into path ${studyPath.id}`);
}

assert.equal(connections.connections.length, legacyRelationships.length, 'connection count does not match legacy/index.html');
assert.deepEqual(
  connections.connections,
  legacyRelationships.map(({ from, to, type }) => ({ from, to, type })),
  'connection endpoints, types, or order changed'
);
assert.deepEqual(
  connections.types.map(({ id, color }) => ({ id, color })),
  Object.entries(legacyColors).map(([id, color]) => ({ id, color: color.hex })),
  'connection type colors changed'
);

const textIds = new Set(texts.map(({ id }) => id));
assert.equal(textIds.size, texts.length, 'text ids must be unique');
assert.equal(themes.filter(({ featured }) => featured).length, 10, 'exactly ten home themes must be featured');
for (const theme of themes) {
  assert.ok(theme.id && theme.label && theme.subline, 'each theme needs an id, label, and subline');
  assert.ok(theme.textIds.length > 0, `theme ${theme.id} must reference texts`);
  for (const textId of theme.textIds) {
    assert.ok(textIds.has(textId), `theme ${theme.id} references unknown text ${textId}`);
  }
}

console.table([
  { dataset: 'chapters', expected: 6, actual: chapters.length, status: 'pass' },
  { dataset: 'texts in legacy/index.html', expected: legacyTexts.length, actual: texts.length, status: 'pass' },
  { dataset: 'quotes in legacy/index.html', expected: legacyQuoteCount, actual: extractedQuoteCount, status: 'pass' },
  { dataset: 'study paths', expected: 4, actual: paths.length, status: 'pass' },
  { dataset: 'connections', expected: legacyRelationships.length, actual: connections.connections.length, status: 'pass' },
  { dataset: 'featured themes', expected: 10, actual: themes.filter(({ featured }) => featured).length, status: 'pass' }
]);
if (correctedPeriods.length) {
  console.log(`
Dates corrected against scholarship (${correctedPeriods.length}):`);
  for (const [id, was, now] of correctedPeriods) console.log(`  ${id}: ${was}  ->  ${now}`);
}

const verifiedQuotes = texts.reduce(
  (sum, text) => sum + text.quotes.filter((quote) => quote.source.verified).length,
  0
);
console.log(
  `
Quote sourcing: ${verifiedQuotes} verified, ${extractedQuoteCount - verifiedQuotes} carrying the paraphrase mark, ${extractedQuoteCount} total.`
);

assert.equal(
  appliedCorrections.length,
  Object.keys(APPROVED_QUOTE_CORRECTIONS).length,
  'an approved quote correction is no longer being applied'
);
console.log(`Approved quote corrections applied: ${appliedCorrections.length}`);

console.log('');
console.log('Content verification passed.');
