export const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can fail in private browsing or restricted environments.
  }
}

export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch {
    // Ignore storage failures.
  }
}
