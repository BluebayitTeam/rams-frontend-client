import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { AddedSuccessfully } from "src/app/@customHooks/notificationAlert";
import { useCreateCallingAssignMutation } from "../CallingAssignsApi";
import { hasPermission } from "src/app/constant/permission/permissionList";
import _ from "lodash";

/**
 * The callingAssign header.
 */
function CallingAssignHeader({ handleReset }) {
  const routeParams = useParams();
  const [createCallingAssign] = useCreateCallingAssignMutation();
  const methods = useFormContext();
  const { formState, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const navigate = useNavigate();
  const footerColor = localStorage.getItem("color_code");

  function handleCreateCallingAssign() {
    createCallingAssign(getValues())
      .unwrap()
      .then((data) => {
        debugger;

        if (data?.detail === "Status updated successfully.") {
          AddedSuccessfully();
          handleReset();
          navigate(`/apps/callingAssign/callingAssigns`);
        }
      });
  }

  function handleCancel() {
    handleReset();
    navigate(`/apps/callingAssign/callingAssigns`);
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
              Calling Assign
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      >
        {hasPermission("CALLING_ASSIGN_CREATE") && (
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            disabled={_.isEmpty(dirtyFields) || !isValid}
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
            onClick={handleCreateCallingAssign}
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

export default CallingAssignHeader;
