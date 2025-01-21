import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
	CREATE_CALCULATION_TYPE,
	DELETE_CALCULATION_TYPE,
	DELETE_CALCULATION_TYPE_MULTIPLE,
	GET_CALCULATION_TYPES,
	GET_CALCULATION_TYPE_BY_ID,
	UPDATE_CALCULATION_TYPE
} from 'src/app/constant/constants';
import CalculationTypeModel from './calculationType/models/CalculationTypeModel';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['calculationTypes'];
const CalculationTypeApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCalculationTypes: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_CALCULATION_TYPES, params: { page, size, searchKey } }),
				providesTags: ['calculationTypes']
			}),
			deleteCalculationTypes: build.mutation({
				query: (calculationTypeIds) => ({
					url: DELETE_CALCULATION_TYPE_MULTIPLE,
					method: 'DELETE',
					data: { ids: calculationTypeIds }
				}),
				invalidatesTags: ['calculationTypes']
			}),
			getCalculationType: build.query({
				query: (calculationTypeId) => ({
					url: `${GET_CALCULATION_TYPE_BY_ID}${calculationTypeId}`
				}),
				providesTags: ['calculationTypes']
			}),
			createCalculationType: build.mutation({
				query: (newCalculationType) => ({
					url: CREATE_CALCULATION_TYPE,
					method: 'POST',
					data: jsonToFormData(CalculationTypeModel(newCalculationType))
				}),
				invalidatesTags: ['calculationTypes']
			}),
			updateCalculationType: build.mutation({
				query: (calculationType) => ({
					url: `${UPDATE_CALCULATION_TYPE}${calculationType.id}`,
					method: 'PUT',
					data: jsonToFormData(calculationType)
				}),
				invalidatesTags: ['calculationTypes']
			}),
			deleteCalculationType: build.mutation({
				query: (calculationTypeId) => ({
					url: `${DELETE_CALCULATION_TYPE}${calculationTypeId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['calculationTypes']
			})
		}),
		overrideExisting: false
	});
export default CalculationTypeApi;
export const {
	useGetCalculationTypesQuery,
	useDeleteCalculationTypesMutation,
	useGetCalculationTypeQuery,
	useUpdateCalculationTypeMutation,
	useDeleteCalculationTypeMutation,

	useCreateCalculationTypeMutation
} = CalculationTypeApi;

export const selectFilteredCalculationTypes = (calculationTypes) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return calculationTypes;
		}

		return FuseUtils.filterArrayByString(calculationTypes, searchText);
	});
