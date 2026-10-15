for (const [name, fn] of Object.entries({
  getOrInsert(key, value) { if (this.has(key)) return this.get(key); this.set(key, value); return value; },
  getOrInsertComputed(key, callback) { if (this.has(key)) return this.get(key); const value = callback(key); this.set(key, value); return value; }
})) if (!Map.prototype[name]) Object.defineProperty(Map.prototype, name, { configurable: true, writable: true, value: fn });
