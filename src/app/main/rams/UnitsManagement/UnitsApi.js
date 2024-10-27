import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
  CREATE_UNIT,
  DELETE_UNIT,
  DELETE_UNIT_MULTIPLE,
  GET_UNITS,
  GET_UNIT_BY_ID,
  UPDATE_UNIT,
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import UnitModel from './unit/models/UnitModel';

export const addTagTypes = ['units'];
const UnitApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getUnits: build.query({
        query: ({ page, size, searchKey }) => ({
          url: GET_UNITS,
          params: { page, size, searchKey },
        }),
        providesTags: ['units'],
      }),
      deleteUnits: build.mutation({
        query: (unitIds) => ({
          url: DELETE_UNIT_MULTIPLE,
          method: 'DELETE',
          data: { ids: unitIds },
        }),
        invalidatesTags: ['units'],
      }),
      getUnit: build.query({
        query: (unitId) => ({
          url: `${GET_UNIT_BY_ID}${unitId}`,
        }),
        providesTags: ['units'],
      }),
      createUnit: build.mutation({
        query: (newUnit) => ({
          url: CREATE_UNIT,
          method: 'POST',
          data: jsonToFormData(UnitModel(newUnit)),
        }),
        invalidatesTags: ['units'],
      }),
      updateUnit: build.mutation({
        query: (unit) => ({
          url: `${UPDATE_UNIT}${unit.id}`,
          method: 'PUT',
          data: jsonToFormData(unit),
        }),
        invalidatesTags: ['units'],
      }),
      deleteUnit: build.mutation({
        query: (unitId) => ({
          url: `${DELETE_UNIT}${unitId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['units'],
      }),
    }),
    overrideExisting: false,
  });
export default UnitApi;
export const {
  useGetUnitsQuery,
  useDeleteUnitsMutation,
  useGetUnitQuery,
  useUpdateUnitMutation,
  useDeleteUnitMutation,

  useCreateUnitMutation,
} = UnitApi;

export const selectFilteredUnits = (units) =>
  createSelector([selectSearchText], (searchText) => {
    if (searchText?.length === 0) {
      return units;
    }

    return FuseUtils.filterArrayByString(units, searchText);
  });
