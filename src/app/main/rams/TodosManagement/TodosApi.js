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
import TodoModel from './todo/models/TodoModel';

export const addTagTypes = ['todos'];
const TodoApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getTodos: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_DEPARTMENTS, params: { page, size, searchKey } }),
				providesTags: ['todos']
			}),
			deleteTodos: build.mutation({
				query: (todoIds) => ({
					url: DELETE_DEPARTMENT_MULTIPLE,
					method: 'DELETE',
					data: { ids: todoIds }
				}),
				invalidatesTags: ['todos']
			}),
			getTodo: build.query({
				query: (todoId) => ({
					url: `${GET_DEPARTMENT_BY_ID}${todoId}`
				}),
				providesTags: ['todos']
			}),
			createTodo: build.mutation({
				query: (newTodo) => ({
					url: CREATE_DEPARTMENT,
					method: 'POST',
					data: jsonToFormData(TodoModel(newTodo))
				}),
				invalidatesTags: ['todos']
			}),
			updateTodo: build.mutation({
				query: (todo) => ({
					url: `${UPDATE_DEPARTMENT}${todo.id}`,
					method: 'PUT',
					data: jsonToFormData(todo)
				}),
				invalidatesTags: ['todos']
			}),
			deleteTodo: build.mutation({
				query: (todoId) => ({
					url: `${DELETE_DEPARTMENT}${todoId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['todos']
			})
		}),
		overrideExisting: false
	});
export default TodoApi;
export const {
	useGetTodosQuery,
	useDeleteTodosMutation,
	useGetTodoQuery,
	useUpdateTodoMutation,
	useDeleteTodoMutation,

	useCreateTodoMutation
} = TodoApi;

export const selectFilteredTodos = (todos) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return todos;
		}

		return FuseUtils.filterArrayByString(todos, searchText);
	});
