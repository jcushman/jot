/* load libraries (test if 'jot' is defined already, so we can use this in the browser where 'require' is not available) */
var jot = jot || require("./jot");

/* The Base Document */

var doc = {
	key1: "Hello World!",
	key2: 10,
};

console.log("Original Document")
console.log(doc); // { key1: 'Hello World!', key2: 10 }
console.log("")

/* User 1 makes changes to the document's keys so
 * that the document becomes:
 *
 * { title: 'Hello World!', count: 10 }
 *
 */

var user1 = jot.LIST([
	jot.REN("key1", "title"),
	jot.REN("key2", "count")
]);

console.log("User 1")
console.log(user1.apply(doc)); // { title: 'Hello World!', count: 10 }
console.log("")

/* User 2 makes changes to the document's values so
 * that the document becomes:
 *
 * { key1: 'My Program', key2: 20 }
 *
 */

var user2 = jot.LIST([
	jot.APPLY("key1", jot.SET("Hello World!", "My Program")),
	jot.APPLY("key2", jot.MATH('add', 10))
]);

console.log("User 2")
console.log(user2.apply(doc)); // { key1: 'My Program', key2: 20 }
console.log("")

/* You can't do this! */

//console.log("The Wrong Way")
//console.log(user1.compose(user2).apply(doc));
//console.log("")

/* You must rebase user2's operations before composing them. */

user2 = user2.rebase(user1);
if (user2 == null) throw "hmm";

console.log("Merged")
console.log(user1.compose(user2).apply(doc)); // { title: 'My Program', count: 20 }
console.log("")

