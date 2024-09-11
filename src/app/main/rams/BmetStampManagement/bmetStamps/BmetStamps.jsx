import { useEffect, useReducer, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import tableColumnsReducer from "src/app/@components/ReportComponents/tableColumnsReducer";
import ReportPaginationAndDownload from "src/app/@components/ReportComponents/ReportPaginationAndDownload";
import useReportData from "src/app/@components/ReportComponents/useReportData";
import { useReactToPrint } from "react-to-print";
import { getReportMakeStyles } from "../../ReportUtilities/reportMakeStyls";
import BmetStampsTable from "./BmetStampsTable";
import BmetStampsTable2 from "./BmetStampsTable2";
import BmetStampTable3 from "./BmetStampTable3";
import { useFormContext } from "react-hook-form";
import BmetStampTable4 from "./BmetStampTable4";

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
    label: "কর্মীর নাম ,ঠিকানা,মোবাইল নং(নিজ ও নিকট আত্মীয়)",
    name: "passenger_name",
    show: true,
  },
  { id: 3, label: "পাসপোর্ট নম্বার", name: "passport_no", show: true },
  {
    id: 4,
    label: "নিয়োগকর্তার নাম,ঠিকানা ও টেলিফোন নম্বর",
    name: "sponsor_name",
    show: true,
  },
  { id: 5, label: "ভিসা নম্বর ", name: "visa_no", show: true },
  { id: 6, label: "পদের নাম", name: "profession", show: true },
  { id: 7, label: "অভিবাসন ব্যয় ", name: "Payment", show: true },
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

function BmetStamps({
  data,
  tableShow,
  hideTabile,
  bmetStampId,
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
  const methods = useFormContext();

  const { getValues } = methods;
  const [
    modifiedManpowerSbListData,
    setModifiedManpowerSbListData,
    setSortBy,
    setSortBySubKey,
    dragAndDropRow,
  ] = useReportData();
  useEffect(() => {
    const modifiedData = data?.map((manpowerSub) => ({
      profession: manpowerSub?.embassy?.profession?.name,
      visa_no: manpowerSub?.visa_entry?.visa_number,
      sponsor_name: manpowerSub?.visa_entry?.sponsor_name_english,
      sponsor_id: manpowerSub?.manpower_entry?.sponsor_id_no,
      passport_no: manpowerSub?.passenger?.passport_no,
      office_sl: manpowerSub?.passenger?.office_serial,
      passenger_name: manpowerSub?.passenger?.passenger_name,
      reference: manpowerSub?.agent?.username,
      registration_id: manpowerSub?.man_power?.registration_id,
      certificate_no: manpowerSub?.training?.certificate_no,
      batch_number: manpowerSub?.training?.batch_number,
      serial_no: manpowerSub?.training?.serial_no,
      training_center: manpowerSub?.training?.training_center,
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
  const [tableColumns2, dispatchTableColumns2] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState2
  );

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
        hideSection={["pagination", "pg", "wp", ]}
      />
      <table id="table-to-xls" className="w-full">
        <div ref={componentRef} id="downloadPage">
          {modifiedManpowerSbListData.map((manpowerSbList) => (
            <BmetStampsTable
              classes={classes}
              generalData={generalData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={manpowerSbList}
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
              bmetStampId={bmetStampId}
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

      <div ref={componentRef} id="downloadPage" className="p-48">
        <div style={{ minHeight: "1800px", maxHeight: "1800px" }}>
          <table id="table-to-xls" className="w-full pt-10">
            <div>
              {/* each single page (table) */}
              {modifiedManpowerSbListData.map((manpowerSbList) => (
                <BmetStampsTable
                  classes={classes}
                  generalData={generalData}
                  tableColumns={tableColumns}
                  dispatchTableColumns={dispatchTableColumns}
                  data={manpowerSbList}
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
                />
              ))}
            </div>
          </table>
        </div>

        <div style={{ minHeight: "1400px", maxHeight: "1400px" }}>
          <table id="table-to-xls" className="w-full">
            <div>
              {modifiedManpowerSbListData.map((manpowerSbList) => (
                <BmetStampsTable2
                  reportTitle={""}
                  classes={classes}
                  generalData={generalData}
                  tableColumns={tableColumns2}
                  dispatchTableColumns={dispatchTableColumns2}
                  data={manpowerSbList}
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
                />
              ))}
            </div>
          </table>
        </div>

        <div style={{ minHeight: "1400px", maxHeight: "1400px" }}>
          <table id="table-to-xls" className="w-full">
            <div>
              {modifiedManpowerSbListData.map((manpowerSbList) => (
                <BmetStampTable3
                  classes={classes}
                  data={manpowerSbList}
                  agencyInfo={getValues()?.agency_info}
                  country={getValues()?.country_name?.name}
                />
              ))}
            </div>
          </table>
        </div>
        <div style={{ minHeight: "1000px", maxHeight: "1000px" }}>
          <table id="table-to-xls" className="w-full">
            <div>
              {modifiedManpowerSbListData.map((manpowerSbList) => (
                <BmetStampTable4
                  classes={classes}
                  data={manpowerSbList}
                  agencyInfo={getValues()?.agency_info}
                  country={getValues()?.country_name?.name}
                />
              ))}
            </div>
          </table>
        </div>
      </div>
    </>
  );
}

export default BmetStamps;
