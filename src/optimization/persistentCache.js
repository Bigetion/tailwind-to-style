/**
 * Persistent Cache - Advanced caching with compression and persistence
 * @module optimization/persistentCache
 */

import { LRUCache } from '../utils/lruCache.js';
import { logger } from '../utils/logger.js';

export class PersistentCache {
  constructor(options = {}) {
    this.options = {
      name: 'twsx-cache',
      version: '1.0',
      maxSize: 5000, // Max items in memory cache
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      compress: true,
      storage: 'localStorage', // 'localStorage', 'sessionStorage', 'indexedDB', 'memory'
      enablePersistence: true,
      ...options,
    };
    
    this.memoryCache = new LRUCache(this.options.maxSize);
    this.stats = {
      hits: 0,
      misses: 0,
      writes: 0,
      compressionRatio: 0,
    };
  }

  /**
   * Get value from cache
   */
  async get(key) {
    // Try memory cache first
    const memoryValue = this.memoryCache.get(key);
    if (memoryValue !== undefined) {
      this.stats.hits++;
      return this.isExpired(memoryValue) ? null : memoryValue.data;
    }

    // Try persistent storage
    if (this.options.enablePersistence) {
      const persistentValue = await this.getFromStorage(key);
      if (persistentValue !== null) {
        this.stats.hits++;
        // Restore to memory cache
        this.memoryCache.set(key, persistentValue);
        return this.isExpired(persistentValue) ? null : persistentValue.data;
      }
    }

    this.stats.misses++;
    return null;
  }

  /**
   * Set value in cache
   */
  async set(key, value) {
    const cacheEntry = {
      data: value,
      timestamp: Date.now(),
      version: this.options.version,
    };

    // Set in memory
    this.memoryCache.set(key, cacheEntry);
    
    // Persist if enabled
    if (this.options.enablePersistence) {
      await this.setInStorage(key, cacheEntry);
    }

    this.stats.writes++;
  }

  /**
   * Check if cache entry is expired
   */
  isExpired(entry) {
    if (!entry || !entry.timestamp) return true;
    return Date.now() - entry.timestamp > this.options.maxAge;
  }

  /**
   * Get from persistent storage
   */
  async getFromStorage(key) {
    const storageKey = this.getStorageKey(key);
    
    try {
      switch (this.options.storage) {
        case 'localStorage':
          return this.getFromLocalStorage(storageKey);
        
        case 'sessionStorage':
          return this.getFromSessionStorage(storageKey);
        
        case 'indexedDB':
          return await this.getFromIndexedDB(storageKey);
        
        default:
          return null;
      }
    } catch (error) {
      logger.warn('Failed to get from storage:', error);
      return null;
    }
  }

  /**
   * Set in persistent storage
   */
  async setInStorage(key, value) {
    const storageKey = this.getStorageKey(key);
    
    try {
      switch (this.options.storage) {
        case 'localStorage':
          this.setInLocalStorage(storageKey, value);
          break;
        
        case 'sessionStorage':
          this.setInSessionStorage(storageKey, value);
          break;
        
        case 'indexedDB':
          await this.setInIndexedDB(storageKey, value);
          break;
      }
    } catch (error) {
      logger.warn('Failed to set in storage:', error);
    }
  }

  /**
   * Get storage key with namespace
   */
  getStorageKey(key) {
    return `${this.options.name}:${this.options.version}:${key}`;
  }

  /**
   * LocalStorage operations
   */
  getFromLocalStorage(key) {
    if (typeof localStorage === 'undefined') return null;
    
    const data = localStorage.getItem(key);
    if (!data) return null;
    
    return this.decompress(data);
  }

  setInLocalStorage(key, value) {
    if (typeof localStorage === 'undefined') return;
    
    const compressed = this.compress(value);
    localStorage.setItem(key, compressed);
  }

  /**
   * SessionStorage operations
   */
  getFromSessionStorage(key) {
    if (typeof sessionStorage === 'undefined') return null;
    
    const data = sessionStorage.getItem(key);
    if (!data) return null;
    
    return this.decompress(data);
  }

  setInSessionStorage(key, value) {
    if (typeof sessionStorage === 'undefined') return;
    
    const compressed = this.compress(value);
    sessionStorage.setItem(key, compressed);
  }

