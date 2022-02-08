import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

const rows = [
	{
		id: 'sl_no',
		align: 'left',
		disablePadding: true,
		label: 'SL_NO',
		sort: true
	},
	{
		id: 'P_no',
		align: 'left',
		disablePadding: false,
		label: 'P.No',
		sort: true
	},
	{
		id: 'P_name',
		align: 'left',
		disablePadding: false,
		label: 'P.Name',
		sort: true
	},
	{
		id: 'pp_no',
		align: 'left',
		disablePadding: false,
		label: 'PP_No',
		sort: true
	},
	{
		id: 'ref',
		align: 'left',
		disablePadding: false,
		label: 'Ref',
		sort: true
	},
	{
		id: 'profession',
		align: 'left',
		disablePadding: false,
		label: 'Profession',
		sort: true
	},
	{
		id: 'age',
		align: 'left',
		disablePadding: false,
		label: 'Age',
		sort: true
	},
	{
		id: 'country',
		align: 'left',
		disablePadding: false,
		label: 'Country',
		sort: true
	},
	{
		id: 'visa_No',
		align: 'left',
		disablePadding: false,
		label: 'Visa No',
		sort: true
	},
	{
		id: 'current_status',
		align: 'left',
		disablePadding: false,
		label: 'Current Status',
		sort: true
	},
	{
		id: 'action',
		align: 'center',
		disablePadding: false,
		label: 'Action',
		sort: true
	}
];

const PassengersTableHead = props => {
	const { selectedPassengerIds } = props;

	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};

	console.log('selectedPassengerIds', selectedPassengerIds);
	return (
		<TableHead>
			<TableRow className="h-48 sm:h-64">
				{rows.map(row => {
					return (
						<TableCell
							className="p-4 md:p-16 whitespace-nowrap"
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
							//sortDirection={props.order.id === row.id ? props.order.direction : false}
						>
							{row.sort && (
								<Tooltip
									title="Sort"
									placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={props.order.id === row.id}
										direction={props.order.direction}
										onClick={createSortHandler(row.id)}
										className="font-semibold"
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
};

export default PassengersTableHead;
