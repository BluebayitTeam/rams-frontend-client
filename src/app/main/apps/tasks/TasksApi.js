import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import { ALL_TODO_TASK, DELETE_TODO_TASK, POST_TODO_TASK, UPDATE_TODO_TASK } from 'src/app/constant/constants';

export const addTagTypes = ['tasks_list', 'tasks_item', 'tasks_tags'];
const TasksApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getTasks: build.query({
				query: ({ page, size, searchKey }) => ({ url: ALL_TODO_TASK, params: { page, size, searchKey } }),
				providesTags: ['tasks_list']
			}),
			reorderTasks: build.mutation({
				query: ({ startIndex, endIndex }) => ({
					url: ALL_TODO_TASK,
					method: 'POST',
					data: { startIndex, endIndex }
				}),
				invalidatesTags: ['tasks_list'],
				async onQueryStarted(_, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
						dispatch(
							showMessage({
								message: 'List Order Saved',
								autoHideDuration: 2000,
								anchorOrigin: {
									vertical: 'top',
									horizontal: 'right'
								}
							})
						);
					} catch (err) {
						dispatch(showMessage({ message: 'Error saving list order' }));
					}
				}
			}),
			createTasksItem: build.mutation({
				query: (task) => ({
					url: POST_TODO_TASK,
					method: 'POST',
					data: task
				}),
				invalidatesTags: ['tasks_list']
			}),
			getTasksItem: build.query({
				query: (taskId) => ({ url: `${ALL_TODO_TASK}${taskId}` }),
				providesTags: ['tasks_item']
			}),
			deleteTasksItem: build.mutation({
				query: (taskId) => ({
					url: `${DELETE_TODO_TASK}${taskId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['tasks_list']
			}),
			updateTasksItem: build.mutation({
				query: (task) => ({
					url: `${UPDATE_TODO_TASK}${task.id}`,
					method: 'PUT',
					data: task
				}),
				invalidatesTags: ['tasks_item', 'tasks_list']
			}),
			getTasksTags: build.query({
				query: () => ({ url: `${ALL_TODO_TASK}` }),
				providesTags: ['tasks_tags']
			}),
			createTasksTag: build.mutation({
				query: (tag) => ({
					url: POST_TODO_TASK,
					method: 'POST',
					data: tag
				}),
				invalidatesTags: ['tasks_tags']
			})
		}),
		overrideExisting: false
	});
export { TasksApi };
export const {
	useGetTasksQuery,
	useCreateTasksItemMutation,
	useGetTasksItemQuery,
	useDeleteTasksItemMutation,
	useUpdateTasksItemMutation,
	useGetTasksTagsQuery,
	useCreateTasksTagMutation,
	useReorderTasksMutation
} = TasksApi;
export const selectTasksList = (state) => TasksApi.endpoints.getTasks.select()(state)?.data ?? [];
export const selectRemainingTasks = createSelector([selectTasksList], (tasks) => {
	return tasks.filter((item) => item.type === 'task' && !item.completed).length;
});
