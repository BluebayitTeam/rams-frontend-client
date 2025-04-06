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
import AirwayHeader from "./AirwayHeader";
import AirwayModel from "./models/AirwayModel";
import { useGetAirwayQuery } from "../AirwaysApi";
import AirwayForm from "./AirwayForm";
/**
 * Form Validation Schema
 */
const schema = z.object({
  name: z.string().nonempty("You must enter a airway name"),
});

function Airway() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { airwayId } = routeParams;

  const {
    data: airway,
    isLoading,
    isError,
  } = useGetAirwayQuery(airwayId, {
    skip: !airwayId || airwayId === "new",
  });

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (airwayId === "new") {
      reset(AirwayModel({}));
    }
  }, [airwayId, reset]);

  useEffect(() => {
    if (airway) {
      reset({ ...airway });
    }
  }, [airway, reset, airway?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested airways is not exists
   */
  if (isError && airwayId !== "new") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such airway!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/airway/airways"
          color="inherit"
        >
          Go to Airways Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<AirwayHeader />}
        content={
          <div className="p-16 ">
            <div className={tabValue !== 0 ? "hidden" : ""}>
              <AirwayForm airwayId={airwayId} />
            </div>
          </div>
        }
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}

export default Airway;
