// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { UserService } from './auth.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) { }

  @Get('users')
  async getUsers() {
    return this.userService.findAll();
  }
}
