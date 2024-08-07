import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_PROFESSION,
	DELETE_PROFESSION,
	DELETE_PROFESSION_MULTIPLE,
	GET_PROFESSIONS,
	GET_PROFESSION_BY_ID,
	UPDATE_PROFESSION
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import ProfessionModel from './profession/models/ProfessionModel';

export const addTagTypes = ['professions'];
const ProfessionApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getProfessions: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_PROFESSIONS, params: { page, size, searchKey } }),
				providesTags: ['professions']
			}),
			deleteProfessions: build.mutation({
				query: (professionIds) => ({
					url: DELETE_PROFESSION_MULTIPLE,
					method: 'DELETE',
					data: { ids: professionIds }
				}),
				invalidatesTags: ['professions']
			}),
			getProfession: build.query({
				query: (professionId) => ({
					url: `${GET_PROFESSION_BY_ID}${professionId}`
				}),
				providesTags: ['professions']
			}),
			createProfession: build.mutation({
				query: (newProfession) => ({
					url: CREATE_PROFESSION,
					method: 'POST',
					data: jsonToFormData(ProfessionModel(newProfession))
				}),
				invalidatesTags: ['professions']
			}),
			updateProfession: build.mutation({
				query: (profession) => ({
					url: `${UPDATE_PROFESSION}${profession.id}`,
					method: 'PUT',
					data: jsonToFormData(profession)
				}),
				invalidatesTags: ['professions']
			}),
			deleteProfession: build.mutation({
				query: (professionId) => ({
					url: `${DELETE_PROFESSION}${professionId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['professions']
			})
		}),
		overrideExisting: false
	});
export default ProfessionApi;
export const {
	useGetProfessionsQuery,
	useDeleteProfessionsMutation,
	useGetProfessionQuery,
	useUpdateProfessionMutation,
	useDeleteProfessionMutation,

	useCreateProfessionMutation
} = ProfessionApi;

export const selectFilteredProfessions = (professions) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return professions;
		}

		return FuseUtils.filterArrayByString(professions, searchText);
	});
