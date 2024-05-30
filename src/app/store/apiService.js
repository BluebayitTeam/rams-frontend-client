import { createApi } from '@reduxjs/toolkit/query/react';
import Axios from 'axios';
import Swal from 'sweetalert2';

const axiosBaseQuery =
	() =>
	async ({ url, method, data, params }) => {
		console.log(`jbsjbdf`, url, method, data, params);
		try {
			if (url) {
				Axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');
				Axios.defaults.baseURL = '/api';
				const result = await Axios({
					url,
					method,
					data,
					params
				});
				return { data: result.data };
			}

			return data;
		} catch (axiosError) {
			const error = axiosError;
			console.log(`jsadkjsbakdf`, error?.response?.data?.detail);
			Swal.fire({
				position: 'top-center',
				icon: 'error',
				title: `${error?.response?.data?.detail}`,
				showConfirmButton: false,
				timer: 4000
			});
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
