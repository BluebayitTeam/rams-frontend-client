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
import IconButton from '@mui/material/IconButton';
import { useDeepCompareEffect } from '@fuse/hooks';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getEmployees, ToDoTaskType } from 'app/store/dataSlice';
import { useSelector } from 'react-redux';
import { Autocomplete } from '@mui/material';
import { UpdatedSuccessfully } from 'src/app/@customHooks/notificationAlert';
import { DateTimePicker } from '@mui/x-date-pickers';
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
	}, [form, isValid, task, taskId]);

	useEffect(() => {
		if (taskId === 'new') {
			if (taskType === 'section') {
				reset(SectionModel({}));
			} else if (taskType === 'task') {
				reset(TaskModel({}));
			}
		} else if (task && employees.length > 0 && taskTypes.length > 0) {
			reset({
				...task,
				user: task.user || null,
				task_type: task.task_type || null
			});
		}
	}, [task, reset, taskId, taskType, employees, taskTypes]);

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
			.then(() => {
				navigate('/apps/tasks');
			});
	}

	function handleUpdateAgent() {
		updateTask(getValues()).then(() => {
			UpdatedSuccessfully();
			navigate('/apps/tasks');
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
							<span className="mx-8">{value ? 'INCOMPLETE TASK' : 'COMPLETE TASK'}</span>
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
							<span className="mx-8">{value ? 'NOT EMERGENCY' : 'AS EMERGENCY'}</span>
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
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						helperText={<span style={{ color: 'red' }}>{errors?.title?.message}</span>}
						label="Title"
						id="title"
						variant="outlined"
						InputLabelProps={field.value ? { shrink: true } : { style: { color: 'red' } }}
						fullWidth
					/>
				)}
			/>

			<div className="flex w-full space-x-16 mt-32 mb-16 items-center">
				<Controller
					name="user"
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							className="mt-8 mb-16 w-full"
							options={employees}
							getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
							value={employees.find((emp) => emp.id === value) || null}
							onChange={(event, newValue) => {
								onChange(newValue ? newValue.id : null);
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
							options={taskTypes}
							getOptionLabel={(option) => `${option.title}`}
							value={taskTypes.find((type) => type.id === value) || null}
							onChange={(event, newValue) => {
								onChange(newValue ? newValue.id : null);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Task Types"
									helperText={errors?.task_type?.message}
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
			</div>
			<div className="flex w-full space-x-16 mt-32 mb-16 items-center">
				<Controller
					name="from_date"
					control={control}
					render={({ field: { value, onChange } }) => (
						<DateTimePicker
							value={value ? new Date(value) : null}
							onChange={(newValue) => {
								onChange(newValue ? newValue.toISOString() : null);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label="From Date"
									variant="outlined"
									helperText={errors?.from_date?.message}
								/>
							)}
						/>
					)}
				/>
				<Controller
					name="to_date"
					control={control}
					render={({ field: { value, onChange } }) => (
						<DateTimePicker
							value={value ? new Date(value) : null}
							onChange={(newValue) => {
								onChange(newValue ? newValue.toISOString() : null);
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label="To Date"
									variant="outlined"
									helperText={errors?.to_date?.message}
								/>
							)}
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

			{taskId === 'new' ? (
				<Box
					sx={{
						position: 'sticky',
						bottom: 0,
						padding: 2,
						display: 'flex',
						justifyContent: 'center',

						backgroundColor: 'background.paper'
					}}
				>
					<Button
						className="mx-auto mb-40"
						onClick={handleSubmit(onSubmitNew)}
						variant="contained"
						color="secondary"
						disabled={!isValid}
					>
						Create
					</Button>
				</Box>
			) : (
				<Box
					sx={{
						position: 'sticky',
						bottom: 0,
						padding: 2,
						display: 'flex',
						justifyContent: 'center',
						backgroundColor: 'background.paper'
					}}
				>
					<Button
						className="mx-auto mb-40"
						onClick={handleUpdateAgent}
						variant="contained"
						color="primary"
						// disabled={!isValid}
					>
						Update
					</Button>
				</Box>
			)}
		</div>
	);
}

export default TaskForm;
