/* eslint-disable no-undef */
import Button from "@mui/material/Button";
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
  useCreateCallingEmbAttestationMutation,
  useDeleteCallingEmbAttestationMutation,
  useUpdateCallingEmbAttestationMutation,
} from "../CallingEmbAttestationsApi";
import { hasPermission } from "src/app/constant/permission/permissionList";

/**
 * The callingEmbAttestation header.
 */
function CallingEmbAttestationHeader({ handleReset, emptyValue }) {
  const routeParams = useParams();
  // const { callingEmbAttestationId } = routeParams;
  const [createCallingEmbAttestation] =
    useCreateCallingEmbAttestationMutation();
  const [saveCallingEmbAttestation] = useUpdateCallingEmbAttestationMutation();
  const [removeCallingEmbAttestation] =
    useDeleteCallingEmbAttestationMutation();
  const methods = useFormContext();
  const { watch, getValues, formState } = methods;
  const { isValid, dirtyFields } = formState;
  const navigate = useNavigate();
  const footerColor = localStorage.getItem("color_code");
  const passengers = useSelector((state) => state.data.passengers);
  const { fromSearch } = useParams();

  function handleUpdateCallingEmbAttestation() {
    saveCallingEmbAttestation(getValues())
      .then((res) => {
        if (res.data?.id) {
          if (fromSearch) {
            history.goBack();
          } else {
            localStorage.setItem("medicalAlert", "updateCallingEmbAttestation");

            handleReset({
              ...emptyValue,
              emb_attestation_status: doneNotDone.find((data) => data.default)
                ?.id,
              calling_status: doneNotDone.find((data) => data.default)?.id,
              bio_submitted_status: doneNotDone.find((data) => data.default)
                ?.id,
            });
            UpdatedSuccessfully();
            navigate(
              "/apps/callingEmbAttestation-management/callingEmbAttestations/new"
            );
          }
        } else {
          // Handle cases where res.data.id is not present
          console.error("Update failed: No id in response data");
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating callingEmbAttestation", error);
        dispatch(
          showMessage({ message: `Error: ${error.message}`, variant: "error" })
        );
      });
  }

  function handleCreateCallingEmbAttestation() {
    createCallingEmbAttestation(getValues())
      // .unwrap()
      .then((res) => {
        if (res) {
          if (fromSearch) {
            history.goBack();
          } else {
            localStorage.setItem("medicalAlert", "saveCallingEmbAttestation");
            handleReset({
              ...emptyValue,
              emb_attestation_status: doneNotDone.find((data) => data.default)
                ?.id,
              calling_status: doneNotDone.find((data) => data.default)?.id,
              bio_submitted_status: doneNotDone.find((data) => data.default)
                ?.id,
            });
          }

          navigate("/apps/callingEmbAttestation/callingEmbAttestations/new");
          AddedSuccessfully();
        }
      });
  }

  function handleRemoveCallingEmbAttestation() {
    removeCallingEmbAttestation(getValues()?.id)
      .unwrap()
      .then((res) => {
        RemoveSuccessfully();

        if (res) {
          if (fromSearch) {
            history.goBack();
          } else {
            handleReset({
              ...emptyValue,
              emb_attestation_status: doneNotDone.find((data) => data.default)
                ?.id,
              calling_status: doneNotDone.find((data) => data.default)?.id,
              bio_submitted_status: doneNotDone.find((data) => data.default)
                ?.id,
            });
            localStorage.setItem("medicalAlert", "saveCallingEmbAttestation");
            navigate(
              "/apps/callingEmbAttestation-management/callingEmbAttestations/new"
            );

            dispatch(
              showMessage({
                message: "Please Restart The Backend",
                variant: "error",
              })
            );
          }
        }
      })
      .catch((error) => {
        dispatch(
          showMessage({ message: `Error: ${error.message}`, variant: "error" })
        );
      });
  }

  const handleCancel = () => {
    handleReset({
      ...emptyValue,
      emb_attestation_status: doneNotDone.find((data) => data.default)?.id,
      calling_status: doneNotDone.find((data) => data.default)?.id,
      bio_submitted_status: doneNotDone.find((data) => data.default)?.id,
    });
    navigate(
      "/apps/callingEmbAttestation-management/callingEmbAttestations/new"
    );
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
                {routeParams.callingEmbAttestationId === "new"
                  ? "Create New Malayasia Status "
                  : passengers?.find(({ id }) => id === watch("passenger"))
                      ?.passenger_name || ""}
              </Typography>
              <Typography variant="caption" className="font-medium">
                {routeParams.callingEmbAttestationId !== "new" &&
                  "CallingEmbAttestations Detail"}
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
        {(routeParams.callingEmbAttestationId === "new" ||
          (sessionStorage.getItem("operation") === "save" &&
            watch("passenger"))) &&
          hasPermission("CALLING_EMB_ATTESTATION_CREATE") && (
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              disabled={!isValid}
              color={isValid ? "secondary" : "inherit"}
              sx={{
                backgroundColor: !isValid ? "#9e9e9e !important" : undefined,
                color: "white", // force white text
                border: !isValid ? "1px solid #ccc" : undefined,
              }}
              onClick={handleCreateCallingEmbAttestation}
            >
              Save
            </Button>
          )}

        {routeParams?.callingEmbAttestationId !== "new" &&
          watch("passenger") &&
          sessionStorage.getItem("operation") !== "save" &&
          hasPermission("CALLING_EMB_ATTESTATION_UPDATE") && (
            <Button
              className="whitespace-nowrap mx-2 text-white bg-green-400 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              variant="contained"
              onClick={handleUpdateCallingEmbAttestation}
              // startIcon={<Icon className="hidden sm:flex">delete</Icon>}
            >
              Update
            </Button>
          )}

        {routeParams?.callingEmbAttestationId !== "new" &&
          watch("passenger") &&
          sessionStorage.getItem("operation") !== "save" &&
          hasPermission("CALLING_EMB_ATTESTATION_DELETE") && (
            <Button
              className="whitespace-nowrap mx-2 text-white bg-red-400 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-[#ea5b78]-300"
              variant="contained"
              onClick={handleRemoveCallingEmbAttestation}
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

export default CallingEmbAttestationHeader;
