import { showMessage } from "@fuse/core/FuseMessage/store/fuseMessageSlice";
import { Icon } from "@mui/material";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import _ from "lodash";
import { useFormContext } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AddedSuccessfully,
  DeletedSuccessfully,
  UpdatedSuccessfully,
} from "src/app/@customHooks/notificationAlert";
import { hasPermission } from "src/app/constant/permission/permissionList";
import {
  useCreateShiftTimeTableMutation,
  useDeleteShiftTimeTableMutation,
  useUpdateShiftTimeTableMutation,
} from "../ShiftTimeTableApi";

/**
 * The ShiftTime Table header.
 */
function ShiftTimeTableHeader() {
  const routeParams = useParams();
  const { shiftTimeTableId } = routeParams;
  const [createShiftTimeTable] = useCreateShiftTimeTableMutation();
  const [saveShiftTimeTable] = useUpdateShiftTimeTableMutation();
  const [removeShiftTimeTable] = useDeleteShiftTimeTableMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem("deleteShiftTimeTable");
  const handleUpdate = localStorage.getItem("updateShiftTimeTable");
  const footerColor = localStorage.getItem("color_code");

  // console.log("shiftTimeTableId", routeParams);

  function handleUpdateShiftTimeTable() {
    saveShiftTimeTable(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/timetable/timetables`);
    });
  }

  // console.log("getFieldValues", dirtyFields, _.isEmpty(dirtyFields), !isValid);
  function handleCreateShiftTimeTable() {
    createShiftTimeTable(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();
        navigate(`/apps/timetable/timetables`);
      });
  }

  function handleRemoveShiftTimeTable(dispatch) {
    removeShiftTimeTable(shiftTimeTableId);
    DeletedSuccessfully();
    navigate("/apps/timetable/timetables");
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: "error" })
    );
  }

  function handleCancel() {
    navigate(`/apps/timetable/timetables`);
  }

  return (
    <div
      style={{ backgroundColor: footerColor, color: "white" }}
      className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32"
    >
      <div className="flex flex-col items-start max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/timetable/timetables"
            color="inherit"
          >
            <Icon className="text-20">
              {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
            </Icon>
            <span className="hidden sm:flex mx-4 font-medium">
              Shift Time Tables
            </span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          />
          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.3 } }}
            >
              <Typography className="text-16 sm:text-20 truncate font-semibold">
                {name || "Create New TimeTable"}
              </Typography>
              <Typography variant="caption" className="font-medium">
                Shift Time Table Detail
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {handleDelete === "deleteShiftTimeTable" &&
          shiftTimeTableId !== "new" &&
          hasPermission("TODO_TASK_TYPE_DELETE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
              variant="contained"
              color="secondary"
              onClick={handleRemoveShiftTimeTable}
              startIcon={<Icon className="hidden sm:flex">delete</Icon>}
            >
              Remove
            </Button>
          )}
        {shiftTimeTableId === "new" &&
          hasPermission("TODO_TASK_TYPE_CREATE") && (
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              disabled={_.isEmpty(dirtyFields) || !isValid}
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
              onClick={handleCreateShiftTimeTable}
            >
              Save
            </Button>
          )}
        {handleDelete !== "deleteShiftTimeTable" &&
          handleUpdate === "updateShiftTimeTable" &&
          shiftTimeTableId !== "new" &&
          hasPermission("TODO_TASK_TYPE_UPDATE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              color="secondary"
              variant="contained"
              onClick={handleUpdateShiftTimeTable}
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

export default ShiftTimeTableHeader;
