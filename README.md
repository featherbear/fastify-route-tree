# Fastify Route Tree

---

> Due to implementation, this plugin must be registered in Fastify **BEFORE** desired routes are registered.

---

* The route tree is accessible via `<FastifyInstance>.routeTree`
  * If access is required prior to Fastify being ready, `await` for `routeTree`
* A route schema can contain a `hide` (_boolean_) property that will skip the route if true