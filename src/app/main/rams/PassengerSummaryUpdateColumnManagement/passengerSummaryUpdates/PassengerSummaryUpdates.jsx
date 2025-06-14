import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { useEffect, useState } from "react";
import PassengerSummaryUpdatesHeader from "./PassengerSummaryUpdatesHeader";
import PassengerSummaryUpdatesTable from "./PassengerSummaryUpdatesTable";
import { hasPermission } from "src/app/constant/permission/permissionList";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useGetPassengerSummaryUpdatesQuery } from "../PassengerSummaryUpdatesApi";

/**
 * The passengerSummaryUpdates page.
 */
function PassengerSummaryUpdates() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const [searchKey, setSearchKey] = useState("");
  const methods = useForm();

  const [inShowAllMode, setInShowAllMode] = useState(false);

  const { getValues, watch } = methods;

  const filterData = watch();
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
  const {
    data: paginatedData,
    isLoading,
    refetch,
  } = useGetPassengerSummaryUpdatesQuery(
    {
      agent: filterData.agent || "",
      id: filterData.passenger || "",
      flight_status: filterData.flight_status || "",
      pageAndSize,
      searchKey,
    },
    { skip: inShowAllMode }
  );

  useEffect(() => {
    refetch({ searchKey });
  }, [searchKey]);

  const handleGetAllPassengerSummarys = () => {
    const data = {
      agent: getValues().agent,
      id: getValues().passenger,
      flight_status: getValues().flight_status,
      page: 1,
      size: 100,
    };
    refetch(data);
  };
  return (
    <FormProvider {...methods}>
      <FusePageCarded
        classes={{
          root: {},
          toolbar: "p-0",
          header: "min-h-80 h-80",
        }}
        header={
          hasPermission("DEMAND_LIST") && (
            <PassengerSummaryUpdatesHeader
              searchKey={searchKey}
              setSearchKey={setSearchKey}
              inShowAllMode={inShowAllMode}
              handleGetAllPassengerSummarys={handleGetAllPassengerSummarys}
            />
          )
        }
        content={
          hasPermission("DEMAND_LIST") && (
            <PassengerSummaryUpdatesTable
              searchKey={searchKey}
              setSearchKey={setSearchKey}
              paginatedData={paginatedData}
              refetch={refetch}
              isLoading={isLoading}
            />
          )
        }
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}

export default PassengerSummaryUpdates;
