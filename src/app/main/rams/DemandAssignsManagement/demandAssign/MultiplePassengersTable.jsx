/* eslint-disable no-nested-ternary */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { Delete } from '@mui/icons-material';
import { useState } from 'react';
import withRouter from '@fuse/core/withRouter';
import { TableCell } from '@mui/material';
import { useForm } from 'react-hook-form';
import MultiplePassengersTableHead from './MultiplePassengersTableHead';

const style = {
	margin: 'auto',
	backgroundColor: 'white',
	width: '1400px',
	height: 'fit-content',
	maxWidth: '940px',
	maxHeight: 'fit-content',
	borderRadius: '20px',
	overflow: 'hidden'
};

function MultiplePassengersTable(props) {
	const [singleEvisaEntryDetails, setSingleEvisaEntryDetails] = useState({});
	const [evisaEntryPackagePrice, setEvisaEntryPackagePrice] = useState(0);

	const serialNumber = 1;

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {}
	});

	return (
		<div className="w-full flex flex-col min-h-full px-10 ">
			<FuseScrollbars className="grow overflow-x-auto ">
				<Table
					stickyHeader
					className="min-w-xl "
					aria-labelledby="tableTitle"
				>
					<MultiplePassengersTableHead />
					<TableBody>
						{props?.passengers?.map((n, sl) => {
							return (
								<TableRow
									className="h-72 cursor-pointer"
									hover
									role="checkbox"
									tabIndex={-1}
									key={n.id}
								>
									<TableCell
										className="w-40 md:w-64"
										component="th"
										scope="row"
									>
										{sl + 1}
									</TableCell>
									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{n?.passenger_id}
									</TableCell>
									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{n?.passenger_name}
									</TableCell>

									<TableCell
										className="p-4 md:p-16"
										component="th"
										scope="row"
									>
										{`${n?.passport_no}`}
									</TableCell>

									<TableCell
										className="p-4 md:p-16"
										align="center"
										component="th"
										scope="row"
									>
										<div>
											<Delete
												onClick={() =>
													props?.setMltPassengerList(
														props?.passengers?.filter((item) => item.id !== n?.id)
													)
												}
												className="cursor-pointer"
												style={{ color: 'red' }}
											/>
										</div>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</FuseScrollbars>
		</div>
	);
}

export default withRouter(MultiplePassengersTable);
