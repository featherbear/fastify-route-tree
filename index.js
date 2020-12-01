const Tree = require('./Tree')
const symbols = require('./TreeSymbols')

module.exports = {
  default: require('fastify-plugin')((server, opts, done) => {
    Tree.prototype.render = opts.render
    
    const tree = new Tree()
    
    const routes = {}

    let resolvePromise
    server.routeTree = new Promise((resolve, reject) => {
      resolvePromise = result => resolve((server.routeTree = result))
    })

    server.addHook('onRoute', function (route) {
      if ((route.schema && route.schema.hide) || route.hide) return
      const cleanedRoute = route.url
        .replace(/\/+/g, '/')
        .replace(/(.)\/$/, '$1')
      const routeData = {}
      const methods =
        typeof route.method === 'string' ? [route.method] : route.method
      methods.forEach(method => {
        routeData[method] = route.schema
        if (typeof route.preValidation !== 'undefined') {
          routeData[method].preValidation = route.preValidation
        }
      })
      routes[cleanedRoute] = { ...(routes[cleanedRoute] || {}), ...routeData }
    })

    server.ready(() => {
      Object.entries(routes).forEach(pair => tree.register(...pair))
      resolvePromise(tree)
    })

    done()
  }),
  ...symbols
}
