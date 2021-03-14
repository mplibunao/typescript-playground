"use strict";
// let h = null;
// let e = { type: "fsis" };
// let d = [true, true, false];
// const g = [3];
function call(f, ...args) {
    return f(...args);
}
function fill(length, value) {
    return Array.from({ length }, () => value);
}
function fillNum(length, value) {
    return Array.from({ length }, () => value);
}
const a = call(fill, 10, "a");
console.log("🚀 ~ file: index.ts ~ line 15 ~ a", a);
const b = call(fillNum, 10, 10);
console.log("🚀 ~ file: index.ts ~ line 20 ~ b", b);
//# sourceMappingURL=index.js.map