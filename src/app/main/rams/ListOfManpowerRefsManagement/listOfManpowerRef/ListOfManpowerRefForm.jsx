/* eslint-disable array-callback-return */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { makeStyles } from "@mui/styles";
import { useFormContext } from "react-hook-form";
import { useEffect, useReducer, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import moment from "moment";
import CustomDatePicker from "src/app/@components/CustomDatePicker";

import {
  NOTE_SHEET_GROUP_FOOTER,
  NOTE_SHEET_GROUP_HEADER,
} from "src/app/constant/FormContentTitle/formContentTitle";
import { Interweave } from "interweave";
import { GET_FORM_CONTENT_DETAILS_BY_TITLE } from "src/app/constant/constants";
import tableColumnsReducer from "src/app/@components/ReportComponents/tableColumnsReducer";
import ReportPaginationAndDownload from "src/app/@components/ReportComponents/ReportPaginationAndDownload";
import useReportData from "src/app/@components/ReportComponents/useReportData";
import SinglePageOnlyTable from "src/app/@components/ReportComponents/SinglePageOnlyTable";
import { useGetListOfManpowerRefQuery } from "../ListOfManpowerRefsApi";
import { Search } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  searchContainer: ({ isPassenger }) => ({
    color: theme.palette.primary.main,
    background: "transparent",
    borderColor: theme.palette.primary.main,
    cursor: isPassenger && "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid",
    height: "52px",
    width: "52px",
    marginTop: "8px",
    borderRadius: "5px",
    "&:hover": {
      color: isPassenger
        ? theme.palette.primary.dark
        : theme.palette.primary.main,
      background: isPassenger ? theme.palette.primary.light : "transparent",
      borderColor: isPassenger
        ? theme.palette.primary.dark
        : theme.palette.primary.main,
    },
    "&:active": {
      color: isPassenger
        ? theme.palette.primary.light
        : theme.palette.primary.main,
      background: isPassenger ? theme.palette.primary.dark : "transparent",
      borderColor: isPassenger
        ? theme.palette.primary.light
        : theme.palette.primary.main,
    },
  }),
}));

const initialTableColumnsState = [
  {
    id: 1,
    label: "ক্রমিক নং",
    sortAction: false,
    isSerialNo: true,
    show: true,
  },
  { id: 2, label: "কর্মীর নাম", name: "passenger_name", show: true },
  { id: 3, label: "পাসপোর্ট নম্বার", name: "passport_no", show: true },
  { id: 4, label: "জন্ম তারিখ.", name: "date_of_birth", show: true },
  { id: 5, label: "ভিসা নম্বর ", name: "visa_no", show: true },
  { id: 6, label: "স্বএ্যায়নের তারিখ ", name: "stamping_date", show: true },
  { id: 7, label: "পদের নাম", name: "profession", show: true },
  { id: 8, label: "নিয়োগকারীর নাম", name: "sponsor_name", show: true },
];

const initialTableColumnsState2 = [
  {
    id: 1,
    label: "ক্রমিক নং",
    sortAction: false,
    isSerialNo: true,
    show: true,
  },
  { id: 2, label: "কর্মীর নাম", name: "passenger_name", show: true },
  { id: 3, label: "পাসপোর্ট নম্বার", name: "passport_no", show: true },
  { id: 4, label: "সনদ নম্বর.", name: "certificate_no", show: true },
  { id: 5, label: "ব্যাচ নম্বর ", name: "batch_number", show: true },
  { id: 6, label: "সিরিয়াল নম্বর ", name: "serial_no", show: true },
  { id: 7, label: "টি.টি.সির নাম", name: "training_center", show: true },
];
const initialTableColumnsState3 = [
  {
    id: 1,
    label: "ক্রমিক নং",
    sortAction: false,
    isSerialNo: true,
    show: true,
  },
  { id: 2, label: "কর্মীর নাম", name: "passenger_name", show: true },
  { id: 3, label: "পাসপোর্ট নম্বার", name: "passport_no", show: true },
  { id: 4, label: "ব্যাংকের নাম", name: "bank_name", show: true },
  { id: 5, label: "অ্যাকাউন্ট নং", name: "account_no", show: true },
  {
    id: 6,
    label: "মেডিকেল সেন্টারের নাম ",
    name: "medical_center",
    show: true,
  },
];

