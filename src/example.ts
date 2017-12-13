import { log } from 'util';

class Student {
  fullName: string;

  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
    this.fullName = `${firstName} ${middleInitial} ${lastName}`;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  // Notice the use of ES6 templated strings! TS can utilize both ES6 syntax and its own syntax!
  return `Hello, ${person.firstName} ${person.lastName}`;
}

const user = new Student('Jane', 'M.', 'User');

console.log(greeter(user));
