import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Icon } from "@mui/material";
import { showMessage } from "@fuse/core/FuseMessage/store/fuseMessageSlice";
import {
  AddedSuccessfully,
  DeletedSuccessfully,
  UpdatedSuccessfully,
} from "src/app/@customHooks/notificationAlert";
import {
  useCreateEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../EmployeesApi";
import { hasPermission } from "src/app/constant/permission/permissionList";
import { PictureAsPdf } from "@mui/icons-material";
import DescriptionIcon from "@mui/icons-material/Description";
import { BASE_URL } from "src/app/constant/constants";
import { useEffect } from "react";

/**
 * The employee header.
 */
function EmployeeHeader() {
  const routeParams = useParams();
  const { employeeId, userName } = routeParams;
  const [createEmployee] = useCreateEmployeeMutation();
  const [saveEmployee] = useUpdateEmployeeMutation();
  const [removeEmployee] = useDeleteEmployeeMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields, errors } = formState;
  console.log("errors1254", isValid);

  const theme = useTheme();
  const navigate = useNavigate();
  const { first_name, image, featuredImageId } = watch();
  const handleDelete = localStorage.getItem("deleteEmployee");
  const handleUpdate = localStorage.getItem("updateEmployee");
  const footerColor = localStorage.getItem("color_code");

  function handleUpdateEmployee() {
    saveEmployee(getValues()).then((data) => {
      UpdatedSuccessfully();

      navigate(`/apps/employee/employees`);
    });
  }

  function handleCreateEmployee() {
    createEmployee(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/employee/employees`);
      });
  }

  function handleRemoveEmployee(dispatch) {
    removeEmployee(employeeId);
    DeletedSuccessfully();
    navigate("/apps/employee/employees");
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: "error" })
    );
  }

  function handleCancel() {
    navigate(`/apps/employee/employees`);
  }

  return (
    <div
      style={{ backgroundColor: footerColor, color: "white" }}
      className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-16 px-24 md:px-32"
    >
      <div className="flex flex-col items-start space-y-8 sm:space-y-0 w-2/3 sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/employee/employees"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Employees</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
            {typeof image === "string" && image.length > 0 ? (
              image.endsWith(".pdf") ? (
                <PictureAsPdf
                  style={{
                    color: "red",
                    cursor: "pointer",
                    display: "block",
                    fontSize: "35px",
                  }}
                  onClick={() => window.open(`${BASE_URL}${image}`)}
                />
              ) : image.endsWith(".doc") || image.endsWith(".docx") ? (
                <DescriptionIcon
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    display: "block",
                    fontSize: "35px",
                  }}
                  onClick={() => window.open(`${BASE_URL}${image}`)}
                />
              ) : (
                <img
                  className="w-32 sm:w-48 rounded"
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "50%",
                  }}
                  src={`${BASE_URL}${image}`}
                  alt={name}
                />
              )
            ) : (
              <img
                className="w-32 sm:w-48 rounded"
                src="/assets/images/logos/user.jpg"
                alt={name}
              />
            )}
          </motion.div>
          <motion.div
            className="flex flex-col min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {first_name || "New Employee"}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Employee Detail
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      >
        {handleDelete === "deleteEmployee" && userName !== "new" && (
          <Typography className="mt-6" variant="subtitle2">
            Do you want to remove this employee?
          </Typography>
        )}
        {handleDelete === "deleteEmployee" &&
          userName !== "new" &&
          hasPermission("EMPLOYEE_DELETE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
              variant="contained"
              color="secondary"
              style={{ padding: "0 28px" }}
              onClick={handleRemoveEmployee}
              startIcon={<Icon className="hidden sm:flex">delete</Icon>}
            >
              Remove
            </Button>
          )}
        {userName === "new" && hasPermission("EMPLOYEE_CREATE") && (
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            disabled={
              _.isEmpty(dirtyFields) ||
              !isValid ||
              errors.email ||
              errors.primary_phone ||
              errors.username ||
              errors.date_of_birth
            }
            color={!_.isEmpty(dirtyFields) && isValid ? "secondary" : "inherit"}
            sx={{
              backgroundColor:
                _.isEmpty(dirtyFields) || !isValid
                  ? "#9e9e9e !important"
                  : undefined,
              color: "white", // force white text
              border:
                _.isEmpty(dirtyFields) || !isValid
                  ? "1px solid #ccc"
                  : undefined,
            }}
            onClick={handleCreateEmployee}
          >
            Save
          </Button>
        )}
        {handleDelete !== "deleteEmployee" &&
          handleUpdate === "updateEmployee" &&
          userName !== "new" &&
          hasPermission("EMPLOYEE_UPDATE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              // color="secondary"
              variant="contained"
              disabled={
                _.isEmpty(dirtyFields) ||
                !isValid ||
                errors.email ||
                errors.primary_phone ||
                errors.username ||
                errors.date_of_birth
              }
              color={
                !_.isEmpty(dirtyFields) && isValid ? "secondary" : "inherit"
              }
              sx={{
                backgroundColor:
                  _.isEmpty(dirtyFields) || !isValid
                    ? "#9e9e9e !important"
                    : undefined,
                color: "white", // force white text
                border:
                  _.isEmpty(dirtyFields) || !isValid
                    ? "1px solid #ccc"
                    : undefined,
              }}
              onClick={handleUpdateEmployee}
            >
              Update
            </Button>
          )}

        <Button
          className="whitespace-nowrap mx-4 text-white bg-orange-500 hover:bg-orange-800 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300"
          variant="contained"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </motion.div>
    </div>
  );
}

export default EmployeeHeader;
