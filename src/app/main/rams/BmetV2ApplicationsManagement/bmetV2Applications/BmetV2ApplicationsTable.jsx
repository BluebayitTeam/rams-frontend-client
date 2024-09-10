
import withRouter from '@fuse/core/withRouter';
import { useFormContext } from 'react-hook-form';

function BmetV2ApplicationsTable(props) {
	const {
		reportTitle,
		classes,
		generalData,
		inSiglePageMode,

		data,
		setPage
	} = props;
	const methods = useFormContext();
	const { watch } = methods;
	const Gender = watch('gender');

	return (
		<div
			className={`${classes.pageContainer} printPageContainer print:h-screen  w-full mb-0`}
			onMouseOver={() => {
				inSiglePageMode || setPage(data.page);
			}}
			style={{ padding: '50px' }}
		>
			<div>
				<div className={classes.pageHead}>
					<h2 className="title  pl-0 md:-pl-20">{reportTitle}</h2>
				</div>

				{/* Application  */}
				<div style={{ fontSize: '12px', lineHeight: '16px' }} className="text-justify	">
					বরাবর
					<br />
					মহাপরিচালক
					<br />
					জনশক্তি,কর্মসংস্থান ও প্রশিক্ষন ব্যুারো
					<br />
					৮৯/২,কাকরাইল,ঢাকা।
					<br />
					দৃষ্টি আকর্ষন :পরিচালক (বহির্গমন)
					<br />
					<br />
					বিষয়:সত্যায়ীত/অসত্যায়ীত ভিসায়{' '}
					{data?.data?.length
						?.toString()
						.replace(/[0-9]/g, digit => String.fromCharCode(digit.charCodeAt(0) + 2486))}{' '}
					জন {extraData?.gender} কর্মীর একক বহির্গমন ছাড়পএ প্রদানের আবেদন।
					<br />
					জনাব,
					<br />
					বিনীত নিবেদন এই যে,
					<br />
					এই যে,নিম্নে বর্ণিত,
					<br />
					<TableContainer className="my-10">
						<Table size="small" aria-label="a dense table">
							<TableHead>
								<TableRow className="bg-grey-400">
									<TableCell align="center" className="border-1 border-current">
										ক্রমিক নং
									</TableCell>
									<TableCell align="center" className="border-1 border-current">
										নাম
									</TableCell>
									<TableCell align="center" className="border-1 border-current">
										পাসপোর্ট নম্বর
									</TableCell>
									<TableCell align="center" className="border-1 border-current">
										ভিসা নম্বর
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data?.data.map((row, index) => (
									<TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 1 } }}>
										<TableCell
											className="border-1 border-current"
											component="th"
											scope="row"
											align="center"
										>
											{index + 1}
										</TableCell>
										<TableCell className="border-1 border-current">{row.passenger_name}</TableCell>
										<TableCell className="border-1 border-current" align="center">
											{' '}
											{row.passport_no}
										</TableCell>
										<TableCell className="border-1 border-current" align="center">
											{' '}
											{row?.visa_no}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					সৌদি গমনেচ্ছু{' '}
					{data?.data?.length
						?.toString()
						.replace(/[0-9]/g, digit => String.fromCharCode(digit.charCodeAt(0) + 2486))}{' '}
					জন পুরুষ কর্মী তাদের স্ব-উদ্যেগে সংগৃহীত ভিসা,মুল পাসপোর্টসহ অন্যান্য কাগজপএাদি আমার রিক্রটিং
					এজেন্সি {extraData?.agency?.name_bangla} (আর,এল নং-
					{extraData?.agency?.rl_no
						?.toString()
						.replace(/[0-9]/g, digit => String.fromCharCode(digit.charCodeAt(0) + 2486))}
					) এর মাধ্যমে বহির্গমন ছাড়পএ গ্রহনের জন্য জমা দিয়েছি।কর্মীদেও নিকট হতে প্রাপ্ত ভিসাসহ নিম্নে বর্নিত
					কাগজপএাদি একসাথে দাখিল করিলাম ভিসাগুলো আমার অফিসে অনলাইনে পরিক্ষান্তে সঠিক পাওয়া গিয়েছে। উল্লেখ্য
					যে,সৌদি আরব গামী ভিসাগুলো ২৫ এর অধিক বা গ্রুফ ভিসা নহে ্এবং কর্মীদের সকল দায়-দায়িত্ব রিক্রটিং
					এজেন্সি বহন করিবে। উপস্থিত কর্মীগনের ভিসাগুলো Employement ভিসা। যাহার মেয়াদ ২ বৎসর এবং পরবর্তীতে
					নবায়ন যোগ্য। কর্মীগনের বেতন, ভাতাদি,থাকা খাওয়া,সামাজিক নিরাপওা বা অন্য কোন কারনে চাকরীতে অসুবিধা হলে
					তাহার সকল দায়িত্ব আমার রি/এজেন্সি বহন করিতে বাধ্য থাকিবে।
					<br />
					<br />
					<b>
						অতএব মহোদয় সমীপে বিনীত আরজ সৌদি আরব গমনেচ্ছুক{' '}
						{data?.data?.length
							?.toString()
							.replace(/[0-9]/g, digit => String.fromCharCode(digit.charCodeAt(0) + 2486))}{' '}
						জন পুরুস কর্মীর অনুকুলে একক বহির্গমন ছাড়পএ প্রদানের বিষয় সদয় মর্জি হয়।
					</b>
					<br />
					<br />
					সংযুক্তি :
					<br />
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ১) ৩০০ টাকা নন-জুডিশিয়াল স্ট্যাম্পে অঙ্গীকারনামা। <br />
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ২) পাসপোর্ট,চুক্তিপএ ও ভিসার ফটোকপি। <br />
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ৩) পে-অর্ডার ও চারানের মুল কপি। <br />
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ৪) প্রশিক্ষনগন সনদেও মুলকপি। <br />
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ৫) উপস্থাপিত (Put up) তালিকা। <br />
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ৬) কর্মীর ডাটা শীট। <br />
					<br />
					মালিকের নামঃ {generalData?.owner_name}
					<br />
					মালিকের স্বক্ষর ও সীলঃ
					<br />
					<br />
					<br />
					তারিখঃ
					<br />
					প্রতিনিধিঃ
					<br />
				</div>
			</div>
		</div>
	);
}

export default withRouter(BmetV2ApplicationsTable);
