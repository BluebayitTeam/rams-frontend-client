import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateMakeAListsManagementColumnMutation } from '../MakeAListsManagementMakeAListsManagementColumnsApi';

/**
 * The makeAListsManagementColumn header.
 */
function MakeAListsManagementColumnHeader() {
	const routeParams = useParams();
	const { makeAListsManagementColumnId } = routeParams;

	console.log('makeAListsManagementColumnId', makeAListsManagementColumnId);

	const [saveMakeAListsManagementColumn] = useUpdateMakeAListsManagementColumnMutation();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();

	// function handleUpdateMakeAListsManagementColumn() {
	// 	const filteredData = Object.values(getValues()?.makeAListsManagementColumns).map((item) => {
	// 		return {
	// 			serial: item.isChecked ? item.serial.toString() : null,
	// 			isChecked: item.isChecked,
	// 			id: item.key
	// 		};
	// 	});

	// 	saveMakeAListsManagementColumn({
	// 		makeAListsManagementColumns: filteredData,
	// 		type: makeAListsManagementColumnId
	// 	}).then((data) => {
	// 		if (makeAListsManagementColumnId === 'Clients') {
	// 			navigate(`/apps/client/clients`);
	// 		}

	// 		if (makeAListsManagementColumnId === 'agent') {
	// 			navigate(`/apps/agent/agents`);
	// 		}

	// 		if (makeAListsManagementColumnId === 'employee') {
	// 			navigate(`/apps/employee/employees`);
	// 		}

	// 		if (makeAListsManagementColumnId === 'Departments') {
	// 			navigate(`/apps/department/departments`);
	// 		}

	// 		if (makeAListsManagementColumnId === 'recruiting') {
	// 			navigate(`/apps/passenger/passengers/recruiting`);
	// 		}

	// 		if (makeAListsManagementColumnId === 'processing') {
	// 			navigate(`/apps/passenger/passengers/processing`);
	// 		}

	// 		if (makeAListsManagementColumnId === 'female') {
	// 			navigate(`/apps/passenger/passengers/female`);
	// 		}

	// 		if (makeAListsManagementColumnId === 'hajj') {
	// 			navigate(`/apps/passenger/passengers/hajj`);
	// 		}

	// 		if (makeAListsManagementColumnId === 'umrah') {
	// 			navigate(`/apps/passenger/passengers/umrah`);
	// 		}

	// 		if (makeAListsManagementColumnId === 'travel') {
	// 			navigate(`/apps/passenger/passengers/travel`);
	// 		}

	// 		if (makeAListsManagementColumnId === 'student') {
	// 			navigate(`/apps/passenger/passengers/student`);
	// 		}

	// 		if (makeAListsManagementColumnId === 'demand') {
	// 			navigate(`/apps/demand/demands`);
	// 		}

	// 		if (makeAListsManagementColumnId === 'visa_entry') {
	// 			navigate(`/apps/visaEntry/visaEntrys`);
	// 		}

	// 		if (makeAListsManagementColumnId === 'calling_entry') {
	// 			navigate(`/apps/callingEntry/callingEntrys`);
	// 		}

	// 		if (makeAListsManagementColumnId === 'evisa_entry') {
	// 			navigate(`/apps/eVisaEntry/eVisaEntrys`);
	// 		}

	// 		if (makeAListsManagementColumnId === 'complain') {
	// 			navigate(`/apps/complain/complains`);
	// 		}

	// 		if (makeAListsManagementColumnId === 'female_cv') {
	// 			navigate(`/apps/cvFemale/cvFemales`);
	// 		}

	// 		if (makeAListsManagementColumnId === 'male_cv') {
	// 			navigate(`/apps/cvMale/cvMales`);
	// 		}

	// 		if (makeAListsManagementColumnId === 'cv_bank') {
	// 			navigate(`/apps/cvBank/cvBanks`);
	// 		}
	// 	});
	// }

	// function handleCancel() {
	// 	if (makeAListsManagementColumnId === 'Clients') {
	// 		navigate(`/apps/client/clients`);
	// 	}

	// 	if (makeAListsManagementColumnId === 'agent') {
	// 		navigate(`/apps/agent/agents`);
	// 	}

	// 	if (makeAListsManagementColumnId === 'employee') {
	// 		navigate(`/apps/employee/employees`);
	// 	}

	// 	if (makeAListsManagementColumnId === 'Departments') {
	// 		navigate(`/apps/department/departments`);
	// 	}

	// 	if (makeAListsManagementColumnId === 'recruiting') {
	// 		navigate(`/apps/passenger/passengers/recruiting`);
	// 	}

	// 	if (makeAListsManagementColumnId === 'processing') {
	// 		navigate(`/apps/passenger/passengers/processing`);
	// 	}

	// 	if (makeAListsManagementColumnId === 'female') {
	// 		navigate(`/apps/passenger/passengers/female`);
	// 	}

	// 	if (makeAListsManagementColumnId === 'hajj') {
	// 		navigate(`/apps/passenger/passengers/hajj`);
	// 	}

	// 	if (makeAListsManagementColumnId === 'umrah') {
	// 		navigate(`/apps/passenger/passengers/umrah`);
	// 	}

	// 	if (makeAListsManagementColumnId === 'travel') {
	// 		navigate(`/apps/passenger/passengers/travel`);
	// 	}

	// 	if (makeAListsManagementColumnId === 'student') {
	// 		navigate(`/apps/passenger/passengers/student`);
	// 	}

	// 	if (makeAListsManagementColumnId === 'demand') {
	// 		navigate(`/apps/demand/demands`);
	// 	}

	// 	if (makeAListsManagementColumnId === 'visa_entry') {
	// 		navigate(`/apps/visaEntry/visaEntrys`);
	// 	}

	// 	if (makeAListsManagementColumnId === 'calling_entry') {
	// 		navigate(`/apps/callingEntry/callingEntrys`);
	// 	}

	// 	if (makeAListsManagementColumnId === 'evisa_entry') {
	// 		navigate(`/apps/eVisaEntry/eVisaEntrys`);
	// 	}

	// 	if (makeAListsManagementColumnId === 'complain') {
	// 		navigate(`/apps/complain/complains`);
	// 	}

	// 	if (makeAListsManagementColumnId === 'female_cv') {
	// 		navigate(`/apps/cvFemale/cvFemales`);
	// 	}

	// 	if (makeAListsManagementColumnId === 'male_cv') {
	// 		navigate(`/apps/cvMale/cvMales`);
	// 	}

	// 	if (makeAListsManagementColumnId === 'cv_bank') {
	// 		navigate(`/apps/cvBank/cvBanks`);
	// 	}
	// }

	return (
		<div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
			<div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
				<div className="flex items-center max-w-full">
					<motion.div
						className="flex flex-col min-w-0 mx-8 sm:mx-16"
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.3 } }}
					>
						<Typography className="text-16 sm:text-20 truncate font-semibold capitalize ">
							{makeAListsManagementColumnId.replace(/_/g, ' ')} Table MakeAListsManagementColumn Serial
						</Typography>
						<Typography
							variant="caption"
							className="font-medium"
						>
							MakeAListsManagementColumn Detail for {makeAListsManagementColumnId} Table
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
					className="whitespace-nowrap mx-4 text-white bg-[#4dc08e]-500 hover:bg-[#4dc08e]-800 active:bg-[#4dc08e]-700 focus:outline-none focus:ring focus:ring-[#4dc08e]-300"
					color="secondary"
					variant="contained"
					// onClick={handleUpdateMakeAListsManagementColumn}
				>
					Update
				</Button>

				<Button
					className="whitespace-nowrap mx-4 text-white bg-orange-500 hover:bg-orange-800 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300"
					variant="contained"
					// onClick={handleCancel}
				>
					Cancel
				</Button>
			</motion.div>
		</div>
	);
}

export default MakeAListsManagementColumnHeader;
