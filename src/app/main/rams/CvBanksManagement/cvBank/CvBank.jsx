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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CvBankHeader from "./CvBankHeader";
import CvBankModel from "./models/CvBankModel";
import { useGetCvBankQuery } from "../CvBanksApi";
import CvBankForm from "./CvBankForm";
import { hasPermission } from "src/app/constant/permission/permissionList";

/**
 * Form Validation Schema
 */
const schema = z.object({
  passenger_name: z.string().nonempty("You must enter a passenger name"),
  passport_issue_date: z
    .string()
    .nonempty("You must enter a passport issue date"),

  passport_issue_place: z
    .number()
    .min(1, { message: "You must enter a passport issue place" }),
});

function CvBank() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { cvBankId } = routeParams;

  const {
    data: cvBank,
    isLoading,
    isError,
  } = useGetCvBankQuery(cvBankId, {
    skip: !cvBankId || cvBankId === "new",
  });
  console.log("cvBankId", cvBank, cvBankId);

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
    if (cvBankId === "new") {
      reset(CvBankModel({}));
    }
  }, [cvBankId, reset]);

  useEffect(() => {
    if (cvBank) {
      reset({ ...cvBank });
    }
  }, [cvBank, reset, cvBank?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested cvBank is not exists
   */
  if (isError && cvBankId !== "new") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such cvBank!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/cvBank/cvBank"
          color="inherit"
        >
          Go to CvBanks Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission("CVBANK_DETAILS") && (
        <FusePageCarded
          classes={{
            toolbar: "p-0",
            header: "min-h-80 h-80",
          }}
          contentToolbar={
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: "w-full h-64" }}
            >
              <Tab className="h-64" label="Basic Info" />
              <Tab className="h-64" label="Opening Balance" />
            </Tabs>
          }
          header={<CvBankHeader />}
          content={
            <div className="p-16">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <CvBankForm cvBankId={cvBankId} />
              </div>
            </div>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default CvBank;
