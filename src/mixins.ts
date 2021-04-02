// Add a generic to ClassConstructor to make sure the class implements .getDebugValue
type ClassConstructor<T> = new (...args: any[]) => T;

function withEZDebug<
  C extends ClassConstructor<{
    getDebugValue(): object;
  }>
>(Class: C) {
  return class extends Class {
    // To wire everything up, we need to call Class's constructor
    // But we aren't going to put any logic into the constructor so we can omit
    // constructor(...args: any[]) {
    //   super(...args)
    // }

    debug() {
      let Name = Class.constructor.name;
      let value = this.getDebugValue();
      return `${Name} (${JSON.stringify(value)})`;
    }
  };
}

// Using it
class HardToDebugUser {
  constructor(
    private id: number,
    private firstName: string,
    private lastName: string
  ) {}

  getDebugValue() {
    return {
      id: this.id,
      name: `${this.firstName} ${this.lastName}`,
    };
  }
}

let User = withEZDebug(HardToDebugUser);
let user = new User(3, "MP", "Libunao");
user.debug(); // User({"id": 3, "name": "MP Libunao"})
