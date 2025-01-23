import { apiService as api } from 'app/store/apiService';
import { GET_DASHBOARD_COUNT_FOR_MALAYSIA } from 'src/app/constant/constants';

// Define the tag types for cache management
export const addTagTypes = ['malaysia', 'MalaysiaDashboardProjects'];

const MalaysiaDashboardApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getMalaysiaDashboard: build.query({
        query: (filterData) => ({
          url: GET_DASHBOARD_COUNT_FOR_MALAYSIA,
          params: filterData,
        }),

        providesTags: ['malaysia'],
      }),
    }),
    overrideExisting: false,
  });

export const { useGetMalaysiaDashboardQuery } = MalaysiaDashboardApi;

export const selectWidget = (id) => (state) => {
  const widgets =
    MalaysiaDashboardApi.endpoints.getMalaysiaDashboardTotalMalaysia.select()(
      state
    )?.data;
  return widgets?.[id];
};

export default MalaysiaDashboardApi;
