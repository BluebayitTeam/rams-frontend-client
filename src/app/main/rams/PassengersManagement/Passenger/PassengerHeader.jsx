/* eslint-disable no-undef */
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
  useCreatePassengerMutation,
  useDeletePassengerMutation,
  useUpdatePassengerMutation,
} from "../PassengersApi";
import { hasPermission } from "src/app/constant/permission/permissionList";
import { BASE_URL } from "src/app/constant/constants";
import { useGetAllNotificationsQuery } from "src/app/main/apps/notifications/NotificationApi";
import { useState } from "react";

/**
 * The passenger header.
 */
function PassengerHeader({ disableUpdate, disableCreate }) {
  const routeParams = useParams();
  const { passengerId, passengerType } = routeParams;
  const [isSaving, setIsSaving] = useState(false);
  console.log("disableUpdate", disableCreate);
  const [createPassenger] = useCreatePassengerMutation();
  const [savePassenger] = useUpdatePassengerMutation();
  const [removePassenger] = useDeletePassengerMutation();
  const { refetch } = useGetAllNotificationsQuery();

  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, passenger_pic, featuredImageId } = watch();
  const handleDelete = localStorage.getItem("passengerEvent");
  const footerColor = localStorage.getItem("color_code");
  const [isUpdating, setIsUpdating] = useState(false);

  const { passengerName, fromSearch } = useParams();

  function handleUpdatePassenger() {
    setIsUpdating(true); // start loader

    savePassenger(getValues())
      .unwrap()
      .then((data) => {
        UpdatedSuccessfully();
        if (passengerType === "fromSearch") {
          navigate(-1);
        } else {
          refetch();
          navigate(`/apps/passenger/passengers/${routeParams?.passengerType}`);
        }
      })
      .finally(() => {
        setIsUpdating(false); // stop loader
      });
  }

  function handleCreatePassenger() {
    setIsSaving(true); // start loader

    createPassenger(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();
        navigate(`/apps/passenger/passengers/${routeParams?.passengerType}`);
      })
      .finally(() => {
        setIsSaving(false); // stop loader
      });
  }

  function handleRemovePassenger(dispatch) {
    removePassenger(passengerId);
    DeletedSuccessfully();
    navigate(`/apps/passenger/passengers/${routeParams?.passengerType}`);
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: "error" })
    );
  }

  function handleCancel() {
    if (passengerType == "fromSearch") {
      navigate(-1);
    } else {
      navigate(`/apps/passenger/passengers/${routeParams?.passengerType}`);
    }
  }

  return (
    <div
      style={{ backgroundColor: footerColor, color: "white" }}
      className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32"
    >
      <div className="flex flex-col items-start space-y-8 sm:space-y-0 w-2/3 sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            role="button"
            onClick={() => {
              if (passengerType === "fromSearch") {
                navigate(-1);
              } else {
                navigate(
                  `/apps/passenger/passengers/${routeParams?.passengerType}`
                );
              }
            }}
            color="inherit"
            style={{ cursor: "pointer" }} // Ensures it's clickable
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Passengers</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
            {passenger_pic && passenger_pic.length > 0 ? (
              <img
                className="w-32 sm:w-48 rounded"
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                }}
                src={`${BASE_URL}${passenger_pic}`}
                alt={name}
              />
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
              {name || "New Passenger"}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Passenger Detail
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {handleDelete === "deletePassenger" && passengerId !== "new" && (
          <Typography className="mt-6" variant="subtitle2">
            Do you want to remove this passenger?
          </Typography>
        )}
        {(passengerType === "fromSearch" ||
          (handleDelete === "Delete" && passengerId !== "new")) && (
          <Button
            className="whitespace-nowrap mx-2 text-white bg-red-400 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-[#ea5b78]-300"
            variant="contained"
            style={{ padding: "0 28px" }}
            onClick={handleRemovePassenger}
            startIcon={<Icon className="hidden sm:flex">delete</Icon>}
          >
            Remove
          </Button>
        )}
        {passengerId === "new" && (
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            disabled={
              _.isEmpty(dirtyFields) || !isValid || isSaving || disableCreate // disable during save
            }
            color={
              (!_.isEmpty(dirtyFields) && isValid && !isSaving) ||
              !disableCreate
                ? "secondary"
                : "inherit"
            }
            sx={{
              backgroundColor:
                _.isEmpty(dirtyFields) || !isValid || isSaving || disableCreate
                  ? "#9e9e9e !important"
                  : undefined,
              color: "white",
              border:
                _.isEmpty(dirtyFields) || !isValid || isSaving || disableCreate
                  ? "1px solid #ccc"
                  : undefined,
            }}
            onClick={handleCreatePassenger}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        )}

        {handleDelete !== "Delete" && passengerId !== "new" && (
          <Button
            className="whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
            variant="contained"
            disabled={isUpdating || disableUpdate} // disable during update
            color={!isUpdating ? "secondary" : "inherit"}
            sx={{
              backgroundColor:
                isUpdating || disableUpdate ? "#9e9e9e !important" : undefined,
              color: "white",
              border:
                isUpdating || disableUpdate ? "1px solid #ccc" : undefined,
            }}
            onClick={handleUpdatePassenger}
          >
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        )}
        <Button
          className="whitespace-nowrap mx-2 text-white bg-orange-500 hover:bg-orange-800 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300"
          variant="contained"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </motion.div>
    </div>
  );
}

export default PassengerHeader;
