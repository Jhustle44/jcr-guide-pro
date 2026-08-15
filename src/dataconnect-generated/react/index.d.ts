import { CreateCategoryData, UpsertCategoryData, UpsertCategoryVariables, DeleteCategoryData, DeleteCategoryVariables, UpdateCategoryData, UpdateCategoryVariables, GetCategoryData, GetCategoryVariables, ListCategoriesData, CreateDeviceData, UpsertDeviceData, UpsertDeviceVariables, DeleteDeviceData, DeleteDeviceVariables, UpdateDeviceData, UpdateDeviceVariables, GetDeviceData, GetDeviceVariables, ListDevicesData, CreateGuideData, CreateGuideVariables, UpsertGuideData, UpsertGuideVariables, DeleteGuideData, DeleteGuideVariables, UpdateGuideData, UpdateGuideVariables, GetGuideData, GetGuideVariables, ListGuidesData, CreatePartData, CreatePartVariables, UpsertPartData, UpsertPartVariables, DeletePartData, DeletePartVariables, UpdatePartData, UpdatePartVariables, GetPartData, GetPartVariables, ListPartsData, CreateStepData, CreateStepVariables, UpsertStepData, UpsertStepVariables, DeleteStepData, DeleteStepVariables, UpdateStepData, UpdateStepVariables, GetStepData, GetStepVariables, ListStepsData, CreateBookmarkData, CreateBookmarkVariables, UpsertBookmarkData, UpsertBookmarkVariables, DeleteBookmarkData, DeleteBookmarkVariables, UpdateBookmarkData, UpdateBookmarkVariables, GetMyBookmarksData, GetBookmarkData, GetBookmarkVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateCategory(options?: useDataConnectMutationOptions<CreateCategoryData, FirebaseError, void>): UseDataConnectMutationResult<CreateCategoryData, undefined>;
export function useCreateCategory(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCategoryData, FirebaseError, void>): UseDataConnectMutationResult<CreateCategoryData, undefined>;

export function useUpsertCategory(options?: useDataConnectMutationOptions<UpsertCategoryData, FirebaseError, UpsertCategoryVariables>): UseDataConnectMutationResult<UpsertCategoryData, UpsertCategoryVariables>;
export function useUpsertCategory(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertCategoryData, FirebaseError, UpsertCategoryVariables>): UseDataConnectMutationResult<UpsertCategoryData, UpsertCategoryVariables>;

export function useDeleteCategory(options?: useDataConnectMutationOptions<DeleteCategoryData, FirebaseError, DeleteCategoryVariables>): UseDataConnectMutationResult<DeleteCategoryData, DeleteCategoryVariables>;
export function useDeleteCategory(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteCategoryData, FirebaseError, DeleteCategoryVariables>): UseDataConnectMutationResult<DeleteCategoryData, DeleteCategoryVariables>;

export function useUpdateCategory(options?: useDataConnectMutationOptions<UpdateCategoryData, FirebaseError, UpdateCategoryVariables>): UseDataConnectMutationResult<UpdateCategoryData, UpdateCategoryVariables>;
export function useUpdateCategory(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateCategoryData, FirebaseError, UpdateCategoryVariables>): UseDataConnectMutationResult<UpdateCategoryData, UpdateCategoryVariables>;

export function useGetCategory(vars: GetCategoryVariables, options?: useDataConnectQueryOptions<GetCategoryData>): UseDataConnectQueryResult<GetCategoryData, GetCategoryVariables>;
export function useGetCategory(dc: DataConnect, vars: GetCategoryVariables, options?: useDataConnectQueryOptions<GetCategoryData>): UseDataConnectQueryResult<GetCategoryData, GetCategoryVariables>;

export function useListCategories(options?: useDataConnectQueryOptions<ListCategoriesData>): UseDataConnectQueryResult<ListCategoriesData, undefined>;
export function useListCategories(dc: DataConnect, options?: useDataConnectQueryOptions<ListCategoriesData>): UseDataConnectQueryResult<ListCategoriesData, undefined>;

export function useCreateDevice(options?: useDataConnectMutationOptions<CreateDeviceData, FirebaseError, void>): UseDataConnectMutationResult<CreateDeviceData, undefined>;
export function useCreateDevice(dc: DataConnect, options?: useDataConnectMutationOptions<CreateDeviceData, FirebaseError, void>): UseDataConnectMutationResult<CreateDeviceData, undefined>;

export function useUpsertDevice(options?: useDataConnectMutationOptions<UpsertDeviceData, FirebaseError, UpsertDeviceVariables>): UseDataConnectMutationResult<UpsertDeviceData, UpsertDeviceVariables>;
export function useUpsertDevice(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertDeviceData, FirebaseError, UpsertDeviceVariables>): UseDataConnectMutationResult<UpsertDeviceData, UpsertDeviceVariables>;

export function useDeleteDevice(options?: useDataConnectMutationOptions<DeleteDeviceData, FirebaseError, DeleteDeviceVariables>): UseDataConnectMutationResult<DeleteDeviceData, DeleteDeviceVariables>;
export function useDeleteDevice(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteDeviceData, FirebaseError, DeleteDeviceVariables>): UseDataConnectMutationResult<DeleteDeviceData, DeleteDeviceVariables>;

export function useUpdateDevice(options?: useDataConnectMutationOptions<UpdateDeviceData, FirebaseError, UpdateDeviceVariables>): UseDataConnectMutationResult<UpdateDeviceData, UpdateDeviceVariables>;
export function useUpdateDevice(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateDeviceData, FirebaseError, UpdateDeviceVariables>): UseDataConnectMutationResult<UpdateDeviceData, UpdateDeviceVariables>;

export function useGetDevice(vars: GetDeviceVariables, options?: useDataConnectQueryOptions<GetDeviceData>): UseDataConnectQueryResult<GetDeviceData, GetDeviceVariables>;
export function useGetDevice(dc: DataConnect, vars: GetDeviceVariables, options?: useDataConnectQueryOptions<GetDeviceData>): UseDataConnectQueryResult<GetDeviceData, GetDeviceVariables>;

export function useListDevices(options?: useDataConnectQueryOptions<ListDevicesData>): UseDataConnectQueryResult<ListDevicesData, undefined>;
export function useListDevices(dc: DataConnect, options?: useDataConnectQueryOptions<ListDevicesData>): UseDataConnectQueryResult<ListDevicesData, undefined>;

export function useCreateGuide(options?: useDataConnectMutationOptions<CreateGuideData, FirebaseError, CreateGuideVariables>): UseDataConnectMutationResult<CreateGuideData, CreateGuideVariables>;
export function useCreateGuide(dc: DataConnect, options?: useDataConnectMutationOptions<CreateGuideData, FirebaseError, CreateGuideVariables>): UseDataConnectMutationResult<CreateGuideData, CreateGuideVariables>;

export function useUpsertGuide(options?: useDataConnectMutationOptions<UpsertGuideData, FirebaseError, UpsertGuideVariables>): UseDataConnectMutationResult<UpsertGuideData, UpsertGuideVariables>;
export function useUpsertGuide(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertGuideData, FirebaseError, UpsertGuideVariables>): UseDataConnectMutationResult<UpsertGuideData, UpsertGuideVariables>;

export function useDeleteGuide(options?: useDataConnectMutationOptions<DeleteGuideData, FirebaseError, DeleteGuideVariables>): UseDataConnectMutationResult<DeleteGuideData, DeleteGuideVariables>;
export function useDeleteGuide(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteGuideData, FirebaseError, DeleteGuideVariables>): UseDataConnectMutationResult<DeleteGuideData, DeleteGuideVariables>;

export function useUpdateGuide(options?: useDataConnectMutationOptions<UpdateGuideData, FirebaseError, UpdateGuideVariables>): UseDataConnectMutationResult<UpdateGuideData, UpdateGuideVariables>;
export function useUpdateGuide(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateGuideData, FirebaseError, UpdateGuideVariables>): UseDataConnectMutationResult<UpdateGuideData, UpdateGuideVariables>;

export function useGetGuide(vars: GetGuideVariables, options?: useDataConnectQueryOptions<GetGuideData>): UseDataConnectQueryResult<GetGuideData, GetGuideVariables>;
export function useGetGuide(dc: DataConnect, vars: GetGuideVariables, options?: useDataConnectQueryOptions<GetGuideData>): UseDataConnectQueryResult<GetGuideData, GetGuideVariables>;

export function useListGuides(options?: useDataConnectQueryOptions<ListGuidesData>): UseDataConnectQueryResult<ListGuidesData, undefined>;
export function useListGuides(dc: DataConnect, options?: useDataConnectQueryOptions<ListGuidesData>): UseDataConnectQueryResult<ListGuidesData, undefined>;

export function useCreatePart(options?: useDataConnectMutationOptions<CreatePartData, FirebaseError, CreatePartVariables>): UseDataConnectMutationResult<CreatePartData, CreatePartVariables>;
export function useCreatePart(dc: DataConnect, options?: useDataConnectMutationOptions<CreatePartData, FirebaseError, CreatePartVariables>): UseDataConnectMutationResult<CreatePartData, CreatePartVariables>;

export function useUpsertPart(options?: useDataConnectMutationOptions<UpsertPartData, FirebaseError, UpsertPartVariables>): UseDataConnectMutationResult<UpsertPartData, UpsertPartVariables>;
export function useUpsertPart(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertPartData, FirebaseError, UpsertPartVariables>): UseDataConnectMutationResult<UpsertPartData, UpsertPartVariables>;

export function useDeletePart(options?: useDataConnectMutationOptions<DeletePartData, FirebaseError, DeletePartVariables>): UseDataConnectMutationResult<DeletePartData, DeletePartVariables>;
export function useDeletePart(dc: DataConnect, options?: useDataConnectMutationOptions<DeletePartData, FirebaseError, DeletePartVariables>): UseDataConnectMutationResult<DeletePartData, DeletePartVariables>;

export function useUpdatePart(options?: useDataConnectMutationOptions<UpdatePartData, FirebaseError, UpdatePartVariables>): UseDataConnectMutationResult<UpdatePartData, UpdatePartVariables>;
export function useUpdatePart(dc: DataConnect, options?: useDataConnectMutationOptions<UpdatePartData, FirebaseError, UpdatePartVariables>): UseDataConnectMutationResult<UpdatePartData, UpdatePartVariables>;

export function useGetPart(vars: GetPartVariables, options?: useDataConnectQueryOptions<GetPartData>): UseDataConnectQueryResult<GetPartData, GetPartVariables>;
export function useGetPart(dc: DataConnect, vars: GetPartVariables, options?: useDataConnectQueryOptions<GetPartData>): UseDataConnectQueryResult<GetPartData, GetPartVariables>;

export function useListParts(options?: useDataConnectQueryOptions<ListPartsData>): UseDataConnectQueryResult<ListPartsData, undefined>;
export function useListParts(dc: DataConnect, options?: useDataConnectQueryOptions<ListPartsData>): UseDataConnectQueryResult<ListPartsData, undefined>;

export function useCreateStep(options?: useDataConnectMutationOptions<CreateStepData, FirebaseError, CreateStepVariables>): UseDataConnectMutationResult<CreateStepData, CreateStepVariables>;
export function useCreateStep(dc: DataConnect, options?: useDataConnectMutationOptions<CreateStepData, FirebaseError, CreateStepVariables>): UseDataConnectMutationResult<CreateStepData, CreateStepVariables>;

export function useUpsertStep(options?: useDataConnectMutationOptions<UpsertStepData, FirebaseError, UpsertStepVariables>): UseDataConnectMutationResult<UpsertStepData, UpsertStepVariables>;
export function useUpsertStep(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertStepData, FirebaseError, UpsertStepVariables>): UseDataConnectMutationResult<UpsertStepData, UpsertStepVariables>;

export function useDeleteStep(options?: useDataConnectMutationOptions<DeleteStepData, FirebaseError, DeleteStepVariables>): UseDataConnectMutationResult<DeleteStepData, DeleteStepVariables>;
export function useDeleteStep(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteStepData, FirebaseError, DeleteStepVariables>): UseDataConnectMutationResult<DeleteStepData, DeleteStepVariables>;

export function useUpdateStep(options?: useDataConnectMutationOptions<UpdateStepData, FirebaseError, UpdateStepVariables>): UseDataConnectMutationResult<UpdateStepData, UpdateStepVariables>;
export function useUpdateStep(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateStepData, FirebaseError, UpdateStepVariables>): UseDataConnectMutationResult<UpdateStepData, UpdateStepVariables>;

export function useGetStep(vars: GetStepVariables, options?: useDataConnectQueryOptions<GetStepData>): UseDataConnectQueryResult<GetStepData, GetStepVariables>;
export function useGetStep(dc: DataConnect, vars: GetStepVariables, options?: useDataConnectQueryOptions<GetStepData>): UseDataConnectQueryResult<GetStepData, GetStepVariables>;

export function useListSteps(options?: useDataConnectQueryOptions<ListStepsData>): UseDataConnectQueryResult<ListStepsData, undefined>;
export function useListSteps(dc: DataConnect, options?: useDataConnectQueryOptions<ListStepsData>): UseDataConnectQueryResult<ListStepsData, undefined>;

export function useCreateBookmark(options?: useDataConnectMutationOptions<CreateBookmarkData, FirebaseError, CreateBookmarkVariables>): UseDataConnectMutationResult<CreateBookmarkData, CreateBookmarkVariables>;
export function useCreateBookmark(dc: DataConnect, options?: useDataConnectMutationOptions<CreateBookmarkData, FirebaseError, CreateBookmarkVariables>): UseDataConnectMutationResult<CreateBookmarkData, CreateBookmarkVariables>;

export function useUpsertBookmark(options?: useDataConnectMutationOptions<UpsertBookmarkData, FirebaseError, UpsertBookmarkVariables>): UseDataConnectMutationResult<UpsertBookmarkData, UpsertBookmarkVariables>;
export function useUpsertBookmark(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertBookmarkData, FirebaseError, UpsertBookmarkVariables>): UseDataConnectMutationResult<UpsertBookmarkData, UpsertBookmarkVariables>;

export function useDeleteBookmark(options?: useDataConnectMutationOptions<DeleteBookmarkData, FirebaseError, DeleteBookmarkVariables>): UseDataConnectMutationResult<DeleteBookmarkData, DeleteBookmarkVariables>;
export function useDeleteBookmark(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteBookmarkData, FirebaseError, DeleteBookmarkVariables>): UseDataConnectMutationResult<DeleteBookmarkData, DeleteBookmarkVariables>;

export function useUpdateBookmark(options?: useDataConnectMutationOptions<UpdateBookmarkData, FirebaseError, UpdateBookmarkVariables>): UseDataConnectMutationResult<UpdateBookmarkData, UpdateBookmarkVariables>;
export function useUpdateBookmark(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateBookmarkData, FirebaseError, UpdateBookmarkVariables>): UseDataConnectMutationResult<UpdateBookmarkData, UpdateBookmarkVariables>;

export function useGetMyBookmarks(options?: useDataConnectQueryOptions<GetMyBookmarksData>): UseDataConnectQueryResult<GetMyBookmarksData, undefined>;
export function useGetMyBookmarks(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyBookmarksData>): UseDataConnectQueryResult<GetMyBookmarksData, undefined>;

export function useGetBookmark(vars: GetBookmarkVariables, options?: useDataConnectQueryOptions<GetBookmarkData>): UseDataConnectQueryResult<GetBookmarkData, GetBookmarkVariables>;
export function useGetBookmark(dc: DataConnect, vars: GetBookmarkVariables, options?: useDataConnectQueryOptions<GetBookmarkData>): UseDataConnectQueryResult<GetBookmarkData, GetBookmarkVariables>;
