import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import VisaEntryHeader from "./VisaEntryHeader";
import VisaEntryModel from "./models/VisaEntryModel";
import { useGetVisaEntryQuery } from "../VisaEntrysApi";
import VisaEntryForm from "./VisaEntryForm";
import { hasPermission } from "src/app/constant/permission/permissionList";
/**
 * Form Validation Schema
 */
const schema = z.object({
  country: z.number().min(1, { message: "You must enter a Country" }),
  visa_agent: z.number().min(1, { message: "You must enter a visa agent " }),
  visa_number: z.string().min(1, { message: "You must enter a visa number " }),
  sponsor_id_no: z.string().min(1, { message: "You must enter a sponsor id" }),
});

function VisaEntry() {
  const routeParams = useParams();
  const { visaEntryId } = routeParams;

  const {
    data: visaEntry,
    isLoading,
    isError,
  } = useGetVisaEntryQuery(visaEntryId, {
    skip: !visaEntryId || visaEntryId === "new",
  });
  console.log("visaEntryId", visaEntry, visaEntryId);

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
    if (visaEntryId === "new") {
      reset(VisaEntryModel({}));
    }
  }, [visaEntryId, reset]);

  useEffect(() => {
    if (visaEntry) {
      reset({ ...visaEntry });
    }
  }, [visaEntry, reset, visaEntry?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested visaEntry is not exists
   */
  if (isError && visaEntryId !== "new") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such visaEntry!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/visaEntry/visaEntry"
          color="inherit"
        >
          Go to VisaEntrys Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission("VISA_ENTRY_DETAILS") && (
        <FusePageCarded
          classes={{
            toolbar: "p-0",
            header: "min-h-80 h-80",
          }}
          header={<VisaEntryHeader />}
          content={
            <div className="p-16 ">
              <VisaEntryForm visaEntryId={visaEntryId} />
            </div>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default VisaEntry;
