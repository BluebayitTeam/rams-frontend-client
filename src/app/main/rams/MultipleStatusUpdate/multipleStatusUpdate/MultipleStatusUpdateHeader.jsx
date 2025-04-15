/* eslint-disable prettier/prettier */
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { AddedSuccessfully } from "src/app/@customHooks/notificationAlert";
import { useCreateMultipleStatusUpdateMutation } from "../MultipleStatusUpdatesApi";
import { hasPermission } from "src/app/constant/permission/permissionList";

/**
 * The MultipleStatusUpdate header.
 */
function MultipleStatusUpdateHeader({ handleReset }) {
  const routeParams = useParams();
  const { MultipleStatusUpdateId } = routeParams;
  const [createMultipleStatusUpdate] = useCreateMultipleStatusUpdateMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();

  const footerColor = localStorage.getItem("color_code");

  const passenger = watch("passenger");
  const isFormSave = watch("is_form_save");

  function handleCreateMultipleStatusUpdate() {
    const modifiedData = {
      current_status: getValues()?.current_status,
      date: getValues()?.date,
      passengers: getValues()?.passengers,
      status: getValues()?.selected_status,
      value: getValues()?.status_value,
    };

    createMultipleStatusUpdate(modifiedData)
      .unwrap()
      .then((data) => {
        AddedSuccessfully();
        handleReset();
        navigate(`/apps/multipleStatusUpdate/multipleStatusUpdates/new`);
      });
  }

  function handleCancel() {
    handleReset();
    navigate(`/apps/multipleStatusUpdate/multipleStatusUpdates/new`);
  }

  return (
    <div
      style={{ backgroundColor: footerColor, color: "white" }}
      className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32"
    >
      <div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
        <div className="flex items-center max-w-full">
          <motion.div
            className="flex flex-col min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              Multiple Status Update
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      >
        {hasPermission("MULTIPLE_STATUS_UPDATE_CREATE") && (
          <Button
            // className="whitespace-nowrap mx-4"
            // variant="contained"
            // color={passenger ? "secondary" : "inherit"}
            // onClick={handleCreateMultipleStatusUpdate}
            // disabled={!isFormSave}

            className="whitespace-nowrap mx-4"
            variant="contained"
            disabled={!isFormSave}
            color={!isFormSave ? "secondary" : "secondary"}
            sx={{
              backgroundColor: !isFormSave ? "#9e9e9e !important" : undefined,
              color: "white", // force white text
              border: !isFormSave ? "1px solid #ccc" : undefined,
            }}
            onClick={handleCreateMultipleStatusUpdate}
          >
            Save
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

export default MultipleStatusUpdateHeader;
