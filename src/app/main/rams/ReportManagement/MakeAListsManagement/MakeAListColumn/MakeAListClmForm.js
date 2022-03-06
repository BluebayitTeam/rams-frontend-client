import { Checkbox, FormControl, FormControlLabel, makeStyles } from '@material-ui/core';
import _ from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkOrUnCheck } from '../store/makeAListClmSlice';

const useStyles = makeStyles(theme => ({
	pageContainer: {
		display: 'flex',
		marginTop: 'auto',
		marginBottom: 'auto'
	},
	clmsContainer: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		maxHeight: 'calc(100vh - 180px)',
		transition: '1s',
		alignContent: 'flex-start',
		marginTop: '5px',
		marginBottom: '5px'
	},
	checkboxLabel: {
		color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.main
	},
	checkbox: {
		color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.main
	}
}));

function MakeAListClmForm() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const columns = useSelector(({ makeAListsManagement }) => makeAListsManagement.makeAListClms);

	return (
		<div className={classes.pageContainer}>
			<div className={classes.clmsContainer}>
				{_.sortBy(columns, [o => o.label]).map(clm => (
					<FormControl key={clm.key}>
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
