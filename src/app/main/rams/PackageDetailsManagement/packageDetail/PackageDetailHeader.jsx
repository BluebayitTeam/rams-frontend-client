import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdatePackageDetailMutation } from '../PackageDetailsApi';

/**
 * The packageDetail header.
 */
function PackageDetailHeader() {
	const routeParams = useParams();
	const { packageDetailId } = routeParams;

	console.log('packageDetailId', packageDetailId);

	const [savePackageDetail] = useUpdatePackageDetailMutation();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	const { isValid, dirtyFields } = formState;
	const theme = useTheme();
	const navigate = useNavigate();
	const { name, images, featuredImageId } = watch();

	function handleUpdatePackageDetail() {
		console.log(`sabdkjsa`, getValues()?.packageDetails);
		// const packageDetailsData = Object.keys(getValues()?.packageDetails).reduce((acc, key) => {
		// 	acc[key] = getValues()?.packageDetails[key].is_checked;
		// 	return acc;
		// }, {});

		// const packageDetailsSerial = Object.keys(getValues()?.packageDetails).reduce((acc, key) => {
		// 	acc[key] = getValues()?.packageDetails[key].custom_value;
		// 	return acc;
		// }, {});

		// const outputData = {
		// 	is_checked: packageDetailsData,
		// 	custom_value: packageDetailsSerial,
		// 	package_type: packageDetailId
		// };

		// const outputData =  feature_customizations: getValues()?.packageDetails ;

		console.log(`outputData`, getValues()?.packageDetails);
		savePackageDetail({
			feature_customizations: getValues()?.packageDetails?.filter((obj) => obj !== null),
			packageDetailId
		}).then((data) => {
			navigate(`/apps/packageType/packageTypes`);
		});
	}

	function handleCancel() {
		navigate(`/apps/packageType/packageTypes`);
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
						<Typography className="text-16 sm:text-20 truncate font-semibold">Package Details</Typography>
						<Typography
							variant="caption"
							className="font-medium"
						/>
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
					onClick={handleUpdatePackageDetail}
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

export default PackageDetailHeader;
