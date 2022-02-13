import { faBookOpen, faTextHeight } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core';
import { bankAndCash } from 'app/@data/data';
import { getLedgers, getSubLedgers } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from '../../../reportComponents/Keyword';
import ReportDatePicker from '../../../reportComponents/ReportDatePicker';
import ReportSelect from '../../../reportComponents/ReportSelect';
import { getReportFilterMakeStyles } from '../../../reportUtils/reportMakeStyls';

const useStyles = makeStyles(theme => ({
	...getReportFilterMakeStyles(theme)
}));

function LedgerFilterMenu({ inShowAllMode, handleGetLedgers, handleGetAllLedgers }) {
	const classes = useStyles();

	const dispatch = useDispatch();

	const [_reRender, setReRender] = useState(0);

	//select field data
	const ledgers = useSelector(state => state.data.ledgers);
	const subLedgers = useSelector(state => state.data.subLedgers);

	const methods = useFormContext();
	const { getValues } = methods;
	const values = getValues();

	useEffect(() => {
		dispatch(getLedgers());
		dispatch(getSubLedgers());
	}, []);

	const commonFieldProps = {
		setReRender,
		onEnter: () => (inShowAllMode ? handleGetAllLedgers() : handleGetLedgers())
	};

	const commonKewordProps = {
		setReRender,
		onClick: () => (inShowAllMode ? handleGetAllLedgers() : handleGetLedgers())
	};

	return (
		<div className={classes.filterMenuContainer}>
			<div className="allFieldContainer borderTop mt-4">
				{/* name */}
				{/* <ReportTextField {...commonFieldProps} name="name" domEl={nameEl} icon={faUser} width="75px" /> */}

				{/* ledger */}
				<ReportSelect {...commonFieldProps} name="ledger" options={ledgers} icon={faBookOpen} width="45px" />

				{/* Date from */}
				<ReportDatePicker
					{...commonFieldProps}
					name="date_after"
					label="Date From"
					maxDate={values.date_before || new Date()}
				/>

				{/* Date to */}
				<ReportDatePicker
					{...commonFieldProps}
					name="date_before"
					label="Date To"
					minDate={values.date_after}
					maxDate={new Date()}
				/>

				{/* sub ledger */}
				<ReportSelect
					{...commonFieldProps}
					name="sub_ledger"
					options={subLedgers}
					icon={faBookOpen}
					width="73px"
				/>

				{/* account Type */}
				<ReportSelect
					{...commonFieldProps}
					name="account_type"
					options={bankAndCash}
					icon={faTextHeight}
					width="89px"
				/>
			</div>

			{/* keywords */}
			<div className="allKeyWrdContainer">
				{/* <Keyword {...commonKewordProps} type="text" name="name" domEl={nameEl} icon={faUser} /> */}
				<Keyword {...commonKewordProps} type="select" name="ledger" icon={faBookOpen} hideRemoveAction />
				<Keyword {...commonKewordProps} type="date" name="date_after" label="Date From" />
				<Keyword {...commonKewordProps} type="date" name="date_before" label="Date To" />
				<Keyword {...commonKewordProps} type="select" name="sub_ledger" icon={faBookOpen} />
				<Keyword {...commonKewordProps} type="select" name="account_type" icon={faTextHeight} />
			</div>
		</div>
	);
}

export default LedgerFilterMenu;
