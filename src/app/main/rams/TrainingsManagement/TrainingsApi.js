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
							...newTraining
							// medical_exam_date: moment(new Date(newTraining?.medical_exam_date)).format('YYYY-MM-DD'),
							// medical_report_date: moment(new Date(newTraining?.medical_report_date)).format(
							// 	'YYYY-MM-DD'
							// ),
							// medical_issue_date: moment(new Date(newTraining?.medical_issue_date)).format('YYYY-MM-DD'),
							// medical_expiry_date: moment(new Date(newTraining?.medical_expiry_date)).format('YYYY-MM-DD')
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
						...training
						// medical_exam_date: moment(new Date(training?.medical_exam_date)).format('YYYY-MM-DD'),
						// medical_report_date: moment(new Date(training?.medical_report_date)).format('YYYY-MM-DD'),
						// medical_issue_date: moment(new Date(training?.medical_issue_date)).format('YYYY-MM-DD'),
						// medical_expiry_date: moment(new Date(training?.medical_expiry_date)).format('YYYY-MM-DD')
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
