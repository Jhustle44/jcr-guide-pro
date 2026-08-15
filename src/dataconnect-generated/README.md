# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCategory*](#getcategory)
  - [*ListCategories*](#listcategories)
  - [*GetDevice*](#getdevice)
  - [*ListDevices*](#listdevices)
  - [*GetGuide*](#getguide)
  - [*ListGuides*](#listguides)
  - [*GetPart*](#getpart)
  - [*ListParts*](#listparts)
  - [*GetStep*](#getstep)
  - [*ListSteps*](#liststeps)
  - [*GetMyBookmarks*](#getmybookmarks)
  - [*GetBookmark*](#getbookmark)
- [**Mutations**](#mutations)
  - [*CreateCategory*](#createcategory)
  - [*UpsertCategory*](#upsertcategory)
  - [*DeleteCategory*](#deletecategory)
  - [*UpdateCategory*](#updatecategory)
  - [*CreateDevice*](#createdevice)
  - [*UpsertDevice*](#upsertdevice)
  - [*DeleteDevice*](#deletedevice)
  - [*UpdateDevice*](#updatedevice)
  - [*CreateGuide*](#createguide)
  - [*UpsertGuide*](#upsertguide)
  - [*DeleteGuide*](#deleteguide)
  - [*UpdateGuide*](#updateguide)
  - [*CreatePart*](#createpart)
  - [*UpsertPart*](#upsertpart)
  - [*DeletePart*](#deletepart)
  - [*UpdatePart*](#updatepart)
  - [*CreateStep*](#createstep)
  - [*UpsertStep*](#upsertstep)
  - [*DeleteStep*](#deletestep)
  - [*UpdateStep*](#updatestep)
  - [*CreateBookmark*](#createbookmark)
  - [*UpsertBookmark*](#upsertbookmark)
  - [*DeleteBookmark*](#deletebookmark)
  - [*UpdateBookmark*](#updatebookmark)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCategory
You can execute the `GetCategory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCategory(vars: GetCategoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetCategoryData, GetCategoryVariables>;

interface GetCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCategoryVariables): QueryRef<GetCategoryData, GetCategoryVariables>;
}
export const getCategoryRef: GetCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCategory(dc: DataConnect, vars: GetCategoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetCategoryData, GetCategoryVariables>;

interface GetCategoryRef {
  ...
  (dc: DataConnect, vars: GetCategoryVariables): QueryRef<GetCategoryData, GetCategoryVariables>;
}
export const getCategoryRef: GetCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCategoryRef:
```typescript
const name = getCategoryRef.operationName;
console.log(name);
```

### Variables
The `GetCategory` query requires an argument of type `GetCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCategoryVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetCategory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCategoryData {
  category?: {
    name: string;
  };
}
```
### Using `GetCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCategory, GetCategoryVariables } from '@dataconnect/generated';

// The `GetCategory` query requires an argument of type `GetCategoryVariables`:
const getCategoryVars: GetCategoryVariables = {
  id: ..., 
};

// Call the `getCategory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCategory(getCategoryVars);
// Variables can be defined inline as well.
const { data } = await getCategory({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCategory(dataConnect, getCategoryVars);

console.log(data.category);

// Or, you can use the `Promise` API.
getCategory(getCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.category);
});
```

### Using `GetCategory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCategoryRef, GetCategoryVariables } from '@dataconnect/generated';

// The `GetCategory` query requires an argument of type `GetCategoryVariables`:
const getCategoryVars: GetCategoryVariables = {
  id: ..., 
};

// Call the `getCategoryRef()` function to get a reference to the query.
const ref = getCategoryRef(getCategoryVars);
// Variables can be defined inline as well.
const ref = getCategoryRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCategoryRef(dataConnect, getCategoryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.category);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.category);
});
```

## ListCategories
You can execute the `ListCategories` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listCategories(options?: ExecuteQueryOptions): QueryPromise<ListCategoriesData, undefined>;

interface ListCategoriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCategoriesData, undefined>;
}
export const listCategoriesRef: ListCategoriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCategories(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCategoriesData, undefined>;

interface ListCategoriesRef {
  ...
  (dc: DataConnect): QueryRef<ListCategoriesData, undefined>;
}
export const listCategoriesRef: ListCategoriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCategoriesRef:
```typescript
const name = listCategoriesRef.operationName;
console.log(name);
```

### Variables
The `ListCategories` query has no variables.
### Return Type
Recall that executing the `ListCategories` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCategoriesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCategoriesData {
  categories: ({
    name: string;
  })[];
}
```
### Using `ListCategories`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCategories } from '@dataconnect/generated';


// Call the `listCategories()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCategories();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCategories(dataConnect);

console.log(data.categories);

// Or, you can use the `Promise` API.
listCategories().then((response) => {
  const data = response.data;
  console.log(data.categories);
});
```

### Using `ListCategories`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCategoriesRef } from '@dataconnect/generated';


// Call the `listCategoriesRef()` function to get a reference to the query.
const ref = listCategoriesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCategoriesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.categories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.categories);
});
```

## GetDevice
You can execute the `GetDevice` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getDevice(vars: GetDeviceVariables, options?: ExecuteQueryOptions): QueryPromise<GetDeviceData, GetDeviceVariables>;

interface GetDeviceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDeviceVariables): QueryRef<GetDeviceData, GetDeviceVariables>;
}
export const getDeviceRef: GetDeviceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDevice(dc: DataConnect, vars: GetDeviceVariables, options?: ExecuteQueryOptions): QueryPromise<GetDeviceData, GetDeviceVariables>;

interface GetDeviceRef {
  ...
  (dc: DataConnect, vars: GetDeviceVariables): QueryRef<GetDeviceData, GetDeviceVariables>;
}
export const getDeviceRef: GetDeviceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDeviceRef:
```typescript
const name = getDeviceRef.operationName;
console.log(name);
```

### Variables
The `GetDevice` query requires an argument of type `GetDeviceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetDeviceVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetDevice` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDeviceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetDeviceData {
  device?: {
    modelName: string;
  };
}
```
### Using `GetDevice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDevice, GetDeviceVariables } from '@dataconnect/generated';

// The `GetDevice` query requires an argument of type `GetDeviceVariables`:
const getDeviceVars: GetDeviceVariables = {
  id: ..., 
};

// Call the `getDevice()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDevice(getDeviceVars);
// Variables can be defined inline as well.
const { data } = await getDevice({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDevice(dataConnect, getDeviceVars);

console.log(data.device);

// Or, you can use the `Promise` API.
getDevice(getDeviceVars).then((response) => {
  const data = response.data;
  console.log(data.device);
});
```

### Using `GetDevice`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDeviceRef, GetDeviceVariables } from '@dataconnect/generated';

// The `GetDevice` query requires an argument of type `GetDeviceVariables`:
const getDeviceVars: GetDeviceVariables = {
  id: ..., 
};

// Call the `getDeviceRef()` function to get a reference to the query.
const ref = getDeviceRef(getDeviceVars);
// Variables can be defined inline as well.
const ref = getDeviceRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDeviceRef(dataConnect, getDeviceVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.device);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.device);
});
```

## ListDevices
You can execute the `ListDevices` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listDevices(options?: ExecuteQueryOptions): QueryPromise<ListDevicesData, undefined>;

interface ListDevicesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDevicesData, undefined>;
}
export const listDevicesRef: ListDevicesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listDevices(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListDevicesData, undefined>;

interface ListDevicesRef {
  ...
  (dc: DataConnect): QueryRef<ListDevicesData, undefined>;
}
export const listDevicesRef: ListDevicesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listDevicesRef:
```typescript
const name = listDevicesRef.operationName;
console.log(name);
```

### Variables
The `ListDevices` query has no variables.
### Return Type
Recall that executing the `ListDevices` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListDevicesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListDevicesData {
  devices: ({
    modelName: string;
  })[];
}
```
### Using `ListDevices`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listDevices } from '@dataconnect/generated';


// Call the `listDevices()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listDevices();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listDevices(dataConnect);

console.log(data.devices);

// Or, you can use the `Promise` API.
listDevices().then((response) => {
  const data = response.data;
  console.log(data.devices);
});
```

### Using `ListDevices`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listDevicesRef } from '@dataconnect/generated';


// Call the `listDevicesRef()` function to get a reference to the query.
const ref = listDevicesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listDevicesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.devices);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.devices);
});
```

## GetGuide
You can execute the `GetGuide` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getGuide(vars: GetGuideVariables, options?: ExecuteQueryOptions): QueryPromise<GetGuideData, GetGuideVariables>;

interface GetGuideRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGuideVariables): QueryRef<GetGuideData, GetGuideVariables>;
}
export const getGuideRef: GetGuideRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getGuide(dc: DataConnect, vars: GetGuideVariables, options?: ExecuteQueryOptions): QueryPromise<GetGuideData, GetGuideVariables>;

interface GetGuideRef {
  ...
  (dc: DataConnect, vars: GetGuideVariables): QueryRef<GetGuideData, GetGuideVariables>;
}
export const getGuideRef: GetGuideRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getGuideRef:
```typescript
const name = getGuideRef.operationName;
console.log(name);
```

### Variables
The `GetGuide` query requires an argument of type `GetGuideVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetGuideVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetGuide` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetGuideData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetGuideData {
  guide?: {
    title: string;
  };
}
```
### Using `GetGuide`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getGuide, GetGuideVariables } from '@dataconnect/generated';

// The `GetGuide` query requires an argument of type `GetGuideVariables`:
const getGuideVars: GetGuideVariables = {
  id: ..., 
};

// Call the `getGuide()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getGuide(getGuideVars);
// Variables can be defined inline as well.
const { data } = await getGuide({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getGuide(dataConnect, getGuideVars);

console.log(data.guide);

// Or, you can use the `Promise` API.
getGuide(getGuideVars).then((response) => {
  const data = response.data;
  console.log(data.guide);
});
```

### Using `GetGuide`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getGuideRef, GetGuideVariables } from '@dataconnect/generated';

// The `GetGuide` query requires an argument of type `GetGuideVariables`:
const getGuideVars: GetGuideVariables = {
  id: ..., 
};

// Call the `getGuideRef()` function to get a reference to the query.
const ref = getGuideRef(getGuideVars);
// Variables can be defined inline as well.
const ref = getGuideRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getGuideRef(dataConnect, getGuideVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.guide);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.guide);
});
```

## ListGuides
You can execute the `ListGuides` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listGuides(options?: ExecuteQueryOptions): QueryPromise<ListGuidesData, undefined>;

interface ListGuidesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGuidesData, undefined>;
}
export const listGuidesRef: ListGuidesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listGuides(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListGuidesData, undefined>;

interface ListGuidesRef {
  ...
  (dc: DataConnect): QueryRef<ListGuidesData, undefined>;
}
export const listGuidesRef: ListGuidesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listGuidesRef:
```typescript
const name = listGuidesRef.operationName;
console.log(name);
```

### Variables
The `ListGuides` query has no variables.
### Return Type
Recall that executing the `ListGuides` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListGuidesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListGuidesData {
  guides: ({
    title: string;
  })[];
}
```
### Using `ListGuides`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listGuides } from '@dataconnect/generated';


// Call the `listGuides()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listGuides();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listGuides(dataConnect);

console.log(data.guides);

// Or, you can use the `Promise` API.
listGuides().then((response) => {
  const data = response.data;
  console.log(data.guides);
});
```

### Using `ListGuides`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listGuidesRef } from '@dataconnect/generated';


// Call the `listGuidesRef()` function to get a reference to the query.
const ref = listGuidesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listGuidesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.guides);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.guides);
});
```

## GetPart
You can execute the `GetPart` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPart(vars: GetPartVariables, options?: ExecuteQueryOptions): QueryPromise<GetPartData, GetPartVariables>;

interface GetPartRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPartVariables): QueryRef<GetPartData, GetPartVariables>;
}
export const getPartRef: GetPartRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPart(dc: DataConnect, vars: GetPartVariables, options?: ExecuteQueryOptions): QueryPromise<GetPartData, GetPartVariables>;

interface GetPartRef {
  ...
  (dc: DataConnect, vars: GetPartVariables): QueryRef<GetPartData, GetPartVariables>;
}
export const getPartRef: GetPartRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPartRef:
```typescript
const name = getPartRef.operationName;
console.log(name);
```

### Variables
The `GetPart` query requires an argument of type `GetPartVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPartVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetPart` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPartData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPartData {
  part?: {
    partName: string;
  };
}
```
### Using `GetPart`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPart, GetPartVariables } from '@dataconnect/generated';

// The `GetPart` query requires an argument of type `GetPartVariables`:
const getPartVars: GetPartVariables = {
  id: ..., 
};

// Call the `getPart()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPart(getPartVars);
// Variables can be defined inline as well.
const { data } = await getPart({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPart(dataConnect, getPartVars);

console.log(data.part);

// Or, you can use the `Promise` API.
getPart(getPartVars).then((response) => {
  const data = response.data;
  console.log(data.part);
});
```

### Using `GetPart`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPartRef, GetPartVariables } from '@dataconnect/generated';

// The `GetPart` query requires an argument of type `GetPartVariables`:
const getPartVars: GetPartVariables = {
  id: ..., 
};

// Call the `getPartRef()` function to get a reference to the query.
const ref = getPartRef(getPartVars);
// Variables can be defined inline as well.
const ref = getPartRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPartRef(dataConnect, getPartVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.part);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.part);
});
```

## ListParts
You can execute the `ListParts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listParts(options?: ExecuteQueryOptions): QueryPromise<ListPartsData, undefined>;

interface ListPartsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPartsData, undefined>;
}
export const listPartsRef: ListPartsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listParts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPartsData, undefined>;

interface ListPartsRef {
  ...
  (dc: DataConnect): QueryRef<ListPartsData, undefined>;
}
export const listPartsRef: ListPartsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPartsRef:
```typescript
const name = listPartsRef.operationName;
console.log(name);
```

### Variables
The `ListParts` query has no variables.
### Return Type
Recall that executing the `ListParts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPartsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPartsData {
  parts: ({
    partName: string;
  })[];
}
```
### Using `ListParts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listParts } from '@dataconnect/generated';


// Call the `listParts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listParts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listParts(dataConnect);

console.log(data.parts);

// Or, you can use the `Promise` API.
listParts().then((response) => {
  const data = response.data;
  console.log(data.parts);
});
```

### Using `ListParts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPartsRef } from '@dataconnect/generated';


// Call the `listPartsRef()` function to get a reference to the query.
const ref = listPartsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPartsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.parts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.parts);
});
```

## GetStep
You can execute the `GetStep` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStep(vars: GetStepVariables, options?: ExecuteQueryOptions): QueryPromise<GetStepData, GetStepVariables>;

interface GetStepRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStepVariables): QueryRef<GetStepData, GetStepVariables>;
}
export const getStepRef: GetStepRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStep(dc: DataConnect, vars: GetStepVariables, options?: ExecuteQueryOptions): QueryPromise<GetStepData, GetStepVariables>;

interface GetStepRef {
  ...
  (dc: DataConnect, vars: GetStepVariables): QueryRef<GetStepData, GetStepVariables>;
}
export const getStepRef: GetStepRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStepRef:
```typescript
const name = getStepRef.operationName;
console.log(name);
```

### Variables
The `GetStep` query requires an argument of type `GetStepVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStepVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetStep` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStepData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetStepData {
  step?: {
    instructionText: string;
  };
}
```
### Using `GetStep`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStep, GetStepVariables } from '@dataconnect/generated';

// The `GetStep` query requires an argument of type `GetStepVariables`:
const getStepVars: GetStepVariables = {
  id: ..., 
};

// Call the `getStep()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStep(getStepVars);
// Variables can be defined inline as well.
const { data } = await getStep({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStep(dataConnect, getStepVars);

console.log(data.step);

// Or, you can use the `Promise` API.
getStep(getStepVars).then((response) => {
  const data = response.data;
  console.log(data.step);
});
```

### Using `GetStep`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStepRef, GetStepVariables } from '@dataconnect/generated';

// The `GetStep` query requires an argument of type `GetStepVariables`:
const getStepVars: GetStepVariables = {
  id: ..., 
};

// Call the `getStepRef()` function to get a reference to the query.
const ref = getStepRef(getStepVars);
// Variables can be defined inline as well.
const ref = getStepRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStepRef(dataConnect, getStepVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.step);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.step);
});
```

## ListSteps
You can execute the `ListSteps` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listSteps(options?: ExecuteQueryOptions): QueryPromise<ListStepsData, undefined>;

interface ListStepsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListStepsData, undefined>;
}
export const listStepsRef: ListStepsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSteps(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListStepsData, undefined>;

interface ListStepsRef {
  ...
  (dc: DataConnect): QueryRef<ListStepsData, undefined>;
}
export const listStepsRef: ListStepsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listStepsRef:
```typescript
const name = listStepsRef.operationName;
console.log(name);
```

### Variables
The `ListSteps` query has no variables.
### Return Type
Recall that executing the `ListSteps` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListStepsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListStepsData {
  steps: ({
    instructionText: string;
  })[];
}
```
### Using `ListSteps`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSteps } from '@dataconnect/generated';


// Call the `listSteps()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSteps();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSteps(dataConnect);

console.log(data.steps);

// Or, you can use the `Promise` API.
listSteps().then((response) => {
  const data = response.data;
  console.log(data.steps);
});
```

### Using `ListSteps`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listStepsRef } from '@dataconnect/generated';


// Call the `listStepsRef()` function to get a reference to the query.
const ref = listStepsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listStepsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.steps);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.steps);
});
```

## GetMyBookmarks
You can execute the `GetMyBookmarks` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyBookmarks(options?: ExecuteQueryOptions): QueryPromise<GetMyBookmarksData, undefined>;

interface GetMyBookmarksRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyBookmarksData, undefined>;
}
export const getMyBookmarksRef: GetMyBookmarksRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyBookmarks(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyBookmarksData, undefined>;

interface GetMyBookmarksRef {
  ...
  (dc: DataConnect): QueryRef<GetMyBookmarksData, undefined>;
}
export const getMyBookmarksRef: GetMyBookmarksRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyBookmarksRef:
```typescript
const name = getMyBookmarksRef.operationName;
console.log(name);
```

### Variables
The `GetMyBookmarks` query has no variables.
### Return Type
Recall that executing the `GetMyBookmarks` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyBookmarksData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyBookmarksData {
  userBookmarks: ({
    guide: {
      title: string;
    };
  })[];
}
```
### Using `GetMyBookmarks`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyBookmarks } from '@dataconnect/generated';


// Call the `getMyBookmarks()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyBookmarks();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyBookmarks(dataConnect);

console.log(data.userBookmarks);

// Or, you can use the `Promise` API.
getMyBookmarks().then((response) => {
  const data = response.data;
  console.log(data.userBookmarks);
});
```

### Using `GetMyBookmarks`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyBookmarksRef } from '@dataconnect/generated';


// Call the `getMyBookmarksRef()` function to get a reference to the query.
const ref = getMyBookmarksRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyBookmarksRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userBookmarks);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userBookmarks);
});
```

## GetBookmark
You can execute the `GetBookmark` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getBookmark(vars: GetBookmarkVariables, options?: ExecuteQueryOptions): QueryPromise<GetBookmarkData, GetBookmarkVariables>;

interface GetBookmarkRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetBookmarkVariables): QueryRef<GetBookmarkData, GetBookmarkVariables>;
}
export const getBookmarkRef: GetBookmarkRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getBookmark(dc: DataConnect, vars: GetBookmarkVariables, options?: ExecuteQueryOptions): QueryPromise<GetBookmarkData, GetBookmarkVariables>;

interface GetBookmarkRef {
  ...
  (dc: DataConnect, vars: GetBookmarkVariables): QueryRef<GetBookmarkData, GetBookmarkVariables>;
}
export const getBookmarkRef: GetBookmarkRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getBookmarkRef:
```typescript
const name = getBookmarkRef.operationName;
console.log(name);
```

### Variables
The `GetBookmark` query requires an argument of type `GetBookmarkVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetBookmarkVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetBookmark` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetBookmarkData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetBookmarkData {
  userBookmark?: {
    userId: string;
  };
}
```
### Using `GetBookmark`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getBookmark, GetBookmarkVariables } from '@dataconnect/generated';

// The `GetBookmark` query requires an argument of type `GetBookmarkVariables`:
const getBookmarkVars: GetBookmarkVariables = {
  id: ..., 
};

// Call the `getBookmark()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getBookmark(getBookmarkVars);
// Variables can be defined inline as well.
const { data } = await getBookmark({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getBookmark(dataConnect, getBookmarkVars);

console.log(data.userBookmark);

// Or, you can use the `Promise` API.
getBookmark(getBookmarkVars).then((response) => {
  const data = response.data;
  console.log(data.userBookmark);
});
```

### Using `GetBookmark`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getBookmarkRef, GetBookmarkVariables } from '@dataconnect/generated';

// The `GetBookmark` query requires an argument of type `GetBookmarkVariables`:
const getBookmarkVars: GetBookmarkVariables = {
  id: ..., 
};

// Call the `getBookmarkRef()` function to get a reference to the query.
const ref = getBookmarkRef(getBookmarkVars);
// Variables can be defined inline as well.
const ref = getBookmarkRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getBookmarkRef(dataConnect, getBookmarkVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userBookmark);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userBookmark);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateCategory
You can execute the `CreateCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createCategory(): MutationPromise<CreateCategoryData, undefined>;

interface CreateCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateCategoryData, undefined>;
}
export const createCategoryRef: CreateCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCategory(dc: DataConnect): MutationPromise<CreateCategoryData, undefined>;

interface CreateCategoryRef {
  ...
  (dc: DataConnect): MutationRef<CreateCategoryData, undefined>;
}
export const createCategoryRef: CreateCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCategoryRef:
```typescript
const name = createCategoryRef.operationName;
console.log(name);
```

### Variables
The `CreateCategory` mutation has no variables.
### Return Type
Recall that executing the `CreateCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCategoryData {
  category_insert: Category_Key;
}
```
### Using `CreateCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCategory } from '@dataconnect/generated';


// Call the `createCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCategory();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCategory(dataConnect);

console.log(data.category_insert);

// Or, you can use the `Promise` API.
createCategory().then((response) => {
  const data = response.data;
  console.log(data.category_insert);
});
```

### Using `CreateCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCategoryRef } from '@dataconnect/generated';


// Call the `createCategoryRef()` function to get a reference to the mutation.
const ref = createCategoryRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCategoryRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.category_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.category_insert);
});
```

## UpsertCategory
You can execute the `UpsertCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertCategory(vars: UpsertCategoryVariables): MutationPromise<UpsertCategoryData, UpsertCategoryVariables>;

interface UpsertCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertCategoryVariables): MutationRef<UpsertCategoryData, UpsertCategoryVariables>;
}
export const upsertCategoryRef: UpsertCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertCategory(dc: DataConnect, vars: UpsertCategoryVariables): MutationPromise<UpsertCategoryData, UpsertCategoryVariables>;

interface UpsertCategoryRef {
  ...
  (dc: DataConnect, vars: UpsertCategoryVariables): MutationRef<UpsertCategoryData, UpsertCategoryVariables>;
}
export const upsertCategoryRef: UpsertCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertCategoryRef:
```typescript
const name = upsertCategoryRef.operationName;
console.log(name);
```

### Variables
The `UpsertCategory` mutation requires an argument of type `UpsertCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertCategoryVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `UpsertCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertCategoryData {
  category_upsert: Category_Key;
}
```
### Using `UpsertCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertCategory, UpsertCategoryVariables } from '@dataconnect/generated';

// The `UpsertCategory` mutation requires an argument of type `UpsertCategoryVariables`:
const upsertCategoryVars: UpsertCategoryVariables = {
  id: ..., 
};

// Call the `upsertCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertCategory(upsertCategoryVars);
// Variables can be defined inline as well.
const { data } = await upsertCategory({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertCategory(dataConnect, upsertCategoryVars);

console.log(data.category_upsert);

// Or, you can use the `Promise` API.
upsertCategory(upsertCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.category_upsert);
});
```

### Using `UpsertCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertCategoryRef, UpsertCategoryVariables } from '@dataconnect/generated';

// The `UpsertCategory` mutation requires an argument of type `UpsertCategoryVariables`:
const upsertCategoryVars: UpsertCategoryVariables = {
  id: ..., 
};

// Call the `upsertCategoryRef()` function to get a reference to the mutation.
const ref = upsertCategoryRef(upsertCategoryVars);
// Variables can be defined inline as well.
const ref = upsertCategoryRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertCategoryRef(dataConnect, upsertCategoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.category_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.category_upsert);
});
```

## DeleteCategory
You can execute the `DeleteCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteCategory(vars: DeleteCategoryVariables): MutationPromise<DeleteCategoryData, DeleteCategoryVariables>;

interface DeleteCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCategoryVariables): MutationRef<DeleteCategoryData, DeleteCategoryVariables>;
}
export const deleteCategoryRef: DeleteCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteCategory(dc: DataConnect, vars: DeleteCategoryVariables): MutationPromise<DeleteCategoryData, DeleteCategoryVariables>;

interface DeleteCategoryRef {
  ...
  (dc: DataConnect, vars: DeleteCategoryVariables): MutationRef<DeleteCategoryData, DeleteCategoryVariables>;
}
export const deleteCategoryRef: DeleteCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteCategoryRef:
```typescript
const name = deleteCategoryRef.operationName;
console.log(name);
```

### Variables
The `DeleteCategory` mutation requires an argument of type `DeleteCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteCategoryVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteCategoryData {
  category_delete?: Category_Key | null;
}
```
### Using `DeleteCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteCategory, DeleteCategoryVariables } from '@dataconnect/generated';

// The `DeleteCategory` mutation requires an argument of type `DeleteCategoryVariables`:
const deleteCategoryVars: DeleteCategoryVariables = {
  id: ..., 
};

// Call the `deleteCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteCategory(deleteCategoryVars);
// Variables can be defined inline as well.
const { data } = await deleteCategory({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteCategory(dataConnect, deleteCategoryVars);

console.log(data.category_delete);

// Or, you can use the `Promise` API.
deleteCategory(deleteCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.category_delete);
});
```

### Using `DeleteCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteCategoryRef, DeleteCategoryVariables } from '@dataconnect/generated';

// The `DeleteCategory` mutation requires an argument of type `DeleteCategoryVariables`:
const deleteCategoryVars: DeleteCategoryVariables = {
  id: ..., 
};

// Call the `deleteCategoryRef()` function to get a reference to the mutation.
const ref = deleteCategoryRef(deleteCategoryVars);
// Variables can be defined inline as well.
const ref = deleteCategoryRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteCategoryRef(dataConnect, deleteCategoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.category_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.category_delete);
});
```

## UpdateCategory
You can execute the `UpdateCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCategory(vars: UpdateCategoryVariables): MutationPromise<UpdateCategoryData, UpdateCategoryVariables>;

interface UpdateCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCategoryVariables): MutationRef<UpdateCategoryData, UpdateCategoryVariables>;
}
export const updateCategoryRef: UpdateCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCategory(dc: DataConnect, vars: UpdateCategoryVariables): MutationPromise<UpdateCategoryData, UpdateCategoryVariables>;

interface UpdateCategoryRef {
  ...
  (dc: DataConnect, vars: UpdateCategoryVariables): MutationRef<UpdateCategoryData, UpdateCategoryVariables>;
}
export const updateCategoryRef: UpdateCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCategoryRef:
```typescript
const name = updateCategoryRef.operationName;
console.log(name);
```

### Variables
The `UpdateCategory` mutation requires an argument of type `UpdateCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateCategoryVariables {
  id: UUIDString;
  name: string;
}
```
### Return Type
Recall that executing the `UpdateCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCategoryData {
  category_update?: Category_Key | null;
}
```
### Using `UpdateCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCategory, UpdateCategoryVariables } from '@dataconnect/generated';

// The `UpdateCategory` mutation requires an argument of type `UpdateCategoryVariables`:
const updateCategoryVars: UpdateCategoryVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCategory(updateCategoryVars);
// Variables can be defined inline as well.
const { data } = await updateCategory({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCategory(dataConnect, updateCategoryVars);

console.log(data.category_update);

// Or, you can use the `Promise` API.
updateCategory(updateCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.category_update);
});
```

### Using `UpdateCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCategoryRef, UpdateCategoryVariables } from '@dataconnect/generated';

// The `UpdateCategory` mutation requires an argument of type `UpdateCategoryVariables`:
const updateCategoryVars: UpdateCategoryVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateCategoryRef()` function to get a reference to the mutation.
const ref = updateCategoryRef(updateCategoryVars);
// Variables can be defined inline as well.
const ref = updateCategoryRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCategoryRef(dataConnect, updateCategoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.category_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.category_update);
});
```

## CreateDevice
You can execute the `CreateDevice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createDevice(): MutationPromise<CreateDeviceData, undefined>;

interface CreateDeviceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateDeviceData, undefined>;
}
export const createDeviceRef: CreateDeviceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createDevice(dc: DataConnect): MutationPromise<CreateDeviceData, undefined>;

interface CreateDeviceRef {
  ...
  (dc: DataConnect): MutationRef<CreateDeviceData, undefined>;
}
export const createDeviceRef: CreateDeviceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createDeviceRef:
```typescript
const name = createDeviceRef.operationName;
console.log(name);
```

### Variables
The `CreateDevice` mutation has no variables.
### Return Type
Recall that executing the `CreateDevice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateDeviceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateDeviceData {
  device_insert: Device_Key;
}
```
### Using `CreateDevice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createDevice } from '@dataconnect/generated';


// Call the `createDevice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createDevice();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createDevice(dataConnect);

console.log(data.device_insert);

// Or, you can use the `Promise` API.
createDevice().then((response) => {
  const data = response.data;
  console.log(data.device_insert);
});
```

### Using `CreateDevice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createDeviceRef } from '@dataconnect/generated';


// Call the `createDeviceRef()` function to get a reference to the mutation.
const ref = createDeviceRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createDeviceRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.device_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.device_insert);
});
```

## UpsertDevice
You can execute the `UpsertDevice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertDevice(vars: UpsertDeviceVariables): MutationPromise<UpsertDeviceData, UpsertDeviceVariables>;

interface UpsertDeviceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertDeviceVariables): MutationRef<UpsertDeviceData, UpsertDeviceVariables>;
}
export const upsertDeviceRef: UpsertDeviceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertDevice(dc: DataConnect, vars: UpsertDeviceVariables): MutationPromise<UpsertDeviceData, UpsertDeviceVariables>;

interface UpsertDeviceRef {
  ...
  (dc: DataConnect, vars: UpsertDeviceVariables): MutationRef<UpsertDeviceData, UpsertDeviceVariables>;
}
export const upsertDeviceRef: UpsertDeviceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertDeviceRef:
```typescript
const name = upsertDeviceRef.operationName;
console.log(name);
```

### Variables
The `UpsertDevice` mutation requires an argument of type `UpsertDeviceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertDeviceVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `UpsertDevice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertDeviceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertDeviceData {
  device_upsert: Device_Key;
}
```
### Using `UpsertDevice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertDevice, UpsertDeviceVariables } from '@dataconnect/generated';

