import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_DEPARTMENT,
	DELETE_DEPARTMENT,
	DELETE_DEPARTMENT_MULTIPLE,
	GET_DEPARTMENTS,
	GET_DEPARTMENT_BY_ID,
	UPDATE_DEPARTMENT
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import DepartmentModel from './department/models/DepartmentModel';

export const addTagTypes = ['departments'];
const DepartmentApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getDepartments: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_DEPARTMENTS, params: { page, size, searchKey } }),
				providesTags: ['departments']
			}),
			deleteDepartments: build.mutation({
				query: (departmentIds) => ({
					url: DELETE_DEPARTMENT_MULTIPLE,
					method: 'DELETE',
					data: { ids: departmentIds }
				}),
				invalidatesTags: ['departments']
			}),
			getDepartment: build.query({
				query: (departmentId) => ({
					url: `${GET_DEPARTMENT_BY_ID}${departmentId}`
				}),
				providesTags: ['departments']
			}),
			createDepartment: build.mutation({
				query: (newDepartment) => ({
					url: CREATE_DEPARTMENT,
					method: 'POST',
					data: jsonToFormData(DepartmentModel(newDepartment))
				}),
				invalidatesTags: ['departments']
			}),
			updateDepartment: build.mutation({
				query: (department) => ({
					url: `${UPDATE_DEPARTMENT}${department.id}`,
					method: 'PUT',
					data: jsonToFormData(department)
				}),
				invalidatesTags: ['departments']
			}),
			deleteDepartment: build.mutation({
				query: (departmentId) => ({
					url: `${DELETE_DEPARTMENT}${departmentId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['departments']
			})
		}),
		overrideExisting: false
	});
export default DepartmentApi;
export const {
	useGetDepartmentsQuery,
	useDeleteDepartmentsMutation,
	useGetDepartmentQuery,
	useUpdateDepartmentMutation,
	useDeleteDepartmentMutation,

	useCreateDepartmentMutation
} = DepartmentApi;

export const selectFilteredDepartments = (departments) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return departments;
		}

		return FuseUtils.filterArrayByString(departments, searchText);
	});
