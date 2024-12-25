import { apiService as api } from 'app/store/apiService';
import { GET_MEDICAL_COUNT } from 'src/app/constant/constants';

export const addTagTypes = [
  'dashboard',
  'project_dashboard_projects',
];
const ProjectDashboardApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getProjectDashboardUpcomingMedical: build.query({
        query: ({ no_of_days }) => ({ url: GET_MEDICAL_COUNT },params: { no_of_days }),
        providesTags: ['dashboard'],
      }),
      getProjectDashboardProjects: build.query({
        query: () => ({ url: `/mock-api/dashboards/project/projects` }),
        providesTags: ['project_dashboard_projects'],
      }),
    }),
    overrideExisting: false,
  });
export default ProjectDashboardApi;
export const {
  useGetProjectDashboardUpcomingMedicalQuery,
  useGetProjectDashboardProjectsQuery,
} = ProjectDashboardApi;
export const selectWidget = (id) => (state) => {
  const widgets =
    ProjectDashboardApi.endpoints.getProjectDashboardUpcomingMedical.select()(
      state
    )?.data;
  return widgets?.[id];
};