  /**
   * IndexedDB operations
   */
  async getFromIndexedDB(key) {
    if (typeof indexedDB === 'undefined') return null;
    
    const db = await this.openDB();
    const transaction = db.transaction([this.options.name], 'readonly');
    const store = transaction.objectStore(this.options.name);
    
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      
      request.onsuccess = () => {
        const data = request.result;
        resolve(data ? this.decompress(data.value) : null);
      };
      
      request.onerror = () => reject(request.error);
    });
  }

  async setInIndexedDB(key, value) {
    if (typeof indexedDB === 'undefined') return;
    
    const db = await this.openDB();
    const transaction = db.transaction([this.options.name], 'readwrite');
    const store = transaction.objectStore(this.options.name);
    
    const compressed = this.compress(value);
    
    return new Promise((resolve, reject) => {
      const request = store.put({ key, value: compressed });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Open IndexedDB
   */
  async openDB() {
    if (this._db) return this._db;
    
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.options.name, 1);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.options.name)) {
          db.createObjectStore(this.options.name, { keyPath: 'key' });
        }
      };
      
      request.onsuccess = () => {
        this._db = request.result;
        resolve(this._db);
      };
      
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Compress data
   */
  compress(data) {
    if (!this.options.compress) {
      return JSON.stringify(data);
    }
    
    const jsonString = JSON.stringify(data);
    
    // Simple compression using LZ-based algorithm
    // For production, consider using a library like lz-string
    return this.lzCompress(jsonString);
  }

  /**
   * Decompress data
   */
  decompress(data) {
    if (!this.options.compress) {
      return JSON.parse(data);
    }
    
    const decompressed = this.lzDecompress(data);
    return JSON.parse(decompressed);
  }

  /**
   * Simple LZ compression
   */
  lzCompress(str) {
    // Simple run-length encoding for demonstration
    // In production, use a proper compression library
    const dict = {};
    const data = (str + '').split('');
    const out = [];
    let currChar;
    let phrase = data[0];
    let code = 256;
    
    for (let i = 1; i < data.length; i++) {
      currChar = data[i];
      if (dict[phrase + currChar] != null) {
        phrase += currChar;
      } else {
        out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
        dict[phrase + currChar] = code;
        code++;
        phrase = currChar;
      }
    }
    
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    
    // Convert to hex string for storage (handles Unicode properly)
    return out.map(n => n.toString(16).padStart(4, '0')).join('');
  }

  /**
   * Simple LZ decompression
   */
  lzDecompress(str) {
    try {
      // Decode from hex string
      const data = [];
      for (let i = 0; i < str.length; i += 4) {
        data.push(parseInt(str.substr(i, 4), 16));
      }
      
      const dict = {};
      const out = [];
      let currChar = String.fromCharCode(data[0]);
      let oldPhrase = currChar;
      let code = 256;
      let phrase;
      
      out.push(currChar);
      
      for (let i = 1; i < data.length; i++) {
        const currCode = data[i];
        
        if (currCode < 256) {
          phrase = String.fromCharCode(data[i]);
        } else {
          phrase = dict[currCode] ? dict[currCode] : oldPhrase + currChar;
        }
        
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
      }
      
      return out.join('');
    } catch (error) {
      logger.warn('Decompression failed, returning original:', error);
      return str;
    }
  }

  /**
   * Clear cache
   */
  async clear() {
    this.memoryCache.clear();
    
    if (this.options.enablePersistence) {
      try {
        switch (this.options.storage) {
          case 'localStorage':
            if (typeof localStorage !== 'undefined') {
              Object.keys(localStorage).forEach(key => {
                if (key.startsWith(this.options.name)) {
                  localStorage.removeItem(key);
                }
              });
            }
            break;
          
          case 'sessionStorage':
            if (typeof sessionStorage !== 'undefined') {
              Object.keys(sessionStorage).forEach(key => {
                if (key.startsWith(this.options.name)) {
                  sessionStorage.removeItem(key);
                }
              });
            }
            break;
          
          case 'indexedDB':
            if (typeof indexedDB !== 'undefined') {
              await indexedDB.deleteDatabase(this.options.name);
              this._db = null;
            }
            break;
        }
      } catch (error) {
        logger.warn('Failed to clear persistent storage:', error);
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const hitRate = this.stats.hits + this.stats.misses > 0
      ? (this.stats.hits / (this.stats.hits + this.stats.misses) * 100).toFixed(2)
      : 0;

    return {
      ...this.stats,
      hitRate: `${hitRate}%`,
      memorySize: this.memoryCache.size,
      maxSize: this.options.maxSize,
    };
  }
}
