import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface CreateBookmarkData {
  userBookmark_insert: UserBookmark_Key;
}

export interface CreateBookmarkVariables {
  guideId: UUIDString;
}

export interface CreateCategoryData {
  category_insert: Category_Key;
}

export interface CreateDeviceData {
  device_insert: Device_Key;
}

export interface CreateGuideData {
  guide_insert: Guide_Key;
}

export interface CreateGuideVariables {
  title: string;
  difficulty: string;
  time: number;
}

export interface CreatePartData {
  part_insert: Part_Key;
}

export interface CreatePartVariables {
  name: string;
  type: string;
  devId: UUIDString;
}

export interface CreateStepData {
  step_insert: Step_Key;
}

export interface CreateStepVariables {
  order: number;
  text: string;
  guideId: UUIDString;
}

export interface DeleteBookmarkData {
  userBookmark_delete?: UserBookmark_Key | null;
}

export interface DeleteBookmarkVariables {
  id: UUIDString;
}

export interface DeleteCategoryData {
  category_delete?: Category_Key | null;
}

export interface DeleteCategoryVariables {
  id: UUIDString;
}

export interface DeleteDeviceData {
  device_delete?: Device_Key | null;
}

export interface DeleteDeviceVariables {
  id: UUIDString;
}

export interface DeleteGuideData {
  guide_delete?: Guide_Key | null;
}

export interface DeleteGuideVariables {
  id: UUIDString;
}

export interface DeletePartData {
  part_delete?: Part_Key | null;
}

export interface DeletePartVariables {
  id: UUIDString;
}

export interface DeleteStepData {
  step_delete?: Step_Key | null;
}

export interface DeleteStepVariables {
  id: UUIDString;
}

export interface Device_Key {
  id: UUIDString;
  __typename?: 'Device_Key';
}

export interface GetBookmarkData {
  userBookmark?: {
    userId: string;
  };
}

export interface GetBookmarkVariables {
  id: UUIDString;
}

export interface GetCategoryData {
  category?: {
    name: string;
  };
}

export interface GetCategoryVariables {
  id: UUIDString;
}

export interface GetDeviceData {
  device?: {
    modelName: string;
  };
}

export interface GetDeviceVariables {
  id: UUIDString;
}

export interface GetGuideData {
  guide?: {
    title: string;
  };
}

export interface GetGuideVariables {
  id: UUIDString;
}

export interface GetMyBookmarksData {
  userBookmarks: ({
    guide: {
      title: string;
    };
  })[];
}

export interface GetPartData {
  part?: {
    partName: string;
  };
}

export interface GetPartVariables {
  id: UUIDString;
}

export interface GetStepData {
  step?: {
    instructionText: string;
  };
}

export interface GetStepVariables {
  id: UUIDString;
}

export interface Guide_Key {
  id: UUIDString;
  __typename?: 'Guide_Key';
}

export interface ListCategoriesData {
  categories: ({
    name: string;
  })[];
}

export interface ListDevicesData {
  devices: ({
    modelName: string;
  })[];
}

export interface ListGuidesData {
  guides: ({
    title: string;
  })[];
}

export interface ListPartsData {
  parts: ({
    partName: string;
  })[];
}

export interface ListStepsData {
  steps: ({
    instructionText: string;
  })[];
}

export interface Part_Key {
  id: UUIDString;
  __typename?: 'Part_Key';
}

export interface Step_Key {
  id: UUIDString;
  __typename?: 'Step_Key';
}

export interface UpdateBookmarkData {
  userBookmark_update?: UserBookmark_Key | null;
}

export interface UpdateBookmarkVariables {
  id: UUIDString;
  guideId: UUIDString;
}

export interface UpdateCategoryData {
  category_update?: Category_Key | null;
}

export interface UpdateCategoryVariables {
  id: UUIDString;
  name: string;
}

export interface UpdateDeviceData {
  device_update?: Device_Key | null;
}

export interface UpdateDeviceVariables {
  id: UUIDString;
  modelName: string;
}

