import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { IconButton } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import NewLabelForm from './NewLabelForm';
import LabelItemForm from './LabelItemForm';
import { selectFilteredEvents, useGetCalendarLabelsQuery } from '../../CalendarApi';

/**
 * The labels dialog.
 */
function LabelsDialog(props) {
	const { searchKey } = props;

	const [openDialog, setOpenDialog] = useState(false);
	const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });

	// Fetch data using the query
	const { data } = useGetCalendarLabelsQuery({ ...pageAndSize, searchKey });

	// Ensure data and task_types are defined
	const labels = useSelector(selectFilteredEvents(data?.task_types || []));

	function handleOpenDialog() {
		setOpenDialog(true);
	}

	function handleCloseDialog() {
		setOpenDialog(false);
	}

	return (
		<>
			<IconButton
				onClick={handleOpenDialog}
				size="small"
			>
				<FuseSvgIcon
					color="secondary"
					size={20}
				>
					heroicons-solid:pencil-alt
				</FuseSvgIcon>
			</IconButton>
			<Dialog
				classes={{
					paper: 'w-full max-w-320 p-24 md:p-40 m-24'
				}}
				onClose={handleCloseDialog}
				open={openDialog}
			>
				<Typography className="text-20 mb-24 font-semibold">Edit Labels</Typography>

				<List dense>
					<NewLabelForm />

					{labels?.map((item) => (
						<LabelItemForm
							label={item}
							key={item.id}
							isLast={labels.length === 1}
						/>
					))}
				</List>
			</Dialog>
		</>
	);
}

export default LabelsDialog;
