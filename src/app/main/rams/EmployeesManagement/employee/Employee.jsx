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
import EmployeeHeader from "./EmployeeHeader";
import EmployeeModel from "./models/EmployeeModel";
import { useGetEmployeeQuery } from "../EmployeesApi";
import EmployeeForm from "./EmployeeForm";
import PersonalInfo from "./tabs/PersonalInfo";
import { hasPermission } from "src/app/constant/permission/permissionList";
/**
 * Form Validation Schema
 */
const schema = z
  .object({
    branch: z.number().min(1, { message: "You must enter a branch" }),
    role: z.number().min(1, { message: "You must enter a role" }),
    department: z.number().min(1, { message: "You must enter a department" }),
    designation: z.number().min(1, { message: "You must enter a designation" }),
    username: z.string().min(1, { message: "You must enter a username" }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords And ConfirmPassword not  match",
    path: ["confirmPassword"], // this attaches the error to confirmPassword
  });

function Employee() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { employeeId } = routeParams;
  console.log("employeeId", employeeId);
  const {
    data: employee,
    isLoading,
    isError,
  } = useGetEmployeeQuery(employeeId, {
    skip: !employeeId || employeeId === "new",
  });

  const [tabValue, setTabValue] = useState(0);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;

  useEffect(() => {
    if (employeeId === "new") {
      reset(EmployeeModel({}));
    }
  }, [employeeId, reset]);

  useEffect(() => {
    if (employee) {
      reset({
        ...employee,
        branch: employee.branch?.id,
        role: employee.role?.id,
        department: employee.department?.id,
        country: employee.country?.id,
      });
    }
  }, [employee, reset, employee?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  if (isError && employeeId !== "new") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such employee!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/employee/employee"
          color="inherit"
        >
          Go to Employees Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission("EMPLOYEE_DETAILS") && (
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
              <Tab className="h-64" label="Personal Info" />
            </Tabs>
          }
          header={<EmployeeHeader />}
          content={
            <>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="secondary"
                textColor="secondary"
                variant="scrollable"
                scrollButtons="auto"
                classes={{ root: "w-full h-64 border-b-1" }}
              >
                <Tab className="h-64" label="Basic Info" />

                <Tab className="h-64" label="Personal Info" />
              </Tabs>
              <div className="p-16">
                <div className={tabValue !== 0 ? "hidden" : ""}>
                  <EmployeeForm employeeId={employeeId} />
                </div>

                <div className={tabValue !== 1 ? "hidden" : ""}>
                  <PersonalInfo />
                </div>
              </div>
            </>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default Employee;
