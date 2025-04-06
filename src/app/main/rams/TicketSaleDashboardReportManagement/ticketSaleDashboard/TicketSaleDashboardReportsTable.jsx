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
import {
  useGetTicketSaleDashboardAllReportsQuery,
  useGetTicketSaleDashboardReportsQuery,
} from "../TicketSaleDashboardReportsApi";

import { useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: "SL", sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: "Issue Date", name: "issue_date", show: true, type: "date" },
  {
    id: 3,
    label: "Ticket Status",
    name: "ticket_status",
    getterMethod: (data) => `${data.ticket_status || ""}`,
    show: true,
  },
  {
    id: 4,
    label: "Ticket Agency",
    getterMethod: (data) => `${data?.ticket_agency?.first_name || ""}`,
    show: true,
  },
  { id: 5, label: "Ticket No", name: "ticket_no", show: true },
  {
    id: 6,
    label: "Air Way",
    name: "current_airway",
    subName: "name",
    show: true,
  },
  { id: 7, label: "Purchase Amount ", name: "purchase_amount", show: true },
];

function TicketSaleDashboardReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedTicketSaleDashboardData, setModifiedTicketSaleDashboardData] =
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

  const filterData = watch();

  const { data: paginatedData } = useGetTicketSaleDashboardReportsQuery({
    skip: inShowAllMode,
  });

  console.log("paginatedDataCheck", modifiedTicketSaleDashboardData);
  const { data: allData } = useGetTicketSaleDashboardAllReportsQuery({
    skip: !inShowAllMode,
  });

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedTicketSaleDashboardData(allData?.ticket_seles || []);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.ticket_seles,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedTicketSaleDashboardData(paginatedData?.ticket_sales || []);

      setTotalAmount(paginatedData.total_amount);
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

  const handleGetTicketSaleDashboard = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  }, []);

  const handleGetAllTicketSaleDashboard = useCallback(async () => {
    try {
    } catch (error) {
      console.error("Error fetching all ticketSaleDashboard:", error);
    }
  }, []);

  const filteredData = {};

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
        onFirstPage={() => handleGetTicketSaleDashboard(1)}
        onPreviousPage={() => handleGetTicketSaleDashboard(page - 1)}
        onNextPage={() => handleGetTicketSaleDashboard(page + 1)}
        onLastPage={() => handleGetTicketSaleDashboard(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetTicketSaleDashboard}
        handleGetAllData={handleGetAllTicketSaleDashboard}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename="TicketSaleDashboardReport"
      />
      <table
        id="table-to-xls"
        className="w-full"
        style={{ minHeight: "270px" }}
      >
        <tbody ref={componentRef} id="downloadPage">
          {modifiedTicketSaleDashboardData.map((ticketSaleDashboard, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle="Total Sales Report"
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={ticketSaleDashboard}
              totalColumn={initialTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size -
                    size +
                    index * ticketSaleDashboard.data.length +
                    1
                  : ticketSaleDashboard.page * ticketSaleDashboard.size -
                    ticketSaleDashboard.size +
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

export default TicketSaleDashboardReportsTable;
