import { Checkbox, FormControl, FormControlLabel, makeStyles } from '@material-ui/core';
import { useEffect, useReducer, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getColumns } from '../store/makeAListReportSlice';

const useStyles = makeStyles(theme => ({
	clmsContainer: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		height: '100vh',
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
		case 'check': {
			const newState = [...state];
			const targetIndex = newState.findIndex(i => i.id === action.id);
			newState[targetIndex] = { ...newState[targetIndex], show: true };
			return newState;
		}
		default:
			return state;
	}
}

function MakeAListFilterMenu({ inShowAllMode, handleGetMakeALists, handleGetAllMakeALists }) {
	const classes = useStyles();

	const dispatch = useDispatch();

	const [_reRender, setReRender] = useState(0);

	const methods = useFormContext();
	const { getValues, control } = methods;
	const values = getValues();

	const columns = useSelector(({ makeAListsManagement }) => makeAListsManagement.makeALists.makeAListClms);

	const [column, dispatchColumns] = useReducer(columnsReducer, clms);

	console.log('columns', columns);
	useEffect(() => {
		dispatch(getColumns());
	}, []);

	return (
		<div className={classes.clmsContainer}>
			{_.sortBy(columns, [o => o.label]).map(clm => (
				<Controller
					name={clm.key}
					control={control}
					render={({ field }) => (
						<FormControl>
							<FormControlLabel
								className={classes.checkboxLabel}
								required
								label={clm.label}
								control={
									<Checkbox
										color="primary"
										className={classes.checkbox}
										{...field}
										checked={clm.isChecked || false}
									/>
								}
							/>
						</FormControl>
					)}
				/>
			))}
		</div>
	);
}

export default MakeAListFilterMenu;
