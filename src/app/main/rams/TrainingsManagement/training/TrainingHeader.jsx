/* eslint-disable no-undef */
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@mui/material";
import {
  AddedSuccessfully,
  RemoveSuccessfully,
  UpdatedSuccessfully,
} from "src/app/@customHooks/notificationAlert";
import { useSelector } from "react-redux";
import { doneNotDone } from "src/app/@data/data";
import { showMessage } from "@fuse/core/FuseMessage/store/fuseMessageSlice";
import _ from "lodash";
import {
  useCreateTrainingMutation,
  useDeleteTrainingMutation,
  useUpdateTrainingMutation,
} from "../TrainingsApi";
import { hasPermission } from "src/app/constant/permission/permissionList";

/**
 * The training header.
 */
function TrainingHeader({ handleReset, emptyValue }) {
  const routeParams = useParams();
  const { trainingId } = routeParams;
  const [createTraining] = useCreateTrainingMutation();
  const [saveTraining] = useUpdateTrainingMutation();
  const [removeTraining] = useDeleteTrainingMutation();
  const methods = useFormContext();
  const { formState, watch, getValues, reset } = methods;
  const { isValid, dirtyFields } = formState;
  const navigate = useNavigate();
  const footerColor = localStorage.getItem("color_code");

  const passengers = useSelector((state) => state.data.passengers);
  const { fromSearch } = useParams();
  // const user_role = localStorage.getItem('user_role');

  function handleUpdateTraining() {
    saveTraining(getValues())
      .then((res) => {
        if (res.data?.id) {
          if (fromSearch) {
            navigate(-1);
          } else {
            localStorage.setItem("medicalAlert", "updateTraining");

            handleReset({
              ...emptyValue,
              training_card_status: doneNotDone.find((data) => data.default)
                ?.id,
            });
            console.log("sklfjjdf", getValues());
            UpdatedSuccessfully();
            navigate("/apps/training-management/trainings/new");
          }
        } else {
          // Handle cases where res.data.id is not present
          console.error("Update failed: No id in response data");
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating training", error);
        dispatch(
          showMessage({ message: `Error: ${error.message}`, variant: "error" })
        );
      });
  }

  function handleCreateTraining() {
    createTraining(getValues())
      // .unwrap()
      .then((res) => {
        if (res) {
          if (fromSearch) {
            history.goBack();
          } else {
            localStorage.setItem("medicalAlert", "saveTraining");

            handleReset({
              ...emptyValue,
              training_card_status: doneNotDone.find((data) => data.default)
                ?.id,
            });
            navigate("/apps/training-management/trainings/new");
            AddedSuccessfully();
          }
        }
      });
  }

  function handleRemoveTraining() {
    removeTraining(getValues()?.id)
      .unwrap()
      .then((res) => {
        if (res) {
          if (fromSearch) {
            history.goBack();
          } else {
            handleReset({
              ...emptyValue,
              training_card_status: doneNotDone.find((data) => data.default)
                ?.id,
            });
            localStorage.setItem("medicalAlert", "saveTraining");
            navigate("/apps/training-management/trainings/new");
            dispatch(
              showMessage({
                message: "Please Restart The Backend",
                variant: "error",
              })
            );
          }
        }

        RemoveSuccessfully();
      })
      .catch((error) => {
        dispatch(
          showMessage({ message: `Error: ${error.message}`, variant: "error" })
        );
      });
  }

  const handleCancel = () => {
    if (fromSearch) {
      navigate(-1);
    } else {
      navigate("/apps/training-management/trainings/new");
      handleReset({
        ...emptyValue,
        training_card_status: doneNotDone.find((data) => data.default)?.id,
      });
    }
  };

  return (
    <div
      style={{ backgroundColor: footerColor, color: "white" }}
      className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32"
    >
      <div className="flex flex-col items-start max-w-full min-w-0">
        <div className="flex items-center max-w-full">
          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.3 } }}
            >
              <Typography className="text-16 sm:text-20 truncate font-semibold">
                {routeParams.trainingId === "new"
                  ? "Create New Training"
                  : passengers?.find(({ id }) => id === watch("passenger"))
                      ?.passenger_name || ""}
              </Typography>
              <Typography variant="caption" className="font-medium">
                {routeParams.trainingId !== "new" && "Trainings Detail"}
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
        {(routeParams.trainingId === "new" ||
          (sessionStorage.getItem("operation") === "save" &&
            watch("passenger"))) &&
          hasPermission("TRAINING_CREATE") && (
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              disabled={_.isEmpty(dirtyFields) || isValid}
              color={
                !_.isEmpty(dirtyFields) && !isValid ? "secondary" : "inherit"
              }
              sx={{
                backgroundColor:
                  _.isEmpty(dirtyFields) || isValid
                    ? "#9e9e9e !important"
                    : undefined,
                color: "white", // force white text
                border:
                  _.isEmpty(dirtyFields) || isValid
                    ? "1px solid #ccc"
                    : undefined,
              }}
              onClick={handleCreateTraining}
            >
              Save
            </Button>
          )}

        {routeParams?.trainingId !== "new" &&
          watch("passenger") &&
          sessionStorage.getItem("operation") !== "save" &&
          hasPermission("TRAINING_UPDATE") && (
            <Button
              className="whitespace-nowrap mx-2 text-white bg-green-400 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              variant="contained"
              onClick={handleUpdateTraining}
              startIcon={<Icon className="hidden sm:flex">delete</Icon>}
            >
              Update
            </Button>
          )}

        {routeParams?.trainingId !== "new" &&
          watch("passenger") &&
          sessionStorage.getItem("operation") !== "save" &&
          hasPermission("TRAINING_DELETE") && (
            <Button
              className="whitespace-nowrap mx-2 text-white bg-red-400 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-[#ea5b78]-300"
              variant="contained"
              onClick={handleRemoveTraining}
              startIcon={<Icon className="hidden sm:flex">delete</Icon>}
            >
              Remove
            </Button>
          )}

        {watch("passenger") && (
          <Button
            className="whitespace-nowrap mx-2 text-white bg-orange-500 hover:bg-orange-800 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300"
            variant="contained"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        )}
      </motion.div>
    </div>
  );
}

export default TrainingHeader;
