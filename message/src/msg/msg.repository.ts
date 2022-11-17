import { randomUUID } from "crypto";
import { readFile, writeFile } from "fs/promises";
const path = require('path');


export class MessageRepository {
  fileJSON: string = path.join(__dirname, 'msg.json')

  async findOne(id: string) {
    const contents = await readFile(this.fileJSON, 'utf-8')
    const messages = JSON.parse(contents);
    return messages[id];
  }

  async findAll() {
    const contents = await readFile(this.fileJSON, 'utf-8');
    const messages = JSON.parse(contents);
    return messages;
  }

  async create(contentToCreate: string) {
    const contents = await readFile(this.fileJSON, 'utf-8');
    let messages = JSON.parse(contents);

    const id = randomUUID();
    messages[id] = { id, payload: contentToCreate, size: Math.floor(Math.random() * 99) };
    const newMessages = JSON.stringify(messages); 
    await writeFile(this.fileJSON, newMessages);
  }
}