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
A type guard is a function that checks a value and returns *true* if the value is of a given type:
```typescript
type Guard<T extends V, V = unknown> = (v: V) => v is T;
```
For example this fuction checks that the unkown value is one valid `Grade`
```typescript
type Grade = "A" | "B" | "C" | "D" | "F"; 
const isGrade = (value: unknown): value is Grades =>  ["A","B","C","D","F"].includes(value)
```
*Naming*: Type guards start with **is** and then the type they check

[**This library provides these Type-Guards**](modules.md#guard-functions)

## Guard factories
Guard factories are functions that return a type guard

[**This library provides these Guard Factories**](modules.md#guard-factory-functions)

## High order guards
High order guards are functions that receive type-guards and return another type-guard of a composite type:
```typescript
const ArrayOf= <T>(type: Guard<T>) => {
	return (arr: unknown): arr is Array<T> => Array.isArray(arr) && arr.every((v) => type(v));
};
```
*Naming*: High order guards start with the base type end with **Of**

[**This library provides these High order guards**](modules.md#high-order-guard-functions)

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
When getting your user's stored preferences from `localStorage` type-check it before using it or use some default preferences if the type is invalid or there are no stored preferences:
 ```typescript
import { ObjectOf, ValueOf, isNumber, isBoolean } from "@gabrielurbina/type-guard";

type Theme = "dark" | "light";
type Currency = "USD" | "EUR" | "GBP";

interface UserPreferences {
	theme: Theme;
	currency: Currency;
	timeZoneOffset: number;
	finishedWalkthrough: boolean;
};

const isUserPreferences = ObjectOf({
	theme: ValueOf<Theme>(["dark" , "light"]),
	currency: ValueOf<Currency>(["USD" , "EUR" , "GBP"]),
	timeZoneOffset: isNumber,
	finishedWalkthrough: isBoolean,
});

const defaultUserPreferences: UserPreferences = {
	theme: "light",
	currency: "USD",
	timeZoneOffset: 0,
	finishedWalkthrough: false,
}

export const retrieveUserPreferences = (): UserPreferences => {
	const storedPreferences = localStorage.getItem("user-preferences");
	if (storedPreferences === null) return defaultUserPreferences;
	// Treat external data as unknown
	const preferences: unknown = JSON.parse(storedPreferences);
	if(!isUserPreferences(preferences)) return defaultUserPreferences;
	return preferences;
}
```
