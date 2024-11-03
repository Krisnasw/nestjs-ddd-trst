import { Injectable } from "@nestjs/common";

@Injectable()
export class HelloRepository {
  async getHello(): Promise<string> {
    return "Hello World!";
  }
}