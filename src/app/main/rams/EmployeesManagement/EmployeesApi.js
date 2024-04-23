import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	CREATE_EMPLOYEE,
	DELETE_EMPLOYEE,
	GET_EMPLOYEES,
	GET_EMPLOYEE_BY_ID,
	UPDATE_EMPLOYEE
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import EmployeeModel from './employee/models/EmployeeModel';

export const addTagTypes = ['employees'];
const EmployeeApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getEmployees: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_EMPLOYEES, params: { page, size, searchKey } }),
				providesTags: ['employees']
			}),
			deleteEmployees: build.mutation({
				query: (employeeIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: employeeIds
				}),
				invalidatesTags: ['employees']
			}),
			getEmployee: build.query({
				query: (employeeId) => ({
					url: `${GET_EMPLOYEE_BY_ID}${employeeId}`
				}),
				providesTags: ['employees']
			}),
			createEmployee: build.mutation({
				query: (newEmployee) => ({
					url: CREATE_EMPLOYEE,
					method: 'POST',
					data: jsonToFormData(EmployeeModel(newEmployee))
				}),
				invalidatesTags: ['employees']
			}),
			updateEmployee: build.mutation({
				query: (employee) => ({
					url: `${UPDATE_EMPLOYEE}${employee.id}`,
					method: 'PUT',
					data: jsonToFormData(employee)
				}),
				invalidatesTags: ['employees']
			}),
			deleteEmployee: build.mutation({
				query: (employeeId) => ({
					url: `${DELETE_EMPLOYEE}${employeeId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['employees']
			})
		}),
		overrideExisting: false
	});
export default EmployeeApi;
export const {
	useGetEmployeesQuery,
	useDeleteEmployeesMutation,
	useGetEmployeeQuery,
	useUpdateEmployeeMutation,
	useDeleteEmployeeMutation,

	useCreateEmployeeMutation
} = EmployeeApi;

export const selectFilteredEmployees = (employees) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return employees;
		}

		return FuseUtils.filterArrayByString(employees, searchText);
	});
