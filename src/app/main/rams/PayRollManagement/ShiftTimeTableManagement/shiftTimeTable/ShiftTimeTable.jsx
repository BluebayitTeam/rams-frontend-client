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
import { useGetShiftTimeTableQuery } from "../ShiftTimeTableApi";
import ShiftTimeTableModel from "./models/ShiftTimeTableModel";
import ShiftTimeTableForm from "./ShiftTimeTableForm";
import ShiftTimeTableHeader from "./ShiftTimeTableHeader";
/**
 * Form Validation Schema
 */
const schema = z.object({
  name: z
    .string()
    .nonempty("You must enter a shift time name")
    .min(5, "The shift time name must be at least 5 characters"),
  checkin_start: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
  checkin_end: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
  checkout_start: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
  checkout_end: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
  onduty_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
  offduty_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
  lunch_time_start: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
  lunch_time_end: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
  color: z.string().regex(/^#([0-9A-Fa-f]{8}|[0-9A-Fa-f]{6})$/, "Invalid color format"),
  count_as_minute: z.string(),
  count_as_workday: z.string(),
  // must_checkin: z.boolean(),
  // must_checkout: z.boolean(),
  late_time: z.string(),
  leave_early_time: z.string(),
});

function ShiftTimeTable() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { shiftTimeTableId } = routeParams;

  const {
    data: shiftTimeTable,
    isLoading,
    isError,
  } = useGetShiftTimeTableQuery(shiftTimeTableId, {
    skip: !shiftTimeTableId || shiftTimeTableId === "new",
  });
  console.log("shiftTimeTableInfo", shiftTimeTable, shiftTimeTableId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (shiftTimeTableId === "new") {
      reset(ShiftTimeTableModel({}));
    }
  }, [shiftTimeTableId, reset]);

  useEffect(() => {
    if (shiftTimeTable) {
      reset({ ...shiftTimeTable });
    }
  }, [shiftTimeTable, reset, shiftTimeTable?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  if (isError && shiftTimeTableId !== "new") {
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
          to="/apps/timetable/timetables"
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
          header={<ShiftTimeTableHeader />}
          content={
            <div className="p-16 ">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <ShiftTimeTableForm shiftTimeTableId={shiftTimeTableId} />
              </div>
            </div>
          }
          scroll={isMobile ? "normal" : "content"}
        />
      )}
    </FormProvider>
  );
}

export default ShiftTimeTable;
