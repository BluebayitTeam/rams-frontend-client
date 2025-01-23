import { apiService as api } from 'app/store/apiService';
import { GET_DASHBOARD_COUNT_FOR_SAUDI } from 'src/app/constant/constants';

// Define the tag types for cache management
export const addTagTypes = ['saudi', 'SaudiDashboardProjects'];

const SaudiDashboardApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getSaudiDashboardTotalSaudi: build.query({
        query: (filterData) => ({
          url: GET_DASHBOARD_COUNT_FOR_SAUDI,
          params: filterData,
        }),

        providesTags: ['saudi'],
      }),
    }),
    overrideExisting: false,
  });

export const { useGetSaudiDashboardTotalSaudiQuery } = SaudiDashboardApi;

export const selectWidget = (id) => (state) => {
  const widgets =
    SaudiDashboardApi.endpoints.getSaudiDashboardTotalSaudi.select()(
      state
    )?.data;
  return widgets?.[id];
};

export default SaudiDashboardApi;
