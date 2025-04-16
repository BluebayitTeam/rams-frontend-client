import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { hasPermission } from "src/app/constant/permission/permissionList";
import { z } from "zod";
import { useGetPayableBillQuery } from "../PayableBillsApi";
import PayableBillForm from "./PayableBillForm";
import PayableBillHeader from "./PayableBillHeader";
import PayableBillModel from "./models/PayableBillModel";
/**
 * Form Validation Schema
 */
const schema = z.object({
  branch: z.number().min({ message: "You must enter a branch" }),
  ledger: z.number().min({ message: "You must enter a ledger" }),
  passenger: z.number().min({
    message: "You must enter a passenger",
  }),
});

function PayableBill() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { payableBillId, invoice_no } = routeParams;
  const [letFormSave, setLetFormSave] = useState(false);

  const {
    data: payableBill,
    isLoading,
    isError,
  } = useGetPayableBillQuery(invoice_no, {
    skip: !payableBillId || payableBillId === "new",
  });
  console.log("payableBillId", payableBill, payableBillId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (payableBillId === "new") {
      reset(PayableBillModel({}));
    }
  }, [payableBillId, reset]);

  useEffect(() => {
    if (payableBill) {
      reset(payableBill);
    }
  }, [payableBill, reset, payableBill?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested payableBills is not exists
   */
  if (isError && payableBillId !== "new") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such receivable Bill!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/payableBill/payableBills"
          color="inherit"
        >
          Go to Receivable Bills Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission("PURCHASE_DETAILS") && (
        <FusePageCarded
          header={<PayableBillHeader letFormSave={letFormSave} />}
          content={
            <div className="p-16 ">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <PayableBillForm
                  setLetFormSave={setLetFormSave}
                  payableBillId={payableBillId}
                />
              </div>
            </div>
          }
          scroll={isMobile ? "normal" : "content"}
        />
      )}
    </FormProvider>
  );
}

export default PayableBill;
