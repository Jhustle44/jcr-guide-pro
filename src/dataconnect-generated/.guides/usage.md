# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateCategory, useUpsertCategory, useDeleteCategory, useUpdateCategory, useGetCategory, useListCategories, useCreateDevice, useUpsertDevice, useDeleteDevice, useUpdateDevice } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateCategory();

const { data, isPending, isSuccess, isError, error } = useUpsertCategory(upsertCategoryVars);

const { data, isPending, isSuccess, isError, error } = useDeleteCategory(deleteCategoryVars);

const { data, isPending, isSuccess, isError, error } = useUpdateCategory(updateCategoryVars);

const { data, isPending, isSuccess, isError, error } = useGetCategory(getCategoryVars);

const { data, isPending, isSuccess, isError, error } = useListCategories();

const { data, isPending, isSuccess, isError, error } = useCreateDevice();

const { data, isPending, isSuccess, isError, error } = useUpsertDevice(upsertDeviceVars);

const { data, isPending, isSuccess, isError, error } = useDeleteDevice(deleteDeviceVars);

const { data, isPending, isSuccess, isError, error } = useUpdateDevice(updateDeviceVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createCategory, upsertCategory, deleteCategory, updateCategory, getCategory, listCategories, createDevice, upsertDevice, deleteDevice, updateDevice } from '@dataconnect/generated';


// Operation CreateCategory: 
const { data } = await CreateCategory(dataConnect);

// Operation UpsertCategory:  For variables, look at type UpsertCategoryVars in ../index.d.ts
const { data } = await UpsertCategory(dataConnect, upsertCategoryVars);

// Operation DeleteCategory:  For variables, look at type DeleteCategoryVars in ../index.d.ts
const { data } = await DeleteCategory(dataConnect, deleteCategoryVars);

// Operation UpdateCategory:  For variables, look at type UpdateCategoryVars in ../index.d.ts
const { data } = await UpdateCategory(dataConnect, updateCategoryVars);

// Operation GetCategory:  For variables, look at type GetCategoryVars in ../index.d.ts
const { data } = await GetCategory(dataConnect, getCategoryVars);

// Operation ListCategories: 
const { data } = await ListCategories(dataConnect);

// Operation CreateDevice: 
const { data } = await CreateDevice(dataConnect);

// Operation UpsertDevice:  For variables, look at type UpsertDeviceVars in ../index.d.ts
const { data } = await UpsertDevice(dataConnect, upsertDeviceVars);

// Operation DeleteDevice:  For variables, look at type DeleteDeviceVars in ../index.d.ts
const { data } = await DeleteDevice(dataConnect, deleteDeviceVars);

// Operation UpdateDevice:  For variables, look at type UpdateDeviceVars in ../index.d.ts
const { data } = await UpdateDevice(dataConnect, updateDeviceVars);


```