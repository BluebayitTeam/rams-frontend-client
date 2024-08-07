import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_CURRENCY,
	DELETE_CURRENCY,
	DELETE_CURRENCY_MULTIPLE,
	GET_CURRENCYS,
	GET_CURRENCY_BY_ID,
	UPDATE_CURRENCY
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import CurrencyModel from './currency/models/CurrencyModel';

export const addTagTypes = ['currencys'];
const CurrencyApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCurrencys: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_CURRENCYS, params: { page, size, searchKey } }),
				providesTags: ['currencys']
			}),
			deleteCurrencys: build.mutation({
				query: (currencyIds) => ({
					url: DELETE_CURRENCY_MULTIPLE,
					method: 'DELETE',
					data: { ids: currencyIds }
				}),
				invalidatesTags: ['currencys']
			}),
			getCurrency: build.query({
				query: (currencyId) => ({
					url: `${GET_CURRENCY_BY_ID}${currencyId}`
				}),
				providesTags: ['currencys']
			}),
			createCurrency: build.mutation({
				query: (newCurrency) => ({
					url: CREATE_CURRENCY,
					method: 'POST',
					data: jsonToFormData(CurrencyModel(newCurrency))
				}),
				invalidatesTags: ['currencys']
			}),
			updateCurrency: build.mutation({
				query: (currency) => ({
					url: `${UPDATE_CURRENCY}${currency.id}`,
					method: 'PUT',
					data: jsonToFormData(currency)
				}),
				invalidatesTags: ['currencys']
			}),
			deleteCurrency: build.mutation({
				query: (currencyId) => ({
					url: `${DELETE_CURRENCY}${currencyId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['currencys']
			})
		}),
		overrideExisting: false
	});
export default CurrencyApi;
export const {
	useGetCurrencysQuery,
	useDeleteCurrencysMutation,
	useGetCurrencyQuery,
	useUpdateCurrencyMutation,
	useDeleteCurrencyMutation,

	useCreateCurrencyMutation
} = CurrencyApi;

export const selectFilteredCurrencys = (currencys) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return currencys;
		}

		return FuseUtils.filterArrayByString(currencys, searchText);
	});
