import { createSerializer } from 'jest-emotion'
import * as emotion from 'emotion'

// Set up emotion snapshot serializer
expect.addSnapshotSerializer(createSerializer(emotion))

class LocalStorageMock {
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key] || null
  }

  setItem(key, value) {
    this.store[key] = value.toString()
  }

  removeItem(key) {
    delete this.store[key]
  }
}

global.localStorage = new LocalStorageMock()

// Fix "ReferenceError: SVGElement is not defined" error caused by PoseElement
// Source: https://git.io/vp0Jj
class SVGElement extends HTMLElement {}
global.SVGElement = SVGElement
