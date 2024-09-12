/* eslint-disable array-callback-return */
import { useEffect, useReducer, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import tableColumnsReducer from "src/app/@components/ReportComponents/tableColumnsReducer";
import ReportPaginationAndDownload from "src/app/@components/ReportComponents/ReportPaginationAndDownload";
import useReportData from "src/app/@components/ReportComponents/useReportData";
import { useReactToPrint } from "react-to-print";
import { Checkbox } from "@mui/material";
import { getReportMakeStyles } from "../../ReportUtilities/reportMakeStyls";
import VisaSubmissionListsTable from "./VisaSubmissionListsTable";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const initialTableColumnsState = [
		{ id: 1, label: 'Profession ', name: 'profession', show: true },
		{ id: 2, label: 'Year ', name: 'year', show: true },
		{ id: 3, label: 'Visa No  ', name: 'visa_no', show: true },
		{ id: 4, label: 'Sponsor Name ', name: 'sponsor_name', show: true },
		{ id: 5, label: 'Possport No  ', name: 'passport_no', show: true },
		{ id: 6, label: 'Sponsor ID', name: 'sponsor_id', show: true },
		{ id: 7, label: 'Office SL', name: 'office_sl', show: true },
		{ id: 8, label: 'Passenger Name', name: 'passenger_name', show: true },
		{ id: 9, label: 'Reference', name: 'reference', show: true },
		// { id: 10, label: 'id', name: 'visa_submission_list', subName: 'id', show: false },
		{ id: 11, label: 'SL', sortAction: false, isSerialNo: true, show: true }
	];
	const initialTableColumnsState2 = [
		{ id: 1, label: 'Profession ', name: 'profession', show: true },
		{ id: 2, label: 'Year ', name: 'year', show: true },
		{ id: 3, label: 'Visa No  ', name: 'visa_no', show: true },
		{ id: 4, label: 'Sponsor Name ', name: 'sponsor_name', show: true },
		{ id: 5, label: 'Possport No  ', name: 'passport_no', show: true },
		{ id: 6, label: 'Sponsor ID', name: 'sponsor_id', show: true },
		{ id: 7, label: 'Office SL', name: 'office_sl', show: true },
		{ id: 8, label: 'Passenger Name', name: 'passenger_name', show: true },
		{ id: 9, label: 'Reference', name: 'reference', show: true },
		// { id: 10, label: 'id', name: 'visa_submission_list', subName: 'id', show: false },

		{ id: 11, label: 'SL', sortAction: false, isSerialNo: true, show: true }
	];

function VisaSubmissionLists({
  data,
  tableShow,
  hideTabile,
  visaSubmissionListId,
  handleReset,
  refetch,
  emptyValue,
  selectedDate,
  selectedPassenger,
  passenger,
  manPowerDate,
}) {
 const classes = useStyles();
	const [cancelList, setCancelList] = useState(false);

	const [newList, setNewList] = useState(true);
	const [officePrint, setOfficePrint] = useState(false);
	const [embPrint, setembPrint] = useState(false);
	const handlecancelList = event => {
		setCancelList(event.target.checked);
	};
	const handlenewList = event => {
		setNewList(event.target.checked);
	};
	const handleembPrint = event => {
		setembPrint(event.target.checked);
		officePrint && setOfficePrint(false);
	};
	const handleofficePrint = event => {
		setOfficePrint(event.target.checked);
		embPrint && setembPrint(false);
	};

  const [
    modifiedManpowerSbListData,
    setModifiedVisaSbListData ,
    setSortBy,
    setSortBySubKey,
    dragAndDropRow,
  ] = useReportData();
  const [
    modifiedVisaSbListData2,
    setModifiedVisaSbListData2,
    setSortBy2,
    setSortBySubKey2,
    dragAndDropRow2,
  ] = useReportData();



  useEffect(() => {
    const modifiedData = data?.map((visaSub) => ({
      profession: visaSub?.visa_entry?.profession_arabic,
				year: moment(new Date(visaSub?.visa_entry?.visa_issue_date)).format('DD-MM-YYYY'),
				visa_no: visaSub?.visa_entry?.visa_number,
				sponsor_id: visaSub?.visa_entry?.sponsor_id_no,
				sponsor_name: visaSub?.visa_entry?.sponsor_name_arabic,
				passport_no: visaSub?.passenger?.passport_no,
				office_sl: visaSub?.passenger?.passenger_id,
				passenger_name: visaSub?.passenger?.passenger_name,
				reference: visaSub?.agent?.username,
				id: visaSub?.visa_submission_list?.id,
				list_type: visaSub?.visa_submission_list?.list_type
    }));



    setModifiedVisaSbListData(modifiedData);
		setModifiedVisaSbListData2(modifiedData);
  }, [data]);


  console.log('modifiedManpowerSbListDataVisa',modifiedManpowerSbListData)

 const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, initialTableColumnsState);
  const [tableColumns2, dispatchTableColumns2] = useReducer(tableColumnsReducer, initialTableColumnsState2);
  
  const [printableFormat, setPrintableFormat] = useState(false);

  const handlePrintableFormat = (event) => {
    setPrintableFormat(event.target.checked);
  };

  // const [inPrint, setInPrint] = useState(false);
  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [inShowAllMode, setInShowAllMode] = useState(false);

  // pagination state
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(25);

  // print dom ref
  const componentRef = useRef();

  // Function to handle Excel download
  const handleExelDownload = () => {
    document.getElementById("test-table-xls-button").click();
  };

  // Function to handle Print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Checkbox
        printableFormat={printableFormat}
        onChange={handlePrintableFormat}
        className="ml-96"
        inputProps={{ "aria-label": "controlled" }}
      />
      Printable Format
      <ReportPaginationAndDownload
        page={page}
        size={size}
        setPage={setPage}
        setSize={setSize}
        inShowAllMode={inShowAllMode}
        setInShowAllMode={setInShowAllMode}
        componentRef={componentRef}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetAllData={data}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        dragAndDropRow={dragAndDropRow}
        hideSection={["pagination", "download", "pg", "wp", "column"]}
      />
      <table id="table-to-xls" className="w-full">
        <div ref={componentRef} id="downloadPage">
          {modifiedManpowerSbListData.map((manpowerSbList) => (
            <VisaSubmissionListsTable
              classes={classes}
              // generalData={generalData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={manpowerSbList}
              printableFormat={printableFormat}
              serialNumber={
                manpowerSbList.page * manpowerSbList.size -
                manpowerSbList.size +
                1
              }
              setPage={setPage}
              inSiglePageMode={inSiglePageMode}
              setSortBy={setSortBy}
              setSortBySubKey={setSortBySubKey}
              dragAndDropRow={dragAndDropRow}
              tableShow={tableShow}
              data2={data}
              visaSubmissionListId={visaSubmissionListId}
              handleReset={handleReset}
              emptyValue={emptyValue}
              refetch={refetch}
              hideTabile={hideTabile}
              selectedDate={selectedDate}
              selectedPassenger={selectedPassenger}
              passenger={passenger}
              manPowerDate={manPowerDate}
            />
          ))}
        </div>
      </table>
    </>
  );
}

export default VisaSubmissionLists;
