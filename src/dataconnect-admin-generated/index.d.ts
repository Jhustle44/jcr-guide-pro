import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

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

/** Generated Node Admin SDK operation action function for the 'CreateCategory' Mutation. Allow users to execute without passing in DataConnect. */
export function createCategory(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateCategoryData>>;
/** Generated Node Admin SDK operation action function for the 'CreateCategory' Mutation. Allow users to pass in custom DataConnect instances. */
export function createCategory(options?: OperationOptions): Promise<ExecuteOperationResponse<CreateCategoryData>>;

/** Generated Node Admin SDK operation action function for the 'UpsertCategory' Mutation. Allow users to execute without passing in DataConnect. */
export function upsertCategory(dc: DataConnect, vars: UpsertCategoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertCategoryData>>;
/** Generated Node Admin SDK operation action function for the 'UpsertCategory' Mutation. Allow users to pass in custom DataConnect instances. */
export function upsertCategory(vars: UpsertCategoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertCategoryData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteCategory' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteCategory(dc: DataConnect, vars: DeleteCategoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteCategoryData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteCategory' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteCategory(vars: DeleteCategoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteCategoryData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateCategory' Mutation. Allow users to execute without passing in DataConnect. */
export function updateCategory(dc: DataConnect, vars: UpdateCategoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateCategoryData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateCategory' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateCategory(vars: UpdateCategoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateCategoryData>>;

/** Generated Node Admin SDK operation action function for the 'GetCategory' Query. Allow users to execute without passing in DataConnect. */
export function getCategory(dc: DataConnect, vars: GetCategoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCategoryData>>;
/** Generated Node Admin SDK operation action function for the 'GetCategory' Query. Allow users to pass in custom DataConnect instances. */
export function getCategory(vars: GetCategoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCategoryData>>;

/** Generated Node Admin SDK operation action function for the 'ListCategories' Query. Allow users to execute without passing in DataConnect. */
export function listCategories(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListCategoriesData>>;
/** Generated Node Admin SDK operation action function for the 'ListCategories' Query. Allow users to pass in custom DataConnect instances. */
export function listCategories(options?: OperationOptions): Promise<ExecuteOperationResponse<ListCategoriesData>>;

/** Generated Node Admin SDK operation action function for the 'CreateDevice' Mutation. Allow users to execute without passing in DataConnect. */
export function createDevice(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateDeviceData>>;
/** Generated Node Admin SDK operation action function for the 'CreateDevice' Mutation. Allow users to pass in custom DataConnect instances. */
export function createDevice(options?: OperationOptions): Promise<ExecuteOperationResponse<CreateDeviceData>>;

/** Generated Node Admin SDK operation action function for the 'UpsertDevice' Mutation. Allow users to execute without passing in DataConnect. */
export function upsertDevice(dc: DataConnect, vars: UpsertDeviceVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertDeviceData>>;
/** Generated Node Admin SDK operation action function for the 'UpsertDevice' Mutation. Allow users to pass in custom DataConnect instances. */
export function upsertDevice(vars: UpsertDeviceVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertDeviceData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteDevice' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteDevice(dc: DataConnect, vars: DeleteDeviceVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteDeviceData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteDevice' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteDevice(vars: DeleteDeviceVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteDeviceData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateDevice' Mutation. Allow users to execute without passing in DataConnect. */
export function updateDevice(dc: DataConnect, vars: UpdateDeviceVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateDeviceData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateDevice' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateDevice(vars: UpdateDeviceVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateDeviceData>>;

/** Generated Node Admin SDK operation action function for the 'GetDevice' Query. Allow users to execute without passing in DataConnect. */
export function getDevice(dc: DataConnect, vars: GetDeviceVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetDeviceData>>;
/** Generated Node Admin SDK operation action function for the 'GetDevice' Query. Allow users to pass in custom DataConnect instances. */
export function getDevice(vars: GetDeviceVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetDeviceData>>;

/** Generated Node Admin SDK operation action function for the 'ListDevices' Query. Allow users to execute without passing in DataConnect. */
export function listDevices(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListDevicesData>>;
/** Generated Node Admin SDK operation action function for the 'ListDevices' Query. Allow users to pass in custom DataConnect instances. */
export function listDevices(options?: OperationOptions): Promise<ExecuteOperationResponse<ListDevicesData>>;

/** Generated Node Admin SDK operation action function for the 'CreateGuide' Mutation. Allow users to execute without passing in DataConnect. */
export function createGuide(dc: DataConnect, vars: CreateGuideVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateGuideData>>;
/** Generated Node Admin SDK operation action function for the 'CreateGuide' Mutation. Allow users to pass in custom DataConnect instances. */
export function createGuide(vars: CreateGuideVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateGuideData>>;

/** Generated Node Admin SDK operation action function for the 'UpsertGuide' Mutation. Allow users to execute without passing in DataConnect. */
export function upsertGuide(dc: DataConnect, vars: UpsertGuideVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertGuideData>>;
/** Generated Node Admin SDK operation action function for the 'UpsertGuide' Mutation. Allow users to pass in custom DataConnect instances. */
export function upsertGuide(vars: UpsertGuideVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertGuideData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteGuide' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteGuide(dc: DataConnect, vars: DeleteGuideVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteGuideData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteGuide' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteGuide(vars: DeleteGuideVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteGuideData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateGuide' Mutation. Allow users to execute without passing in DataConnect. */
export function updateGuide(dc: DataConnect, vars: UpdateGuideVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateGuideData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateGuide' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateGuide(vars: UpdateGuideVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateGuideData>>;

/** Generated Node Admin SDK operation action function for the 'GetGuide' Query. Allow users to execute without passing in DataConnect. */
export function getGuide(dc: DataConnect, vars: GetGuideVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetGuideData>>;
/** Generated Node Admin SDK operation action function for the 'GetGuide' Query. Allow users to pass in custom DataConnect instances. */
export function getGuide(vars: GetGuideVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetGuideData>>;

/** Generated Node Admin SDK operation action function for the 'ListGuides' Query. Allow users to execute without passing in DataConnect. */
export function listGuides(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListGuidesData>>;
/** Generated Node Admin SDK operation action function for the 'ListGuides' Query. Allow users to pass in custom DataConnect instances. */
export function listGuides(options?: OperationOptions): Promise<ExecuteOperationResponse<ListGuidesData>>;

/** Generated Node Admin SDK operation action function for the 'CreatePart' Mutation. Allow users to execute without passing in DataConnect. */
export function createPart(dc: DataConnect, vars: CreatePartVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreatePartData>>;
/** Generated Node Admin SDK operation action function for the 'CreatePart' Mutation. Allow users to pass in custom DataConnect instances. */
export function createPart(vars: CreatePartVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreatePartData>>;

/** Generated Node Admin SDK operation action function for the 'UpsertPart' Mutation. Allow users to execute without passing in DataConnect. */
export function upsertPart(dc: DataConnect, vars: UpsertPartVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertPartData>>;
/** Generated Node Admin SDK operation action function for the 'UpsertPart' Mutation. Allow users to pass in custom DataConnect instances. */
export function upsertPart(vars: UpsertPartVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertPartData>>;

/** Generated Node Admin SDK operation action function for the 'DeletePart' Mutation. Allow users to execute without passing in DataConnect. */
export function deletePart(dc: DataConnect, vars: DeletePartVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeletePartData>>;
/** Generated Node Admin SDK operation action function for the 'DeletePart' Mutation. Allow users to pass in custom DataConnect instances. */
export function deletePart(vars: DeletePartVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeletePartData>>;

/** Generated Node Admin SDK operation action function for the 'UpdatePart' Mutation. Allow users to execute without passing in DataConnect. */
export function updatePart(dc: DataConnect, vars: UpdatePartVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdatePartData>>;
/** Generated Node Admin SDK operation action function for the 'UpdatePart' Mutation. Allow users to pass in custom DataConnect instances. */
export function updatePart(vars: UpdatePartVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdatePartData>>;

/** Generated Node Admin SDK operation action function for the 'GetPart' Query. Allow users to execute without passing in DataConnect. */
export function getPart(dc: DataConnect, vars: GetPartVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPartData>>;
/** Generated Node Admin SDK operation action function for the 'GetPart' Query. Allow users to pass in custom DataConnect instances. */
export function getPart(vars: GetPartVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPartData>>;

/** Generated Node Admin SDK operation action function for the 'ListParts' Query. Allow users to execute without passing in DataConnect. */
export function listParts(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListPartsData>>;
/** Generated Node Admin SDK operation action function for the 'ListParts' Query. Allow users to pass in custom DataConnect instances. */
export function listParts(options?: OperationOptions): Promise<ExecuteOperationResponse<ListPartsData>>;

/** Generated Node Admin SDK operation action function for the 'CreateStep' Mutation. Allow users to execute without passing in DataConnect. */
export function createStep(dc: DataConnect, vars: CreateStepVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateStepData>>;
/** Generated Node Admin SDK operation action function for the 'CreateStep' Mutation. Allow users to pass in custom DataConnect instances. */
export function createStep(vars: CreateStepVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateStepData>>;

/** Generated Node Admin SDK operation action function for the 'UpsertStep' Mutation. Allow users to execute without passing in DataConnect. */
export function upsertStep(dc: DataConnect, vars: UpsertStepVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertStepData>>;
/** Generated Node Admin SDK operation action function for the 'UpsertStep' Mutation. Allow users to pass in custom DataConnect instances. */
export function upsertStep(vars: UpsertStepVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertStepData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteStep' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteStep(dc: DataConnect, vars: DeleteStepVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteStepData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteStep' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteStep(vars: DeleteStepVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteStepData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateStep' Mutation. Allow users to execute without passing in DataConnect. */
export function updateStep(dc: DataConnect, vars: UpdateStepVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateStepData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateStep' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateStep(vars: UpdateStepVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateStepData>>;

/** Generated Node Admin SDK operation action function for the 'GetStep' Query. Allow users to execute without passing in DataConnect. */
export function getStep(dc: DataConnect, vars: GetStepVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetStepData>>;
/** Generated Node Admin SDK operation action function for the 'GetStep' Query. Allow users to pass in custom DataConnect instances. */
export function getStep(vars: GetStepVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetStepData>>;

/** Generated Node Admin SDK operation action function for the 'ListSteps' Query. Allow users to execute without passing in DataConnect. */
export function listSteps(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListStepsData>>;
/** Generated Node Admin SDK operation action function for the 'ListSteps' Query. Allow users to pass in custom DataConnect instances. */
export function listSteps(options?: OperationOptions): Promise<ExecuteOperationResponse<ListStepsData>>;

/** Generated Node Admin SDK operation action function for the 'CreateBookmark' Mutation. Allow users to execute without passing in DataConnect. */
export function createBookmark(dc: DataConnect, vars: CreateBookmarkVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateBookmarkData>>;
/** Generated Node Admin SDK operation action function for the 'CreateBookmark' Mutation. Allow users to pass in custom DataConnect instances. */
export function createBookmark(vars: CreateBookmarkVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateBookmarkData>>;

/** Generated Node Admin SDK operation action function for the 'UpsertBookmark' Mutation. Allow users to execute without passing in DataConnect. */
export function upsertBookmark(dc: DataConnect, vars: UpsertBookmarkVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertBookmarkData>>;
/** Generated Node Admin SDK operation action function for the 'UpsertBookmark' Mutation. Allow users to pass in custom DataConnect instances. */
export function upsertBookmark(vars: UpsertBookmarkVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertBookmarkData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteBookmark' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteBookmark(dc: DataConnect, vars: DeleteBookmarkVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteBookmarkData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteBookmark' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteBookmark(vars: DeleteBookmarkVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteBookmarkData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateBookmark' Mutation. Allow users to execute without passing in DataConnect. */
export function updateBookmark(dc: DataConnect, vars: UpdateBookmarkVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateBookmarkData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateBookmark' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateBookmark(vars: UpdateBookmarkVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateBookmarkData>>;

/** Generated Node Admin SDK operation action function for the 'GetMyBookmarks' Query. Allow users to execute without passing in DataConnect. */
export function getMyBookmarks(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetMyBookmarksData>>;
/** Generated Node Admin SDK operation action function for the 'GetMyBookmarks' Query. Allow users to pass in custom DataConnect instances. */
export function getMyBookmarks(options?: OperationOptions): Promise<ExecuteOperationResponse<GetMyBookmarksData>>;

/** Generated Node Admin SDK operation action function for the 'GetBookmark' Query. Allow users to execute without passing in DataConnect. */
export function getBookmark(dc: DataConnect, vars: GetBookmarkVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetBookmarkData>>;
/** Generated Node Admin SDK operation action function for the 'GetBookmark' Query. Allow users to pass in custom DataConnect instances. */
export function getBookmark(vars: GetBookmarkVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetBookmarkData>>;

