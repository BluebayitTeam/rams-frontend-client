import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { CREATE_FLIGHT, UPDATE_FLIGHT, DELETE_FLIGHT, FLIGHT_BY_PASSENGER_ID } from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import FlightModel from './flight/models/FlightModel';

export const addTagTypes = ['flights'];
const FlightApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getFlight: build.query({
				query: (flightId) => ({
					url: `${FLIGHT_BY_PASSENGER_ID}${flightId}`
				}),
				providesTags: ['flights']
			}),
			createFlight: build.mutation({
				query: (newFlight) => ({
					url: CREATE_FLIGHT,
					method: 'POST',
					data: jsonToFormData(FlightModel(newFlight))
				}),
				invalidatesTags: ['flights']
			}),
			updateFlight: build.mutation({
				query: (flight) => ({
					url: `${UPDATE_FLIGHT}${flight.id}`,
					method: 'PUT',
					data: jsonToFormData(flight)
				}),
				invalidatesTags: ['flights']
			}),
			deleteFlight: build.mutation({
				query: (flightId) => ({
					url: `${DELETE_FLIGHT}${flightId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['flights']
			})
		}),
		overrideExisting: false
	});
export default FlightApi;
export const {
	useGetFlightsQuery,
	useDeleteFlightsMutation,
	useGetFlightQuery,
	useUpdateFlightMutation,
	useDeleteFlightMutation,
	useCreateFlightMutation
} = FlightApi;

export const selectFilteredFlights = (flights) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return flights;
		}

		return FuseUtils.filterArrayByString(flights, searchText);
	});
