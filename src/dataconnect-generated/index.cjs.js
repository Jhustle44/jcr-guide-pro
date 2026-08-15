const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'jcr-guide-pro-source',
  location: 'us-south1'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
exports.dataConnectSettings = dataConnectSettings;

const createCategoryRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCategory');
}
createCategoryRef.operationName = 'CreateCategory';
exports.createCategoryRef = createCategoryRef;

exports.createCategory = function createCategory(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(createCategoryRef(dcInstance, inputVars));
}
;

const upsertCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertCategory', inputVars);
}
upsertCategoryRef.operationName = 'UpsertCategory';
exports.upsertCategoryRef = upsertCategoryRef;

exports.upsertCategory = function upsertCategory(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertCategoryRef(dcInstance, inputVars));
}
;

const deleteCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteCategory', inputVars);
}
deleteCategoryRef.operationName = 'DeleteCategory';
exports.deleteCategoryRef = deleteCategoryRef;

exports.deleteCategory = function deleteCategory(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteCategoryRef(dcInstance, inputVars));
}
;

const updateCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCategory', inputVars);
}
updateCategoryRef.operationName = 'UpdateCategory';
exports.updateCategoryRef = updateCategoryRef;

exports.updateCategory = function updateCategory(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateCategoryRef(dcInstance, inputVars));
}
;

const getCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCategory', inputVars);
}
getCategoryRef.operationName = 'GetCategory';
exports.getCategoryRef = getCategoryRef;

exports.getCategory = function getCategory(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCategoryRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listCategoriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCategories');
}
listCategoriesRef.operationName = 'ListCategories';
exports.listCategoriesRef = listCategoriesRef;

exports.listCategories = function listCategories(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listCategoriesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createDeviceRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateDevice');
}
createDeviceRef.operationName = 'CreateDevice';
exports.createDeviceRef = createDeviceRef;

exports.createDevice = function createDevice(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(createDeviceRef(dcInstance, inputVars));
}
;

const upsertDeviceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertDevice', inputVars);
}
upsertDeviceRef.operationName = 'UpsertDevice';
exports.upsertDeviceRef = upsertDeviceRef;

exports.upsertDevice = function upsertDevice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertDeviceRef(dcInstance, inputVars));
}
;

const deleteDeviceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteDevice', inputVars);
}
deleteDeviceRef.operationName = 'DeleteDevice';
exports.deleteDeviceRef = deleteDeviceRef;

exports.deleteDevice = function deleteDevice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteDeviceRef(dcInstance, inputVars));
}
;

const updateDeviceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateDevice', inputVars);
}
updateDeviceRef.operationName = 'UpdateDevice';
exports.updateDeviceRef = updateDeviceRef;

exports.updateDevice = function updateDevice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateDeviceRef(dcInstance, inputVars));
}
;

const getDeviceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDevice', inputVars);
}
getDeviceRef.operationName = 'GetDevice';
exports.getDeviceRef = getDeviceRef;

exports.getDevice = function getDevice(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getDeviceRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listDevicesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListDevices');
}
listDevicesRef.operationName = 'ListDevices';
exports.listDevicesRef = listDevicesRef;

exports.listDevices = function listDevices(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listDevicesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createGuideRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateGuide', inputVars);
}
createGuideRef.operationName = 'CreateGuide';
exports.createGuideRef = createGuideRef;

exports.createGuide = function createGuide(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createGuideRef(dcInstance, inputVars));
}
;

const upsertGuideRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertGuide', inputVars);
}
upsertGuideRef.operationName = 'UpsertGuide';
exports.upsertGuideRef = upsertGuideRef;

exports.upsertGuide = function upsertGuide(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertGuideRef(dcInstance, inputVars));
}
;

const deleteGuideRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteGuide', inputVars);
}
deleteGuideRef.operationName = 'DeleteGuide';
exports.deleteGuideRef = deleteGuideRef;

exports.deleteGuide = function deleteGuide(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteGuideRef(dcInstance, inputVars));
}
;

const updateGuideRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateGuide', inputVars);
}
updateGuideRef.operationName = 'UpdateGuide';
exports.updateGuideRef = updateGuideRef;

exports.updateGuide = function updateGuide(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateGuideRef(dcInstance, inputVars));
}
;

const getGuideRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGuide', inputVars);
}
getGuideRef.operationName = 'GetGuide';
exports.getGuideRef = getGuideRef;

exports.getGuide = function getGuide(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getGuideRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listGuidesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListGuides');
}
listGuidesRef.operationName = 'ListGuides';
exports.listGuidesRef = listGuidesRef;

