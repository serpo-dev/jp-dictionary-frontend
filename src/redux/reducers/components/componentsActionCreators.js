import componentsActionTypes from "./componentsActionTypes";

export const getComponentsActionCreator = (allComponents) => ({
  type: componentsActionTypes.GET_COMPONENTS,
  payload: allComponents,
});
