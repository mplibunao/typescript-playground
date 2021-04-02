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

// Similar to private constructor, protected constructor will not allow you to use new on the class
// But will allow you to extend from the protected class

class A {
  protected constructor() {}
}

class B extends A {} // ok
// error
// new A()
// error
// new B()
