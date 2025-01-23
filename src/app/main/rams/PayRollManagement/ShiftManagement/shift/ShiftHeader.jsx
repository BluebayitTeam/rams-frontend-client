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
  useCreateShiftMutation,
  useDeleteShiftMutation,
  useUpdateShiftMutation,
} from "../ShiftApi";

/**
 * The Shift Table header.
 */
function ShiftHeader() {
  const routeParams = useParams();
  const { shiftId } = routeParams;
  const [createShift] = useCreateShiftMutation();
  const [saveShift] = useUpdateShiftMutation();
  const [removeShift] = useDeleteShiftMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem("deleteShift");
  const handleUpdate = localStorage.getItem("updateShift");

  // console.log("shiftId", routeParams);

  function handleUpdateShift() {
    saveShift(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/shifts-management/shifts`);
    });
  }

  // console.log("getFieldValues", dirtyFields, _.isEmpty(dirtyFields), !isValid);
  function handleCreateShift() {
    createShift(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();
        navigate(`/apps/shifts-management/shifts`);
      });
  }

  function handleRemoveShift(dispatch) {
    removeShift(shiftId);
    DeletedSuccessfully();
    navigate("/apps/shifts-management/shifts");
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: "error" })
    );
  }

  function handleCancel() {
    navigate(`/apps/shifts-management/shifts`);
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
      <div className="flex flex-col items-start max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/shifts-management/shifts"
            color="inherit"
          >
            <Icon className="text-20">
              {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
            </Icon>
            <span className="hidden sm:flex mx-4 font-medium">Shifts</span>
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
                {name || "Create New Shift"}
              </Typography>
              <Typography variant="caption" className="font-medium">
                Shift Detail
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
        {handleDelete === "deleteShift" &&
          shiftId !== "new" &&
          hasPermission("TODO_TASK_TYPE_DELETE") && (
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              onClick={handleRemoveShift}
              startIcon={<Icon className="hidden sm:flex">delete</Icon>}
            >
              Remove
            </Button>
          )}
        {shiftId === "new" && hasPermission("TODO_TASK_TYPE_CREATE") && (
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            disabled={_.isEmpty(dirtyFields)}
            onClick={handleCreateShift}
          >
            Save
          </Button>
        )}
        {handleDelete !== "deleteShift" &&
          handleUpdate === "updateShift" &&
          shiftId !== "new" &&
          hasPermission("TODO_TASK_TYPE_UPDATE") && (
            <Button
              className="whitespace-nowrap mx-4"
              color="secondary"
              variant="contained"
              onClick={handleUpdateShift}
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

export default ShiftHeader;