export interface UpdateGuideData {
  guide_update?: Guide_Key | null;
}

export interface UpdateGuideVariables {
  id: UUIDString;
  time: number;
}

export interface UpdatePartData {
  part_update?: Part_Key | null;
}

export interface UpdatePartVariables {
  id: UUIDString;
  notes: string;
}

export interface UpdateStepData {
  step_update?: Step_Key | null;
}

export interface UpdateStepVariables {
  id: UUIDString;
  text: string;
}

export interface UpsertBookmarkData {
  userBookmark_upsert: UserBookmark_Key;
}

export interface UpsertBookmarkVariables {
  id: UUIDString;
  guideId: UUIDString;
}

export interface UpsertCategoryData {
  category_upsert: Category_Key;
}

export interface UpsertCategoryVariables {
  id: UUIDString;
}

export interface UpsertDeviceData {
  device_upsert: Device_Key;
}

export interface UpsertDeviceVariables {
  id: UUIDString;
}

export interface UpsertGuideData {
  guide_upsert: Guide_Key;
}

export interface UpsertGuideVariables {
  id: UUIDString;
  title: string;
  difficulty: string;
  time: number;
}

export interface UpsertPartData {
  part_upsert: Part_Key;
}

export interface UpsertPartVariables {
  id: UUIDString;
  name: string;
  type: string;
  devId: UUIDString;
}

export interface UpsertStepData {
  step_upsert: Step_Key;
}

export interface UpsertStepVariables {
  id: UUIDString;
  order: number;
  text: string;
  guideId: UUIDString;
}

export interface UserBookmark_Key {
  id: UUIDString;
  __typename?: 'UserBookmark_Key';
}

interface CreateCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateCategoryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateCategoryData, undefined>;
  operationName: string;
}
export const createCategoryRef: CreateCategoryRef;

export function createCategory(): MutationPromise<CreateCategoryData, undefined>;
export function createCategory(dc: DataConnect): MutationPromise<CreateCategoryData, undefined>;

interface UpsertCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertCategoryVariables): MutationRef<UpsertCategoryData, UpsertCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertCategoryVariables): MutationRef<UpsertCategoryData, UpsertCategoryVariables>;
  operationName: string;
}
export const upsertCategoryRef: UpsertCategoryRef;

export function upsertCategory(vars: UpsertCategoryVariables): MutationPromise<UpsertCategoryData, UpsertCategoryVariables>;
export function upsertCategory(dc: DataConnect, vars: UpsertCategoryVariables): MutationPromise<UpsertCategoryData, UpsertCategoryVariables>;

interface DeleteCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCategoryVariables): MutationRef<DeleteCategoryData, DeleteCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteCategoryVariables): MutationRef<DeleteCategoryData, DeleteCategoryVariables>;
  operationName: string;
}
export const deleteCategoryRef: DeleteCategoryRef;

export function deleteCategory(vars: DeleteCategoryVariables): MutationPromise<DeleteCategoryData, DeleteCategoryVariables>;
export function deleteCategory(dc: DataConnect, vars: DeleteCategoryVariables): MutationPromise<DeleteCategoryData, DeleteCategoryVariables>;

interface UpdateCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCategoryVariables): MutationRef<UpdateCategoryData, UpdateCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCategoryVariables): MutationRef<UpdateCategoryData, UpdateCategoryVariables>;
  operationName: string;
}
export const updateCategoryRef: UpdateCategoryRef;

export function updateCategory(vars: UpdateCategoryVariables): MutationPromise<UpdateCategoryData, UpdateCategoryVariables>;
export function updateCategory(dc: DataConnect, vars: UpdateCategoryVariables): MutationPromise<UpdateCategoryData, UpdateCategoryVariables>;

interface GetCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCategoryVariables): QueryRef<GetCategoryData, GetCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCategoryVariables): QueryRef<GetCategoryData, GetCategoryVariables>;
  operationName: string;
}
export const getCategoryRef: GetCategoryRef;