// The `UpsertDevice` mutation requires an argument of type `UpsertDeviceVariables`:
const upsertDeviceVars: UpsertDeviceVariables = {
  id: ..., 
};

// Call the `upsertDevice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertDevice(upsertDeviceVars);
// Variables can be defined inline as well.
const { data } = await upsertDevice({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertDevice(dataConnect, upsertDeviceVars);

console.log(data.device_upsert);

// Or, you can use the `Promise` API.
upsertDevice(upsertDeviceVars).then((response) => {
  const data = response.data;
  console.log(data.device_upsert);
});
```

### Using `UpsertDevice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertDeviceRef, UpsertDeviceVariables } from '@dataconnect/generated';

// The `UpsertDevice` mutation requires an argument of type `UpsertDeviceVariables`:
const upsertDeviceVars: UpsertDeviceVariables = {
  id: ..., 
};

// Call the `upsertDeviceRef()` function to get a reference to the mutation.
const ref = upsertDeviceRef(upsertDeviceVars);
// Variables can be defined inline as well.
const ref = upsertDeviceRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertDeviceRef(dataConnect, upsertDeviceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.device_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.device_upsert);
});
```

## DeleteDevice
You can execute the `DeleteDevice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteDevice(vars: DeleteDeviceVariables): MutationPromise<DeleteDeviceData, DeleteDeviceVariables>;

