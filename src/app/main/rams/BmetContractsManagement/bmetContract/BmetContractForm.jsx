/* eslint-disable react/no-unknown-property */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Print } from '@mui/icons-material';
import _ from 'lodash';
import { useGetBmetContractQuery } from '../BmetContractsApi';

const useStyles = makeStyles(() => ({
	textField: {
		'& > div': {
			height: '35px'
		}
	},
	container: {
		padding: '0px 25px',
		minWidth: '1000px',
		'& *': {
			boxSizing: 'border-box'
		},
		'& .row': {
			marginRight: '-15px',
			marginLeft: '-15px'
		},
		'& .western': {
			marginBottom: '5px'
		},
		'& .borderedTable': {
			'& table, th, td': {
				border: '1px solid white'
			},
			'& table': {
				color: 'black',
				background: 'transparent',
				borderSpacing: 0,
				borderCollapse: 'collapse',
				'& td, th': {
					padding: '0px'
				}
			}
		}
	}
}));

function BmetContractForm(props) {
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { control, watch, setValue, setError } = methods;

	const routeParams = useParams();
	const classes = useStyles(props);
	const [bmetContractId, setBmetContractId] = useState('');
	const [showPrint, setShowPrint] = useState(false);
	const [localData, setLocalData] = useState([]);

	const { data, isSuccess } = useGetBmetContractQuery(bmetContractId, {
		skip: !bmetContractId
	});

	useEffect(() => {
		if (isSuccess) {
			setLocalData(data);
			setShowPrint(true);
		} else {
			setLocalData([]);
			setShowPrint(false);
		}
	}, [isSuccess, data]);

	useEffect(() => {
		if (_.isEmpty(data)) {
			setShowPrint(false);
		} else {
			setShowPrint(true);
		}

		if (routeParams.bmetContractId !== 'bmetContract-form') {
			setValue('name', routeParams.bmetContractId);
		}
	}, [data]);

	// print dom ref
	const componentRef = useRef();

	// printer action
	const printAction = useReactToPrint({
		content: () => componentRef.current
	});

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			const { value } = e.target;

			if (value) {
				setBmetContractId(value);
			} else {
				setError('name', {
					type: 'manual',
					message: 'Please enter a valid ID or Passport Number'
				});
			}
		}
	};

	const handleShowClick = () => {
		const value = watch('name');

		if (value) {
			setBmetContractId(value);
		} else {
			setError('name', {
				type: 'manual',
				message: 'Please enter a valid ID or Passport Number'
			});
		}
	};

	return (
		<>
			<div className="flex justify-evenly items-center flex-wrap m-5">
				<div>
					<h4>Passenger Job ID or Passport No.</h4>
				</div>
				<div className="flex">
					<Controller
						name="name"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								autoFocus
								id="name"
								className={classes.textField}
								variant="outlined"
								fullWidth
								onKeyDown={handleKeyDown}
							/>
						)}
					/>
					<button
						style={{
							background: 'white',
							border: '1px solid grey',
							borderRadius: '4px',
							padding: '0px 5px',
							height: '35px',
							marginTop: '3px',
							marginLeft: '1px'
						}}
						onClick={handleShowClick}
					>
						Show
					</button>
					{showPrint && (
						<button
							style={{
								background: 'white',
								border: '1px solid grey',
								borderRadius: '4px',
								padding: '0px 5px',
								height: '35px',
								marginTop: '3px',
								marginLeft: '1px'
							}}
							onClick={() => printAction()}
						>
							<Print />
						</button>
					)}
				</div>
				<div style={{ minWidth: '250px' }}>
					<h4>(Please use Chrome browser only to Print)</h4>
				</div>
			</div>
			<div
				ref={componentRef}
				className={classes.container}
			>
				<div className="row">
					<br />
					<br />
					<br />
					<table
						width="95%"
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							marginLeft: '2.5%',
							marginTop: '100px'
						}}
					>
						<tr style={{ borderRadius: '4px', border: '1px solid black', padding: '2px' }}>
							<td
								valign="top"
								align="center"
							>
								<table
									width="100%"
									border="1"
									cellpadding="0"
									cellspacing="0"
								>
									<tr>
										<td>
											<table width="100%">
												<tr>
													<td
														style={{
															fontWeight: 'bold',
															fontSize: 'large',
															textAlign: 'left'
														}}
														colspan="2"
													>
														EMPLOYEMENT CONTRACT
														<br />
													</td>
												</tr>

												<tr>
													<td style={{ textAlign: 'left' }}>
														1st PARTY
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
														<span
															style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
														>
															{localData?.[0]?.visa_entry?.sponsor_name_english}
														</span>
													</td>
													<td style={{ textAlign: 'right' }}>الطرف الاول</td>
												</tr>

												<tr>
													<td style={{ textAlign: 'left' }}>
														2nd
														PARTY&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
														<span
															style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
														>
															{localData?.[0]?.passenger?.passenger_name}
														</span>
													</td>
													<td style={{ textAlign: 'right' }} />
												</tr>
												<tr>
													<td style={{ textAlign: 'left' }}>
														NATIONALITY &nbsp;&nbsp; <b>BANGLADESH</b>
													</td>
													<td style={{ textAlign: 'right' }}>الطرف الثاني</td>
												</tr>
												<tr>
													<td style={{ textAlign: 'left' }}>
														PASSPORT NO &nbsp;&nbsp;&nbsp;
														<span
															style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
														>
															{localData?.[0]?.passenger?.passport_no}
														</span>
													</td>
													<td style={{ textAlign: 'right' }}>الجواز سفر رقم</td>
												</tr>
												<tr>
													<td style={{ textAlign: 'left' }}>
														PROFESSION&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
														<span
															style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
														>
															{localData?.[0]?.embassy?.profession_english}
														</span>
													</td>
													<td style={{ textAlign: 'right' }}>المهنة</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>

						<br />

						<tr>
							<td>
								<table
									style={{
										textAlign: 'left',
										fontSize: '9.5pt',
										fontWeight: 'normal',
										borderCollapse: 'collapse',
										width: '100%'
									}}
									cellpadding="2"
								>
									<tr>
										<td
											valign="top"
											width="3%"
										>
											1.
										</td>
										<td
											align="justify"
											valign="top"
											width="47%"
										>
											That the 1st party shall pay to the 2nd party a monthly salary of 1000 Sr.
											plus overtime accordingly to Saudi Labour Law.
										</td>
										<td
											align="right"
											valign="top"
											width="47%"
										>
											إن الطرف الاول يدفع الطرف الثاني راتب شهري ١٠٠٠ريال سعودي بالاضاافة حست
											القانون العامل امملكة العربية السعودية
										</td>
										<td
											valign="top"
											width="3%"
										>
											١
										</td>
									</tr>
									<tr>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>

									<tr>
										<td valign="top">2.</td>
										<td
											align="justify"
											valign="top"
										>
											That 1st party should provide 2nd parties free medical, free single
											accommodation and free food facilities during the period of contract in the
											Kingdom of Saudi Arabia.{' '}
										</td>
										<td
											align="right"
											valign="top"
										>
											يلتزم الطرف الامل الطلب السكن الاطرف الثاني مجانا خلال مدة المملكة العربية
											السعودية
										</td>
										<td valign="top">٢</td>
									</tr>
									<tr>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>

									<tr>
										<td valign="top">3.</td>
										<td
											align="justify"
											valign="top"
										>
											That the 1st party shall provide free transportation from resident to the
											work site.{' '}
										</td>{' '}
										<td
											align="right"
											valign="top"
										>
											يلتزم الطرف الاول يدفع نصف قمة التذكرة خطوط الجوية للطرف الثاني من كتمندوو
											الي المملكة المباشرة العمل و تنكرية العودة الي كتمندو و بعد انتهاأ مدة
										</td>
										<td valign="top">٣</td>
									</tr>

									<tr>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>

									<tr>
										<td valign="top">4.</td>
										<td
											align="justify"
											valign="top"
										>
											He period of contract is of 2 (two) years.{' '}
										</td>
										<td
											align="right"
											valign="top"
										>
											ان مدة العقد سنتان{' '}
										</td>
										<td valign="top">٤</td>
									</tr>

									<tr>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>

									<tr>
										<td valign="top">5.</td>
										<td
											align="justify"
											valign="top"
										>
											That the 1st party shall bear the passage cost from Bangladesh to K.S.A. and
											back to Bangladesh for joining the service and the return ticket would
											provide after completion this agreement.
										</td>
										<td
											align="right"
											valign="top"
										>
											حيث الطرف الاول يدفع نصف قمة التذكرة خطوط الجوية للطرف الثاني من كتمندوو الي
											المملكة المباشرة العمل و تنكرية العودة الي كتمندو و بعد انتهاآ مدة{' '}
										</td>
										<td valign="top">٥</td>
									</tr>

									<tr>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>

									<tr>
										<td valign="top">6.</td>
										<td
											align="justify"
											valign="top"
										>
											Daily working hours shall be 8 hours.
										</td>
										<td
											align="right"
											valign="top"
										>
											ساعات العمل يكون () ساعات يوميا{' '}
										</td>
										<td valign="top">٦</td>
									</tr>

									<tr>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>

									<tr>
										<td valign="top">7.</td>
										<td
											align="justify"
											valign="top"
										>
											That this agreement shall come in effect from the date of arrival of the 2nd
											party in the Kingdom of Saudi Arabia.
										</td>
										<td
											align="right"
											valign="top"
										>
											حيث ان هذا العقد يعتبر بعد وصوا الطرف ا لثاني في المملكة العربية السعودية{' '}
										</td>
										<td valign="top">٧</td>
									</tr>

									<tr>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>

									<tr>
										<td valign="top">8.</td>
										<td
											align="justify"
											valign="top"
										>
											That the 2nd party should undertake to abide by the instruction and rules
											enforced in the Kingdom of Saudi Arabia.
										</td>
										<td
											align="right"
											valign="top"
										>
											حيث ان الطرف الثاني ليجمع التعليمات و القرار تالساري المفعول في المملكة
											العربية السعودية{' '}
										</td>
										<td valign="top">٨</td>
									</tr>
									<tr>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>

									<tr>
										<td valign="top">8.</td>
										<td
											align="justify"
											valign="top"
										>
											That the 2nd party should undertake to abide by the instruction and rules
											enforced in the Kingdom of Saudi Arabia.
										</td>
										<td
											align="right"
											valign="top"
										>
											حيث ان الطرف الثاني ليجمع التعليمات و القرار تالساري المفعول في المملكة
											العربية السعودية{' '}
										</td>
										<td valign="top">٨</td>
									</tr>

									<tr>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>

									<tr>
										<td valign="top">9.</td>
										<td
											align="justify"
											valign="top"
										>
											That the 2nd party should undertake to abide by the instruction and rules
											enforced in the Kingdom of Saudi Arabia.
										</td>
										<td
											align="right"
											valign="top"
										>
											حيث ان اي شرط لم يذكر فثي ورقة الطلب يعمل حسب القانون العامل المملكة العربية
											السعودية{' '}
										</td>
										<td valign="top">٩</td>
									</tr>
									<tr>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>
									<tr>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>
									<tr>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>
									<tr>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>
									<tr>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>
									<tr>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>
									<tr>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
										<td>&nbsp;</td>
									</tr>

									<tr>
										<td
											align="left"
											colspan="2"
										>
											Signature of the Second Party
											<br />
											توقيع الطرف الثاني
										</td>

										<td
											align="right"
											colspan="2"
										>
											Signature of the First Party
											<br />
											توقيع الطرف الثاني
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</>
	);
}

export default BmetContractForm;
