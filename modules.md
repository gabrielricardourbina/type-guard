# @gabrielurbina/type-guard - v0.0.8

## Table of contents

### Type aliases

- [Guard](modules.md#guard)
- [TypeOfGuard](modules.md#typeofguard)

### Guard Functions

- [isArray](modules.md#isarray)
- [isBoolean](modules.md#isboolean)
- [isNull](modules.md#isnull)
- [isNumber](modules.md#isnumber)
- [isObject](modules.md#isobject)
- [isString](modules.md#isstring)

### Guard Factory Functions

- [InstanceOf](modules.md#instanceof)
- [ValueOf](modules.md#valueof)

### High Order Guard Functions

- [ArrayOf](modules.md#arrayof)
- [ObjectOf](modules.md#objectof)
- [OneOf](modules.md#oneof)
- [RecordOf](modules.md#recordof)
- [TupleOf](modules.md#tupleof)

## Type aliases

### Guard

Ƭ **Guard**<T, V\>: (`v`: V) => v is T

#### Type parameters:

| Name | Type | Default |
| :------ | :------ | :------ |
| `T` | V | - |
| `V` | - | *unknown* |

#### Type declaration:

▸ (`v`: V): v is T

#### Parameters:

| Name | Type |
| :------ | :------ |
| `v` | V |

**Returns:** v is T

Defined in: [types.ts:1](src/types.ts#L1)

___

### TypeOfGuard

Ƭ **TypeOfGuard**<G\>: G *extends* [*Guard*](modules.md#guard)<*infer* P\> ? P : *never*

#### Type parameters:

| Name | Type |
| :------ | :------ |
| `G` | [*Guard*](modules.md#guard)<any\> |

Defined in: [types.ts:3](src/types.ts#L3)

## Guard Functions

### isArray

▸ `Const`**isArray**(`v`: *unknown*): v is any[] \| readonly any[]

**`example`** 
```typescript
  if(isArray(value)) return value.map((e) =>({ e }));
```

#### Parameters:

| Name | Type |
| :------ | :------ |
| `v` | *unknown* |

**Returns:** v is any[] \| readonly any[]

`true` if the value is an array

Defined in: [is-array.ts:11](src/is-array.ts#L11)

___

### isBoolean

▸ `Const`**isBoolean**(`v`: *unknown*): v is boolean

**`example`** 
```typescript
  if(isBoolean(value)) return !value;
```

#### Parameters:

| Name | Type |
| :------ | :------ |
| `v` | *unknown* |

**Returns:** v is boolean

`true` if `typeof value` is "boolean"

Defined in: [is-boolean.ts:11](src/is-boolean.ts#L11)

___

### isNull

▸ `Const`**isNull**(`v`: *unknown*): v is null

**`example`** 
```typescript
  if(isNull(value)) return;
```

#### Parameters:

| Name | Type |
| :------ | :------ |
| `v` | *unknown* |

**Returns:** v is null

`true` if value is `null`

Defined in: [is-null.ts:11](src/is-null.ts#L11)

___

### isNumber

▸ `Const`**isNumber**(`v`: *unknown*): v is number

**`example`** 
```typescript
  if(isNumber(value)) return value + 10;
```

#### Parameters:

| Name | Type |
| :------ | :------ |
| `v` | *unknown* |

**Returns:** v is number

`true` if `typeof value` is "number"

Defined in: [is-number.ts:11](src/is-number.ts#L11)

___

### isObject

▸ `Const`**isObject**(`v`: *unknown*): v is object

**`example`** 
```typescript
  if(isObject(values)) return { ...values, completed:true };
```

#### Parameters:

| Name | Type |
| :------ | :------ |
| `v` | *unknown* |

**Returns:** v is object

`true` if value is **strictly** an instance of **`Object`**

Defined in: [is-object.ts:11](src/is-object.ts#L11)

___

### isString

▸ `Const`**isString**(`v`: *unknown*): v is string

**`example`** 
```typescript
  if(isString(value)) return `${value} - ready`;
```

#### Parameters:

| Name | Type |
| :------ | :------ |
| `v` | *unknown* |

**Returns:** v is string

`true` if `typeof value` is "string"

Defined in: [is-string.ts:11](src/is-string.ts#L11)

___

## Guard Factory Functions

### InstanceOf

▸ `Const`**InstanceOf**<T, C\>(`constructors`: C): [*Guard*](modules.md#guard)<T, unknown\>

**`example`** 
```typescript
  const isDate = InstanceOf([Date]);
```

**`example`** 
```typescript
  const isBytes = InstanceOf([Buffer, Uint8Array]);
```

#### Type parameters:

| Name | Type | Default |
| :------ | :------ | :------ |
| `T` | *any* | - |
| `C` | *Constructor*<any\>[] | *ConstructorsFromType*<T\> |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `constructors` | C |

**Returns:** [*Guard*](modules.md#guard)<T, unknown\>

a Guard that checks if a value is instance of one of the constructor passed

Defined in: [instance-of.ts:24](src/instance-of.ts#L24)

___

### ValueOf

▸ `Const`**ValueOf**<T\>(`expectedValues`: readonly T[] \| T[]): *function*

**`example`** 
```typescript
  const isCurrency = ValueOf(["USD", "EUR", "GBP"] as const);
```

#### Type parameters:

| Name |
| :------ |
| `T` |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `expectedValues` | readonly T[] \| T[] |

**Returns:** (`value`: *unknown*) => value is T

a Guard that checks if a value is **identical** to one of the values passed

Defined in: [value-of.ts:9](src/value-of.ts#L9)

___

## High Order Guard Functions

### ArrayOf

▸ `Const`**ArrayOf**<T, G\>(`guards`: G \| (`self`: [*Guard*](modules.md#guard)<T, unknown\>) => G): [*Guard*](modules.md#guard)<T, unknown\>

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

#### Type parameters:

| Name | Type | Default |
| :------ | :------ | :------ |
| `T` | *any*[] | - |
| `G` | [*Guard*](modules.md#guard)<any, unknown\>[] | *GuardsFromType*<T\> |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `guards` | G \| (`self`: [*Guard*](modules.md#guard)<T, unknown\>) => G |

**Returns:** [*Guard*](modules.md#guard)<T, unknown\>

a `Guard` that checks if every element of an array is one of the guards passed

Defined in: [array-of.ts:30](src/array-of.ts#L30)

___

### ObjectOf

▸ `Const`**ObjectOf**<T, G\>(`guards`: G \| (`self`: [*Guard*](modules.md#guard)<T, unknown\>) => G): [*Guard*](modules.md#guard)<T, unknown\>

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

#### Type parameters:

| Name | Type | Default |
| :------ | :------ | :------ |
| `T` | *TypeFromGuards*<G\> | - |
| `G` | *object* | *GuardsFromType*<T\> |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `guards` | G \| (`self`: [*Guard*](modules.md#guard)<T, unknown\>) => G |

**Returns:** [*Guard*](modules.md#guard)<T, unknown\>

a `Guard` that checks if the value respect the structure described by the guard object passed

Defined in: [object-of.ts:40](src/object-of.ts#L40)

___

### OneOf

▸ `Const`**OneOf**<T, G\>(`guards`: G \| (`self`: [*Guard*](modules.md#guard)<T, unknown\>) => G): [*Guard*](modules.md#guard)<T, unknown\>

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

#### Type parameters:

| Name | Type | Default |
| :------ | :------ | :------ |
| `T` | *any* | - |
| `G` | [*Guard*](modules.md#guard)<any, unknown\>[] | *GuardsFromType*<T\> |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `guards` | G \| (`self`: [*Guard*](modules.md#guard)<T, unknown\>) => G |

**Returns:** [*Guard*](modules.md#guard)<T, unknown\>

a `Guard` that checks if the value is of one of the passed guards types

Defined in: [one-of.ts:26](src/one-of.ts#L26)

___

### RecordOf

▸ `Const`**RecordOf**<T, G\>(`guards`: G \| (`self`: [*Guard*](modules.md#guard)<T, unknown\>) => G): [*Guard*](modules.md#guard)<T, unknown\>

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

#### Type parameters:

| Name | Type | Default |
| :------ | :------ | :------ |
| `T` | *TypeFromGuards*<G\> | - |
| `G` | [*Guard*](modules.md#guard)<any, unknown\>[] | *GuardsFromType*<T\> |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `guards` | G \| (`self`: [*Guard*](modules.md#guard)<T, unknown\>) => G |

**Returns:** [*Guard*](modules.md#guard)<T, unknown\>

a `Guard` that checks if the values of the object passed respect the types of the guards passed

Defined in: [record-of.ts:23](src/record-of.ts#L23)

___

### TupleOf

▸ `Const`**TupleOf**<T, G\>(`guards`: G \| (`self`: [*Guard*](modules.md#guard)<T, unknown\>) => G): [*Guard*](modules.md#guard)<T, unknown\>

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

#### Type parameters:

| Name | Type | Default |
| :------ | :------ | :------ |
| `T` | *TypeFromGuards*<G\> | - |
| `G` | [[*Guard*](modules.md#guard)<any, unknown\>, ...Guard<any, unknown\>[]] | *GuardsFromType*<T\> |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `guards` | G \| (`self`: [*Guard*](modules.md#guard)<T, unknown\>) => G |

**Returns:** [*Guard*](modules.md#guard)<T, unknown\>

a `Guard` that checks if the values of the tuple passed respect the types of the guards passed

Defined in: [tuple-of.ts:32](src/tuple-of.ts#L32)
