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
import { showMessage } from "@fuse/core/FuseMessage/store/fuseMessageSlice";
import _ from "lodash";
import {
  useCreateVisaReissueListMutation,
  useDeleteVisaReissueListMutation,
  useUpdateVisaReissueListMutation,
} from "../VisaReissueListsApi";
import { hasPermission } from "src/app/constant/permission/permissionList";

/**
 * The visaReissueList header.
 */
function VisaReissueListHeader({ handleReset, emptyValue }) {
  const routeParams = useParams();

  const [createVisaReissueList] = useCreateVisaReissueListMutation();
  const [saveVisaReissueList] = useUpdateVisaReissueListMutation();
  const [removeVisaReissueList] = useDeleteVisaReissueListMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { dirtyFields } = formState;
  const footerColor = localStorage.getItem("color_code");

  const navigate = useNavigate();

  const passengers = useSelector((state) => state.data.passengers);
  const { fromSearch } = useParams();

  function handleUpdateVisaReissueList() {
    saveVisaReissueList(getValues())
      .then((res) => {
        if (res.data?.id) {
          if (fromSearch) {
            history.goBack();
          } else {
            localStorage.setItem("medicalAlert", "updateVisaReissueList");

            handleReset({ ...emptyValue });

            UpdatedSuccessfully();
            navigate("/apps/visaReissueList-management/visaReissueLists/new");
          }
        } else {
          // Handle cases where res.data.id is not present
        }
      })
      .catch((error) => {
        // Handle error

        dispatch(
          showMessage({ message: `Error: ${error.message}`, variant: "error" })
        );
      });
  }

  function handleCreateVisaReissueList() {
    createVisaReissueList(getValues())
      // .unwrap()
      .then((res) => {
        if (res) {
          if (fromSearch) {
            history.goBack();
          } else {
            localStorage.setItem("medicalAlert", "saveVisaReissueList");

            handleReset({ ...emptyValue });
          }

          navigate("/apps/visaReissueList-management/visaReissueLists/new");
          AddedSuccessfully();
        }
      });
  }

  function handleRemoveVisaReissueList() {
    removeVisaReissueList(getValues()?.id)
      .unwrap()
      .then((res) => {
        if (res) {
          if (fromSearch) {
            history.goBack();
          } else {
            handleReset({ ...emptyValue });
            localStorage.setItem("medicalAlert", "saveVisaReissueList");
            navigate("/apps/visaReissueList-management/visaReissueLists/new");

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
    handleReset({ ...emptyValue });
    navigate("/apps/visaReissueList-management/visaReissueLists/new");
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
                {routeParams.visaReissueListId === "new"
                  ? "Create New Visa Reissue List"
                  : passengers?.find(({ id }) => id === watch("passenger"))
                      ?.passenger_name || ""}
              </Typography>
              <Typography variant="caption" className="font-medium">
                {routeParams.visaReissueListId !== "new" &&
                  "Visa Reissue List Detail"}
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
        {(routeParams.visaReissueListId === "new" ||
          (sessionStorage.getItem("operation") === "save" &&
            watch("passenger"))) &&
          hasPermission("VISA_REISSUE_LIST_CREATE") && (
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              disabled={_.isEmpty(dirtyFields)}
              color={!_.isEmpty(dirtyFields) ? "secondary" : "inherit"}
              sx={{
                backgroundColor: _.isEmpty(dirtyFields)
                  ? "#9e9e9e !important"
                  : undefined,
                color: "white", // force white text
                border: _.isEmpty(dirtyFields) ? "1px solid #ccc" : undefined,
              }}
              onClick={handleCreateVisaReissueList}
            >
              Save
            </Button>
          )}

        {routeParams?.visaReissueListId !== "new" &&
          watch("passenger") &&
          sessionStorage.getItem("operation") !== "save" &&
          hasPermission("VISA_REISSUE_LIST_UPDATE") && (
            <Button
              className="whitespace-nowrap mx-2 text-white bg-green-400 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              variant="contained"
              onClick={handleUpdateVisaReissueList}
              startIcon={<Icon className="hidden sm:flex">delete</Icon>}
            >
              Update
            </Button>
          )}

        {routeParams?.visaReissueListId !== "new" &&
          watch("passenger") &&
          sessionStorage.getItem("operation") !== "save" &&
          hasPermission("VISA_REISSUE_LIST_DELETE") && (
            <Button
              className="whitespace-nowrap mx-2 text-white bg-red-400 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-[#ea5b78]-300"
              variant="contained"
              onClick={handleRemoveVisaReissueList}
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

export default VisaReissueListHeader;
