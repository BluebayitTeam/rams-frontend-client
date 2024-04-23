import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateColumnMutation } from '../ColumnsApi';

/**
 * The column header.
 */
function ColumnHeader() {
	const routeParams = useParams();
	const { columnId } = routeParams;

	console.log('columnId', columnId);

	const [saveColumn] = useUpdateColumnMutation();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();

	function handleUpdateColumn() {
		console.log(`sabdkjsa`, getValues()?.columns);
		const columnsData = Object.keys(getValues()?.columns).reduce((acc, key) => {
			acc[key] = getValues()?.columns[key].isChecked;
			return acc;
		}, {});

		const columnsSerial = Object.keys(getValues()?.columns).reduce((acc, key) => {
			acc[key] = getValues()?.columns[key].serial;
			return acc;
		}, {});

		const outputData = {
			columns_data: columnsData,
			columns_serial: columnsSerial,
			type: columnId
		};

		console.log(`outputData`, outputData);
		saveColumn(outputData).then((data) => {
			if (columnId === 'Clients') {
				navigate(`/apps/client/clients`);
			}

			if (columnId === 'Employees') {
				navigate(`/apps/employee/employees`);
			}

			if (columnId === 'Departments') {
				navigate(`/apps/department/departments`);
			}
		});
	}

	function handleCancel() {
		if (columnId === 'Clients') {
			navigate(`/apps/client/clients`);
		}

		if (columnId === 'Employees') {
			navigate(`/apps/employee/employees`);
		}

		if (columnId === 'Departments') {
			navigate(`/apps/department/departments`);
		}
	}

	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
			<div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
				<div className="flex items-center max-w-full">
					<motion.div
						className="flex flex-col min-w-0 mx-8 sm:mx-16"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-16 sm:text-20 truncate font-semibold">
							{columnId} Table Column Serial
						</Typography>
						<Typography
							variant="caption"
							className="font-medium"
						>
							Column Detail for {columnId} Table
						</Typography>
					</motion.div>
				</div>
			</div>

			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				<Button
					className="whitespace-nowrap mx-4"
					color="secondary"
					variant="contained"
					style={{ backgroundColor: '#4dc08e', color: 'white' }}
					onClick={handleUpdateColumn}
				>
					Update
				</Button>

				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					style={{ backgroundColor: '#FFAA4C', color: 'white' }}
					onClick={handleCancel}
				>
					Cancel
				</Button>
			</motion.div>
		</div>
	);
}

export default ColumnHeader;
