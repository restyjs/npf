import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { Server } from "node:http";
import Container from "typedi";

const MetadataKeys = {
  controller: "npf:controller",
  httpMethod: "npf:httpMethod",
  param: "npf:parameter",
};

interface ControllerMetadata {
  path: string;
  middlewares: FastifyPluginAsync[];
}

function Controller(path: string, middlewares: FastifyPluginAsync[] = []) {
  // Append / if not exist in path
  if (!path.startsWith("/")) {
    path = "/" + path;
  }

  return function (target: any) {
    Reflect.defineMetadata(
      MetadataKeys.controller,
      {
        path,
        middlewares,
      } as ControllerMetadata,
      target
    );
  };
}

function routeBinder(method: string, path: string) {
  // Append / if not exist in path
  if (!path.startsWith("/")) {
    path = "/" + path;
  }

  return function (target: any, key: string, desc: PropertyDescriptor) {
    let routes = Reflect.getMetadata(MetadataKeys.httpMethod, target) || [];

    routes.push({
      method,
      path,
      handler: desc.value,
    });

    Reflect.defineMetadata(MetadataKeys.httpMethod, routes, target.constructor);
  };
}

function Get(path: string) {
  return routeBinder("GET", path);
}

function bind(fastify: FastifyInstance, controllers: any[]) {
  controllers.forEach((controller) => {
    const controllerMetadata = Reflect.getMetadata(
      MetadataKeys.controller,
      controller
    );

    if (!controllerMetadata) {
      throw new Error(`Controller ${controller.name} is not decorated`);
    }

    const routes = Reflect.getMetadata(MetadataKeys.httpMethod, controller);

    fastify.register(
      async (instance, opts, next) => {
        for (const route of routes) {
          const { method, path, handler } = route;
          console.log(route);
          instance.route({
            method: method,
            url: path,
            handler: async (request, reply) => {
              const result = await handler(request, reply);
              return result;
            },
          });
        }
      },
      { prefix: controllerMetadata.path }
    );
  });
}

export { Controller, ControllerMetadata, Get, MetadataKeys, bind };