export function getCategory(vars: GetCategoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetCategoryData, GetCategoryVariables>;
export function getCategory(dc: DataConnect, vars: GetCategoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetCategoryData, GetCategoryVariables>;

interface ListCategoriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCategoriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListCategoriesData, undefined>;
  operationName: string;
}
export const listCategoriesRef: ListCategoriesRef;

export function listCategories(options?: ExecuteQueryOptions): QueryPromise<ListCategoriesData, undefined>;
export function listCategories(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCategoriesData, undefined>;

interface CreateDeviceRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateDeviceData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateDeviceData, undefined>;
  operationName: string;
}
export const createDeviceRef: CreateDeviceRef;

export function createDevice(): MutationPromise<CreateDeviceData, undefined>;
export function createDevice(dc: DataConnect): MutationPromise<CreateDeviceData, undefined>;

interface UpsertDeviceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertDeviceVariables): MutationRef<UpsertDeviceData, UpsertDeviceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertDeviceVariables): MutationRef<UpsertDeviceData, UpsertDeviceVariables>;
  operationName: string;
}
export const upsertDeviceRef: UpsertDeviceRef;

export function upsertDevice(vars: UpsertDeviceVariables): MutationPromise<UpsertDeviceData, UpsertDeviceVariables>;
export function upsertDevice(dc: DataConnect, vars: UpsertDeviceVariables): MutationPromise<UpsertDeviceData, UpsertDeviceVariables>;

interface DeleteDeviceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteDeviceVariables): MutationRef<DeleteDeviceData, DeleteDeviceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteDeviceVariables): MutationRef<DeleteDeviceData, DeleteDeviceVariables>;
  operationName: string;
}
export const deleteDeviceRef: DeleteDeviceRef;

export function deleteDevice(vars: DeleteDeviceVariables): MutationPromise<DeleteDeviceData, DeleteDeviceVariables>;
export function deleteDevice(dc: DataConnect, vars: DeleteDeviceVariables): MutationPromise<DeleteDeviceData, DeleteDeviceVariables>;

interface UpdateDeviceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateDeviceVariables): MutationRef<UpdateDeviceData, UpdateDeviceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateDeviceVariables): MutationRef<UpdateDeviceData, UpdateDeviceVariables>;
  operationName: string;
}
export const updateDeviceRef: UpdateDeviceRef;

export function updateDevice(vars: UpdateDeviceVariables): MutationPromise<UpdateDeviceData, UpdateDeviceVariables>;
export function updateDevice(dc: DataConnect, vars: UpdateDeviceVariables): MutationPromise<UpdateDeviceData, UpdateDeviceVariables>;

interface GetDeviceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDeviceVariables): QueryRef<GetDeviceData, GetDeviceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetDeviceVariables): QueryRef<GetDeviceData, GetDeviceVariables>;
  operationName: string;
}
export const getDeviceRef: GetDeviceRef;

export function getDevice(vars: GetDeviceVariables, options?: ExecuteQueryOptions): QueryPromise<GetDeviceData, GetDeviceVariables>;
export function getDevice(dc: DataConnect, vars: GetDeviceVariables, options?: ExecuteQueryOptions): QueryPromise<GetDeviceData, GetDeviceVariables>;

interface ListDevicesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListDevicesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListDevicesData, undefined>;
  operationName: string;
}
export const listDevicesRef: ListDevicesRef;

export function listDevices(options?: ExecuteQueryOptions): QueryPromise<ListDevicesData, undefined>;
export function listDevices(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListDevicesData, undefined>;

interface CreateGuideRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGuideVariables): MutationRef<CreateGuideData, CreateGuideVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateGuideVariables): MutationRef<CreateGuideData, CreateGuideVariables>;
  operationName: string;
}
export const createGuideRef: CreateGuideRef;

export function createGuide(vars: CreateGuideVariables): MutationPromise<CreateGuideData, CreateGuideVariables>;
export function createGuide(dc: DataConnect, vars: CreateGuideVariables): MutationPromise<CreateGuideData, CreateGuideVariables>;

