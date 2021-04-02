class MessageQueue {
  private constructor(private messages: string[]) {}
  static create(messages: string[]) {
    return new MessageQueue(messages);
  }
}
// can't extend
// class BadQueue extends MessageQueue {}

// Changes the API a bit but Can create an instance
MessageQueue.create([]);
