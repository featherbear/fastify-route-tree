import Tree from './Tree'

import { FastifyPlugin } from 'fastify'

export {
  TreeSymbol,
  MethodSymbol,
  BaseSymbol,
  ParentTreeSymbol
} from './TreeSymbols'

declare module 'fastify' {
  interface FastifyInstance {
    /**
     * Tree structure of registered routes
     */
    routeTree: Promise<Tree>
  }

  interface FastifySchema {
    /**
     * Hide route from fastify-route-tree plugin
     */
    hide?: boolean
  }
}

export type RouteTreePluginOptions = {
  render: Function
}

declare const fastifyRouteTree: FastifyPlugin<RouteTreePluginOptions>
export default fastifyRouteTree
