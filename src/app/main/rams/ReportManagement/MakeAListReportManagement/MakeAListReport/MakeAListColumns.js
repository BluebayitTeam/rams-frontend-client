import FuseLoading from '@fuse/core/FuseLoading';
import { Checkbox, FormControl, FormControlLabel, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
import { useEffect, useReducer } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getColumns } from '../store/makeAListReportSlice';
import MakeAListPPTable from './MakeAListPPTable';

const useStyles = makeStyles(theme => ({
	titleNameContainer: {
		display: 'flex',
		justifyContent: 'center',
		margin: '10px 0px',
		'& > div': {
			paddingBottom: '5px',
			borderBottom: `1px solid ${theme.palette.primary.main}`
		}
	},
	clmsContainer: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		maxHeight: 'calc(100vh - 160px)',
		transition: '1s',
		alignContent: 'flex-start',
		margin: '0px 20px'
	},
	checkboxLabel: {
		color: theme.palette.primary.main
	},
	checkbox: {
		color: theme.palette.primary.main
	}
}));

function columnsReducer(state, action) {
	switch (action.type) {
		case 'setColumns': {
			return action.data;
		}
		case 'check': {
			const newState = [...state];
			const targetClmIndex = state.findIndex(clm => clm.key === action.key);
			newState[targetClmIndex] = { ...newState[targetClmIndex], isChecked: action.value };
			return newState;
		}
		default:
			return state;
	}
}

function MakeAListColumns() {
	const classes = useStyles();

	const dispatch = useDispatch();

	const [columns, dispatchColumns] = useReducer(columnsReducer, []);

	const methods = useFormContext();
	const { getValues, control } = methods;
	const values = getValues();

	console.log('columns', columns);
	useEffect(() => {
		dispatch(getColumns()).then(action => dispatchColumns({ type: 'setColumns', data: action.payload }));
	}, []);

	if (_.isEmpty(columns)) {
		return <FuseLoading />;
	}

	const columdatas = _.sortBy(columns, [o => o.label]).filter(clm => {
		return clm.key != 'updated_at' && clm.key != 'updated_by' && clm.key != 'created_at' && clm.key != 'created_by';
	});

	return (
		<>
			<div className={classes.titleNameContainer}>
				<Controller
					name="report_title"
					control={control}
					render={({ field }) => {
						return (
							<TextField
								{...field}
								size="small"
								color="primary"
								error={!field.value}
								label="Title Name"
								id="report_title"
								required
								variant="outlined"
								InputLabelProps={field.value && { shrink: true }}
							/>
						);
					}}
				/>
			</div>
			<div className={classes.clmsContainer}>
				{_.sortBy(columns, [o => o.label]).map(clm => (
					<FormControl>
						<FormControlLabel
							className={classes.checkboxLabel}
							label={clm.label}
							control={
								<Checkbox
									color="primary"
									className={classes.checkbox}
									checked={clm.isChecked || false}
									onChange={e =>
										dispatchColumns({
											type: 'check',
											key: clm.key,
											value: e.target.checked
										})
									}
								/>
							}
						/>
					</FormControl>
				))}
			</div>
			<MakeAListPPTable />
			{columdatas.map((clm, idx) => (
				<div>
					{'{'}
					<h5>id: {`${idx + 1},`}</h5>
					<h5>key: {`'${clm.key}',`}</h5>
					<h5>label: {`'${clm.label}',`}</h5>
					<h5>isChecked: {`false`}</h5>
					{'},'}
				</div>
			))}
		</>
	);
}

export default MakeAListColumns;
