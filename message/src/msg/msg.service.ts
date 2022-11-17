import { MessageRepository } from './msg.repository';


export class MessageService {
  private msgRepo: MessageRepository
  
  constructor() {
    this.msgRepo = new MessageRepository();
  }

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