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
  { id: 1, label: "SL", sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: "Name", name: "passenger_name", show: true },
  { id: 3, label: "Passport No", name: "passport_no", show: true },
  { id: 4, label: "Profession", name: "profession", show: true },

  { id: 5, label: "REF", name: "agency", show: true },
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
        profession: manpowerSub?.embassy?.profession_english,

        passport_no: manpowerSub?.passenger?.passport_no,

        passenger_name: manpowerSub?.passenger?.passenger_name,

        agency: manpowerSub?.man_power_list?.agency?.name,
      });
    });
    setModifiedManpowerNtSheetData(modifiedData);
  }, [data]);

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
                <h1 className="text-center font-lg underline">
                  {" "}
                  MANPOWER REF LIST
                </h1>
              </div>
              <div>
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
          </div>
        </div>
      )}
    </>
  );
}

export default ListOfManpowerRefForm;