interface UpsertGuideRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertGuideVariables): MutationRef<UpsertGuideData, UpsertGuideVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertGuideVariables): MutationRef<UpsertGuideData, UpsertGuideVariables>;
  operationName: string;
}
export const upsertGuideRef: UpsertGuideRef;

export function upsertGuide(vars: UpsertGuideVariables): MutationPromise<UpsertGuideData, UpsertGuideVariables>;
export function upsertGuide(dc: DataConnect, vars: UpsertGuideVariables): MutationPromise<UpsertGuideData, UpsertGuideVariables>;

interface DeleteGuideRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteGuideVariables): MutationRef<DeleteGuideData, DeleteGuideVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteGuideVariables): MutationRef<DeleteGuideData, DeleteGuideVariables>;
  operationName: string;
}
export const deleteGuideRef: DeleteGuideRef;

export function deleteGuide(vars: DeleteGuideVariables): MutationPromise<DeleteGuideData, DeleteGuideVariables>;
export function deleteGuide(dc: DataConnect, vars: DeleteGuideVariables): MutationPromise<DeleteGuideData, DeleteGuideVariables>;

interface UpdateGuideRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateGuideVariables): MutationRef<UpdateGuideData, UpdateGuideVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateGuideVariables): MutationRef<UpdateGuideData, UpdateGuideVariables>;
  operationName: string;
}
export const updateGuideRef: UpdateGuideRef;

export function updateGuide(vars: UpdateGuideVariables): MutationPromise<UpdateGuideData, UpdateGuideVariables>;
export function updateGuide(dc: DataConnect, vars: UpdateGuideVariables): MutationPromise<UpdateGuideData, UpdateGuideVariables>;

interface GetGuideRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGuideVariables): QueryRef<GetGuideData, GetGuideVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetGuideVariables): QueryRef<GetGuideData, GetGuideVariables>;
  operationName: string;
}
export const getGuideRef: GetGuideRef;

export function getGuide(vars: GetGuideVariables, options?: ExecuteQueryOptions): QueryPromise<GetGuideData, GetGuideVariables>;
export function getGuide(dc: DataConnect, vars: GetGuideVariables, options?: ExecuteQueryOptions): QueryPromise<GetGuideData, GetGuideVariables>;

interface ListGuidesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGuidesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListGuidesData, undefined>;
  operationName: string;
}
export const listGuidesRef: ListGuidesRef;

export function listGuides(options?: ExecuteQueryOptions): QueryPromise<ListGuidesData, undefined>;
export function listGuides(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListGuidesData, undefined>;

interface CreatePartRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePartVariables): MutationRef<CreatePartData, CreatePartVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePartVariables): MutationRef<CreatePartData, CreatePartVariables>;
  operationName: string;
}
export const createPartRef: CreatePartRef;

export function createPart(vars: CreatePartVariables): MutationPromise<CreatePartData, CreatePartVariables>;
export function createPart(dc: DataConnect, vars: CreatePartVariables): MutationPromise<CreatePartData, CreatePartVariables>;

interface UpsertPartRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertPartVariables): MutationRef<UpsertPartData, UpsertPartVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertPartVariables): MutationRef<UpsertPartData, UpsertPartVariables>;
  operationName: string;
}
export const upsertPartRef: UpsertPartRef;

export function upsertPart(vars: UpsertPartVariables): MutationPromise<UpsertPartData, UpsertPartVariables>;
export function upsertPart(dc: DataConnect, vars: UpsertPartVariables): MutationPromise<UpsertPartData, UpsertPartVariables>;

interface DeletePartRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePartVariables): MutationRef<DeletePartData, DeletePartVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeletePartVariables): MutationRef<DeletePartData, DeletePartVariables>;
  operationName: string;
}
export const deletePartRef: DeletePartRef;