function ListOfManpowerRefForm(props) {
  const methods = useFormContext();
  const { watch } = methods;
  const [formData, setFormData] = useState({
    passenger: "",
    center_name: "",
    district: "",
  });

  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(25);
  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [header, setHeader] = useState("");
  const [footer, SetFooter] = useState("null");
  const manPowerDate = watch("man_power_date");

  // Function to handle Excel download
  const handleExelDownload = () => {
    document.getElementById("test-table-xls-button").click();
  };

  // Function to handle Print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { data } = useGetListOfManpowerRefQuery({
    manPowerDate: selectedDate,
  });

  const componentRef = useRef();

  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );
  const [tableColumns2, dispatchTableColumns2] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState2
  );
  const [tableColumns3, dispatchTableColumns3] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState3
  );

  const [
    modifiedManpowerNtSheetData,
    setModifiedManpowerNtSheetData,
    setSortBySubKey,
    dragAndDropRow,
  ] = useReportData();

  useEffect(() => {
    const modifiedData = [];
    data?.map((manpowerSub) => {
      modifiedData.push({
        passenger_name: manpowerSub?.passenger?.passenger_name,
        passport_no: manpowerSub?.passenger?.passport_no,
        date_of_birth: moment(
          new Date(manpowerSub?.passenger?.date_of_birth)
        ).format("DD-MM-YYYY"),
        visa_no: manpowerSub?.visa_entry?.visa_number,
        stamping_date: moment(
          new Date(manpowerSub?.embassy?.stamping_date)
        ).format("DD-MM-YYYY"),
        profession: manpowerSub?.embassy?.profession_english,
        certificate_no: manpowerSub?.training?.certificate_no,
        batch_number: manpowerSub?.training?.batch_number,
        serial_no: manpowerSub?.training?.serial_no,
        training_center: manpowerSub?.training?.training_center,
        sponsor_name: manpowerSub?.visa_entry?.sponsor_name_english,
        bank_name: manpowerSub?.man_power?.bank_name,
        account_no: manpowerSub?.man_power?.bank_account_no,
        medical_center: manpowerSub?.medical?.medical_center?.name,
      });
    });
    setModifiedManpowerNtSheetData(modifiedData);
  }, [data]);

  useEffect(() => {
    const authTOKEN = {
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("jwt_access_token"),
      },
    };

    fetch(
      `${GET_FORM_CONTENT_DETAILS_BY_TITLE}${NOTE_SHEET_GROUP_HEADER}`,
      authTOKEN
    )
      .then((response) => response.json())
      .then((data) => setHeader(data?.formcontent_detail[0]?.details || ""));

    fetch(
      `${GET_FORM_CONTENT_DETAILS_BY_TITLE}${NOTE_SHEET_GROUP_FOOTER}`,
      authTOKEN
    )
      .then((response) => response.json())
      .then((data) => SetFooter(data?.formcontent_detail[0]?.details || ""));
  }, []);

  function handleSearchManPowerDateClick() {
    setSelectedDate(manPowerDate);
  }

  return (
    <>
      <div className="flex flex-nowrap gap-10">
       
            <div className="w-full">
          <CustomDatePicker
            name="man_power_date"
            label="Date"
            placeholder="DD-MM-YYYY"
          />
        </div>

       
      

         <div
          className={classes.searchContainer}
           onClick={() => handleSearchManPowerDateClick()}
        >
          <Search className="cursor-pointer" />
        </div>
      </div>

      {/* Printable Format */}

      <br />
      <br />
      {modifiedManpowerNtSheetData.length > 0 && (
        <div className={classes.container}>
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
            tableColumns={tableColumns}
            dispatchTableColumns={dispatchTableColumns}
            dragAndDropRow={dragAndDropRow}
            hideSection={["pagination", "pg", "wp"]}
          />

          <div ref={componentRef} id="downloadPage" className="p-14">
            <table
              id="table-to-xls"
              className="w-full"
              style={{ minHeight: "270px" }}
            >
              <div>
                <div className="p-14">
                  <Interweave
                    allowAttributes
                    allowElements
                    disableLineBreaks
                    content={header}
                  />
                </div>
                {/* each single page (table) */}
                {modifiedManpowerNtSheetData.map((manpowerNtSheet, index) => (
                  <SinglePageOnlyTable
                    key={index}
                    classes={classes}
                    reportTitle=""
                    tableColumns={tableColumns}
                    dispatchTableColumns={dispatchTableColumns}
                    data={manpowerNtSheet}
                    serialNumber={index + 1 + (page - 1) * size}
                    setPage={setPage}
                    setSortBySubKey={setSortBySubKey}
                    dragAndDropRow={dragAndDropRow}
                  />
                ))}
              </div>
            </table>
            <p>১৪৩/প্রশিক্ষণ সনদের বিবরনঃ</p>

            <div>
              {modifiedManpowerNtSheetData.map((manpowerNtSheet, index) => (
                <SinglePageOnlyTable
                  key={index}
                  classes={classes}
                  reportTitle=""
                  tableColumns={tableColumns2}
                  dispatchTableColumns={dispatchTableColumns2}
                  data={manpowerNtSheet}
                  serialNumber={index + 1 + (page - 1) * size} // Serial number across pages
                  setPage={setPage}
                  setSortBySubKey={setSortBySubKey}
                  dragAndDropRow={dragAndDropRow}
                />
              ))}
            </div>

            <p>১৪৪/ ব্যাংক অ্যাকাউন্ট ও মেডিকেল সেন্টারের বিবরনঃ</p>

            <div>
              {modifiedManpowerNtSheetData.map((manpowerNtSheet, index) => (
                <SinglePageOnlyTable
                  key={index}
                  classes={classes}
                  reportTitle=""
                  tableColumns={tableColumns3}
                  dispatchTableColumns={dispatchTableColumns3}
                  data={manpowerNtSheet}
                  serialNumber={index + 1 + (page - 1) * size}
                  setPage={setPage}
                  setSortBySubKey={setSortBySubKey}
                  dragAndDropRow={dragAndDropRow}
                />
              ))}
            </div>

            <div className="p-14">
              {modifiedManpowerNtSheetData.length > 0 && (
                <Interweave
                  allowAttributes
                  allowElements
                  disableLineBreaks
                  className="p-6"
                  content={footer}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListOfManpowerRefForm;