exports.listGuides = function listGuides(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listGuidesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createPartRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePart', inputVars);
}
createPartRef.operationName = 'CreatePart';
exports.createPartRef = createPartRef;

exports.createPart = function createPart(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createPartRef(dcInstance, inputVars));
}
;

const upsertPartRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertPart', inputVars);
}
upsertPartRef.operationName = 'UpsertPart';
exports.upsertPartRef = upsertPartRef;

exports.upsertPart = function upsertPart(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertPartRef(dcInstance, inputVars));
}
;

const deletePartRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeletePart', inputVars);
}
deletePartRef.operationName = 'DeletePart';
exports.deletePartRef = deletePartRef;

exports.deletePart = function deletePart(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deletePartRef(dcInstance, inputVars));
}
;

const updatePartRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePart', inputVars);
}
updatePartRef.operationName = 'UpdatePart';
exports.updatePartRef = updatePartRef;

exports.updatePart = function updatePart(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updatePartRef(dcInstance, inputVars));
}
;

const getPartRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPart', inputVars);
}
getPartRef.operationName = 'GetPart';
exports.getPartRef = getPartRef;

exports.getPart = function getPart(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getPartRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listPartsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListParts');
}
listPartsRef.operationName = 'ListParts';
exports.listPartsRef = listPartsRef;

exports.listParts = function listParts(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listPartsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createStepRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateStep', inputVars);
}
createStepRef.operationName = 'CreateStep';
exports.createStepRef = createStepRef;

exports.createStep = function createStep(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createStepRef(dcInstance, inputVars));
}
;

const upsertStepRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertStep', inputVars);
}
upsertStepRef.operationName = 'UpsertStep';
exports.upsertStepRef = upsertStepRef;

exports.upsertStep = function upsertStep(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertStepRef(dcInstance, inputVars));
}
;

const deleteStepRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteStep', inputVars);
}
deleteStepRef.operationName = 'DeleteStep';
exports.deleteStepRef = deleteStepRef;

exports.deleteStep = function deleteStep(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteStepRef(dcInstance, inputVars));
}
;

const updateStepRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateStep', inputVars);
}
updateStepRef.operationName = 'UpdateStep';
exports.updateStepRef = updateStepRef;

exports.updateStep = function updateStep(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateStepRef(dcInstance, inputVars));
}
;

const getStepRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStep', inputVars);
}
getStepRef.operationName = 'GetStep';
exports.getStepRef = getStepRef;

exports.getStep = function getStep(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getStepRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listStepsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSteps');
}
listStepsRef.operationName = 'ListSteps';
exports.listStepsRef = listStepsRef;

exports.listSteps = function listSteps(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listStepsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createBookmarkRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateBookmark', inputVars);
}
createBookmarkRef.operationName = 'CreateBookmark';
exports.createBookmarkRef = createBookmarkRef;

exports.createBookmark = function createBookmark(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createBookmarkRef(dcInstance, inputVars));
}
;

const upsertBookmarkRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertBookmark', inputVars);
}
upsertBookmarkRef.operationName = 'UpsertBookmark';
exports.upsertBookmarkRef = upsertBookmarkRef;

exports.upsertBookmark = function upsertBookmark(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertBookmarkRef(dcInstance, inputVars));
}
;

const deleteBookmarkRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteBookmark', inputVars);
}
deleteBookmarkRef.operationName = 'DeleteBookmark';
exports.deleteBookmarkRef = deleteBookmarkRef;

exports.deleteBookmark = function deleteBookmark(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteBookmarkRef(dcInstance, inputVars));
}
;

const updateBookmarkRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateBookmark', inputVars);
}
updateBookmarkRef.operationName = 'UpdateBookmark';
exports.updateBookmarkRef = updateBookmarkRef;

exports.updateBookmark = function updateBookmark(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateBookmarkRef(dcInstance, inputVars));
}
;

const getMyBookmarksRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyBookmarks');
}
getMyBookmarksRef.operationName = 'GetMyBookmarks';
exports.getMyBookmarksRef = getMyBookmarksRef;

exports.getMyBookmarks = function getMyBookmarks(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getMyBookmarksRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getBookmarkRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetBookmark', inputVars);
}
getBookmarkRef.operationName = 'GetBookmark';
exports.getBookmarkRef = getBookmarkRef;

exports.getBookmark = function getBookmark(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getBookmarkRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;
