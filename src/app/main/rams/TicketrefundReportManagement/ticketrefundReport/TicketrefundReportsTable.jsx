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
import { z } from "zod";
import { getReportMakeStyles } from "../../ReportUtilities/reportMakeStyls";

import TicketrefundFilterMenu from "./TicketrefundFilterMenu";
import {
  useGetTicketrefundAllReportsQuery,
  useGetTicketrefundReportsQuery,
} from "../TicketPurchasesReportsApi";

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialPrintTableColumnsState = [
  { id: 1, label: "Sl No", sortAction: false, isSerialNo: true, show: true },
  { id: 2, label: "Issue Date", name: "issue_date", show: true, type: "date" },
  { id: 3, label: "Invoice No", name: "invoice_no", show: true },
  {
    id: 4,
    label: "Pax Name",
    // name: "passenger",
    getterMethod: (data) => `${data?.passenger?.passenger_name || ""}`,
    show: true,
  },
  {
    id: 5,
    label: "Issue Person",
    getterMethod: (data) => `${data?.issue_person?.username || ""}`,
    show: true,
  },
  {
    id: 6,
    label: "Ticket Agency",
    getterMethod: (data) => `${data?.ticket_agency?.username || ""}`,
    show: true,
  },
  {
    id: 7,
    label: "Flight Date",
    name: "flight_date",
    show: true,
    type: "date",
  },
  {
    id: 8,
    label: "GDS",
    getterMethod: (data) => `${data?.gds?.name || ""}`,

    show: true,
  },
  {
    id: 9,
    label: "PNR",
    getterMethod: (data) => `${data?.gds_pnr || ""}`,

    show: true,
  },
  {
    id: 10,
    label: "Airline PNR",
    getterMethod: (data) => `${data?.airline_pnr || ""}`,

    show: true,
  },

  {
    id: 11,
    label: "Return Flight Date",
    name: "return_flight_date",
    show: true,
    type: "date",
  },
  { id: 12, label: "Ticket No", name: "ticket_no", show: true },

  {
    id: 13,
    label: "Air Way",
    getterMethod: (data) => `${data?.current_airway?.name || ""}`,

    show: true,
  },

  { id: 15, label: "Sector Name", name: "sector", show: true },
  { id: 16, label: "Fare Amount", name: "fare_amount", show: true },
  {
    id: 17,
    label: "Airline Comission Amount",
    name: "airline_commission_amount",
    show: true,
  },
  {
    id: 18,
    label: "Customer Commission Amount",
    name: "customer_commission_amount",
    show: true,
  },
  {
    id: 19,
    label: "Tax Amount",
    name: "tax_amount",

    show: true,
  },
  { id: 20, label: " Sales Amount", name: "sales_amount", show: true },
  { id: 21, label: "Purchase Amount ", name: "purchase_amount", show: true },
  { id: 22, label: "FLT & Class", name: "c", show: true },
];

function TicketrefundReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedTicketrefundData, setModifiedTicketrefundData] =
    useReportData();
  const [tableColumns, dispatchTableColumns] = useReducer(
    tableColumnsReducer,
    initialPrintTableColumnsState
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

  const filterData = watch();

  const { data: paginatedData, refetch: refetchAgentReports } =
    useGetTicketrefundReportsQuery(
      {
        date_after: filterData.date_after || "",
        date_before: filterData.date_before || "",
        ticket_no: filterData.ticket_no || "",
        invoice_no: filterData.invoice_no || "",
        airline_agency: filterData.airline_agency || "",
        agent: filterData.agent || "",

        page,
        size,
      },
      { skip: inShowAllMode }
    );

  const { data: allData, refetch: refetchAllTicketrefundReports } =
    useGetTicketrefundAllReportsQuery(
      {
        date_after: filterData.date_after || "",
        date_before: filterData.date_before || "",
        ticket_no: filterData.ticket_no || "",
        invoice_no: filterData.invoice_no || "",
        airline_agency: filterData.airline_agency || "",
        agent: filterData.agent || "",
      },
      { skip: !inShowAllMode }
    );

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedTicketrefundData(allData.ticket_refunds || []);
      setTotalAmount(allData.total_amount);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.ticket_refunds,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedTicketrefundData(paginatedData.ticket_refunds || []);
      setTotalAmount(paginatedData.total_amount);
      setPage(paginatedData?.page || 1);
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

  const handleGetTicketrefunds = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {}
  }, []);

  const handleGetAllTicketrefunds = useCallback(async () => {
    try {
    } catch (error) {}
  }, []);

  const filteredData = {
    Date_To: getValues()?.date_before
      ? moment(new Date(getValues()?.date_before)).format("DD-MM-YYYY")
      : null,
    Date_From: getValues()?.date_after
      ? moment(new Date(getValues()?.date_after)).format("DD-MM-YYYY")
      : null,
    Ticket_No: getValues()?.ticket_no || null,
    Invoice_No: getValues()?.invoice_no || null,
    Airline_Agency: getValues()?.airline_agencyName || null,
    Customer: getValues()?.agentName || null,
  };

  return (
    <div className={classes.headContainer}>
      <FormProvider {...methods}>
        <TicketrefundFilterMenu
          inShowAllMode={inShowAllMode}
          handleGetTicketrefunds={handleGetTicketrefunds}
          handleGetAllTicketrefunds={handleGetAllTicketrefunds}
        />
      </FormProvider>

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
        onFirstPage={() => handleGetTicketrefunds(1)}
        onPreviousPage={() => handleGetTicketrefunds(page - 1)}
        onNextPage={() => handleGetTicketrefunds(page + 1)}
        onLastPage={() => handleGetTicketrefunds(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetTicketrefunds}
        handleGetAllData={handleGetAllTicketrefunds}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename="TicketrefundReport"
      />

      <table
        id="table-to-xls"
        className="w-full"
        style={{ minHeight: "270px" }}
      >
        <tbody ref={componentRef} id="downloadPage">
          {modifiedTicketrefundData.map((ticketrefund, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle="Ticket Refund Report"
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={ticketrefund}
              totalColumn={initialPrintTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size - size + index * ticketrefund.data.length + 1
                  : ticketrefund.page * ticketrefund.size -
                    ticketrefund.size +
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

export default TicketrefundReportsTable;
