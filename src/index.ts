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

const a = call(fill, 10, "a");
console.log("🚀 ~ file: index.ts ~ line 15 ~ a", a);
const b = call(split, "wat", "");
console.log("🚀 ~ file: index.ts ~ line 20 ~ b", b);
const a1 = call(fillNum, 10, 10);
console.log("🚀 ~ file: index.ts ~ line 42 ~ a1", a1);

// Update call implementation to only work for functions whose second argument is a string. For all other functions, your implementation should fail at compile time
function updatedCall<T extends [unknown, string, ...unknown[]], R>(
  f: (...args: T) => R,
  ...args: T
): R {
  return f(...args);
}

const c = updatedCall(fill, 10, "a");
console.log("🚀 ~ file: index.ts ~ line 15 ~ c", c);
const d = updatedCall(split, "wat", "");
console.log("🚀 ~ file: index.ts ~ line 20 ~ d", d);
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
