import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_COUNTRY,
	DELETE_COUNTRY,
	DELETE_COUNTRY_MULTIPLE,
	GET_COUNTRYS,
	GET_COUNTRY_BY_ID,
	UPDATE_COUNTRY
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import CountryModel from './country/models/CountryModel';

export const addTagTypes = ['countrys'];
const CountryApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCountrys: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_COUNTRYS, params: { page, size, searchKey } }),
				providesTags: ['countrys']
			}),
			deleteCountrys: build.mutation({
				query: (countryIds) => ({
					url: DELETE_COUNTRY_MULTIPLE,
					method: 'DELETE',
					data: { ids: countryIds }
				}),
				invalidatesTags: ['countrys']
			}),
			getCountry: build.query({
				query: (countryId) => ({
					url: `${GET_COUNTRY_BY_ID}${countryId}`
				}),
				providesTags: ['countrys']
			}),
			createCountry: build.mutation({
				query: (newCountry) => ({
					url: CREATE_COUNTRY,
					method: 'POST',
					data: jsonToFormData(CountryModel(newCountry))
				}),
				invalidatesTags: ['countrys']
			}),
			updateCountry: build.mutation({
				query: (country) => ({
					url: `${UPDATE_COUNTRY}${country.id}`,
					method: 'PUT',
					data: jsonToFormData(country)
				}),
				invalidatesTags: ['countrys']
			}),
			deleteCountry: build.mutation({
				query: (countryId) => ({
					url: `${DELETE_COUNTRY}${countryId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['countrys']
			})
		}),
		overrideExisting: false
	});
export default CountryApi;
export const {
	useGetCountrysQuery,
	useDeleteCountrysMutation,
	useGetCountryQuery,
	useUpdateCountryMutation,
	useDeleteCountryMutation,

	useCreateCountryMutation
} = CountryApi;

export const selectFilteredCountrys = (countrys) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return countrys;
		}

		return FuseUtils.filterArrayByString(countrys, searchText);
	});