export function deletePart(vars: DeletePartVariables): MutationPromise<DeletePartData, DeletePartVariables>;
export function deletePart(dc: DataConnect, vars: DeletePartVariables): MutationPromise<DeletePartData, DeletePartVariables>;

interface UpdatePartRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePartVariables): MutationRef<UpdatePartData, UpdatePartVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePartVariables): MutationRef<UpdatePartData, UpdatePartVariables>;
  operationName: string;
}
export const updatePartRef: UpdatePartRef;

export function updatePart(vars: UpdatePartVariables): MutationPromise<UpdatePartData, UpdatePartVariables>;
export function updatePart(dc: DataConnect, vars: UpdatePartVariables): MutationPromise<UpdatePartData, UpdatePartVariables>;

interface GetPartRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPartVariables): QueryRef<GetPartData, GetPartVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPartVariables): QueryRef<GetPartData, GetPartVariables>;
  operationName: string;
}
export const getPartRef: GetPartRef;

export function getPart(vars: GetPartVariables, options?: ExecuteQueryOptions): QueryPromise<GetPartData, GetPartVariables>;
export function getPart(dc: DataConnect, vars: GetPartVariables, options?: ExecuteQueryOptions): QueryPromise<GetPartData, GetPartVariables>;

interface ListPartsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPartsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPartsData, undefined>;
  operationName: string;
}
export const listPartsRef: ListPartsRef;

export function listParts(options?: ExecuteQueryOptions): QueryPromise<ListPartsData, undefined>;
export function listParts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPartsData, undefined>;

interface CreateStepRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStepVariables): MutationRef<CreateStepData, CreateStepVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateStepVariables): MutationRef<CreateStepData, CreateStepVariables>;
  operationName: string;
}
export const createStepRef: CreateStepRef;

export function createStep(vars: CreateStepVariables): MutationPromise<CreateStepData, CreateStepVariables>;
export function createStep(dc: DataConnect, vars: CreateStepVariables): MutationPromise<CreateStepData, CreateStepVariables>;

interface UpsertStepRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertStepVariables): MutationRef<UpsertStepData, UpsertStepVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertStepVariables): MutationRef<UpsertStepData, UpsertStepVariables>;
  operationName: string;
}
export const upsertStepRef: UpsertStepRef;

export function upsertStep(vars: UpsertStepVariables): MutationPromise<UpsertStepData, UpsertStepVariables>;
export function upsertStep(dc: DataConnect, vars: UpsertStepVariables): MutationPromise<UpsertStepData, UpsertStepVariables>;

interface DeleteStepRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteStepVariables): MutationRef<DeleteStepData, DeleteStepVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteStepVariables): MutationRef<DeleteStepData, DeleteStepVariables>;
  operationName: string;
}
export const deleteStepRef: DeleteStepRef;

export function deleteStep(vars: DeleteStepVariables): MutationPromise<DeleteStepData, DeleteStepVariables>;
export function deleteStep(dc: DataConnect, vars: DeleteStepVariables): MutationPromise<DeleteStepData, DeleteStepVariables>;

interface UpdateStepRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStepVariables): MutationRef<UpdateStepData, UpdateStepVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateStepVariables): MutationRef<UpdateStepData, UpdateStepVariables>;
  operationName: string;
}
export const updateStepRef: UpdateStepRef;

export function updateStep(vars: UpdateStepVariables): MutationPromise<UpdateStepData, UpdateStepVariables>;
export function updateStep(dc: DataConnect, vars: UpdateStepVariables): MutationPromise<UpdateStepData, UpdateStepVariables>;

interface GetStepRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStepVariables): QueryRef<GetStepData, GetStepVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStepVariables): QueryRef<GetStepData, GetStepVariables>;
  operationName: string;
}
export const getStepRef: GetStepRef;

export function getStep(vars: GetStepVariables, options?: ExecuteQueryOptions): QueryPromise<GetStepData, GetStepVariables>;
export function getStep(dc: DataConnect, vars: GetStepVariables, options?: ExecuteQueryOptions): QueryPromise<GetStepData, GetStepVariables>;

