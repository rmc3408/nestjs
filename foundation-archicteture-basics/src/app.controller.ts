import { Controller, Get } from "@nestjs/common"

@Controller('/app')
export class AppController {
  @Get('/in')
  getRootRoute() {
    return "hello"
  }

  @Get('/out')
  getWelcome() {
    return "Welcome"
  }
}