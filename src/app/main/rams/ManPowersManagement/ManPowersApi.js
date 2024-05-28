import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_MANPOWER,
	UPDATE_MANPOWER,
	DELETE_MANPOWER,
	TRAINING_BY_PASSENGER_ID
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import moment from 'moment';
import { selectSearchText } from './store/searchTextSlice';
import ManPowerModel from './manPower/models/ManPowerModel';

export const addTagTypes = ['manPowers'];
const ManPowerApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getManPower: build.query({
				query: (manPowerId) => ({
					url: `${TRAINING_BY_PASSENGER_ID}${manPowerId}`
				}),
				providesTags: ['manPowers']
			}),
			createManPower: build.mutation({
				query: (newManPower) => ({
					url: CREATE_MANPOWER,
					method: 'POST',
					data: jsonToFormData(
						ManPowerModel({
							...newManPower,
							admission_date: moment(new Date(newManPower?.admission_date)).format('YYYY-MM-DD'),
							certificate_date: moment(new Date(newManPower?.certificate_date)).format('YYYY-MM-DD')
						})
					)
				}),
				invalidatesTags: ['manPowers']
			}),
			updateManPower: build.mutation({
				query: (manPower) => ({
					url: `${UPDATE_MANPOWER}${manPower.id}`,
					method: 'PUT',
					data: jsonToFormData({
						...manPower,
						admission_date: moment(new Date(manPower?.admission_date)).format('YYYY-MM-DD'),
						certificate_date: moment(new Date(manPower?.certificate_date)).format('YYYY-MM-DD')
					})
				}),
				invalidatesTags: ['manPowers']
			}),
			deleteManPower: build.mutation({
				query: (manPowerId) => ({
					url: `${DELETE_MANPOWER}${manPowerId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['manPowers']
			})
		}),
		overrideExisting: false
	});
export default ManPowerApi;
export const {
	useGetManPowersQuery,
	useDeleteManPowersMutation,
	useGetManPowerQuery,
	useUpdateManPowerMutation,
	useDeleteManPowerMutation,
	useCreateManPowerMutation
} = ManPowerApi;

export const selectFilteredManPowers = (manPowers) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return manPowers;
		}

		return FuseUtils.filterArrayByString(manPowers, searchText);
	});
