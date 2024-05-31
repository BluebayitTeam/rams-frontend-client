import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_MUSANEDOKALA,
	UPDATE_MUSANEDOKALA,
	DELETE_MUSANEDOKALA,
	MUSANEDOKALA_BY_PASSENGER_ID
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import MusanedOkalaModel from './docmentSend/models/MusanedOkalaModel';
// import MusanedOkalaModel from './musanedOkala/models/MusanedOkalaModel';

export const addTagTypes = ['musanedOkalas'];
const MusanedOkalaApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getMusanedOkala: build.query({
				query: (musanedOkalaId) => ({
					url: `${MUSANEDOKALA_BY_PASSENGER_ID}${musanedOkalaId}`
				}),
				providesTags: ['musanedOkalas']
			}),
			createMusanedOkala: build.mutation({
				query: (newMusanedOkala) => ({
					url: CREATE_MUSANEDOKALA,
					method: 'POST',
					data: jsonToFormData(
						MusanedOkalaModel({
							...newMusanedOkala
						})
					)
				}),
				invalidatesTags: ['musanedOkalas']
			}),
			updateMusanedOkala: build.mutation({
				query: (musanedOkala) => ({
					url: `${UPDATE_MUSANEDOKALA}${musanedOkala.id}`,
					method: 'PUT',
					data: jsonToFormData({
						...musanedOkala
					})
				}),
				invalidatesTags: ['musanedOkalas']
			}),
			deleteMusanedOkala: build.mutation({
				query: (musanedOkalaId) => ({
					url: `${DELETE_MUSANEDOKALA}${musanedOkalaId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['musanedOkalas']
			})
		}),
		overrideExisting: false
	});
export default MusanedOkalaApi;
export const {
	useGetMusanedOkalasQuery,
	useDeleteMusanedOkalasMutation,
	useGetMusanedOkalaQuery,
	useUpdateMusanedOkalaMutation,
	useDeleteMusanedOkalaMutation,
	useCreateMusanedOkalaMutation
} = MusanedOkalaApi;

export const selectFilteredMusanedOkalas = (musanedOkalas) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return musanedOkalas;
		}

		return FuseUtils.filterArrayByString(musanedOkalas, searchText);
	});
