import { Injectable } from '@nestjs/common';
import { MessageRepository } from './msg.repository';

@Injectable()
export class MessageService {
  // private msgRepo: MessageRepository
  // constructor() {
  //   this.msgRepo = new MessageRepository();
  // }
  // You can short code using same bellow.

  constructor(public msgRepo: MessageRepository) {}

  async findOne(id: string) {
    return this.msgRepo.findOne(id);
  }

  async findAll() {
    return this.msgRepo.findAll();
  }

  async create(contentToCreate: string) {
    this.msgRepo.create(contentToCreate);
  }
}