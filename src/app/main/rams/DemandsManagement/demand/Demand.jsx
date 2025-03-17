import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DemandHeader from "./DemandHeader";
import DemandModel from "./models/DemandModel";
import { useGetDemandQuery } from "../DemandsApi";
import DemandForm from "./DemandForm";
import { hasPermission } from "src/app/constant/permission/permissionList";
/**
 * Form Validation Schema
 */
const schema = z.object({
  country: z.number().min(1, { message: "You must enter a Country" }),
  visa_agent: z.number().min(1, { message: "You must enter a visa agent " }),
  profession: z.number().min(1, { message: "You must enter a profession" }),
  demand_no: z.string().min(1, { message: "You must enter a demand no" }),
  quantity: z.string().min(1, { message: "You must enter a quantity" }),
  salary: z.string().min(1, { message: "You must enter a salary" }),
  company_name: z
    .string()
    .min(1, { message: "You must enter a company name " }),
});

function Demand() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { demandId } = routeParams;

  const {
    data: demand,
    isLoading,
    isError,
  } = useGetDemandQuery(demandId, {
    skip: !demandId || demandId === "new",
  });
  console.log("demandId", demand, demandId);

  const [tabValue, setTabValue] = useState(0);

  console.log("tabValue", tabValue);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (demandId === "new") {
      reset(DemandModel({}));
    }
  }, [demandId, reset]);

  useEffect(() => {
    if (demand) {
      reset({ ...demand });
    }
  }, [demand, reset, demand?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested demand is not exists
   */
  if (isError && demandId !== "new") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such demand!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/demand/demand"
          color="inherit"
        >
          Go to Demands Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission("DEMAND_DETAILS") && (
        <FusePageCarded
          classes={{
            toolbar: "p-0",
            header: "min-h-80 h-80",
          }}
          header={<DemandHeader />}
          content={
            <div className="p-16 ">
              <DemandForm demandId={demandId} />
            </div>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default Demand;
