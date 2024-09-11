import { useEffect, useReducer, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import tableColumnsReducer from "src/app/@components/ReportComponents/tableColumnsReducer";
import ReportPaginationAndDownload from "src/app/@components/ReportComponents/ReportPaginationAndDownload";
import useReportData from "src/app/@components/ReportComponents/useReportData";
import { useReactToPrint } from "react-to-print";
import { Checkbox } from "@mui/material";
import moment from "moment";
import { getReportMakeStyles } from "../../ReportUtilities/reportMakeStyls";
import ManpowerSubmissionV2ListsTable from "./ManpowerSubmissionV2ListsTable";

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

const initialTableColumnsState = [
  { id: 1, label: "SL", sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: "Company Name", name: "comapany_name", show: true },
  { id: 2, label: "Employee Name", name: "employee_name", show: true },
  { id: 3, label: "Job Post", name: "job_post", show: true },
  { id: 4, label: "Salary", name: "salary", show: true },
  { id: 5, label: "Reg.ID No", name: "reg_id_no", show: true },
  { id: 6, label: "Visa Number", name: "visa_number", show: true },
  { id: 7, label: "Visa Issue Date", name: "visa_issue_date", show: true },
  { id: 8, label: "Visa Expiry Date", name: "visa_expirt_date", show: true },
  { id: 9, label: "Passport No", name: "passport_no", show: true },
  {
    id: 10,
    label: "Passport Issue Date",
    name: "passport_issue_date",
    show: true,
  },
  {
    id: 11,
    label: "Passport Expiry Date",
    name: "passport_expiry_date",
    show: true,
  },
  { id: 12, label: "Date of Birth", name: "date_of_birth", show: true },
];

function ManpowerSubmissionV2Lists({
  data,
  tableShow,
  hideTabile,
  manpowerSubmissionV2ListId,
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
      sl: manpowerSub?.man_power_list?.id,
      comapny_name: manpowerSub?.visa_entry?.demand?.company_name,
      employee_name: manpowerSub?.passenger?.passenger_name,
      job_post: manpowerSub?.embassy?.profession_english,
      salary: manpowerSub?.embassy?.salary,
      reg_id_no: manpowerSub?.man_power?.registration_id,
      visa_nimber: manpowerSub?.visa_entry?.visa_nimber,
      visa_issue_date: manpowerSub?.visa_entry?.visa_issue_date
        ? moment(new Date(manpowerSub?.visa_entry?.visa_issue_date)).format(
            "DD-MM-YYYY"
          )
        : "",
      visa_expiry_date: manpowerSub?.visa_entry?.visa_expiry_date
        ? moment(new Date(manpowerSub?.visa_entry?.visa_expiry_date)).format(
            "DD-MM-YYYY"
          )
        : "",
      passport_no: manpowerSub?.passenger?.passport_no,
      passport_issue_date: manpowerSub?.passenger?.passport_issue_date
        ? moment(new Date(manpowerSub?.passenger?.passport_issue_date)).format(
            "DD-MM-YYYY"
          )
        : "",
      passport_expiry_date: manpowerSub?.passenger?.passport_expiry_date
        ? moment(new Date(manpowerSub?.passenger?.passport_expiry_date)).format(
            "DD-MM-YYYY"
          )
        : "",
      date_of_birth: manpowerSub?.passenger?.date_of_birth
        ? moment(new Date(manpowerSub?.passenger?.date_of_birth)).format(
            "DD-MM-YYYY"
          )
        : "",
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
      Checked Printable Format
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
            <ManpowerSubmissionV2ListsTable
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
              manpowerSubmissionV2ListId={manpowerSubmissionV2ListId}
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

export default ManpowerSubmissionV2Lists;