interface DeleteDeviceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteDeviceVariables): MutationRef<DeleteDeviceData, DeleteDeviceVariables>;
}
export const deleteDeviceRef: DeleteDeviceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteDevice(dc: DataConnect, vars: DeleteDeviceVariables): MutationPromise<DeleteDeviceData, DeleteDeviceVariables>;

interface DeleteDeviceRef {
  ...
  (dc: DataConnect, vars: DeleteDeviceVariables): MutationRef<DeleteDeviceData, DeleteDeviceVariables>;
}
export const deleteDeviceRef: DeleteDeviceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteDeviceRef:
```typescript
const name = deleteDeviceRef.operationName;
console.log(name);
```

### Variables
The `DeleteDevice` mutation requires an argument of type `DeleteDeviceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteDeviceVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteDevice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteDeviceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteDeviceData {
  device_delete?: Device_Key | null;
}
```
### Using `DeleteDevice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteDevice, DeleteDeviceVariables } from '@dataconnect/generated';

// The `DeleteDevice` mutation requires an argument of type `DeleteDeviceVariables`:
const deleteDeviceVars: DeleteDeviceVariables = {
  id: ..., 
};

// Call the `deleteDevice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteDevice(deleteDeviceVars);
// Variables can be defined inline as well.
const { data } = await deleteDevice({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteDevice(dataConnect, deleteDeviceVars);

console.log(data.device_delete);

// Or, you can use the `Promise` API.
deleteDevice(deleteDeviceVars).then((response) => {
  const data = response.data;
  console.log(data.device_delete);
});
```

### Using `DeleteDevice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteDeviceRef, DeleteDeviceVariables } from '@dataconnect/generated';

// The `DeleteDevice` mutation requires an argument of type `DeleteDeviceVariables`:
const deleteDeviceVars: DeleteDeviceVariables = {
  id: ..., 
};

// Call the `deleteDeviceRef()` function to get a reference to the mutation.
const ref = deleteDeviceRef(deleteDeviceVars);
// Variables can be defined inline as well.
const ref = deleteDeviceRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteDeviceRef(dataConnect, deleteDeviceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.device_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.device_delete);
});
```

## UpdateDevice
You can execute the `UpdateDevice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateDevice(vars: UpdateDeviceVariables): MutationPromise<UpdateDeviceData, UpdateDeviceVariables>;

