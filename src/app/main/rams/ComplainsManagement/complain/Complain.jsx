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
import ComplainHeader from "./ComplainHeader";
import ComplainModel from "./models/ComplainModel";
import { useGetComplainQuery } from "../ComplainsApi";
import ComplainForm from "./ComplainForm";
import { hasPermission } from "src/app/constant/permission/permissionList";
/**
 * Form Validation Schema
 */
const schema = z.object({
  complainer: z
    .string()
    .nonempty("You must enter a complain name")
    .min(5, "The complain name must be at least 5 characters"),
});

function Complain() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { complainId } = routeParams;

  const {
    data: complain,
    isLoading,
    isError,
  } = useGetComplainQuery(complainId, {
    skip: !complainId || complainId === "new",
  });
  console.log("complainId", complain, complainId);

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
    if (complainId === "new") {
      reset(ComplainModel({}));
    }
  }, [complainId, reset]);

  useEffect(() => {
    if (complain) {
      reset({ ...complain });
    }
  }, [complain, reset, complain?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested complain is not exists
   */
  if (isError && complainId !== "new") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such complain!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/complain/complain"
          color="inherit"
        >
          Go to Complains Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission("COMPLAIN_DETAILS") && (
        <FusePageCarded
          classes={{
            toolbar: "p-0",
            header: "min-h-80 h-80",
          }}
          header={<ComplainHeader />}
          content={
            <div className="p-16">
              <ComplainForm complainId={complainId} />
            </div>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default Complain;
