import { zodResolver } from "@hookform/resolvers/zod";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import ReportPaginationAndDownload from "src/app/@components/ReportComponents/ReportPaginationAndDownload";
import SinglePage from "src/app/@components/ReportComponents/SinglePage";
import tableColumnsReducer from "src/app/@components/ReportComponents/tableColumnsReducer";
import useReportData from "src/app/@components/ReportComponents/useReportData";
import getPaginationData from "src/app/@helpers/getPaginationData";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { z } from "zod";
import { getReportMakeStyles } from "../../ReportUtilities/reportMakeStyls";
import { useGetFlightMalaysiaReportsQuery } from "../FlightMalaysiaReportsApi";

import { useParams } from "react-router";
import { useGetFlightMalaysiaAllReportsQuery } from "../FlightMalaysiaReportsApi";

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: "SL", sortAction: false, isSerialNo: true, show: true },
  {
    id: 2,
    label: "Flight Date",
    name: "flight_date",
    show: true,
    type: "date",
  },
  {
    id: 3,
    label: "Passenger Name",
    name: "passenger",
    subName: "passenger_name",
    show: true,
  },
  {
    id: 4,
    label: "Passenger Passport No",
    name: "passenger",
    subName: "passport_no",
    show: true,
  },
  {
    id: 5,
    label: "Country",
    getterMethod: (data) => `${data.passenger?.target_country?.name || ""} `,
    show: true,
  },
  {
    id: 6,
    label: "Agent",
    getterMethod: (data) => `${data.ticket_agency?.first_name || ""} `,
    show: true,
  },

  {
    id: 7,
    label: "Visa No",
    name: "visa_entry",
    subName: "visa_number",
    show: true,
  },
  { id: 8, label: "Ticket No", name: "ticket_no", show: true },
  {
    id: 9,
    label: "Current Status",
    getterMethod: (data) => `${data.passenger?.current_status?.name || ""}`,
    show: true,
  },
];
function FlightMalaysiaReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedFlightFlightDoneData, setModifiedFlightFlightDoneData] =
    useReportData();

  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialTableColumnsState
  );

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [inShowAllMode, setInShowAllMode] = useState(false);
  const [pagination, setPagination] = useState(false);
  const [inSiglePageMode, setInSiglePageMode] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const componentRef = useRef(null);
  const routeParams = useParams();
  console.log("routeParams", routeParams);

  const filterData = watch();

  const { data: paginatedData } = useGetFlightMalaysiaReportsQuery(
    {
      country: "malaysia",
      page,
      size,
    },
    { skip: inShowAllMode }
  );
  const { data: allData } = useGetFlightMalaysiaAllReportsQuery(
    {
      country: "malaysia",
      page,
      size,
    },
    { skip: !inShowAllMode }
  );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedFlightFlightDoneData(allData.flights || []);
      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.flights,
        size,
        page
      );
      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedFlightFlightDoneData(paginatedData.flights || []);
      setSize(paginatedData?.size || 25);
      setTotalPages(paginatedData.total_pages || 0);
      setTotalElements(paginatedData.total_elements || 0);
      setPagination(true);
      setInSiglePageMode(true);
      setInShowAllMode(false);
    }
  }, [inShowAllMode, allData, paginatedData, size, page]);

  const handleExelDownload = () => {
    document.getElementById("test-table-xls-button").click();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleGetFlightFlightDones = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  }, []);

  const handleGetAllFlightFlightDones = useCallback(async () => {
    try {
    } catch (error) {
      console.error("Error fetching all flightFlightDones:", error);
    }
  }, []);

  const filteredData = {
    Date_To: getValues()?.issue_date_before
      ? moment(new Date(getValues()?.issue_date_before)).format("DD-MM-YYYY")
      : null,
    Date_From: getValues()?.issue_date_after
      ? moment(new Date(getValues()?.issue_date_after)).format("DD-MM-YYYY")
      : null,
    Agent: getValues()?.ticket_agencyName || null,
  };

  return (
    <div className={classes.headContainer}>
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
        onFirstPage={() => handleGetFlightFlightDones(1)}
        onPreviousPage={() => handleGetFlightFlightDones(page - 1)}
        onNextPage={() => handleGetFlightFlightDones(page + 1)}
        onLastPage={() => handleGetFlightFlightDones(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetFlightFlightDones}
        handleGetAllData={handleGetAllFlightFlightDones}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename="FlightMalaysiaReport"
      />
      <table
        id="table-to-xls"
        className="w-full"
        style={{ minHeight: "270px" }}
      >
        <tbody ref={componentRef} id="downloadPage">
          {modifiedFlightFlightDoneData.map((flightFlightDone, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle="Flight Report"
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={flightFlightDone}
              totalColumn={initialTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size -
                    size +
                    index * flightFlightDone.data.length +
                    1
                  : flightFlightDone.page * flightFlightDone.size -
                    flightFlightDone.size +
                    1
              }
              setPage={setPage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FlightMalaysiaReportsTable;
