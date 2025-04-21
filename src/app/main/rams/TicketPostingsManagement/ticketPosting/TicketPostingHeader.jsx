import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { AddedSuccessfully } from "src/app/@customHooks/notificationAlert";
import { useCreateTicketPostingMutation } from "../TicketPostingsApi";
import { hasPermission } from "src/app/constant/permission/permissionList";

/**
 * The ticketPosting header.
 */
function TicketPostingHeader({ handleReset }) {
  const routeParams = useParams();
  const { ticketPostingId } = routeParams;
  const [createTicketPosting] = useCreateTicketPostingMutation();
  const methods = useFormContext();
  const { formState, watch, getValues, reset } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const footerColor = localStorage.getItem("color_code");

  function handleCreateTicketPosting() {
    createTicketPosting(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();
        handleReset();
        navigate(`/apps/ticketPosting/ticketPostings`);
      });
  }

  function handleCancel() {
    handleReset();
    navigate(`/apps/ticketPosting/ticketPostings`);
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
              Ticket Posting
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      ></motion.div>
    </div>
  );
}

export default TicketPostingHeader;
