const {
  TreeSymbol,
  MethodSymbol,
  BaseSymbol,
  ParentTreeSymbol
} = require('./TreeSymbols')

module.exports = class Tree {
  constructor (base = '/', parent = null) {
    this[BaseSymbol] = base
    this[TreeSymbol] = {}
    this[ParentTreeSymbol] = parent
  }

  register (path, methods) {
    const newPath = path.split('/').filter(p => p.length)
    const base = newPath.shift()
    if (typeof base === 'undefined') {
      this[TreeSymbol][MethodSymbol] = methods
      return
    }

    if (!(base in this[TreeSymbol])) {
      this[TreeSymbol][base] = new Tree(base, this)
    }
    this[TreeSymbol][base].register(newPath.join('/'), methods)
  }

  get path () {
    if (!this[ParentTreeSymbol]) return ''
    return [this[ParentTreeSymbol].path, this[BaseSymbol]].join('/')
  }

  render () {
    throw new Error('No render function provided in plugin options')
  }
}
