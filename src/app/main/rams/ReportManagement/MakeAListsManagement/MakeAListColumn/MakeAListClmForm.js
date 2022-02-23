import { Checkbox, FormControl, FormControlLabel, makeStyles } from '@material-ui/core';
import _ from 'lodash';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { checkOrUnCheck } from '../store/makeAListClmSlice';

const useStyles = makeStyles(theme => ({
	clmsContainer: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		maxHeight: 'calc(100vh - 180px)',
		transition: '1s',
		alignContent: 'flex-start',
		marginTop: 'auto',
		marginRight: 'auto'
	},
	checkboxLabel: {
		color: theme.palette.primary.main
	},
	checkbox: {
		color: theme.palette.primary.main
	}
}));

function MakeAListClmForm() {
	const classes = useStyles();
	const methods = useFormContext();
	const { control, formState } = methods;

	const dispatch = useDispatch();

	const columns = useSelector(({ makeAListClmsManagement }) => makeAListClmsManagement.makeAListClm);

	console.log('columns', columns);
	return (
		<div className={classes.titleNameContainer}>
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
										dispatch(
											checkOrUnCheck({
												key: clm.key,
												value: e.target.checked
											})
										)
									}
								/>
							}
						/>
					</FormControl>
				))}
			</div>
		</div>
	);
}

export default MakeAListClmForm;
