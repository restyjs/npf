import { FastifyPluginAsync } from "fastify";
import { Server } from "node:http";

const MetadataKeys = {
  controller: "npf:controller",
  httpMethod: "npf:httpMethod",
  param: "npf:parameter",
};

interface ControllerMetadata {
  path: string;
  middlewares: FastifyPluginAsync;
}

function Controller(path: string, middlewares: FastifyPluginAsync) {
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

export { Controller, ControllerMetadata };