interface UpdateDeviceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateDeviceVariables): MutationRef<UpdateDeviceData, UpdateDeviceVariables>;
}
export const updateDeviceRef: UpdateDeviceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateDevice(dc: DataConnect, vars: UpdateDeviceVariables): MutationPromise<UpdateDeviceData, UpdateDeviceVariables>;

interface UpdateDeviceRef {
  ...
  (dc: DataConnect, vars: UpdateDeviceVariables): MutationRef<UpdateDeviceData, UpdateDeviceVariables>;
}
export const updateDeviceRef: UpdateDeviceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateDeviceRef:
```typescript
const name = updateDeviceRef.operationName;
console.log(name);
```

### Variables
The `UpdateDevice` mutation requires an argument of type `UpdateDeviceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateDeviceVariables {
  id: UUIDString;
  modelName: string;
}
```
### Return Type
Recall that executing the `UpdateDevice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateDeviceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateDeviceData {
  device_update?: Device_Key | null;
}
```
### Using `UpdateDevice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateDevice, UpdateDeviceVariables } from '@dataconnect/generated';

// The `UpdateDevice` mutation requires an argument of type `UpdateDeviceVariables`:
const updateDeviceVars: UpdateDeviceVariables = {
  id: ..., 
  modelName: ..., 
};

