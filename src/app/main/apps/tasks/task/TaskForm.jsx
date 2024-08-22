import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { useAppDispatch } from 'app/store/store';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import _ from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import Box from '@mui/system/Box';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import IconButton from '@mui/material/IconButton';
import { useDeepCompareEffect } from '@fuse/hooks';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getEmployees, ToDoTaskType } from 'app/store/dataSlice';
import { useSelector } from 'react-redux';
import { Autocomplete } from '@mui/material';
import FormActionsMenu from './FormActionsMenu';
import {
	useCreateTasksItemMutation,
	useGetTasksItemQuery,
	useGetTasksTagsQuery,
	useUpdateTasksItemMutation
} from '../TasksApi';
import SectionModel from '../models/SectionModel';
import TaskModel from '../models/TaskModel';

/**
 * Form Validation Schema
 */

const schema = z.object({
	id: z.string().optional(),
	type: z.string().nonempty(),
	title: z.string().nonempty('You must enter a title'),
	notes: z.string().nullable().optional(),

	from_date: z.string().nullable().optional(),
	to_date: z.string().nullable().optional(),

	order: z.number()
});

/**
 * The task form component
 */
function TaskForm() {
	const routeParams = useParams();

	const taskId = routeParams?.id;
	const taskType = routeParams?.type;
	const { data: task, isError } = useGetTasksItemQuery(taskId, {
		skip: !taskId || taskId === 'new'
	});
	const { data: tags } = useGetTasksTagsQuery();

	const [updateTask] = useUpdateTasksItemMutation();
	const [createTask] = useCreateTasksItemMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const employees = useSelector((state) => state.data.employees);
	const taskTypes = useSelector((state) => state.data.taskTypes);
	// console.log('tags', tags);

	console.log('employees', employees);

	useEffect(() => {
		dispatch(getEmployees());
		dispatch(ToDoTaskType());
	}, [dispatch]);
	const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
		mode: 'onChange',
		resolver: zodResolver(schema)
	});
	const { isValid, errors } = formState;
	const form = watch();

	/**
	 * Auto-save on form change
	 */
	useDeepCompareEffect(() => {
		if (isValid && !_.isEmpty(form) && task && taskId !== 'new' && !_.isEqual(task, form)) {
			onSubmit(form);
		}
	}, [form, isValid, task]);

	useEffect(() => {
		if (taskId === 'new') {
			if (taskType === 'section') {
				reset(SectionModel({}));
			} else if (taskType === 'task') {
				reset(TaskModel({}));
			}
		} else {
			reset({ ...task });
		}
	}, [task, reset, taskId, taskType]);

	/**
	 * Form submit for existing task
	 */
	function onSubmit(data) {
		updateTask(data);
	}

	/**
	 * Form submit for new task
	 */
	function onSubmitNew() {
		createTask(getValues())
			.unwrap()
			.then((newTask) => {
				navigate(`/apps/tasks/${newTask?.id}`);
			})
			.catch((rejected) => {
				dispatch(showMessage({ message: `Error creating task item ${rejected}`, variant: 'error' }));
			});
	}

	if (isError && taskId !== 'new') {
		setTimeout(() => {
			navigate('/apps/tasks');
			dispatch(showMessage({ message: 'NOT FOUND' }));
		}, 0);
		return null;
	}

	if (_.isEmpty(form)) {
		return <FuseLoading />;
	}

	return (
		<>
			<div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
				<div className="flex items-center justify-between border-b-1 w-full py-24 mt-16 mb-32">
					<Controller
						control={control}
						name="is_completed"
						render={({ field: { value, onChange } }) => (
							<Button
								className="font-semibold"
								onClick={() => onChange(!value)}
							>
								<Box sx={{ color: value ? 'secondary.main' : 'text.disabled' }}>
									<FuseSvgIcon>heroicons-outline:check-circle</FuseSvgIcon>
								</Box>
								<span className="mx-8">{value ? 'MARK AS INCOMPLETE' : 'MARK AS COMPLETE'}</span>
							</Button>
						)}
					/>

					<Controller
						control={control}
						name="is_emergency"
						render={({ field: { value, onChange } }) => (
							<Button
								className="font-semibold"
								onClick={() => onChange(!value)}
							>
								<Box sx={{ color: value ? 'secondary.main' : 'text.disabled' }}>
									<FuseSvgIcon>heroicons-outline:exclamation-circle</FuseSvgIcon>
								</Box>
								<span className="mx-8">{value ? 'MARK AS NOT EMERGENCY' : 'MARK AS EMERGENCY'}</span>
							</Button>
						)}
					/>

					<div className="flex items-center">
						{taskId !== 'new' && <FormActionsMenu taskId={task?.id} />}
						<IconButton
							component={NavLinkAdapter}
							to="/apps/tasks"
							size="large"
						>
							<FuseSvgIcon>heroicons-outline:x</FuseSvgIcon>
						</IconButton>
					</div>
				</div>

				<Controller
					name="title"
					control={control}
					render={({ field }) => {
						return (
							<TextField
								{...field}
								className="mt-8 mb-16  "
								helperText={<span style={{ color: 'red' }}>{errors?.title?.message}</span>}
								label="Title"
								id="title"
								variant="outlined"
								InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
								fullWidth
							/>
						);
					}}
				/>

				<div className="flex w-full space-x-16 mt-32 mb-16 items-center">
					<Controller
						name="user"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								className="mt-8 mb-16 w-full"
								freeSolo
								value={value ? employees.find((data) => data.id === value) : null}
								options={employees}
								required
								getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										placeholder="Select User"
										label="User"
										helperText={errors?.user?.message}
										variant="outlined"
										InputLabelProps={{
											style: { color: 'red' },
											shrink: Boolean(value)
										}}
									/>
								)}
							/>
						)}
					/>
					<Controller
						name="task_type"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								className="mt-8 mb-16 w-full"
								freeSolo
								value={value ? taskTypes.find((data) => data.id === value) : null}
								options={taskTypes}
								required
								getOptionLabel={(option) => `${option.title}`}
								onChange={(event, newValue) => {
									onChange(newValue?.id);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Task Types"
										helperText={errors?.taskTypes?.message}
										variant="outlined"
										autoFocus
										InputLabelProps={{
											style: { color: 'red' },
											shrink: Boolean(value)
										}}
									/>
								)}
							/>
						)}
					/>
				</div>
				<div className="flex w-full space-x-16 mt-32 mb-16 items-center">
					<Controller
						control={control}
						name="from_date"
						required
						render={({ field: { value, onChange } }) => (
							<DateTimePicker
								className="w-full"
								value={value ? new Date(value) : null}
								onChange={(date) => onChange(date?.toISOString())}
								slotProps={{
									textField: {
										id: 'from_date',
										label: 'From Date',
										InputLabelProps: {
											shrink: true
										},
										fullWidth: true,
										variant: 'outlined'
									},
									actionBar: {
										actions: ['clear', 'today']
									}
								}}
							/>
						)}
					/>

					<Controller
						control={control}
						name="to_date"
						required
						render={({ field: { value, onChange } }) => (
							<DateTimePicker
								className="w-full"
								value={value ? new Date(value) : null}
								onChange={(date) => onChange(date?.toISOString())}
								slotProps={{
									textField: {
										id: 'to_date',
										label: 'To Date',
										InputLabelProps: {
											shrink: true
										},
										fullWidth: true,
										variant: 'outlined'
									},
									actionBar: {
										actions: ['clear', 'today']
									}
								}}
							/>
						)}
					/>
				</div>

				<Controller
					control={control}
					name="note"
					render={({ field }) => (
						<TextField
							className="mt-32"
							{...field}
							label="Note"
							placeholder="Notes"
							id="notes"
							error={!!errors.notes}
							helperText={errors?.notes?.message}
							variant="outlined"
							fullWidth
							multiline
							minRows={3}
							maxRows={10}
						/>
					)}
				/>
			</div>

			{taskId === 'new' && (
				<Box
					sx={{
						position: 'sticky',
						bottom: 0,
						padding: 2,
						display: 'flex',
						justifyContent: 'center',
						borderTop: '1px solid',
						backgroundColor: 'background.paper'
					}}
				>
					<Button
						className="mx-auto mb-40"
						onClick={handleSubmit(onSubmitNew)}
						variant="contained"
						color="secondary"
						// disabled={!isValid}
					>
						Create Task
					</Button>
				</Box>
			)}
		</>
	);
}

export default TaskForm;
