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
import { CLIENT_COLUMN } from 'src/app/constant/constants';
import ColumnHeader from './ColumnHeader';
import ColumnModel from './models/ColumnModel';
import { useGetColumnQuery } from '../ColumnsApi';
import ColumnForm from './ColumnForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z
		.string()
		.nonempty('You must enter a column name')
		.min(5, 'The column name must be at least 5 characters')
});

function Column() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { columnId } = routeParams;

	const {
		data: column,
		isLoading,
		isError
	} = useGetColumnQuery(columnId, {
		skip: !columnId || columnId === 'new'
	});
	console.log('columnId', column, columnId);

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();

	const [columns, setColumns] = useState([]);
	useEffect(() => {
		reset(columns);
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		fetch(`${CLIENT_COLUMN}${columnId}`, authTOKEN)
			.then((response) => response.json())
			.then((data) => {
				setColumns(data || []);
				reset(data || []);
			})
			.catch(() => {});
	}, []);
	useEffect(() => {
		if (columnId === 'new') {
			reset(ColumnModel({}));
		}
	}, [columnId, reset]);

	useEffect(() => {
		if (column) {
			reset({ ...column });
		}
	}, [column, reset, column?.id]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested columns is not exists
	 */
	if (isError && columnId !== 'new') {
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
					There is no such column!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/column/columns"
					color="inherit"
				>
					Go to Columns Page
				</Button>
			</motion.div>
		);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<ColumnHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<ColumnForm columns={columns} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default Column;