// Call the `updateDevice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateDevice(updateDeviceVars);
// Variables can be defined inline as well.
const { data } = await updateDevice({ id: ..., modelName: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateDevice(dataConnect, updateDeviceVars);

console.log(data.device_update);

// Or, you can use the `Promise` API.
updateDevice(updateDeviceVars).then((response) => {
  const data = response.data;
  console.log(data.device_update);
});
```

### Using `UpdateDevice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateDeviceRef, UpdateDeviceVariables } from '@dataconnect/generated';

// The `UpdateDevice` mutation requires an argument of type `UpdateDeviceVariables`:
const updateDeviceVars: UpdateDeviceVariables = {
  id: ..., 
  modelName: ..., 
};

// Call the `updateDeviceRef()` function to get a reference to the mutation.
const ref = updateDeviceRef(updateDeviceVars);
// Variables can be defined inline as well.
const ref = updateDeviceRef({ id: ..., modelName: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateDeviceRef(dataConnect, updateDeviceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.device_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.device_update);
});
```

## CreateGuide
You can execute the `CreateGuide` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createGuide(vars: CreateGuideVariables): MutationPromise<CreateGuideData, CreateGuideVariables>;

interface CreateGuideRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGuideVariables): MutationRef<CreateGuideData, CreateGuideVariables>;
}
export const createGuideRef: CreateGuideRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createGuide(dc: DataConnect, vars: CreateGuideVariables): MutationPromise<CreateGuideData, CreateGuideVariables>;

interface CreateGuideRef {
  ...
  (dc: DataConnect, vars: CreateGuideVariables): MutationRef<CreateGuideData, CreateGuideVariables>;
}
export const createGuideRef: CreateGuideRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createGuideRef:
```typescript
const name = createGuideRef.operationName;
console.log(name);
```

### Variables
The `CreateGuide` mutation requires an argument of type `CreateGuideVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateGuideVariables {
  title: string;
  difficulty: string;
  time: number;
}
```
### Return Type
Recall that executing the `CreateGuide` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateGuideData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateGuideData {
  guide_insert: Guide_Key;
}
```
### Using `CreateGuide`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createGuide, CreateGuideVariables } from '@dataconnect/generated';

// The `CreateGuide` mutation requires an argument of type `CreateGuideVariables`:
const createGuideVars: CreateGuideVariables = {
  title: ..., 
  difficulty: ..., 
  time: ..., 
};

// Call the `createGuide()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createGuide(createGuideVars);
// Variables can be defined inline as well.
const { data } = await createGuide({ title: ..., difficulty: ..., time: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createGuide(dataConnect, createGuideVars);

console.log(data.guide_insert);

// Or, you can use the `Promise` API.
createGuide(createGuideVars).then((response) => {
  const data = response.data;
  console.log(data.guide_insert);
});
```

### Using `CreateGuide`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createGuideRef, CreateGuideVariables } from '@dataconnect/generated';

// The `CreateGuide` mutation requires an argument of type `CreateGuideVariables`:
const createGuideVars: CreateGuideVariables = {
  title: ..., 
  difficulty: ..., 
  time: ..., 
};

// Call the `createGuideRef()` function to get a reference to the mutation.
const ref = createGuideRef(createGuideVars);
// Variables can be defined inline as well.
const ref = createGuideRef({ title: ..., difficulty: ..., time: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createGuideRef(dataConnect, createGuideVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.guide_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.guide_insert);
});
```

## UpsertGuide
You can execute the `UpsertGuide` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertGuide(vars: UpsertGuideVariables): MutationPromise<UpsertGuideData, UpsertGuideVariables>;

interface UpsertGuideRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertGuideVariables): MutationRef<UpsertGuideData, UpsertGuideVariables>;
}
export const upsertGuideRef: UpsertGuideRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertGuide(dc: DataConnect, vars: UpsertGuideVariables): MutationPromise<UpsertGuideData, UpsertGuideVariables>;

interface UpsertGuideRef {
  ...
  (dc: DataConnect, vars: UpsertGuideVariables): MutationRef<UpsertGuideData, UpsertGuideVariables>;
}
export const upsertGuideRef: UpsertGuideRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertGuideRef:
```typescript
const name = upsertGuideRef.operationName;
console.log(name);
```

### Variables
The `UpsertGuide` mutation requires an argument of type `UpsertGuideVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertGuideVariables {
  id: UUIDString;
  title: string;
  difficulty: string;
  time: number;
}
```
### Return Type
Recall that executing the `UpsertGuide` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertGuideData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertGuideData {
  guide_upsert: Guide_Key;
}
```
### Using `UpsertGuide`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertGuide, UpsertGuideVariables } from '@dataconnect/generated';

// The `UpsertGuide` mutation requires an argument of type `UpsertGuideVariables`:
const upsertGuideVars: UpsertGuideVariables = {
  id: ..., 
  title: ..., 
  difficulty: ..., 
  time: ..., 
};

// Call the `upsertGuide()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertGuide(upsertGuideVars);
// Variables can be defined inline as well.
const { data } = await upsertGuide({ id: ..., title: ..., difficulty: ..., time: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertGuide(dataConnect, upsertGuideVars);

console.log(data.guide_upsert);

// Or, you can use the `Promise` API.
upsertGuide(upsertGuideVars).then((response) => {
  const data = response.data;
  console.log(data.guide_upsert);
});
```

### Using `UpsertGuide`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertGuideRef, UpsertGuideVariables } from '@dataconnect/generated';

// The `UpsertGuide` mutation requires an argument of type `UpsertGuideVariables`:
const upsertGuideVars: UpsertGuideVariables = {
  id: ..., 
  title: ..., 
  difficulty: ..., 
  time: ..., 
};

// Call the `upsertGuideRef()` function to get a reference to the mutation.
const ref = upsertGuideRef(upsertGuideVars);
// Variables can be defined inline as well.
const ref = upsertGuideRef({ id: ..., title: ..., difficulty: ..., time: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertGuideRef(dataConnect, upsertGuideVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.guide_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.guide_upsert);
});
```

## DeleteGuide
You can execute the `DeleteGuide` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteGuide(vars: DeleteGuideVariables): MutationPromise<DeleteGuideData, DeleteGuideVariables>;

interface DeleteGuideRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteGuideVariables): MutationRef<DeleteGuideData, DeleteGuideVariables>;
}
export const deleteGuideRef: DeleteGuideRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteGuide(dc: DataConnect, vars: DeleteGuideVariables): MutationPromise<DeleteGuideData, DeleteGuideVariables>;

interface DeleteGuideRef {
  ...
  (dc: DataConnect, vars: DeleteGuideVariables): MutationRef<DeleteGuideData, DeleteGuideVariables>;
}
export const deleteGuideRef: DeleteGuideRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteGuideRef:
```typescript
const name = deleteGuideRef.operationName;
console.log(name);
```

### Variables
The `DeleteGuide` mutation requires an argument of type `DeleteGuideVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteGuideVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteGuide` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteGuideData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteGuideData {
  guide_delete?: Guide_Key | null;
}
```
### Using `DeleteGuide`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteGuide, DeleteGuideVariables } from '@dataconnect/generated';

// The `DeleteGuide` mutation requires an argument of type `DeleteGuideVariables`:
const deleteGuideVars: DeleteGuideVariables = {
  id: ..., 
};

// Call the `deleteGuide()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteGuide(deleteGuideVars);
// Variables can be defined inline as well.
const { data } = await deleteGuide({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteGuide(dataConnect, deleteGuideVars);

console.log(data.guide_delete);

// Or, you can use the `Promise` API.
deleteGuide(deleteGuideVars).then((response) => {
  const data = response.data;
  console.log(data.guide_delete);
});
```

### Using `DeleteGuide`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteGuideRef, DeleteGuideVariables } from '@dataconnect/generated';

// The `DeleteGuide` mutation requires an argument of type `DeleteGuideVariables`:
const deleteGuideVars: DeleteGuideVariables = {
  id: ..., 
};

// Call the `deleteGuideRef()` function to get a reference to the mutation.
const ref = deleteGuideRef(deleteGuideVars);
// Variables can be defined inline as well.
const ref = deleteGuideRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteGuideRef(dataConnect, deleteGuideVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.guide_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.guide_delete);
});
```

## UpdateGuide
You can execute the `UpdateGuide` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateGuide(vars: UpdateGuideVariables): MutationPromise<UpdateGuideData, UpdateGuideVariables>;

interface UpdateGuideRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateGuideVariables): MutationRef<UpdateGuideData, UpdateGuideVariables>;
}
export const updateGuideRef: UpdateGuideRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateGuide(dc: DataConnect, vars: UpdateGuideVariables): MutationPromise<UpdateGuideData, UpdateGuideVariables>;

interface UpdateGuideRef {
  ...
  (dc: DataConnect, vars: UpdateGuideVariables): MutationRef<UpdateGuideData, UpdateGuideVariables>;
}
export const updateGuideRef: UpdateGuideRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateGuideRef:
```typescript
const name = updateGuideRef.operationName;
console.log(name);
```

### Variables
The `UpdateGuide` mutation requires an argument of type `UpdateGuideVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateGuideVariables {
  id: UUIDString;
  time: number;
}
```
### Return Type
Recall that executing the `UpdateGuide` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateGuideData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateGuideData {
  guide_update?: Guide_Key | null;
}
```
### Using `UpdateGuide`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateGuide, UpdateGuideVariables } from '@dataconnect/generated';

// The `UpdateGuide` mutation requires an argument of type `UpdateGuideVariables`:
const updateGuideVars: UpdateGuideVariables = {
  id: ..., 
  time: ..., 
};

// Call the `updateGuide()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateGuide(updateGuideVars);
// Variables can be defined inline as well.
const { data } = await updateGuide({ id: ..., time: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateGuide(dataConnect, updateGuideVars);

console.log(data.guide_update);

// Or, you can use the `Promise` API.
updateGuide(updateGuideVars).then((response) => {
  const data = response.data;
  console.log(data.guide_update);
});
```

### Using `UpdateGuide`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateGuideRef, UpdateGuideVariables } from '@dataconnect/generated';

// The `UpdateGuide` mutation requires an argument of type `UpdateGuideVariables`:
const updateGuideVars: UpdateGuideVariables = {
  id: ..., 
  time: ..., 
};

// Call the `updateGuideRef()` function to get a reference to the mutation.
const ref = updateGuideRef(updateGuideVars);
// Variables can be defined inline as well.
const ref = updateGuideRef({ id: ..., time: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateGuideRef(dataConnect, updateGuideVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.guide_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.guide_update);
});
```

## CreatePart
You can execute the `CreatePart` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createPart(vars: CreatePartVariables): MutationPromise<CreatePartData, CreatePartVariables>;

interface CreatePartRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePartVariables): MutationRef<CreatePartData, CreatePartVariables>;
}
export const createPartRef: CreatePartRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPart(dc: DataConnect, vars: CreatePartVariables): MutationPromise<CreatePartData, CreatePartVariables>;

interface CreatePartRef {
  ...
  (dc: DataConnect, vars: CreatePartVariables): MutationRef<CreatePartData, CreatePartVariables>;
}
export const createPartRef: CreatePartRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPartRef:
```typescript
const name = createPartRef.operationName;
console.log(name);
```

### Variables
The `CreatePart` mutation requires an argument of type `CreatePartVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePartVariables {
  name: string;
  type: string;
  devId: UUIDString;
}
```
### Return Type
Recall that executing the `CreatePart` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePartData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePartData {
  part_insert: Part_Key;
}
```
### Using `CreatePart`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPart, CreatePartVariables } from '@dataconnect/generated';

// The `CreatePart` mutation requires an argument of type `CreatePartVariables`:
const createPartVars: CreatePartVariables = {
  name: ..., 
  type: ..., 
  devId: ..., 
};

// Call the `createPart()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPart(createPartVars);
// Variables can be defined inline as well.
const { data } = await createPart({ name: ..., type: ..., devId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPart(dataConnect, createPartVars);

console.log(data.part_insert);

// Or, you can use the `Promise` API.
createPart(createPartVars).then((response) => {
  const data = response.data;
  console.log(data.part_insert);
});
```

### Using `CreatePart`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPartRef, CreatePartVariables } from '@dataconnect/generated';

// The `CreatePart` mutation requires an argument of type `CreatePartVariables`:
const createPartVars: CreatePartVariables = {
  name: ..., 
  type: ..., 
  devId: ..., 
};

// Call the `createPartRef()` function to get a reference to the mutation.
const ref = createPartRef(createPartVars);
// Variables can be defined inline as well.
const ref = createPartRef({ name: ..., type: ..., devId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPartRef(dataConnect, createPartVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.part_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.part_insert);
});
```

## UpsertPart
You can execute the `UpsertPart` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertPart(vars: UpsertPartVariables): MutationPromise<UpsertPartData, UpsertPartVariables>;

interface UpsertPartRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertPartVariables): MutationRef<UpsertPartData, UpsertPartVariables>;
}
export const upsertPartRef: UpsertPartRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertPart(dc: DataConnect, vars: UpsertPartVariables): MutationPromise<UpsertPartData, UpsertPartVariables>;

interface UpsertPartRef {
  ...
  (dc: DataConnect, vars: UpsertPartVariables): MutationRef<UpsertPartData, UpsertPartVariables>;
}
export const upsertPartRef: UpsertPartRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertPartRef:
```typescript
const name = upsertPartRef.operationName;
console.log(name);
```

### Variables
The `UpsertPart` mutation requires an argument of type `UpsertPartVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertPartVariables {
  id: UUIDString;
  name: string;
  type: string;
  devId: UUIDString;
}
```
### Return Type
Recall that executing the `UpsertPart` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertPartData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertPartData {
  part_upsert: Part_Key;
}
```
### Using `UpsertPart`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertPart, UpsertPartVariables } from '@dataconnect/generated';

// The `UpsertPart` mutation requires an argument of type `UpsertPartVariables`:
const upsertPartVars: UpsertPartVariables = {
  id: ..., 
  name: ..., 
  type: ..., 
  devId: ..., 
};

// Call the `upsertPart()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertPart(upsertPartVars);
// Variables can be defined inline as well.
const { data } = await upsertPart({ id: ..., name: ..., type: ..., devId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertPart(dataConnect, upsertPartVars);

console.log(data.part_upsert);

// Or, you can use the `Promise` API.
upsertPart(upsertPartVars).then((response) => {
  const data = response.data;
  console.log(data.part_upsert);
});
```

### Using `UpsertPart`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertPartRef, UpsertPartVariables } from '@dataconnect/generated';

// The `UpsertPart` mutation requires an argument of type `UpsertPartVariables`:
const upsertPartVars: UpsertPartVariables = {
  id: ..., 
  name: ..., 
  type: ..., 
  devId: ..., 
};

// Call the `upsertPartRef()` function to get a reference to the mutation.
const ref = upsertPartRef(upsertPartVars);
// Variables can be defined inline as well.
const ref = upsertPartRef({ id: ..., name: ..., type: ..., devId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertPartRef(dataConnect, upsertPartVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.part_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.part_upsert);
});
```

## DeletePart
You can execute the `DeletePart` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deletePart(vars: DeletePartVariables): MutationPromise<DeletePartData, DeletePartVariables>;

interface DeletePartRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePartVariables): MutationRef<DeletePartData, DeletePartVariables>;
}
export const deletePartRef: DeletePartRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deletePart(dc: DataConnect, vars: DeletePartVariables): MutationPromise<DeletePartData, DeletePartVariables>;

interface DeletePartRef {
  ...
  (dc: DataConnect, vars: DeletePartVariables): MutationRef<DeletePartData, DeletePartVariables>;
}
export const deletePartRef: DeletePartRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePartRef:
```typescript
const name = deletePartRef.operationName;
console.log(name);
```

### Variables
The `DeletePart` mutation requires an argument of type `DeletePartVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeletePartVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeletePart` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePartData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePartData {
  part_delete?: Part_Key | null;
}
```
### Using `DeletePart`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deletePart, DeletePartVariables } from '@dataconnect/generated';

// The `DeletePart` mutation requires an argument of type `DeletePartVariables`:
const deletePartVars: DeletePartVariables = {
  id: ..., 
};

// Call the `deletePart()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deletePart(deletePartVars);
// Variables can be defined inline as well.
const { data } = await deletePart({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deletePart(dataConnect, deletePartVars);

console.log(data.part_delete);

// Or, you can use the `Promise` API.
deletePart(deletePartVars).then((response) => {
  const data = response.data;
  console.log(data.part_delete);
});
```

### Using `DeletePart`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePartRef, DeletePartVariables } from '@dataconnect/generated';

// The `DeletePart` mutation requires an argument of type `DeletePartVariables`:
const deletePartVars: DeletePartVariables = {
  id: ..., 
};

// Call the `deletePartRef()` function to get a reference to the mutation.
const ref = deletePartRef(deletePartVars);
// Variables can be defined inline as well.
const ref = deletePartRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePartRef(dataConnect, deletePartVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.part_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.part_delete);
});
```

## UpdatePart
You can execute the `UpdatePart` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updatePart(vars: UpdatePartVariables): MutationPromise<UpdatePartData, UpdatePartVariables>;

interface UpdatePartRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePartVariables): MutationRef<UpdatePartData, UpdatePartVariables>;
}
export const updatePartRef: UpdatePartRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePart(dc: DataConnect, vars: UpdatePartVariables): MutationPromise<UpdatePartData, UpdatePartVariables>;

interface UpdatePartRef {
  ...
  (dc: DataConnect, vars: UpdatePartVariables): MutationRef<UpdatePartData, UpdatePartVariables>;
}
export const updatePartRef: UpdatePartRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePartRef:
```typescript
const name = updatePartRef.operationName;
console.log(name);
```

### Variables
The `UpdatePart` mutation requires an argument of type `UpdatePartVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePartVariables {
  id: UUIDString;
  notes: string;
}
```
### Return Type
Recall that executing the `UpdatePart` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePartData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePartData {
  part_update?: Part_Key | null;
}
```
### Using `UpdatePart`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePart, UpdatePartVariables } from '@dataconnect/generated';

// The `UpdatePart` mutation requires an argument of type `UpdatePartVariables`:
const updatePartVars: UpdatePartVariables = {
  id: ..., 
  notes: ..., 
};

// Call the `updatePart()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePart(updatePartVars);
// Variables can be defined inline as well.
const { data } = await updatePart({ id: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePart(dataConnect, updatePartVars);

console.log(data.part_update);

// Or, you can use the `Promise` API.
updatePart(updatePartVars).then((response) => {
  const data = response.data;
  console.log(data.part_update);
});
```

### Using `UpdatePart`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePartRef, UpdatePartVariables } from '@dataconnect/generated';

// The `UpdatePart` mutation requires an argument of type `UpdatePartVariables`:
const updatePartVars: UpdatePartVariables = {
  id: ..., 
  notes: ..., 
};

// Call the `updatePartRef()` function to get a reference to the mutation.
const ref = updatePartRef(updatePartVars);
// Variables can be defined inline as well.
const ref = updatePartRef({ id: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePartRef(dataConnect, updatePartVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.part_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.part_update);
});
```

## CreateStep
You can execute the `CreateStep` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createStep(vars: CreateStepVariables): MutationPromise<CreateStepData, CreateStepVariables>;

interface CreateStepRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStepVariables): MutationRef<CreateStepData, CreateStepVariables>;
}
export const createStepRef: CreateStepRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createStep(dc: DataConnect, vars: CreateStepVariables): MutationPromise<CreateStepData, CreateStepVariables>;

interface CreateStepRef {
  ...
  (dc: DataConnect, vars: CreateStepVariables): MutationRef<CreateStepData, CreateStepVariables>;
}
export const createStepRef: CreateStepRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createStepRef:
```typescript
const name = createStepRef.operationName;
console.log(name);
```

### Variables
The `CreateStep` mutation requires an argument of type `CreateStepVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateStepVariables {
  order: number;
  text: string;
  guideId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateStep` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateStepData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateStepData {
  step_insert: Step_Key;
}
```
### Using `CreateStep`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createStep, CreateStepVariables } from '@dataconnect/generated';

// The `CreateStep` mutation requires an argument of type `CreateStepVariables`:
const createStepVars: CreateStepVariables = {
  order: ..., 
  text: ..., 
  guideId: ..., 
};

// Call the `createStep()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createStep(createStepVars);
// Variables can be defined inline as well.
const { data } = await createStep({ order: ..., text: ..., guideId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createStep(dataConnect, createStepVars);

console.log(data.step_insert);

// Or, you can use the `Promise` API.
createStep(createStepVars).then((response) => {
  const data = response.data;
  console.log(data.step_insert);
});
```

### Using `CreateStep`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createStepRef, CreateStepVariables } from '@dataconnect/generated';

// The `CreateStep` mutation requires an argument of type `CreateStepVariables`:
const createStepVars: CreateStepVariables = {
  order: ..., 
  text: ..., 
  guideId: ..., 
};

// Call the `createStepRef()` function to get a reference to the mutation.
const ref = createStepRef(createStepVars);
// Variables can be defined inline as well.
const ref = createStepRef({ order: ..., text: ..., guideId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createStepRef(dataConnect, createStepVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.step_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.step_insert);
});
```

## UpsertStep
You can execute the `UpsertStep` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertStep(vars: UpsertStepVariables): MutationPromise<UpsertStepData, UpsertStepVariables>;

interface UpsertStepRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertStepVariables): MutationRef<UpsertStepData, UpsertStepVariables>;
}
export const upsertStepRef: UpsertStepRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertStep(dc: DataConnect, vars: UpsertStepVariables): MutationPromise<UpsertStepData, UpsertStepVariables>;

interface UpsertStepRef {
  ...
  (dc: DataConnect, vars: UpsertStepVariables): MutationRef<UpsertStepData, UpsertStepVariables>;
}
export const upsertStepRef: UpsertStepRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertStepRef:
```typescript
const name = upsertStepRef.operationName;
console.log(name);
```

### Variables
The `UpsertStep` mutation requires an argument of type `UpsertStepVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertStepVariables {
  id: UUIDString;
  order: number;
  text: string;
  guideId: UUIDString;
}
```
### Return Type
Recall that executing the `UpsertStep` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertStepData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertStepData {
  step_upsert: Step_Key;
}
```
### Using `UpsertStep`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertStep, UpsertStepVariables } from '@dataconnect/generated';

// The `UpsertStep` mutation requires an argument of type `UpsertStepVariables`:
const upsertStepVars: UpsertStepVariables = {
  id: ..., 
  order: ..., 
  text: ..., 
  guideId: ..., 
};

// Call the `upsertStep()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertStep(upsertStepVars);
// Variables can be defined inline as well.
const { data } = await upsertStep({ id: ..., order: ..., text: ..., guideId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertStep(dataConnect, upsertStepVars);

console.log(data.step_upsert);

// Or, you can use the `Promise` API.
upsertStep(upsertStepVars).then((response) => {
  const data = response.data;
  console.log(data.step_upsert);
});
```

### Using `UpsertStep`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertStepRef, UpsertStepVariables } from '@dataconnect/generated';

// The `UpsertStep` mutation requires an argument of type `UpsertStepVariables`:
const upsertStepVars: UpsertStepVariables = {
  id: ..., 
  order: ..., 
  text: ..., 
  guideId: ..., 
};

// Call the `upsertStepRef()` function to get a reference to the mutation.
const ref = upsertStepRef(upsertStepVars);
// Variables can be defined inline as well.
const ref = upsertStepRef({ id: ..., order: ..., text: ..., guideId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertStepRef(dataConnect, upsertStepVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.step_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.step_upsert);
});
```

## DeleteStep
You can execute the `DeleteStep` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteStep(vars: DeleteStepVariables): MutationPromise<DeleteStepData, DeleteStepVariables>;

interface DeleteStepRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteStepVariables): MutationRef<DeleteStepData, DeleteStepVariables>;
}
export const deleteStepRef: DeleteStepRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteStep(dc: DataConnect, vars: DeleteStepVariables): MutationPromise<DeleteStepData, DeleteStepVariables>;

interface DeleteStepRef {
  ...
  (dc: DataConnect, vars: DeleteStepVariables): MutationRef<DeleteStepData, DeleteStepVariables>;
}
export const deleteStepRef: DeleteStepRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteStepRef:
```typescript
const name = deleteStepRef.operationName;
console.log(name);
```

### Variables
The `DeleteStep` mutation requires an argument of type `DeleteStepVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteStepVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteStep` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteStepData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteStepData {
  step_delete?: Step_Key | null;
}
```
### Using `DeleteStep`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteStep, DeleteStepVariables } from '@dataconnect/generated';

// The `DeleteStep` mutation requires an argument of type `DeleteStepVariables`:
const deleteStepVars: DeleteStepVariables = {
  id: ..., 
};

// Call the `deleteStep()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteStep(deleteStepVars);
// Variables can be defined inline as well.
const { data } = await deleteStep({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteStep(dataConnect, deleteStepVars);

console.log(data.step_delete);

// Or, you can use the `Promise` API.
deleteStep(deleteStepVars).then((response) => {
  const data = response.data;
  console.log(data.step_delete);
});
```

### Using `DeleteStep`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteStepRef, DeleteStepVariables } from '@dataconnect/generated';

// The `DeleteStep` mutation requires an argument of type `DeleteStepVariables`:
const deleteStepVars: DeleteStepVariables = {
  id: ..., 
};

// Call the `deleteStepRef()` function to get a reference to the mutation.
const ref = deleteStepRef(deleteStepVars);
// Variables can be defined inline as well.
const ref = deleteStepRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteStepRef(dataConnect, deleteStepVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.step_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.step_delete);
});
```

## UpdateStep
You can execute the `UpdateStep` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateStep(vars: UpdateStepVariables): MutationPromise<UpdateStepData, UpdateStepVariables>;

interface UpdateStepRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStepVariables): MutationRef<UpdateStepData, UpdateStepVariables>;
}
export const updateStepRef: UpdateStepRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateStep(dc: DataConnect, vars: UpdateStepVariables): MutationPromise<UpdateStepData, UpdateStepVariables>;

interface UpdateStepRef {
  ...
  (dc: DataConnect, vars: UpdateStepVariables): MutationRef<UpdateStepData, UpdateStepVariables>;
}
export const updateStepRef: UpdateStepRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateStepRef:
```typescript
const name = updateStepRef.operationName;
console.log(name);
```

### Variables
The `UpdateStep` mutation requires an argument of type `UpdateStepVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateStepVariables {
  id: UUIDString;
  text: string;
}
```
### Return Type
Recall that executing the `UpdateStep` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateStepData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateStepData {
  step_update?: Step_Key | null;
}
```
### Using `UpdateStep`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateStep, UpdateStepVariables } from '@dataconnect/generated';

// The `UpdateStep` mutation requires an argument of type `UpdateStepVariables`:
const updateStepVars: UpdateStepVariables = {
  id: ..., 
  text: ..., 
};

// Call the `updateStep()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateStep(updateStepVars);
// Variables can be defined inline as well.
const { data } = await updateStep({ id: ..., text: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateStep(dataConnect, updateStepVars);

console.log(data.step_update);

// Or, you can use the `Promise` API.
updateStep(updateStepVars).then((response) => {
  const data = response.data;
  console.log(data.step_update);
});
```

### Using `UpdateStep`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateStepRef, UpdateStepVariables } from '@dataconnect/generated';

// The `UpdateStep` mutation requires an argument of type `UpdateStepVariables`:
const updateStepVars: UpdateStepVariables = {
  id: ..., 
  text: ..., 
};

// Call the `updateStepRef()` function to get a reference to the mutation.
const ref = updateStepRef(updateStepVars);
// Variables can be defined inline as well.
const ref = updateStepRef({ id: ..., text: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateStepRef(dataConnect, updateStepVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.step_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.step_update);
});
```

## CreateBookmark
You can execute the `CreateBookmark` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createBookmark(vars: CreateBookmarkVariables): MutationPromise<CreateBookmarkData, CreateBookmarkVariables>;

interface CreateBookmarkRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBookmarkVariables): MutationRef<CreateBookmarkData, CreateBookmarkVariables>;
}
export const createBookmarkRef: CreateBookmarkRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createBookmark(dc: DataConnect, vars: CreateBookmarkVariables): MutationPromise<CreateBookmarkData, CreateBookmarkVariables>;

interface CreateBookmarkRef {
  ...
  (dc: DataConnect, vars: CreateBookmarkVariables): MutationRef<CreateBookmarkData, CreateBookmarkVariables>;
}
export const createBookmarkRef: CreateBookmarkRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createBookmarkRef:
```typescript
const name = createBookmarkRef.operationName;
console.log(name);
```

### Variables
The `CreateBookmark` mutation requires an argument of type `CreateBookmarkVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateBookmarkVariables {
  guideId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateBookmark` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateBookmarkData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateBookmarkData {
  userBookmark_insert: UserBookmark_Key;
}
```
### Using `CreateBookmark`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createBookmark, CreateBookmarkVariables } from '@dataconnect/generated';

// The `CreateBookmark` mutation requires an argument of type `CreateBookmarkVariables`:
const createBookmarkVars: CreateBookmarkVariables = {
  guideId: ..., 
};

// Call the `createBookmark()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createBookmark(createBookmarkVars);
// Variables can be defined inline as well.
const { data } = await createBookmark({ guideId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createBookmark(dataConnect, createBookmarkVars);

console.log(data.userBookmark_insert);

// Or, you can use the `Promise` API.
createBookmark(createBookmarkVars).then((response) => {
  const data = response.data;
  console.log(data.userBookmark_insert);
});
```

### Using `CreateBookmark`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createBookmarkRef, CreateBookmarkVariables } from '@dataconnect/generated';

// The `CreateBookmark` mutation requires an argument of type `CreateBookmarkVariables`:
const createBookmarkVars: CreateBookmarkVariables = {
  guideId: ..., 
};

// Call the `createBookmarkRef()` function to get a reference to the mutation.
const ref = createBookmarkRef(createBookmarkVars);
// Variables can be defined inline as well.
const ref = createBookmarkRef({ guideId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createBookmarkRef(dataConnect, createBookmarkVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userBookmark_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userBookmark_insert);
});
```

## UpsertBookmark
You can execute the `UpsertBookmark` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertBookmark(vars: UpsertBookmarkVariables): MutationPromise<UpsertBookmarkData, UpsertBookmarkVariables>;

interface UpsertBookmarkRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertBookmarkVariables): MutationRef<UpsertBookmarkData, UpsertBookmarkVariables>;
}
export const upsertBookmarkRef: UpsertBookmarkRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertBookmark(dc: DataConnect, vars: UpsertBookmarkVariables): MutationPromise<UpsertBookmarkData, UpsertBookmarkVariables>;

interface UpsertBookmarkRef {
  ...
  (dc: DataConnect, vars: UpsertBookmarkVariables): MutationRef<UpsertBookmarkData, UpsertBookmarkVariables>;
}
export const upsertBookmarkRef: UpsertBookmarkRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertBookmarkRef:
```typescript
const name = upsertBookmarkRef.operationName;
console.log(name);
```

### Variables
The `UpsertBookmark` mutation requires an argument of type `UpsertBookmarkVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertBookmarkVariables {
  id: UUIDString;
  guideId: UUIDString;
}
```
### Return Type
Recall that executing the `UpsertBookmark` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertBookmarkData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertBookmarkData {
  userBookmark_upsert: UserBookmark_Key;
}
```
### Using `UpsertBookmark`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertBookmark, UpsertBookmarkVariables } from '@dataconnect/generated';

// The `UpsertBookmark` mutation requires an argument of type `UpsertBookmarkVariables`:
const upsertBookmarkVars: UpsertBookmarkVariables = {
  id: ..., 
  guideId: ..., 
};

// Call the `upsertBookmark()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertBookmark(upsertBookmarkVars);
// Variables can be defined inline as well.
const { data } = await upsertBookmark({ id: ..., guideId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertBookmark(dataConnect, upsertBookmarkVars);

console.log(data.userBookmark_upsert);

// Or, you can use the `Promise` API.
upsertBookmark(upsertBookmarkVars).then((response) => {
  const data = response.data;
  console.log(data.userBookmark_upsert);
});
```

### Using `UpsertBookmark`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertBookmarkRef, UpsertBookmarkVariables } from '@dataconnect/generated';

// The `UpsertBookmark` mutation requires an argument of type `UpsertBookmarkVariables`:
const upsertBookmarkVars: UpsertBookmarkVariables = {
  id: ..., 
  guideId: ..., 
};

// Call the `upsertBookmarkRef()` function to get a reference to the mutation.
const ref = upsertBookmarkRef(upsertBookmarkVars);
// Variables can be defined inline as well.
const ref = upsertBookmarkRef({ id: ..., guideId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertBookmarkRef(dataConnect, upsertBookmarkVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userBookmark_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userBookmark_upsert);
});
```

## DeleteBookmark
You can execute the `DeleteBookmark` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteBookmark(vars: DeleteBookmarkVariables): MutationPromise<DeleteBookmarkData, DeleteBookmarkVariables>;

interface DeleteBookmarkRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteBookmarkVariables): MutationRef<DeleteBookmarkData, DeleteBookmarkVariables>;
}
export const deleteBookmarkRef: DeleteBookmarkRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteBookmark(dc: DataConnect, vars: DeleteBookmarkVariables): MutationPromise<DeleteBookmarkData, DeleteBookmarkVariables>;

interface DeleteBookmarkRef {
  ...
  (dc: DataConnect, vars: DeleteBookmarkVariables): MutationRef<DeleteBookmarkData, DeleteBookmarkVariables>;
}
export const deleteBookmarkRef: DeleteBookmarkRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteBookmarkRef:
```typescript
const name = deleteBookmarkRef.operationName;
console.log(name);
```

### Variables
The `DeleteBookmark` mutation requires an argument of type `DeleteBookmarkVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteBookmarkVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteBookmark` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteBookmarkData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteBookmarkData {
  userBookmark_delete?: UserBookmark_Key | null;
}
```
### Using `DeleteBookmark`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteBookmark, DeleteBookmarkVariables } from '@dataconnect/generated';

// The `DeleteBookmark` mutation requires an argument of type `DeleteBookmarkVariables`:
const deleteBookmarkVars: DeleteBookmarkVariables = {
  id: ..., 
};

// Call the `deleteBookmark()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteBookmark(deleteBookmarkVars);
// Variables can be defined inline as well.
const { data } = await deleteBookmark({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteBookmark(dataConnect, deleteBookmarkVars);

console.log(data.userBookmark_delete);

// Or, you can use the `Promise` API.
deleteBookmark(deleteBookmarkVars).then((response) => {
  const data = response.data;
  console.log(data.userBookmark_delete);
});
```

### Using `DeleteBookmark`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteBookmarkRef, DeleteBookmarkVariables } from '@dataconnect/generated';

// The `DeleteBookmark` mutation requires an argument of type `DeleteBookmarkVariables`:
const deleteBookmarkVars: DeleteBookmarkVariables = {
  id: ..., 
};

// Call the `deleteBookmarkRef()` function to get a reference to the mutation.
const ref = deleteBookmarkRef(deleteBookmarkVars);
// Variables can be defined inline as well.
const ref = deleteBookmarkRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteBookmarkRef(dataConnect, deleteBookmarkVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userBookmark_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userBookmark_delete);
});
```

## UpdateBookmark
You can execute the `UpdateBookmark` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateBookmark(vars: UpdateBookmarkVariables): MutationPromise<UpdateBookmarkData, UpdateBookmarkVariables>;

interface UpdateBookmarkRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateBookmarkVariables): MutationRef<UpdateBookmarkData, UpdateBookmarkVariables>;
}
export const updateBookmarkRef: UpdateBookmarkRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateBookmark(dc: DataConnect, vars: UpdateBookmarkVariables): MutationPromise<UpdateBookmarkData, UpdateBookmarkVariables>;

interface UpdateBookmarkRef {
  ...
  (dc: DataConnect, vars: UpdateBookmarkVariables): MutationRef<UpdateBookmarkData, UpdateBookmarkVariables>;
}
export const updateBookmarkRef: UpdateBookmarkRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateBookmarkRef:
```typescript
const name = updateBookmarkRef.operationName;
console.log(name);
```

### Variables
The `UpdateBookmark` mutation requires an argument of type `UpdateBookmarkVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateBookmarkVariables {
  id: UUIDString;
  guideId: UUIDString;
}
```
### Return Type
Recall that executing the `UpdateBookmark` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateBookmarkData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateBookmarkData {
  userBookmark_update?: UserBookmark_Key | null;
}
```
### Using `UpdateBookmark`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateBookmark, UpdateBookmarkVariables } from '@dataconnect/generated';

// The `UpdateBookmark` mutation requires an argument of type `UpdateBookmarkVariables`:
const updateBookmarkVars: UpdateBookmarkVariables = {
  id: ..., 
  guideId: ..., 
};

// Call the `updateBookmark()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateBookmark(updateBookmarkVars);
// Variables can be defined inline as well.
const { data } = await updateBookmark({ id: ..., guideId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateBookmark(dataConnect, updateBookmarkVars);

console.log(data.userBookmark_update);

// Or, you can use the `Promise` API.
updateBookmark(updateBookmarkVars).then((response) => {
  const data = response.data;
  console.log(data.userBookmark_update);
});
```

### Using `UpdateBookmark`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateBookmarkRef, UpdateBookmarkVariables } from '@dataconnect/generated';

// The `UpdateBookmark` mutation requires an argument of type `UpdateBookmarkVariables`:
const updateBookmarkVars: UpdateBookmarkVariables = {
  id: ..., 
  guideId: ..., 
};

// Call the `updateBookmarkRef()` function to get a reference to the mutation.
const ref = updateBookmarkRef(updateBookmarkVars);
// Variables can be defined inline as well.
const ref = updateBookmarkRef({ id: ..., guideId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateBookmarkRef(dataConnect, updateBookmarkVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userBookmark_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userBookmark_update);
});
```

