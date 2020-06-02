# <img width="50" alt="logo" src="https://raw.githubusercontent.com/gabrielurbina/type-guard/master/logo.svg"> Type Guard [![GitHub license](https://img.shields.io/npm/l/@gabrielurbina/type-guard?color=%232a7e7d&style=flat-square)](https://github.com/gabrielurbina/type-guard/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/@gabrielurbina/type-guard?color=%232a7e7d&style=flat-square)](https://www.npmjs.com/package/@gabrielurbina/type-guard) 

_Bring Typescript types to your run time_

This self contained library will provide you with the tools to move the type validation to the edges of your application, to your IO ring, where you can validate the data coming from outside and trust elsewhere in your application.

## When to trust your data
A rather common anti-pattern in JavaScript is to check everywhere in your codebase for a value's type, we'll call this **Defensive Programing**.
It is quite likely that you have come across some code like this:
```javascript
const someFunction = (value) => {
	if (value !== undefined) throw Error("value must be defined");
	return anotherFunction(value, "I already checked value")
};
const anotherFunction = (value, message) => {
	if (value !== undefined) throw Error("value must be defined");
	return value + message;
};
```
Where a value is checked for its type multiple times across your application, this means that ***your code doesn't trust its data***. 

Although **Paranoia Oriented Programming** might sound cool, it isn't, it is far from productive or even safe.

The application code should be concerned with it's domain, function, modules or classes should not checking if the type of its parameters are valid.

However ***not all data is safe*** our code bases should trust internal data, but **Must** check external data for it might be either malicious, corrupted or just has the wrong format.

This validation should take place in the outermost interfaces of our application what we'll call the **IO Layer**.

The IO layer exist in different places depending on the application:
- In libraries or frameworks: the public methods and functions
- In a server application: HTTP and database requests
- In a web application: HTTP responses, local-storage and the user's input

Wherever your application meets external data

Performing all the data validation on this layer will allow allow the core application to trust the data is using, allowing you to remove redundant type-checks and unclutter your code.
## Type guards
A type guard is a function that checks an ***unknown*** value and returns *true* if the value is of a given type:
```typescript
type Guard<T> = (v: unknown) => v is T;
```
```typescript
type Grade = "A" | "B" | "C" | "D" | "F"; 
const isGrade = (value: unknown): value is Grades =>  ["A","B","C","D","F"].includes(value)
```
*Naming*: Type guards start with **is** and then the type they check 
### Provided Type-Guards
```typescript
function isArray(value: unknown): value is Array<any>;
function isObject(value: unknown): value is { [x: string]: any };
function isNumber(value: unknown): value is number;
function isString(value: unknown): value is string;
function isBoolean(value: unknown): value is boolean;
```

## High order guards
High order guards are functions that receive type-guards and return another type-guard of a composite type:
```typescript
const ArrayOf= <T>(type: Guard<T>) => {
	return (arr: unknown): arr is Array<T> => Array.isArray(arr) && arr.every((v) => type(v));
};
```
*Naming*: High order guards start with the base type end with **Of**

### Provided high order guards 
```typescript
function ObjectOf<T extends { [K in keyof T]: any; }>(guards: { [K in keyof T]: Guard<T[K]>; }): Guard<T>;
function OneOf<T>(guards: Array<T extends any ? Guard<T> : never>): Guard<T>;
function RecordOf<T>(type: Guard<T>): Guard<{ [k: string]: T }>
function ArrayOf<T>(type: Guard<T>): Guard<Array<T>>;
function TupleOf<T extends [any, ...any[]]>(guards: { [K in keyof T]: Guard<T[K]>; }): Guard<T>;
function InstanceOf<T>(constructor: new (...args: any[]) => T): Guard<T>;
```
## Examples
### HTTP responses
When getting data from your students API type-check it before letting pass into your application:
 ```typescript
import { ArrayOf, ObjectOf, isString, isNumber, isBoolean } from "@gabrielurbina/type-guard";

type Student = { firstName: string; lastName: string; age: number; active: boolean };

const isStudent = ObjectOf({
	firstName: isString,
	lastName: isString,
	age: isNumber,
	active: isBoolean
});

const isStudentList = ArrayOf(isStudent);

export const fetchStudents = async (id: string): Promise<Student[]> => {
	// Remember to treat external data as unknown
	const response: unknown = await(await fetch(`api/students?class=${id}`)).json();
	if(!isStudentList(response)) throw Error("Invalid API response");
	return response
}
```
### Local storage
When getting data from your students API type-check it before letting pass into your application:
 ```typescript
import { ArrayOf, ObjectOf, isString, isNumber, isBoolean } from "@gabrielurbina/type-guard";

interface UserPreferences {
	theme: "dark" | "light";
	currency: "USD" | "EUR" | "GBP";
	timeZoneOffset: number;
	finishedWalkthrough: boolean;
};
const isUserPreferences = ObjectOf({
	firstName: isString,
	lastName: isString,
	age: isNumber,
	active: isBoolean
});
const isStudentList = ArrayOf(isStudent);

export const fetchStudents = async (id: string): Promise<Student[]> => {
	// Remember to treat external data as unknown
	const response: unknown = await(await fetch(`api/students?class=${id}`)).json();
	if(!isStudentList(response)) throw Error("Invalid API response");
	return response
}
```