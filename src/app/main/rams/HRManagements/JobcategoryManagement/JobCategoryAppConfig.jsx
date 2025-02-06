import { Navigate } from 'react-router-dom';
import JobCategoryApp from './JobCategoryApp';
import JobCategory from './jobCategory/JobCategory';
import JobCategorys from './jobCategorys/JobCategorys';

/**
 * The E-Commerce app configuration.
 */

// apps/jobCategory/jobCategorys

const JobCategoryAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/jobCategory',
			element: <JobCategoryApp />,
			children: [
				{
					path: '',
					element: <Navigate to="jobCategorys" />
				},
				{
					path: 'jobCategorys',
					element: <JobCategorys />
				},
				{
					path: 'jobCategorys/:jobCategoryId/*',
					element: <JobCategory />
				}
			]
		}
	]
};
export default JobCategoryAppConfig;
