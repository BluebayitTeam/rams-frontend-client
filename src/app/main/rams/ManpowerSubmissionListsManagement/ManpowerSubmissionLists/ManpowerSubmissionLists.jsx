/* eslint-disable array-callback-return */
import { useEffect, useReducer, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import tableColumnsReducer from "src/app/@components/ReportComponents/tableColumnsReducer";
import ReportPaginationAndDownload from "src/app/@components/ReportComponents/ReportPaginationAndDownload";
import useReportData from "src/app/@components/ReportComponents/useReportData";
import { useReactToPrint } from "react-to-print";
import { Checkbox } from "@mui/material";
import { getReportMakeStyles } from "../../ReportUtilities/reportMakeStyls";
import ManpowerSubmissionListsTable from "./ManpowerSubmissionListsTable";

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const initialTableColumnsState = [
  {
    id: 1,
    label: "ক্রমিক নং",
    sortAction: false,
    isSerialNo: true,
    show: true,
  },
  {
    id: 2,
    label: "বিদেশগামী কর্মীর নাম",
    name: "passenger_name",
    show: true,
    style: {
      whiteSpace: "wrap",
    },
  },
  { id: 3, label: "পাসপোর্ট নম্বার", name: "passport_no", show: true },
  { id: 4, label: "ফিঙ্গার নং.", name: "registration_id", show: true },
  { id: 5, label: "ভিসা নম্বর ", name: "visa_no", show: true },
  { id: 6, label: "নিয়োগকারীর নাম", name: "sponsor_name", show: true },
  { id: 7, label: "পদের নাম", name: "profession", show: true },
  { id: 8, label: "আয়করের পরিমাণ ", name: "Payment", show: true },
  { id: 9, label: "আহার ", name: "Food", show: true },
  { id: 10, label: "বি/ভাড়া", name: "home_rent", show: true },
  { id: 11, label: "আয়করের পরিমাণ", name: "abcd", show: true },
  { id: 12, label: "কল্যাণ ফ্রি এর পরিমাণ", name: "efg", show: true },
];

function ManpowerSubmissionLists({
  data,
  tableShow,
  hideTabile,
  manpowerSubmissionListId,
  handleReset,
  refetch,
  emptyValue,
  selectedDate,
  selectedPassenger,
  passenger,
  manPowerDate,
}) {
  const classes = useStyles();

  const [generalData, setGeneralData] = useState({});

  const [
    modifiedManpowerSbListData,
    setModifiedManpowerSbListData,
    setSortBy,
    setSortBySubKey,
    dragAndDropRow,
  ] = useReportData();
  useEffect(() => {
    const modifiedData = data?.map((manpowerSub) => ({
      id: manpowerSub?.man_power_list?.id,
      profession: manpowerSub?.visa_entry?.profession_english,
      visa_no: manpowerSub?.visa_entry?.visa_number,
      sponsor_name: manpowerSub?.visa_entry?.sponsor_name_english,
      sponsor_id: manpowerSub?.manpower_entry?.sponsor_id_no,
      passport_no: manpowerSub?.passenger?.passport_no,
      office_sl: manpowerSub?.passenger?.office_serial,
      passenger_name: manpowerSub?.passenger?.passenger_name,
      reference: manpowerSub?.agent?.username,
      registration_id: manpowerSub?.man_power?.registration_id,
      Payment: "1000",
      Food: "Self",
      home_rent: "Free",
      abcd: "500",
      efg: "3500",
      country: manpowerSub?.man_power_list?.country?.name,
      agency: manpowerSub?.man_power_list?.agency?.name,
      rl_no: manpowerSub?.man_power?.recruiting_agency?.rl_no,
      man_power_date: manpowerSub?.man_power_list?.man_power_date,
    }));

    setModifiedManpowerSbListData(modifiedData);
  }, [data]);

  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );
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
            <ManpowerSubmissionListsTable
              classes={classes}
              generalData={generalData}
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
              manpowerSubmissionListId={manpowerSubmissionListId}
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

export default ManpowerSubmissionLists;
