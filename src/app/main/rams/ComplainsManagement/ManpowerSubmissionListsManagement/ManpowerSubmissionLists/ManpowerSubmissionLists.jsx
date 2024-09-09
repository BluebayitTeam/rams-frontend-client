/* eslint-disable array-callback-return */
import { useEffect, useReducer, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import { GET_SITESETTINGS } from "src/app/constant/constants";
import tableColumnsReducer from "src/app/@components/ReportComponents/tableColumnsReducer";
import useUserInfo from "src/app/@customHooks/useUserInfo";
import ReportPaginationAndDownload from "src/app/@components/ReportComponents/ReportPaginationAndDownload";
import { useForm } from "react-hook-form";
import useReportData from "src/app/@components/ReportComponents/useReportData";
import { unstable_batchedUpdates } from "react-dom";
import { useReactToPrint } from "react-to-print";
import getPaginationData from "src/app/@helpers/getPaginationData";
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

function ManpowerSubmissionLists({ data, tableShow, refetch2 }) {
  // const { data } = props;
  const methods = useForm();
  const { getValues, refetch, refetchAll } = methods;
  console.log("ManpowerSubmissionListsData", data);
  const classes = useStyles();

  const { authTOKEN } = useUserInfo();

  const [generalData, setGeneralData] = useState({});

  const [manpowerSbLists, subManpowerSbLists] = useState([{ data }]);

  const [
    modifiedManpowerSbListData,
    setModifiedManpowerSbListData,
    setSortBy,
    setSortBySubKey,
    dragAndDropRow,
  ] = useReportData();
  useEffect(() => {
    console.log("Received manpowerSbLists:", manpowerSbLists);
    const manpowerSubLsts = manpowerSbLists;
    const modifiedData = manpowerSubLsts.map((manpowerSub) => ({
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
    console.log("Modified Manpower Submission List Data:", modifiedData);
    setModifiedManpowerSbListData(modifiedData);
  }, [manpowerSbLists]);

  // Inside the return statement, before rendering
  console.log("Rendering Modified Manpower Data:", modifiedManpowerSbListData);

  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );
  const [printableFormat, setPrintableFormat] = useState(false);

  // tools state

  // const [inPrint, setInPrint] = useState(false);
  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [inShowAllMode, setInShowAllMode] = useState(false);

  // pagination state
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // get general setting data
  useEffect(() => {
    fetch(`${GET_SITESETTINGS}`, authTOKEN)
      .then((response) => response.json())
      .then((data) => setGeneralData(data.general_settings[0] || {}))
      .catch(() => setGeneralData({}));
  }, []);

  // print dom ref
  const componentRef = useRef();

  const [modifiedManpowerData, setmodifiedManpowerData] = useReportData();

  console.log("modifiedManpowerData", modifiedManpowerData);

  // Function to handle Excel download
  const handleExelDownload = () => {
    document.getElementById("test-table-xls-button").click();
  };

  // Function to handle Print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleGetManpowers = async (newPage, callBack) => {
    try {
      const formValues = getValues();
      const page = newPage || 1;
      setPage(page);

      const response = await refetch({ ...formValues, page, size }); // Manually trigger the query

      if (response?.data) {
        unstable_batchedUpdates(() => {
          if (callBack) {
            callBack(response.data);
          }

          const manpowersData = response.data.manpowers || [];
          setmodifiedManpowerData(manpowersData);
          setInShowAllMode(false);

          // const { totalPages, totalElements } = getPaginationData(manpowersData, size, page);
          setTotalPages(response.data?.total_pages);
          setTotalElements(response.data?.total_elements);
        });
      }
    } catch (error) {
      console.error("Error fetching manpowers:", error);
    }
  };

  const handleGetAllManpowers = async (callBack, callBackAfterStateUpdated) => {
    try {
      const formValues = getValues();

      const response = await refetchAll({ ...formValues }); // Manually trigger the query

      if (response?.data) {
        unstable_batchedUpdates(() => {
          if (callBack) {
            callBack(response.data);
          }

          setmodifiedManpowerData(response.data.manpowers || []);
          setInShowAllMode(true);

          const { totalPages, totalElements } = getPaginationData(
            response.data.manpowers,
            size,
            page
          );
          setTotalPages(totalPages);
          setTotalElements(totalElements);
        });

        if (callBackAfterStateUpdated) {
          callBackAfterStateUpdated(response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching all manpowers:", error);
    }
  };
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
        totalPages={totalPages}
        totalElements={totalElements}
        onFirstPage={() => handleGetManpowers(1)}
        onPreviousPage={() => handleGetManpowers(page - 1)}
        onNextPage={() => handleGetManpowers(page + 1)}
        onLastPage={() => handleGetManpowers(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetManpowers}
        handleGetAllData={handleGetAllManpowers}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
      />

      <table id="table-to-xls" className="w-full">
        <div ref={componentRef} id="downloadPage">
          {/* each single page (table) */}
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
              refetch2={refetch2}
            />
          ))}
        </div>
      </table>
    </>
  );
}

export default ManpowerSubmissionLists;