interface ListStepsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListStepsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListStepsData, undefined>;
  operationName: string;
}
export const listStepsRef: ListStepsRef;

export function listSteps(options?: ExecuteQueryOptions): QueryPromise<ListStepsData, undefined>;
export function listSteps(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListStepsData, undefined>;

interface CreateBookmarkRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBookmarkVariables): MutationRef<CreateBookmarkData, CreateBookmarkVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateBookmarkVariables): MutationRef<CreateBookmarkData, CreateBookmarkVariables>;
  operationName: string;
}
export const createBookmarkRef: CreateBookmarkRef;

export function createBookmark(vars: CreateBookmarkVariables): MutationPromise<CreateBookmarkData, CreateBookmarkVariables>;
export function createBookmark(dc: DataConnect, vars: CreateBookmarkVariables): MutationPromise<CreateBookmarkData, CreateBookmarkVariables>;

interface UpsertBookmarkRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertBookmarkVariables): MutationRef<UpsertBookmarkData, UpsertBookmarkVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertBookmarkVariables): MutationRef<UpsertBookmarkData, UpsertBookmarkVariables>;
  operationName: string;
}
export const upsertBookmarkRef: UpsertBookmarkRef;

export function upsertBookmark(vars: UpsertBookmarkVariables): MutationPromise<UpsertBookmarkData, UpsertBookmarkVariables>;
export function upsertBookmark(dc: DataConnect, vars: UpsertBookmarkVariables): MutationPromise<UpsertBookmarkData, UpsertBookmarkVariables>;

interface DeleteBookmarkRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteBookmarkVariables): MutationRef<DeleteBookmarkData, DeleteBookmarkVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteBookmarkVariables): MutationRef<DeleteBookmarkData, DeleteBookmarkVariables>;
  operationName: string;
}
export const deleteBookmarkRef: DeleteBookmarkRef;

export function deleteBookmark(vars: DeleteBookmarkVariables): MutationPromise<DeleteBookmarkData, DeleteBookmarkVariables>;
export function deleteBookmark(dc: DataConnect, vars: DeleteBookmarkVariables): MutationPromise<DeleteBookmarkData, DeleteBookmarkVariables>;

interface UpdateBookmarkRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateBookmarkVariables): MutationRef<UpdateBookmarkData, UpdateBookmarkVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateBookmarkVariables): MutationRef<UpdateBookmarkData, UpdateBookmarkVariables>;
  operationName: string;
}
export const updateBookmarkRef: UpdateBookmarkRef;

export function updateBookmark(vars: UpdateBookmarkVariables): MutationPromise<UpdateBookmarkData, UpdateBookmarkVariables>;
export function updateBookmark(dc: DataConnect, vars: UpdateBookmarkVariables): MutationPromise<UpdateBookmarkData, UpdateBookmarkVariables>;

interface GetMyBookmarksRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyBookmarksData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyBookmarksData, undefined>;
  operationName: string;
}
export const getMyBookmarksRef: GetMyBookmarksRef;

export function getMyBookmarks(options?: ExecuteQueryOptions): QueryPromise<GetMyBookmarksData, undefined>;
export function getMyBookmarks(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyBookmarksData, undefined>;

interface GetBookmarkRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetBookmarkVariables): QueryRef<GetBookmarkData, GetBookmarkVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetBookmarkVariables): QueryRef<GetBookmarkData, GetBookmarkVariables>;
  operationName: string;
}
export const getBookmarkRef: GetBookmarkRef;

export function getBookmark(vars: GetBookmarkVariables, options?: ExecuteQueryOptions): QueryPromise<GetBookmarkData, GetBookmarkVariables>;
export function getBookmark(dc: DataConnect, vars: GetBookmarkVariables, options?: ExecuteQueryOptions): QueryPromise<GetBookmarkData, GetBookmarkVariables>;

