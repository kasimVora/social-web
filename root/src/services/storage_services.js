// src/services/storage.js
export const storageService = {
  get: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return localStorage.getItem(key);
    }
  },
  set: (key, value) => {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  },
  remove: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
};