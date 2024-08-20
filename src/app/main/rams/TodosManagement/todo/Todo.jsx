import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TodoHeader from './TodoHeader';
import TodoModel from './models/TodoModel';
import { useGetTodoQuery } from '../TodosApi';
import TodoForm from './TodoForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z.string().nonempty('You must enter a todo name').min(5, 'The todo name must be at least 5 characters')
});

function Todo() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { todoId } = routeParams;

	const {
		data: todo,
		isLoading,
		isError
	} = useGetTodoQuery(todoId, {
		skip: !todoId || todoId === 'new'
	});
	console.log('todoId', todo, todoId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (todoId === 'new') {
			reset(TodoModel({}));
		}
	}, [todoId, reset]);

	useEffect(() => {
		if (todo) {
			reset({ ...todo });
		}
	}, [todo, reset, todo?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested todos is not exists
	 */
	if (isError && todoId !== 'new') {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography
					color="text.secondary"
					variant="h5"
				>
					There is no such todo!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/todo/todos"
					color="inherit"
				>
					Go to Todos Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<TodoHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<TodoForm todoId={todoId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default Todo;
