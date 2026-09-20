import { readStore, writeStore } from "../store.js";

const container = document.querySelector("[data-weighing-panel]");
const reflectionPrompts = [
  { id: "release-patterns", question: "What patterns am I ready to release?" },
  { id: "alignment", question: "Where am I out of alignment?" },
  { id: "conscious-self", question: "What does a more conscious me look like?" },
  { id: "greater-service", question: "How can I serve something greater?" },
];

function storedReflections() {
  const value = readStore("reflections", []);
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return Object.values(value);
  return [];
}

function createPrompt(prompt, savedById) {
  const item = document.createElement("section");
  item.className = "reflection-item";

  const trigger = document.createElement("button");
  trigger.className = "reflection-item__trigger";
  trigger.type = "button";
  trigger.id = `reflection-trigger-${prompt.id}`;
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", `reflection-panel-${prompt.id}`);

  const question = document.createElement("span");
  question.textContent = prompt.question;
  const plus = document.createElement("span");
  plus.className = "reflection-item__plus";
  plus.setAttribute("aria-hidden", "true");
  trigger.append(question, plus);

  const answerPanel = document.createElement("div");
  answerPanel.className = "reflection-item__answer";
  answerPanel.id = `reflection-panel-${prompt.id}`;
  answerPanel.setAttribute("role", "region");
  answerPanel.setAttribute("aria-labelledby", trigger.id);
  answerPanel.hidden = true;

  const label = document.createElement("label");
  label.className = "sr-only";
  label.htmlFor = `reflection-${prompt.id}`;
  label.textContent = prompt.question;

  const textarea = document.createElement("textarea");
  textarea.id = label.htmlFor;
  textarea.rows = 3;
  textarea.maxLength = 2000;
  textarea.placeholder = "Write what feels true…";
  textarea.value = savedById.get(prompt.id)?.response || "";

  const actions = document.createElement("div");
  actions.className = "reflection-item__actions";
  const save = document.createElement("button");
  save.className = "reflection-item__save";
  save.type = "button";
  save.textContent = "Save reflection";
  const status = document.createElement("span");
  status.className = "reflection-item__status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  actions.append(save, status);

  trigger.addEventListener("click", () => {
    const open = trigger.getAttribute("aria-expanded") !== "true";
    trigger.setAttribute("aria-expanded", String(open));
    answerPanel.hidden = !open;
    if (open) textarea.focus();
  });

  save.addEventListener("click", () => {
    const response = textarea.value.trim();
    if (!response) {
      status.textContent = "Write a reflection before saving.";
      textarea.focus();
      return;
    }

    const reflections = storedReflections().filter((reflection) => reflection?.promptId !== prompt.id);
    reflections.push({
      promptId: prompt.id,
      prompt: prompt.question,
      response,
      savedAt: new Date().toISOString(),
    });

    status.textContent = writeStore("reflections", reflections)
      ? "Reflection saved."
      : "This reflection could not be saved in this browser.";
  });

  answerPanel.append(label, textarea, actions);
  item.append(trigger, answerPanel);
  return item;
}

export function initializeWeighingBand() {
  if (!container) return;

  const reflections = storedReflections();
  const savedById = new Map(reflections.map((reflection) => [reflection?.promptId, reflection]));

  const heading = document.createElement("h2");
  heading.className = "weighing-panel__title";
  heading.textContent = "Pause. Reflect. Realign.";

  const subline = document.createElement("p");
  subline.className = "weighing-panel__subline";
  subline.textContent = "Ask. Feel. Be honest. This is a journey back to you.";

  const list = document.createElement("div");
  list.className = "weighing-panel__prompts";
  reflectionPrompts.forEach((prompt) => list.append(createPrompt(prompt, savedById)));

  container.replaceChildren(heading, subline, list);
}
