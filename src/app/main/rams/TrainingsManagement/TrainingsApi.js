import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_TRAINING,
	UPDATE_TRAINING,
	DELETE_TRAINING,
	TRAINING_BY_PASSENGER_ID
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import moment from 'moment';
import { selectSearchText } from './store/searchTextSlice';
import TrainingModel from './training/models/TrainingModel';

export const addTagTypes = ['trainings'];
const TrainingApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getTraining: build.query({
				query: (trainingId) => ({
					url: `${TRAINING_BY_PASSENGER_ID}${trainingId}`
				}),
				providesTags: ['trainings']
			}),
			createTraining: build.mutation({
				query: (newTraining) => ({
					url: CREATE_TRAINING,
					method: 'POST',
					data: jsonToFormData(
						TrainingModel({
							...newTraining,
							admission_date: moment(new Date(newTraining?.admission_date)).format('YYYY-MM-DD'),
							certificate_date: moment(new Date(newTraining?.certificate_date)).format('YYYY-MM-DD')
						})
					)
				}),
				invalidatesTags: ['trainings']
			}),
			updateTraining: build.mutation({
				query: (training) => ({
					url: `${UPDATE_TRAINING}${training.id}`,
					method: 'PUT',
					data: jsonToFormData({
						...training,
						admission_date: moment(new Date(training?.admission_date)).format('YYYY-MM-DD'),
						certificate_date: moment(new Date(training?.certificate_date)).format('YYYY-MM-DD')
					})
				}),
				invalidatesTags: ['trainings']
			}),
			deleteTraining: build.mutation({
				query: (trainingId) => ({
					url: `${DELETE_TRAINING}${trainingId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['trainings']
			})
		}),
		overrideExisting: false
	});
export default TrainingApi;
export const {
	useGetTrainingsQuery,
	useDeleteTrainingsMutation,
	useGetTrainingQuery,
	useUpdateTrainingMutation,
	useDeleteTrainingMutation,
	useCreateTrainingMutation
} = TrainingApi;

export const selectFilteredTrainings = (trainings) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return trainings;
		}

		return FuseUtils.filterArrayByString(trainings, searchText);
	});
