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
import setIdIfValueIsObjArryData from "src/app/@helpers/setIdIfValueIsObjArryData";
import setIdIfValueIsObject2 from "src/app/@helpers/setIdIfValueIsObject2";
import { hasPermission } from "src/app/constant/permission/permissionList";
import { z } from "zod";
import { useGetPaymentVoucherQuery } from "../PaymentVouchersApi";
import PaymentVoucherForm from "./PaymentVoucherForm";
import PaymentVoucherHeader from "./PaymentVoucherHeader";
import PaymentVoucherModel from "./models/PaymentVoucherModel";
/**
 * Form Validation Schema
 */

const itemSchema = z.object({
  ledger: z.number().min(1, { message: "Ledger is required" }),
});

const schema = z.object({
  branch: z.number().min(1, { message: "You must enter a branch" }),
  items: z
    .array(itemSchema)
    .min(1, { message: "You must enter at least one item" }),
});

function PaymentVoucher() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { paymentVoucherId, invoice_no } = routeParams;
  const [letFormSave, setLetFormSave] = useState(false);

  const {
    data: paymentVoucher,
    isLoading,
    isError,
  } = useGetPaymentVoucherQuery(invoice_no, {
    skip: !paymentVoucherId || paymentVoucherId === "new",
  });

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    if (paymentVoucherId === "new") {
      reset(PaymentVoucherModel({}));
    }
  }, [paymentVoucherId, reset]);

  useEffect(() => {
    if (paymentVoucher) {
      const convertedPaymentVoucherItems = setIdIfValueIsObjArryData(
        paymentVoucher?.items
      );
      const convertedPaymentVoucher = setIdIfValueIsObject2(paymentVoucher);
      reset({
        ...convertedPaymentVoucher,
        items: convertedPaymentVoucherItems,
      });
    }
  }, [paymentVoucher, reset, paymentVoucher?.id]);

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested paymentVouchers is not exists
   */
  if (isError && paymentVoucherId !== "new") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such paymentVoucher!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/paymentVoucher/paymentVouchers"
          color="inherit"
        >
          Go to PaymentVouchers Page
        </Button>
      </motion.div>
    );
  }

  const handleReset = () => {
    reset({});
    setFormKey((prevKey) => prevKey + 1);
  };
  return (
    <FormProvider {...methods} key={formKey}>
      {hasPermission("PAYMENT_VOUCHER_DETAILS") && (
        <FusePageCarded
          header={<PaymentVoucherHeader letFormSave={letFormSave} />}
          content={
            <div className="p-16 ">
              <div>
                <PaymentVoucherForm
                  setLetFormSave={setLetFormSave}
                  paymentVoucherId={paymentVoucherId}
                  handleReset={handleReset}
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

export default PaymentVoucher;
