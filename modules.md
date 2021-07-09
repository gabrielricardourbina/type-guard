# @gabrielurbina/type-guard - v0.1.1

## Table of contents

### Type aliases

- [Guard](modules.md#guard)
- [Maybe](modules.md#maybe)
- [Nullable](modules.md#nullable)
- [OptionalGuard](modules.md#optionalguard)
- [TypeOfGuard](modules.md#typeofguard)

### Guard Variables

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

## Type aliases

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

[types.ts:15](src/types.ts#L15)

___

### Nullable

Ƭ **Nullable**<`T`\>: `T` \| ``null``

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types.ts:16](src/types.ts#L16)

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

## Guard Variables

### isArray

• `Const` **isArray**: [`Guard`](modules.md#guard)<`any`[] \| readonly `any`[]\>

**`returns`** `true` if the value is an array

**`example`**
```typescript
  if(isArray(value)) return value.map((e) =>({ e }));
```

#### Defined in

[is-array.ts:11](src/is-array.ts#L11)

___

### isBoolean

• `Const` **isBoolean**: [`Guard`](modules.md#guard)<`boolean`\>

**`returns`** `true` if `typeof value` is "boolean"

**`example`**
```typescript
  if(isBoolean(value)) return !value;
```

#### Defined in

[is-boolean.ts:11](src/is-boolean.ts#L11)

___

### isDefined

• `Const` **isDefined**: [`Guard`](modules.md#guard)<{} \| ``null``\>

**`returns`** `true` if the value is defined

**`example`**
```typescript
  const value: string | undefined = record.get("something");
  if(isDefined(value)) return [value];
```

#### Defined in

[is-defined.ts:12](src/is-defined.ts#L12)

___

### isNull

• `Const` **isNull**: [`Guard`](modules.md#guard)<``null``\>

**`returns`** `true` if value is `null`

**`example`**
```typescript
  if(isNull(value)) return;
```

#### Defined in

[is-null.ts:11](src/is-null.ts#L11)

___

### isNumber

• `Const` **isNumber**: [`Guard`](modules.md#guard)<`number`\>

**`returns`** `true` if `typeof value` is "number"

**`example`**
```typescript
  if(isNumber(value)) return value + 10;
```

#### Defined in

[is-number.ts:11](src/is-number.ts#L11)

___

### isObject

• `Const` **isObject**: [`Guard`](modules.md#guard)<{ [K in any]?: unknown}\>

**`returns`** `true` if value is **strictly** an instance of **`Object`**

**`example`**
```typescript
  if(isObject(values)) return { ...values, completed:true };
```

#### Defined in

[is-object.ts:11](src/is-object.ts#L11)

___

### isPresent

• `Const` **isPresent**: [`Guard`](modules.md#guard)<`Object`\>

**`returns`** `true` if the value is defined and has a value, AKA is not null

**`example`**
```typescript
  const value: string | null = localStorage.getItem("something");
  if(isPresent(value)) return [value];
```

#### Defined in

[is-present.ts:12](src/is-present.ts#L12)

___

### isString

• `Const` **isString**: [`Guard`](modules.md#guard)<`string`\>

**`returns`** `true` if `typeof value` is "string"

**`example`**
```typescript
  if(isString(value)) return `${value} - ready`;
```

#### Defined in

[is-string.ts:11](src/is-string.ts#L11)

## Guard Factory Functions

### InstanceOf

▸ `Const` **InstanceOf**<`T`, `C`\>(`constructors`): [`Guard`](modules.md#guard)<`T`, `unknown`\>

**`example`**
```typescript
  const isDate = InstanceOf([Date]);
```

**`example`**
```typescript
  const isBytes = InstanceOf([Buffer, Uint8Array]);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any` |
| `C` | extends `Constructor`<`any`\>[]`ConstructorsFromType`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `constructors` | `C` |

#### Returns

[`Guard`](modules.md#guard)<`T`, `unknown`\>

a Guard that checks if a value is instance of one of the constructor passed

#### Defined in

[instance-of.ts:24](src/instance-of.ts#L24)

___

### ValueOf

▸ `Const` **ValueOf**<`T`\>(`expectedValues`): (`value`: `unknown`) => value is T

**`example`**
```typescript
  const isCurrency = ValueOf(["USD", "EUR", "GBP"] as const);
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `expectedValues` | readonly `T`[] \| `T`[] |

#### Returns

`fn`

a Guard that checks if a value is **identical** to one of the values passed

▸ (`value`): value is T

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |

##### Returns

value is T

#### Defined in

[value-of.ts:9](src/value-of.ts#L9)

___

## High Order Guard Functions

### ArrayOf

▸ `Const` **ArrayOf**<`T`, `G`\>(`guards`): [`Guard`](modules.md#guard)<`T`, `unknown`\>

**`throws`** {RecursiveError} When calling the `self` guard in the callback

**`example`**
```typescript
  const isStringArray = ArrayOf([isString]);
```

**`example`**
```typescript
  const isStringOrNumberArray = ArrayOf([isString, isNumber]);
```

**`example`**
```typescript
  type FullNames = (string | FullNames)[];
  const isFullNames = ArrayOf<FullNames>((self) => [isString, self]);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |
| `G` | extends [`Guard`](modules.md#guard)<`any`, `unknown`\>[]`GuardsFromType`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `guards` | `G` \| (`self`: [`Guard`](modules.md#guard)<`T`, `unknown`\>) => `G` |

#### Returns

[`Guard`](modules.md#guard)<`T`, `unknown`\>

a `Guard` that checks if every element of an array is one of the guards passed

#### Defined in

[array-of.ts:30](src/array-of.ts#L30)

___

### MaybeOf

▸ `Const` **MaybeOf**<`T`, `V`\>(`guard`): [`Guard`](modules.md#guard)<`undefined` \| `T`, `undefined` \| `V`\>

**`example`**
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

▸ `Const` **NullableOf**<`T`, `V`\>(`guard`): [`Guard`](modules.md#guard)<``null`` \| `T`, ``null`` \| `V`\>

**`example`**
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

▸ `Const` **ObjectOf**<`T`, `G`\>(`guards`): [`Guard`](modules.md#guard)<`T`, `unknown`\>

**`throws`** {RecursiveError} When calling the `self` guard in the callback

**`example`**
```typescript
  const isPerson = ObjectOf({
    firstName: isString,
    lastName: isString,
    age: isNumber,
  });
```

**`example`**
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
| `G` | extends `Object``GuardsFromType`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `guards` | `G` \| (`self`: [`Guard`](modules.md#guard)<`T`, `unknown`\>) => `G` |

#### Returns

[`Guard`](modules.md#guard)<`T`, `unknown`\>

a `Guard` that checks if the value respect the structure described by the guard object passed

#### Defined in

[object-of.ts:63](src/object-of.ts#L63)

___

### OneOf

▸ `Const` **OneOf**<`T`, `G`\>(`guards`): [`Guard`](modules.md#guard)<`T`, `unknown`\>

**`throws`** {RecursiveError} When calling the `self` guard in the callback

**`example`**
```typescript
      const isGrade = OneOf([isString, isNumber]);
```

**`example`**
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
| `G` | extends [`Guard`](modules.md#guard)<`any`, `unknown`\>[]`GuardsFromType`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `guards` | `G` \| (`self`: [`Guard`](modules.md#guard)<`T`, `unknown`\>) => `G` |

#### Returns

[`Guard`](modules.md#guard)<`T`, `unknown`\>

a `Guard` that checks if the value is of one of the passed guards types

#### Defined in

[one-of.ts:26](src/one-of.ts#L26)

___

### OptionalOf

▸ `Const` **OptionalOf**<`T`, `V`\>(`guard`): [`OptionalGuard`](modules.md#optionalguard)<`T`, `V`\>

**`description`**
This returns a contextual guard that allows keyed High Order Guards, I.E: TupleOf, that the key might not be present.

**`example`**
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

▸ `Const` **RecordOf**<`T`, `G`\>(`guards`): [`Guard`](modules.md#guard)<`T`, `unknown`\>

**`throws`** {RecursiveError} When calling the `self` guard in the callback

**`example`**
```typescript
    const isGrades = RecordOf([isNumber]);
```

**`example`**
```typescript
  type Grades = { [name: string]: number | Grades };
  const isGrades = RecordOf<Grades>((self) => [isNumber, self]);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `TypeFromGuards`<`G`\> |
| `G` | extends [`Guard`](modules.md#guard)<`any`, `unknown`\>[]`GuardsFromType`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `guards` | `G` \| (`self`: [`Guard`](modules.md#guard)<`T`, `unknown`\>) => `G` |

#### Returns

[`Guard`](modules.md#guard)<`T`, `unknown`\>

a `Guard` that checks if the values of the object passed respect the types of the guards passed

#### Defined in

[record-of.ts:23](src/record-of.ts#L23)

___

### TupleOf

▸ `Const` **TupleOf**<`T`, `G`\>(`guards`): [`Guard`](modules.md#guard)<`T`, `unknown`\>

**`throws`** {RecursiveError} When calling the `self` guard in the callback

**`example`**
```typescript
  const isPersonTuple = TupleOf([isString, isNumber]);
```

**`example`**
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
| `G` | extends [[`Guard`](modules.md#guard)<`any`, `unknown`\>, ...Guard<any, unknown\>[]]`GuardsFromType`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `guards` | `OptionalRequiredGuards`<`G`\> \| (`self`: [`Guard`](modules.md#guard)<`T`, `unknown`\>) => `OptionalRequiredGuards`<`G`\> |

#### Returns

[`Guard`](modules.md#guard)<`T`, `unknown`\>

a `Guard` that checks if the values of the tuple passed respect the types of the guards passed

#### Defined in

[tuple-of.ts:67](src/tuple-of.ts#L67)
