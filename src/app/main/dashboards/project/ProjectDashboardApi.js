import { apiService as api } from 'app/store/apiService';
import { GET_MEDICAL_COUNT } from 'src/app/constant/constants';

export const addTagTypes = [
  'project_dashboard_widgets',
  'project_dashboard_projects',
];
const ProjectDashboardApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getProjectDashboardWidgets: build.query({
        query: () => ({ url: GET_MEDICAL_COUNT }),
        providesTags: ['project_dashboard_widgets'],
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
  useGetProjectDashboardWidgetsQuery,
  useGetProjectDashboardProjectsQuery,
} = ProjectDashboardApi;
export const selectWidget = (id) => (state) => {
  const widgets =
    ProjectDashboardApi.endpoints.getProjectDashboardWidgets.select()(
      state
    )?.data;
  return widgets?.[id];
};
