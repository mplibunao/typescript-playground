// let h = null;
// let e = { type: "fsis" };
// let d = [true, true, false];
// const g = [3];

// ---------------------- Overloading functions
// Update overloaded reserve function with a third call signature that just takes a destination without an explicit start date
type Reservation = unknown;
type Reserve = {
  (from: Date, to: Date, destination: string): Reservation;
  (from: Date, destination: string): Reservation;
  (destination: string): Reservation;
};

let reserve: Reserve = (
  fromOrDestination: Date | string,
  toOrDestination?: Date | string,
  destination?: string
) => {
  if (
    fromOrDestination instanceof Date &&
    toOrDestination instanceof Date &&
    destination
  ) {
    // Book round trip
  } else if (
    fromOrDestination instanceof Date &&
    typeof toOrDestination === "string"
  ) {
    // Book one-way trip
  } else if (typeof fromOrDestination === "string") {
    // Book a trip right away
  }
};

// ------------------------- Generics
function call<T extends unknown[], R>(f: (...args: T) => R, ...args: T): R {
  return f(...args);
}

function fill(length: number, value: string): string[] {
  return Array.from({ length }, () => value);
}
function split(word: string, spitChar: string): string[] {
  return word.split(spitChar);
}
function fillNum(length: number, value: number): number[] {
  return Array.from({ length }, () => value);
}

let a = call(fill, 10, "a");
console.log("🚀 ~ file: index.ts ~ line 15 ~ a", a);
let b = call(split, "wat", "");
console.log("🚀 ~ file: index.ts ~ line 20 ~ b", b);
let c = call(fillNum, 10, 10);
console.log("🚀 ~ file: index.ts ~ line 42 ~ c", c);

// Update call implementation to only work for functions whose second argument is a string. For all other functions, your implementation should fail at compile time
function updatedCall<T extends [unknown, string, ...unknown[]], R>(
  f: (...args: T) => R,
  ...args: T
): R {
  return f(...args);
}

let d = updatedCall(fill, 10, "a");
console.log("🚀 ~ file: index.ts ~ line 15 ~ a", d);
let e = updatedCall(split, "wat", "");
console.log("🚀 ~ file: index.ts ~ line 20 ~ b", e);
// const e = updatedCall(fillNum, 10, 10) // error

// --------------------- can I use rest parameters for object too?
const reactCom = ({ ...props }: Record<string, string>) => {};
reactCom({ size: "md", color: "blue" });

const reactComponent2 = ({
  size,
  ...props
}: {
  size: string;
  [key: string]: string;
}) => {};
reactComponent2({ size: "md", color: "blue", type: "string" });

// Implement a small typesafe assertion library, is. Start by sketching out
// your types. When you’re done, I should be able to use it like this:

// Compare a string and a string
let f = is("string", "otherstring"); // false
console.log("🚀 ~ file: index.ts ~ line 90 ~ f", f);
// Compare a boolean and a boolean
let g = is(true, false); // false
console.log("🚀 ~ file: index.ts ~ line 93 ~ g", g);

// Compare a number and a number
let h = is(42, 42); // true
console.log("🚀 ~ file: index.ts ~ line 97 ~ h", h);

// Comparing two different types should give a compile-time error
// is(10, 'foo') // Error TS2345: Argument of type '"foo"' is not assignable
// to parameter of type 'number'.

// [Hard] I should be able to pass any number of arguments
let j = is([1], [1, 2], [1, 2, 3]); // false
console.log("🚀 ~ file: index.ts ~ line 105 ~ j", j);

function is<T>(a: T, ...b: [T, ...T[]]): boolean {
  return b.every((bItem) => bItem === a);
}
