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
  useCreateCallingEntryMutation,
  useDeleteCallingEntryMutation,
  useUpdateCallingEntryMutation,
} from "../CallingEntrysApi";
import { hasPermission } from "src/app/constant/permission/permissionList";
import { getAgents } from "app/store/dataSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PictureAsPdf } from "@mui/icons-material";
import DescriptionIcon from "@mui/icons-material/Description";
import { BASE_URL } from "src/app/constant/constants";

/**
 * The callingEntry header.
 */
function CallingEntryHeader() {
  const routeParams = useParams();
  const dispatch = useDispatch();

  const { callingEntryId, fromSearch } = routeParams;
  const [createCallingEntry] = useCreateCallingEntryMutation();
  const [saveCallingEntry] = useUpdateCallingEntryMutation();
  const [removeCallingEntry] = useDeleteCallingEntryMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const visaAgents = useSelector((state) => state.data.agents);

  const theme = useTheme();
  const navigate = useNavigate();
  const { visa_agent, file, featuredImageId } = watch();
  const handleDelete = localStorage.getItem("deleteCallingEntry");
  const handleUpdate = localStorage.getItem("updateCallingEntry");

  console.log("visa_agentxcvxcx", visa_agent);

  useEffect(() => {
    dispatch(getAgents());
  }, []);

  function handleUpdateCallingEntry() {
    saveCallingEntry(getValues()).then((data) => {
      if (fromSearch) {
        navigate(-1);
      } else {
        UpdatedSuccessfully();
        navigate(`/apps/callingEntry/callingEntrys`);
      }
    });
  }

  function handleCreateCallingEntry() {
    createCallingEntry(getValues())
      .unwrap()
      .then((data) => {
        if (fromSearch) {
          navigate(-1);
        } else {
          AddedSuccessfully();

          navigate(`/apps/callingEntry/callingEntrys`);
        }
      });
  }

  function handleRemoveCallingEntry(dispatch) {
    removeCallingEntry(callingEntryId);
    DeletedSuccessfully();
    navigate("/apps/callingEntry/callingEntrys");
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: "error" })
    );
  }

  function handleCancel() {
    if (fromSearch == "fromSearch") {
      navigate(-1);
    } else {
      navigate(`/apps/callingEntry/callingEntrys`);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
      <div className="flex flex-col items-start space-y-8 sm:space-y-0 w-2/3 sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/callingEntry/callingEntrys"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">CallingEntrys</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
            {typeof file === "string" && file.length > 0 ? (
              file.endsWith(".pdf") ? (
                <PictureAsPdf
                  style={{
                    color: "red",
                    cursor: "pointer",
                    display: "block",
                    fontSize: "35px",
                  }}
                  onClick={() => window.open(`${BASE_URL}${file}`)}
                />
              ) : file.endsWith(".doc") || file.endsWith(".docx") ? (
                <DescriptionIcon
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    display: "block",
                    fontSize: "35px",
                  }}
                  onClick={() => window.open(`${BASE_URL}${file}`)}
                />
              ) : (
                <img
                  className="w-32 sm:w-48 rounded"
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "50%",
                  }}
                  src={`${BASE_URL}${file}`}
                  alt={file}
                />
              )
            ) : (
              <img
                className="w-32 sm:w-48 rounded"
                src="/assets/images/logos/user.jpg"
                alt={file}
              />
            )}
          </motion.div>
          <motion.div
            className="flex flex-col min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {visaAgents.find((data) => data.id === visa_agent)?.first_name ??
                "New CallingEntry"}
            </Typography>

            <Typography variant="caption" className="font-medium">
              CallingEntry Detail
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      >
        {handleDelete === "deleteCallingEntry" && callingEntryId !== "new" && (
          <Typography className="mt-6" variant="subtitle2">
            Do you want to remove this callingEntry?
          </Typography>
        )}
        {handleDelete === "deleteCallingEntry" ||
          (fromSearch === "fromSearch" &&
            callingEntryId !== "new" &&
            hasPermission("CALLING_ENTRY_DELETE") && (
              <Button
                className="whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
                variant="contained"
                color="secondary"
                style={{ padding: "0 28px" }}
                onClick={handleRemoveCallingEntry}
                startIcon={<Icon className="hidden sm:flex">delete</Icon>}
              >
                Remove
              </Button>
            ))}
        {callingEntryId === "new" && hasPermission("CALLING_ENTRY_CREATE") && (
          <Button
            className="whitespace-nowrap mx-4 "
            variant="contained"
            color="secondary"
            disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateCallingEntry}
          >
            Save
          </Button>
        )}
        {handleDelete !== "deleteCallingEntry" &&
          callingEntryId !== "new" &&
          hasPermission("CALLING_ENTRY_UPDATE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              color="secondary"
              variant="contained"
              onClick={handleUpdateCallingEntry}
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

export default CallingEntryHeader;
