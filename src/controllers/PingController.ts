import { Controller, Get } from "@core/index";
import { FastifyReply, FastifyRequest } from "fastify";

@Controller("/ping")
class PingController {
  @Get("/")
  async ping(request: FastifyRequest, reply: FastifyReply) {
    return "pong";
  }
}

export { PingController };
