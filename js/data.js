const cache = new Map();
const dataRoot = new URL("../data/", import.meta.url);

export async function loadData(name) {
  if (!/^[a-z-]+\.json$/i.test(name)) {
    throw new TypeError(`Invalid data file name: ${name}`);
  }

  if (!cache.has(name)) {
    cache.set(
      name,
      fetch(new URL(name, dataRoot)).then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load ${name}: ${response.status}`);
        }
        return response.json();
      }),
    );
  }

  return cache.get(name);
}

export function clearDataCache() {
  cache.clear();
}
