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
    emp_id_no: z.string().min(1, { message: "You must enter a emp id no" }),
    first_name: z.string().min(1, { message: "You must enter a first_name" }),
    date_of_birth: z
      .string()
      .min(1, { message: "You must enter a date_of_birth" }),
    last_name: z.string().min(1, { message: "You must enter a last_name" }),
    email: z.string().min(1, { message: "You must enter an email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords and Confirm Password do not match",
    path: ["confirmPassword"],
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
        <div className="flex flex-col h-screen">
          {/* Fixed Top Header */}
          <div className="sticky top-0 z-30 bg-white shadow border-b border-gray-200">
            <EmployeeHeader />
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              // scrollButtons="auto"
              classes={{ root: "w-full h-64 border-b" }}
            >
              <Tab className="h-64" label="Basic Info" />
              <Tab className="h-64" label="Personal Info" />
            </Tabs>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-16 bg-gray-50">
            {tabValue === 0 && <EmployeeForm employeeId={employeeId} />}
            {tabValue === 1 && <PersonalInfo />}
          </div>
        </div>
      )}
    </FormProvider>
  );
}

export default Employee;
