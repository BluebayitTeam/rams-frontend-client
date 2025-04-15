import { showMessage } from "@fuse/core/FuseMessage/store/fuseMessageSlice";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Icon } from "@mui/material";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AddedSuccessfully,
  DeletedSuccessfully,
  UpdatedSuccessfully,
} from "src/app/@customHooks/notificationAlert";
import { hasPermission } from "src/app/constant/permission/permissionList";
import {
  useCreateDeviceMutation,
  useDeleteDeviceMutation,
  useUpdateDeviceMutation,
} from "../DevicesApi";

/**
 * The device header.
 */
function DeviceHeader() {
  const routeParams = useParams();
  const { deviceId } = routeParams;
  const [createDevice] = useCreateDeviceMutation();
  const [saveDevice] = useUpdateDeviceMutation();
  const [removeDevice] = useDeleteDeviceMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const footerColor = localStorage.getItem("color_code");
  const handleDelete = localStorage.getItem("deleteDevice");
  const handleUpdate = localStorage.getItem("updateDevice");

  function handleUpdateDevice() {
    saveDevice(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/device/devices`);
    });
  }

  function handleCreateDevice() {
    createDevice(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/device/devices`);
      });
  }

  function handleRemoveDevice(dispatch) {
    removeDevice(deviceId);
    DeletedSuccessfully();
    navigate("/apps/device/devices");
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: "error" })
    );
  }

  function handleCancel() {
    navigate(`/apps/device/devices`);
  }

  return (
    <div
      style={{ backgroundColor: footerColor, color: "white" }}
      className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32"
    >
      <div className="flex flex-col items-start w-2/3 space-y-8 sm:space-y-0  sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/device/devices"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Devices</span>
          </Typography>
        </motion.div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {handleDelete === "deleteDevice" && deviceId !== "new" && (
          <Typography className="mt-6" variant="subtitle2">
            Do you want to remove this device?
          </Typography>
        )}
        {handleDelete === "deleteDevice" &&
          deviceId !== "new" &&
          hasPermission("DEPARTMENT_DELETE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
              variant="contained"
              color="secondary"
              onClick={handleRemoveDevice}
              startIcon={<Icon className="hidden sm:flex">delete</Icon>}
              Devices
            >
              Remove
            </Button>
          )}
        {deviceId === "new" && hasPermission("DEPARTMENT_CREATE") && (
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            // disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateDevice}
          >
            Save
          </Button>
        )}
        {handleDelete !== "deleteDevice" &&
          handleUpdate === "updateDevice" &&
          deviceId !== "new" &&
          hasPermission("DEPARTMENT_UPDATE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              color="secondary"
              variant="contained"
              onClick={handleUpdateDevice}
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

export default DeviceHeader;
