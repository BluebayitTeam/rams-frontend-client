import { createApi } from '@reduxjs/toolkit/query/react';
import Axios from 'axios';

const axiosBaseQuery =
	() =>
	async ({ url, method, data, params }) => {
		try {
			Axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');
			Axios.defaults.baseURL = '/api';
			const result = await Axios({
				url,
				method,
				data,
				params
			});
			return { data: result.data };
		} catch (axiosError) {
			const error = axiosError;
			return {
				error
			};
		}
	};
export const apiService = createApi({
	baseQuery: axiosBaseQuery(),
	endpoints: () => ({}),
	reducerPath: 'apiService'
});
export default apiService;
