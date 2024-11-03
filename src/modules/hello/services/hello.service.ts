import { Injectable } from "@nestjs/common";
import { HelloRepository } from "../repositories/hello.repository";

@Injectable()
export class HelloService {
    constructor(private readonly helloRepository: HelloRepository) { }

    async getHello(): Promise<string> {
        return await this.helloRepository.getHello();
    }
}