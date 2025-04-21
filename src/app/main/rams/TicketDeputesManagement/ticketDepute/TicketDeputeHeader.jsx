import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Icon } from "@mui/material";
import { showMessage } from "@fuse/core/FuseMessage/store/fuseMessageSlice";
import {
  AddedSuccessfully,
  DeletedSuccessfully,
  UpdatedSuccessfully,
} from "src/app/@customHooks/notificationAlert";
import {
  useCreateTicketDeputeMutation,
  useDeleteTicketDeputeMutation,
  useUpdateTicketDeputeMutation,
} from "../TicketDeputesApi";
import { hasPermission } from "src/app/constant/permission/permissionList";
import _ from "lodash";

/**
 * The ticketDepute header.
 */
function TicketDeputeHeader() {
  const routeParams = useParams();
  const { ticketDeputeId } = routeParams;
  const [createTicketDepute] = useCreateTicketDeputeMutation();
  const [saveTicketDepute] = useUpdateTicketDeputeMutation();
  const [removeTicketDepute] = useDeleteTicketDeputeMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem("deleteTicketDepute");
  const handleUpdate = localStorage.getItem("updateTicketDepute");
  const footerColor = localStorage.getItem("color_code");

  function handleUpdateTicketDepute() {
    saveTicketDepute(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/ticketDepute/ticketDeputes`);
    });
  }

  function handleCreateTicketDepute() {
    createTicketDepute(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/ticketDepute/ticketDeputes`);
      });
  }

  function handleRemoveTicketDepute(dispatch) {
    removeTicketDepute(ticketDeputeId);
    DeletedSuccessfully();
    navigate("/apps/ticketDepute/ticketDeputes");
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: "error" })
    );
  }

  function handleCancel() {
    navigate(`/apps/ticketDepute/ticketDeputes`);
  }

  return (
    <div
      style={{ backgroundColor: footerColor, color: "white" }}
      className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32"
    >
      <div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/ticketDepute/ticketDeputes"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">TicketDeputes</span>
          </Typography>
        </motion.div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {handleDelete === "deleteTicketDepute" && ticketDeputeId !== "new" && (
          <Typography className="mt-6" variant="subtitle2">
            Do you want to remove this ticketDepute?
          </Typography>
        )}
        {handleDelete === "deleteTicketDepute" &&
          ticketDeputeId !== "new" &&
          hasPermission("DEPARTMENT_DELETE") && (
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              onClick={handleRemoveTicketDepute}
              startIcon={<Icon className="hidden sm:flex">delete</Icon>}
              style={{ backgroundColor: "#ea5b78", color: "white" }}
            >
              Remove
            </Button>
          )}
        {ticketDeputeId === "new" && hasPermission("DEPARTMENT_CREATE") && (
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
            onClick={handleCreateTicketDepute}
          >
            Save
          </Button>
        )}
        {handleDelete !== "deleteTicketDepute" &&
          handleUpdate === "updateTicketDepute" &&
          ticketDeputeId !== "new" &&
          hasPermission("DEPARTMENT_UPDATE") && (
            <Button
              className="whitespace-nowrap mx-4"
              color="secondary"
              variant="contained"
              style={{ backgroundColor: "#4dc08e", color: "white" }}
              onClick={handleUpdateTicketDepute}
            >
              Update
            </Button>
          )}
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          style={{ backgroundColor: "#FFAA4C", color: "white" }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </motion.div>
    </div>
  );
}

export default TicketDeputeHeader;
