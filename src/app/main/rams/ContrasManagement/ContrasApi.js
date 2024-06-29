import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_CONTRA,
	DELETE_CONTRA,
	DELETE_CONTRA_MULTIPLE,
	GET_CONTRAS,
	GET_CONTRA_BY_INVOICE_NO,
	UPDATE_CONTRA
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import ContraModel from './contra/models/ContraModel';

export const addTagTypes = ['contras'];
const ContraApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getContras: build.query({
				query: ({ page, size, searchKey }) => ({
					url: GET_CONTRAS,
					params: { page, size, searchKey }
				}),
				providesTags: ['contras']
			}),
			deleteContras: build.mutation({
				query: (contraIds) => ({
					url: DELETE_CONTRA_MULTIPLE,
					method: 'DELETE',
					data: { ids: contraIds }
				}),
				invalidatesTags: ['contras']
			}),
			getContra: build.query({
				query: (contraId) => ({
					url: `${GET_CONTRA_BY_INVOICE_NO}${contraId}`
				}),
				providesTags: ['contras']
			}),
			createContra: build.mutation({
				query: (newContra) => ({
					url: CREATE_CONTRA,
					method: 'POST',
					data: jsonToFormData(ContraModel(newContra))
				}),
				invalidatesTags: ['contras']
			}),
			updateContra: build.mutation({
				query: (contra) => ({
					url: `${UPDATE_CONTRA}`,
					method: 'PUT',
					data: jsonToFormData(contra)
				}),
				invalidatesTags: ['contras']
			}),
			deleteContra: build.mutation({
				query: (contraId) => ({
					url: `${DELETE_CONTRA}${contraId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['contras']
			})
		}),
		overrideExisting: false
	});
export default ContraApi;
export const {
	useGetContrasQuery,
	useDeleteContrasMutation,
	useGetContraQuery,
	useUpdateContraMutation,
	useDeleteContraMutation,

	useCreateContraMutation
} = ContraApi;

export const selectFilteredContras = (contras) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return contras;
		}

		return FuseUtils.filterArrayByString(contras, searchText);
	});
