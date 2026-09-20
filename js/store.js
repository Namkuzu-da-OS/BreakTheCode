const namespace = "btc.";

function keyFor(key) {
  return key.startsWith(namespace) ? key : `${namespace}${key}`;
}

export function readStore(key, fallback = null) {
  try {
    const value = window.localStorage.getItem(keyFor(key));
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function writeStore(key, value) {
  try {
    window.localStorage.setItem(keyFor(key), JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStore(key) {
  try {
    window.localStorage.removeItem(keyFor(key));
    return true;
  } catch {
    return false;
  }
}
