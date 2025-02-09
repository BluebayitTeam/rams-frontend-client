import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import {
	CREATE_PROMOTION_CANDIDATE,
	DELETE_PROMOTION_CANDIDATE,
	GET_PREVIOUS_PROMOTION_LIST_OF_EMPLOYEE,
	// DELETE_PROMOTION_CANDIDATE_MULTIPLE,
	GET_PROMOTED_CANDIDATE_LIST,
	UPDATE_PROMOTION_CANDIDATE
} from 'src/app/constant/constants';
import PromotionModel from './promotion/models/PromotionModel';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['promotions'];
const PromotionApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPromotions: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_PROMOTED_CANDIDATE_LIST, params: { page, size, searchKey } }),
				providesTags: ['promotions']
			}),
			deletePromotions: build.mutation({
				query: (promotionIds) => ({
					url: DELETE_PROMOTION_CANDIDATE,
					// url: DELETE_PROMOTION_CANDIDATE_MULTIPLE,
					method: 'DELETE',
					data: { ids: promotionIds }
				}),
				invalidatesTags: ['promotions']
			}),
			getPromotion: build.query({
				query: (promotionId) => ({
					url: `${GET_PREVIOUS_PROMOTION_LIST_OF_EMPLOYEE}${promotionId}`
				}),
				providesTags: ['promotions']
			}),
			createPromotion: build.mutation({
				query: (newPromotion) => ({
					url: CREATE_PROMOTION_CANDIDATE,
					method: 'POST',
					data: PromotionModel(newPromotion)
				}),
				invalidatesTags: ['promotions']
			}),
			updatePromotion: build.mutation({
				query: (promotion) => ({
					url: `${UPDATE_PROMOTION_CANDIDATE}${promotion.id}`,
					method: 'PUT',
					data: promotion
				}),
				invalidatesTags: ['promotions']
			}),
			deletePromotion: build.mutation({
				query: (promotionId) => ({
					url: `${DELETE_PROMOTION_CANDIDATE}${promotionId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['promotions']
			})
		}),
		overrideExisting: false
	});
export default PromotionApi;
export const {
	useGetPromotionsQuery,
	useDeletePromotionsMutation,
	useGetPromotionQuery,
	useUpdatePromotionMutation,
	useDeletePromotionMutation,

	useCreatePromotionMutation
} = PromotionApi;

export const selectFilteredPromotions = (promotions) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return promotions;
		}

		return FuseUtils.filterArrayByString(promotions, searchText);
	});
