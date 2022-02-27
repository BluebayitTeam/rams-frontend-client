import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	pageContainer: {
		display: 'flex',
		marginTop: 'auto',
		marginBottom: 'auto'
	}
}));

function MakeAListRowForm() {
	const classes = useStyles();
	const methods = useFormContext();
	const { control, formState } = methods;

	const dispatch = useDispatch();

	const columns = useSelector(({ makeAListsManagement }) => makeAListsManagement.makeAListRow);

	console.log('columns', columns);
	return <div className={classes.pageContainer}></div>;
}

export default MakeAListRowForm;
