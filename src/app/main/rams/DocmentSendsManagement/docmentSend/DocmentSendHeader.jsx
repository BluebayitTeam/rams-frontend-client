import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CustomNotification } from "src/app/@customHooks/notificationAlert";
import { useCreateDocmentSendMutation } from "../DocmentSendsApi";
import { hasPermission } from "src/app/constant/permission/permissionList";

/**
 * The docmentSend header.
 */
function DocmentSendHeader({ handleReset }) {
  const routeParams = useParams();
  const { docmentSendId } = routeParams;
  const [saveDocumentSend] = useCreateDocmentSendMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { checkbox, passenger, email } = watch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const footerColor = localStorage.getItem("color_code");

  useEffect(() => {
    // Update the isButtonDisabled state based on the checkbox, passenger, and email values
    setIsButtonDisabled(!(checkbox && passenger && email));
  }, [checkbox, passenger, email]);

  function handleSaveDocumentSend() {
    saveDocumentSend(getValues()).then((res) => {
      CustomNotification("success", "Document Send Successfully..");
      handleReset({ email: "" });
    });
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
              Document Send
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      >
        {hasPermission("MAIL_DOCUMENT") && (
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            disabled={isButtonDisabled}
            color={!isButtonDisabled ? "secondary" : "inherit"}
            sx={{
              backgroundColor: isButtonDisabled
                ? "#9e9e9e !important"
                : undefined,
              color: "white", // force white text
              border: isButtonDisabled ? "1px solid #ccc" : undefined,
            }}
            onClick={handleSaveDocumentSend}
          >
            Send
          </Button>
        )}
      </motion.div>
    </div>
  );
}

export default DocmentSendHeader;
