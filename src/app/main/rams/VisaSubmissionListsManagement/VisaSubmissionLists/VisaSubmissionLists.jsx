/* eslint-disable array-callback-return */
import { useEffect, useReducer, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import tableColumnsReducer from "src/app/@components/ReportComponents/tableColumnsReducer";
import ReportPaginationAndDownload from "src/app/@components/ReportComponents/ReportPaginationAndDownload";
import useReportData from "src/app/@components/ReportComponents/useReportData";
import { useReactToPrint } from "react-to-print";
import { Checkbox, Radio } from "@mui/material";
import { getReportMakeStyles } from "../../ReportUtilities/reportMakeStyls";
import VisaSubmissionListsTable from "./VisaSubmissionListsTable";
import moment from "moment";
import VisaSubmissionListsCancelTable from "./VisaSubmissionListsCancelTable";

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));
const initialTableColumnsState = [
  { id: 1, label: "Profession ", name: "profession", show: true },
  { id: 2, label: "Year ", name: "year", show: true },
  { id: 3, label: "Visa No  ", name: "visa_no", show: true },
  { id: 4, label: "Sponsor Name ", name: "sponsor_name", show: true },
  { id: 5, label: "Possport No  ", name: "passport_no", show: true },
  { id: 6, label: "Sponsor ID", name: "sponsor_id", show: true },
  { id: 7, label: "Office SL", name: "office_sl", show: true },
  { id: 8, label: "Passenger Name", name: "passenger_name", show: true },
  { id: 9, label: "Reference", name: "reference", show: true },
  // { id: 10, label: 'id', name: 'visa_submission_list', subName: 'id', show: false },
  { id: 11, label: "SL", sortAction: false, isSerialNo: true, show: true },
];
const initialTableColumnsState2 = [
  { id: 1, label: "Profession ", name: "profession", show: true },
  { id: 2, label: "Year ", name: "year", show: true },
  { id: 3, label: "Visa No  ", name: "visa_no", show: true },
  { id: 4, label: "Sponsor Name ", name: "sponsor_name_english", show: true },
  { id: 5, label: "Possport No  ", name: "passport_no", show: true },
  { id: 6, label: "Sponsor ID", name: "sponsor_id_no", show: true },
  { id: 7, label: "Office SL", name: "office_sl", show: true },
  { id: 8, label: "Passenger Name", name: "passenger_name", show: true },
  { id: 9, label: "Reference", name: "reference", show: true },

  { id: 10, label: "SL", sortAction: false, isSerialNo: true, show: true },
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
  handlecancelList,
  cancelList,
  handlenewList,
  newList,
  newListData,
}) {
  const classes = useStyles();
  const [officePrint, setOfficePrint] = useState(false);
  const [embPrint, setembPrint] = useState(false);
  const [selectedValue, setSelectedValue] = useState("delete");
  console.log("newListData", newListData);
  const [
    modifiedManpowerSbListData,
    setModifiedVisaSbListData,
    setSortBy,
    setSortBySubKey,
    dragAndDropRow,
  ] = useReportData();

  const [modifiedVisaSbListData2, setModifiedVisaSbListData2, dragAndDropRow2] =
    useReportData();

  useEffect(() => {
    if (Array.isArray(newListData) && newListData.length > 0) {
      const modifiedData = newListData.map((visaSub) => {
        console.log("visaSub", visaSub);
        return {
          profession: visaSub?.visa_entry?.profession_arabic || "",
          year: visaSub?.visa_entry?.visa_issue_date
            ? moment(visaSub.visa_entry.visa_issue_date).format("DD-MM-YYYY")
            : "",
          visa_no: visaSub?.visa_entry?.visa_number || "",
          sponsor_id: visaSub?.visa_entry?.sponsor_id_no || "",
          sponsor_name: visaSub?.visa_entry?.sponsor_name_arabic || "",
          passport_no: visaSub?.passenger?.passport_no || "",
          office_sl: visaSub?.passenger?.passenger_id || "",
          passenger_name: visaSub?.passenger?.passenger_name || "",
          reference: visaSub?.agent?.first_name || "",
          id: visaSub?.visa_submission_list?.id || "",
          list_type: visaSub?.visa_submission_list?.list_type || "",
        };
      });

      setModifiedVisaSbListData(modifiedData);
      setModifiedVisaSbListData2(modifiedData);
    } else {
      setModifiedVisaSbListData([]); // Ensure state resets when no data
      setModifiedVisaSbListData2([]); // Ensure state resets when no data
    }
  }, [newListData]);

  const filteredData = modifiedManpowerSbListData[0]?.data?.filter(
    (item) => item?.list_type === "new"
  );
  const filteredData1 = modifiedManpowerSbListData[0]?.data?.filter(
    (item) => item?.list_type === "cancel"
  );

  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );
  const [tableColumns2, dispatchTableColumns2] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState2
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

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const TotalNewList = Array.isArray(data)
    ? data.filter((element) => element.visa_submission_list.list_type === "new")
        .length
    : 0;

  const TotalCancelList = Array.isArray(data)
    ? data.filter(
        (element) => element.visa_submission_list.list_type === "cancel"
      ).length
    : 0;

  return (
    <>
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
        hideSection={["pagination", "pg", "wp"]}
      />

      <div>
        <div style={{ display: newListData?.length > 0 ? "block" : "none" }}>
          {/* <Checkbox
            cancelList={cancelList}
            onChange={handlecancelList}
            inputProps={{ "aria-label": "controlled" }}
          />{" "}
          Cancel List
          <Checkbox
            defaultChecked
            newList={newList}
            onChange={handlenewList}
            inputProps={{ "aria-label": "controlled" }}
          />{" "}
          <span className="mr-96">New List</span> */}
          <Radio
            checked={selectedValue === "delete"}
            onChange={handleChange}
            value="delete"
            name="radio-button-demo"
            inputProps={{ "aria-label": "Delete" }}
          />{" "}
          Delete
          <Radio
            checked={selectedValue === "office"}
            onChange={handleChange}
            value="office"
            name="radio-button-demo"
            inputProps={{ "aria-label": "Office" }}
          />
          Office Print
          <Radio
            checked={selectedValue === "emb"}
            onChange={handleChange}
            value="emb"
            color="default"
            name="radio-button-demo"
            inputProps={{ "aria-label": "EMB" }}
          />
          EMB Print
        </div>

        <div ref={componentRef} id="downloadPage">
          {filteredData?.length > 0 && (
            <table
              id="table-to-xls"
              className="w-full"
              style={{
                display: newList == true ? "block" : "none",
                minHeight: "270px",
              }}
            >
              {modifiedManpowerSbListData.map((visaSbList) => (
                <VisaSubmissionListsTable
                  key={visaSbList.id} // Ensure unique key
                  classes={classes}
                  tableColumns={tableColumns}
                  dispatchTableColumns={dispatchTableColumns}
                  data={visaSbList}
                  printableFormat={printableFormat}
                  serialNumber={
                    visaSbList.page * visaSbList.size - visaSbList.size + 1
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
                  officePrint={officePrint}
                  selectedValue={selectedValue}
                  embPrint={embPrint}
                />
              ))}
            </table>
          )}
          {filteredData1?.length > 0 && (
            <table
              id="table-to-xls"
              className="w-full"
              style={{
                display: cancelList == true ? "block" : "none",
                minHeight: "270px",
              }}
            >
              {modifiedVisaSbListData2.map((visaSbList2) => (
                // console.log("fjhdsfkhsdf", visaSbList2)
                <VisaSubmissionListsCancelTable
                  key={visaSbList2.id} // Ensure unique key
                  classes={classes}
                  tableColumns2={tableColumns2}
                  dispatchTableColumns2={dispatchTableColumns2}
                  data2={visaSbList2}
                  serialNumber={
                    visaSbList2.page * visaSbList2.size - visaSbList2.size + 1
                  }
                  setPage={setPage}
                  inSiglePageMode={inSiglePageMode}
                  setSortBy={setSortBy}
                  setSortBySubKey={setSortBySubKey}
                  dragAndDropRow2={dragAndDropRow2}
                  officePrint={officePrint}
                  selectedValue={selectedValue}
                  embPrint={embPrint}
                />
              ))}
            </table>
          )}
          <div
            className="text-right mt-20 p-10"
            style={{
              display:
                modifiedManpowerSbListData?.length > 0 ? "block" : "none",
            }}
          >
            <p className="text-right">
              TOTAL:{" "}
              {newList && cancelList
                ? TotalNewList + TotalCancelList
                : newList && !cancelList
                  ? TotalNewList
                  : !newList && cancelList
                    ? TotalCancelList
                    : 0}{" "}
              :المجوع
            </p>
            <br />
            <p className="text-right">:المستلم</p> <br />
            <p className="text-right">:المدقق</p> <br />
            <p className="text-right">: المسئول</p> <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default VisaSubmissionLists;
