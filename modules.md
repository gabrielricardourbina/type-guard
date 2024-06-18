# @gabrielurbina/type-guard - v0.2.5

## Table of contents

### Type Aliases

- [Guard](modules.md#guard)
- [Maybe](modules.md#maybe)
- [NonCallable](modules.md#noncallable)
- [Nullable](modules.md#nullable)
- [OptionalGuard](modules.md#optionalguard)
- [TypeOfGuard](modules.md#typeofguard)

### Guard Functions

- [isArray](modules.md#isarray)
- [isBoolean](modules.md#isboolean)
- [isDefined](modules.md#isdefined)
- [isNull](modules.md#isnull)
- [isNumber](modules.md#isnumber)
- [isObject](modules.md#isobject)
- [isPresent](modules.md#ispresent)
- [isString](modules.md#isstring)

### Guard Factory Functions

- [InstanceOf](modules.md#instanceof)
- [ValueOf](modules.md#valueof)

### High Order Guard Functions

- [ArrayOf](modules.md#arrayof)
- [MaybeOf](modules.md#maybeof)
- [NullableOf](modules.md#nullableof)
- [ObjectOf](modules.md#objectof)
- [OneOf](modules.md#oneof)
- [OptionalOf](modules.md#optionalof)
- [RecordOf](modules.md#recordof)
- [TupleOf](modules.md#tupleof)

## Type Aliases

### Guard

Ƭ **Guard**<`T`, `V`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `V` |
| `V` | `unknown` |

#### Call signature

▸ (`v`): v is T

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `V` |

##### Returns

v is T

#### Type declaration

| Name | Type |
| :------ | :------ |
| `optional?` | `boolean` |

#### Defined in

[types.ts:1](src/types.ts#L1)

___

### Maybe

Ƭ **Maybe**<`T`\>: `T` \| `undefined`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types.ts:19](src/types.ts#L19)

___

### NonCallable

Ƭ **NonCallable**<`F`\>: (...`args`: `Parameters`<`F`\>) => `never` & `F`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `F` | extends (...`args`: `any`) => `any` |

#### Defined in

[types.ts:15](src/types.ts#L15)

___

### Nullable

Ƭ **Nullable**<`T`\>: `T` \| ``null``

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types.ts:20](src/types.ts#L20)

___

### OptionalGuard

Ƭ **OptionalGuard**<`T`, `V`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `V` |
| `V` | `unknown` |

#### Call signature

▸ (`v`): v is T

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `V` |

##### Returns

v is T

#### Type declaration

| Name | Type |
| :------ | :------ |
| `optional` | ``true`` |

#### Defined in

[types.ts:6](src/types.ts#L6)

___

### TypeOfGuard

Ƭ **TypeOfGuard**<`G`\>: `G` extends [`Guard`](modules.md#guard)<infer P\> ? `P` : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `G` | extends [`Guard`](modules.md#guard)<`any`\> |

#### Defined in

[types.ts:11](src/types.ts#L11)

## Guard Functions

### isArray

▸ **isArray**(`value`): value is any[] \| readonly any[]

**`Example`**

```typescript
  if(isArray(value)) return value.map((e) =>({ e }));
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is any[] \| readonly any[]

`true` if the value is an array

#### Defined in

[is-array.ts:11](src/is-array.ts#L11)

___

### isBoolean

▸ **isBoolean**(`value`): value is boolean

**`Example`**

```typescript
  if(isBoolean(value)) return !value;
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is boolean

`true` if `typeof value` is "boolean"

#### Defined in

[is-boolean.ts:11](src/is-boolean.ts#L11)

___

### isDefined

▸ **isDefined**(`value`): value is null \| Object

**`Example`**

```typescript
  const value: string | undefined = record.get("something");
  if(isDefined(value)) return [value];
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is null \| Object

`true` if the value is defined

#### Defined in

[is-defined.ts:12](src/is-defined.ts#L12)

___

### isNull

▸ **isNull**(`value`): value is null

**`Example`**

```typescript
  if(isNull(value)) return;
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is null

`true` if value is `null`

#### Defined in

[is-null.ts:11](src/is-null.ts#L11)

___

### isNumber

▸ **isNumber**(`value`): value is number

**`Example`**

```typescript
  if(isNumber(value)) return value + 10;
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is number

`true` if `typeof value` is "number"

#### Defined in

[is-number.ts:11](src/is-number.ts#L11)

___

### isObject

▸ **isObject**(`value`): value is Object

**`Example`**

```typescript
  if(isObject(values)) return { ...values, completed:true };
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is Object

`true` if value is **strictly** an instance of **`Object`**

#### Defined in

[is-object.ts:11](src/is-object.ts#L11)

___

### isPresent

▸ **isPresent**(`value`): value is Object

**`Example`**

```typescript
  const value: string | null = localStorage.getItem("something");
  if(isPresent(value)) return [value];
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is Object

`true` if the value is defined and has a value, AKA is not null

#### Defined in

[is-present.ts:12](src/is-present.ts#L12)

___

### isString

▸ **isString**(`value`): value is string

**`Example`**

```typescript
  if(isString(value)) return `${value} - ready`;
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

#### Returns

value is string

`true` if `typeof value` is "string"

#### Defined in

[is-string.ts:11](src/is-string.ts#L11)

___

## Guard Factory Functions

### InstanceOf

▸ **InstanceOf**<`T`, `C`\>(`constructors`): [`Guard`](modules.md#guard)<`T`\>

**`Example`**

```typescript
  const isDate = InstanceOf([Date]);
```

**`Example`**

```typescript
  const isBytes = InstanceOf([Buffer, Uint8Array]);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any` |
| `C` | extends `Constructor`<`any`\>[] = `ConstructorsFromType`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `constructors` | `C` |

#### Returns

[`Guard`](modules.md#guard)<`T`\>

a Guard that checks if a value is instance of one of the constructor passed

#### Defined in

[instance-of.ts:24](src/instance-of.ts#L24)

___

### ValueOf

▸ **ValueOf**<`G`\>(`expectedValues`): [`Guard`](modules.md#guard)<`G`[`number`]\>

**`Example`**

```typescript
  const isCurrency = ValueOf(["USD", "EUR", "GBP"]);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `G` | extends `any`[] \| readonly `any`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `expectedValues` | `G` |

#### Returns

[`Guard`](modules.md#guard)<`G`[`number`]\>

a Guard that checks if a value is **identical** to one of the values passed

#### Defined in

[value-of.ts:11](src/value-of.ts#L11)

___

## High Order Guard Functions

### ArrayOf

▸ **ArrayOf**<`T`, `G`\>(`guards`): [`Guard`](modules.md#guard)<`T`\>

**`Throws`**

When calling the `self` guard in the callback

**`Example`**

```typescript
  const isStringArray = ArrayOf([isString]);
```

**`Example`**

```typescript
  const isStringOrNumberArray = ArrayOf([isString, isNumber]);
```

**`Example`**

```typescript
  type FullNames = (string | FullNames)[];
  const isFullNames = ArrayOf<FullNames>((self) => [isString, self]);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |
| `G` | extends [`Guard`](modules.md#guard)<`any`\>[] = `GuardsFromType`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `guards` | `G` \| (`self`: [`NonCallable`](modules.md#noncallable)<[`Guard`](modules.md#guard)<`T`\>\>) => `G` |

#### Returns

[`Guard`](modules.md#guard)<`T`\>

a `Guard` that checks if every element of an array is one of the guards passed

#### Defined in

[array-of.ts:29](src/array-of.ts#L29)

___

### MaybeOf

▸ **MaybeOf**<`T`, `V`\>(`guard`): [`Guard`](modules.md#guard)<`undefined` \| `T`, `undefined` \| `V`\>

**`Example`**

```typescript
  const isMaybeAge = MaybeOf(isNumber);
  const isPersonTuple: Guard<[string, number | undefined]> = TupleOf([isString, isMaybeAge]);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `V` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `guard` | [`Guard`](modules.md#guard)<`T`, `V`\> |

#### Returns

[`Guard`](modules.md#guard)<`undefined` \| `T`, `undefined` \| `V`\>

a `Guard` that checks that the value is of the type of the guard passed or undefined

#### Defined in

[maybe-of.ts:12](src/maybe-of.ts#L12)

___

### NullableOf

▸ **NullableOf**<`T`, `V`\>(`guard`): [`Guard`](modules.md#guard)<``null`` \| `T`, ``null`` \| `V`\>

**`Example`**

```typescript
  const isNullableAge = NullableOf(isNumber);
  const isPersonTuple: Guard<[string, number | null]> = TupleOf([isString, isNullableAge]);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `V` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `guard` | [`Guard`](modules.md#guard)<`T`, `V`\> |

#### Returns

[`Guard`](modules.md#guard)<``null`` \| `T`, ``null`` \| `V`\>

a `Guard` that checks that the value is of the type of the guard passed or null

#### Defined in

[nullable-of.ts:12](src/nullable-of.ts#L12)

___

### ObjectOf

▸ **ObjectOf**<`T`, `G`\>(`guards`): [`Guard`](modules.md#guard)<`T`\>

**`Throws`**

When calling the `self` guard in the callback

**`Example`**

```typescript
  const isPerson = ObjectOf({
    firstName: isString,
    lastName: isString,
    age: isNumber,
  });
```

**`Example`**

```typescript
  type Person = {
    firstName: string;
    lastName: string;
    age: number;
    spouse: Person | null;
  };

  const isPerson = ObjectOf<Person>((self) => ({
    firstName: isString,
    lastName: isString,
     age: isNumber,
     spouse: OneOf([self, isNull]),
  }));
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `TypeFromGuards`<`G`\> |
| `G` | extends `Object` = `GuardsFromType`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `guards` | `G` \| (`self`: [`NonCallable`](modules.md#noncallable)<[`Guard`](modules.md#guard)<`T`\>\>) => `G` |

#### Returns

[`Guard`](modules.md#guard)<`T`\>

a `Guard` that checks if the value respect the structure described by the guard object passed

#### Defined in

[object-of.ts:67](src/object-of.ts#L67)

___

### OneOf

▸ **OneOf**<`T`, `G`\>(`guards`): [`Guard`](modules.md#guard)<`T`\>

**`Throws`**

When calling the `self` guard in the callback

**`Example`**

```typescript
      const isGrade = OneOf([isString, isNumber]);
```

**`Example`**

```typescript
    type Grades = string | number | { [k: string]: Grades };
    const isGrades = OneOf<Grades>((self) => [
      isString,
      isNumber,
      RecordOf([self]),
    ]);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any` |
| `G` | extends [`Guard`](modules.md#guard)<`any`\>[] = `GuardsFromType`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `guards` | `G` \| (`self`: [`NonCallable`](modules.md#noncallable)<[`Guard`](modules.md#guard)<`T`\>\>) => `G` |

#### Returns

[`Guard`](modules.md#guard)<`T`\>

a `Guard` that checks if the value is of one of the passed guards types

#### Defined in

[one-of.ts:25](src/one-of.ts#L25)

___

### OptionalOf

▸ **OptionalOf**<`T`, `V`\>(`guard`): [`OptionalGuard`](modules.md#optionalguard)<`T`, `V`\>

**`Description`**

This returns a contextual guard that allows keyed High Order Guards, I.E: TupleOf, that the key might not be present.

**`Example`**

```typescript
  const isOptionalAge = OptionalOf(isNumber);
  const isPersonTuple: Guard<[string, number?]> = TupleOf([isString, isOptionalAge]);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `V` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `guard` | [`Guard`](modules.md#guard)<`T`, `V`\> |

#### Returns

[`OptionalGuard`](modules.md#optionalguard)<`T`, `V`\>

a `OptionalGuard` of the same type as the guard passed

#### Defined in

[optional-of.ts:16](src/optional-of.ts#L16)

___

### RecordOf

▸ **RecordOf**<`T`, `G`\>(`guards`): [`Guard`](modules.md#guard)<`T`\>

**`Throws`**

When calling the `self` guard in the callback

**`Example`**

```typescript
    const isGrades = RecordOf([isNumber]);
```

**`Example`**

```typescript
  type Grades = { [name: string]: number | Grades };
  const isGrades = RecordOf<Grades>((self) => [isNumber, self]);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `TypeFromGuards`<`G`\> |
| `G` | extends [`Guard`](modules.md#guard)<`any`\>[] = `GuardsFromType`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `guards` | `G` \| (`self`: [`NonCallable`](modules.md#noncallable)<[`Guard`](modules.md#guard)<`T`\>\>) => `G` |

#### Returns

[`Guard`](modules.md#guard)<`T`\>

a `Guard` that checks if the values of the object passed respect the types of the guards passed

#### Defined in

[record-of.ts:22](src/record-of.ts#L22)

___

### TupleOf

▸ **TupleOf**<`T`, `G`\>(`guards`): [`Guard`](modules.md#guard)<`T`\>

**`Throws`**

When calling the `self` guard in the callback

**`Example`**

```typescript
  const isPersonTuple = TupleOf([isString, isNumber]);
```

**`Example`**

```typescript
  type Person = [string, number, Person | null];
  const isPersonTuple = TupleOf<Person>((self) => [
    isString,
    isNumber,
    OneOf([self, isNull]),
  ]);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`any`] |
| `G` | extends [[`Guard`](modules.md#guard)<`any`\>, ...Guard<any\>[]] = `GuardsFromType`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `guards` | `OptionalRequiredGuards`<`G`\> \| (`self`: [`NonCallable`](modules.md#noncallable)<[`Guard`](modules.md#guard)<`T`\>\>) => `OptionalRequiredGuards`<`G`\> |

#### Returns

[`Guard`](modules.md#guard)<`T`\>

a `Guard` that checks if the values of the tuple passed respect the types of the guards passed

#### Defined in

[tuple-of.ts:71](src/tuple-of.ts#L71)
