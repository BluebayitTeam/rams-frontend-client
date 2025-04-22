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

import { useParams } from "react-router";
import {
  useGetMakeAListAllReportsQuery,
  useGetMakeAListReportsQuery,
} from "../MakeAListReportsApi";
import { getReportMakeStyles } from "../../../ReportUtilities/reportMakeStyls";

const useStyles = makeStyles((theme) => ({
  ...getReportMakeStyles(theme),
}));

// Define the Zod schema
const schema = z.object({});

const initialTableColumnsState = [
  { id: 1, label: "SL", sortAction: false, isSerialNo: true, show: true },

  {
    id: 2,
    label: "Agent",
    getterMethod: (data) => `${data.agent?.first_name || ""} `,
    show: true,
  },

  {
    id: 3,
    label: "callingemb",
    getterMethod: (data) => `${data.callingemb?.name || ""}`,
    show: true,
  },
  {
    id: 4,
    label: "mofa",
    getterMethod: (data) => `${data.mofa?.name || ""}`,
    show: true,
  },
];

function MakeAListReportsTable(props) {
  const classes = useStyles();
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const { watch, getValues } = methods;

  const [modifiedMedicalFitData, setModifiedMedicalFitData] = useReportData();

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
  const { makeAListId } = routeParams;

  const { data: paginatedData, error } = useGetMakeAListReportsQuery(
    makeAListId,
    {}
  );
  console.log("errordfdfdf", paginatedData);

  const { data: allData } = useGetMakeAListAllReportsQuery(makeAListId, {
    skip: !inShowAllMode,
  });

  useEffect(() => {
    if (inShowAllMode && allData) {
      setModifiedMedicalFitData(allData.make_list_items || []);

      setInSiglePageMode(false);
      setInShowAllMode(true);
      setPagination(false);
      const { totalPages, totalElements } = getPaginationData(
        allData.not_medicals,
        size,
        page
      );

      setPage(page || 1);
      setSize(size || 25);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
    } else if (!inShowAllMode && paginatedData) {
      setModifiedMedicalFitData(paginatedData?.make_list_items || []);

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

  const handleGetMakeAList = useCallback(async (newPage) => {
    try {
      const page = newPage || 1;
      setPage(page);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  }, []);

  const handleGetAllMakeAList = useCallback(async () => {
    try {
    } catch (error) {
      console.error("Error fetching all makeAList:", error);
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
        onFirstPage={() => handleGetMakeAList(1)}
        onPreviousPage={() => handleGetMakeAList(page - 1)}
        onNextPage={() => handleGetMakeAList(page + 1)}
        onLastPage={() => handleGetMakeAList(totalPages)}
        handleExelDownload={handleExelDownload}
        handlePrint={handlePrint}
        handleGetData={handleGetMakeAList}
        handleGetAllData={handleGetAllMakeAList}
        tableColumns={tableColumns}
        dispatchTableColumns={dispatchTableColumns}
        filename="MakeAListReport"
      />
      <table
        id="table-to-xls"
        className="w-full"
        style={{ minHeight: "270px" }}
      >
        <tbody ref={componentRef} id="downloadPage">
          {modifiedMedicalFitData.map((medicalFit, index) => (
            <SinglePage
              key={index}
              classes={classes}
              reportTitle="MakeAListReport"
              filteredData={filteredData}
              tableColumns={tableColumns}
              dispatchTableColumns={dispatchTableColumns}
              data={medicalFit}
              totalColumn={initialTableColumnsState?.length}
              inSiglePageMode={inSiglePageMode}
              serialNumber={
                pagination
                  ? page * size - size + index * medicalFit.data.length + 1
                  : medicalFit.page * medicalFit.size - medicalFit.size + 1
              }
              setPage={setPage}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MakeAListReportsTable;
