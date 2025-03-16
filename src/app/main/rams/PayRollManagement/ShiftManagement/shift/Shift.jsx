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
import { useGetShiftQuery } from "../ShiftApi.js";
import ShiftModel from "./models/ShiftModel";
import ShiftForm from "./ShiftForm";
import ShiftHeader from "./ShiftHeader";
/**
 * Form Validation Schema
 */
const schema = z.object({
  name: z
    .string()
    .nonempty("You must enter a shift time name")
    .min(5, "The shift time name must be at least 5 characters"),
  start_date: z.string(),
  end_date: z.string(),
});

function Shift() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { shiftId } = routeParams;

  const {
    data: shift,
    isLoading,
    isError,
  } = useGetShiftQuery(shiftId, {
    skip: !shiftId || shiftId === "new",
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      start_date: null,
      end_date: null,
    },
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (shiftId === "new") {
      reset(ShiftModel({}));
    }
  }, [shiftId, reset]);

  useEffect(() => {
    if (shift) {
      reset({ ...shift });
    }
  }, [shift, reset, shift?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  if (isError && shiftId !== "new") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no shift time data!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/shift/shifts"
          color="inherit"
        >
          Go to Shift TimeTable Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission("TODO_TASK_TYPE_DETAILS") && (
        <FusePageCarded
          header={<ShiftHeader />}
          content={
            <div className="p-16 ">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <ShiftForm shiftId={shiftId} />
              </div>
            </div>
          }
          scroll={isMobile ? "normal" : "content"}
        />
      )}
    </FormProvider>
  );
}

export default Shift;
