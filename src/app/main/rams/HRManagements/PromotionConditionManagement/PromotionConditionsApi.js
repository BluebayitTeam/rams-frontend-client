import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import {
	CREATE_PROMOTION_CONDITION,
	DELETE_PROMOTION_CONDITION,
	GET_PROMOTION_CONDITIONID,
	// DELETE_PROMOTION_CONDITION_MULTIPLE,
	GET_PROMOTION_CONDITIONS,
	UPDATE_PROMOTION_CONDITION
} from 'src/app/constant/constants';
import PromotionConditionModel from './promotionCondition/models/PromotionConditionModel';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['promotionConditions'];
const PromotionConditionApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPromotionConditions: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_PROMOTION_CONDITIONS, params: { page, size, searchKey } }),
				providesTags: ['promotionConditions']
			}),
			deletePromotionConditions: build.mutation({
				query: (promotionConditionIds) => ({
					url: DELETE_PROMOTION_CONDITION,
					// url: DELETE_PROMOTION_CONDITION_MULTIPLE,
					method: 'DELETE',
					data: { ids: promotionConditionIds }
				}),
				invalidatesTags: ['promotionConditions']
			}),
			getPromotionCondition: build.query({
				query: (promotionConditionId) => ({
					url: `${GET_PROMOTION_CONDITIONID}${promotionConditionId}`
				}),
				providesTags: ['promotionConditions']
			}),
			createPromotionCondition: build.mutation({
				query: (newPromotionCondition) => ({
					url: CREATE_PROMOTION_CONDITION,
					method: 'POST',
					data: PromotionConditionModel(newPromotionCondition)
				}),
				invalidatesTags: ['promotionConditions']
			}),
			updatePromotionCondition: build.mutation({
				query: (promotionCondition) => ({
					url: `${UPDATE_PROMOTION_CONDITION}${promotionCondition.id}`,
					method: 'PUT',
					data: promotionCondition
				}),
				invalidatesTags: ['promotionConditions']
			}),
			deletePromotionCondition: build.mutation({
				query: (promotionConditionId) => ({
					url: `${DELETE_PROMOTION_CONDITION}${promotionConditionId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['promotionConditions']
			})
		}),
		overrideExisting: false
	});
export default PromotionConditionApi;
export const {
	useGetPromotionConditionsQuery,
	useDeletePromotionConditionsMutation,
	useGetPromotionConditionQuery,
	useUpdatePromotionConditionMutation,
	useDeletePromotionConditionMutation,

	useCreatePromotionConditionMutation
} = PromotionConditionApi;

export const selectFilteredPromotionConditions = (promotionConditions) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return promotionConditions;
		}

		return FuseUtils.filterArrayByString(promotionConditions, searchText);
	});
