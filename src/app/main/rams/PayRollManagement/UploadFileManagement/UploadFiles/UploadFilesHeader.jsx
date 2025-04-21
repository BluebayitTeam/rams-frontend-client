import { Icon, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  alert: (props) => ({
    width: "20%",
    height: "35px",
    position: "fixed",
    right: "30px",
    paddingTop: "0px",
    fontSize: "15px",
    borderRadius: "15px",
    transitionTimingFunction: "ease-out",
    zIndex: props ? "1" : "-1",
    transition: props ? "0s" : "1s",
    opacity: props ? 1 : 0,
  }),
}));

const UploadFilesHeader = () => {
  const [alerOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();
  const footerColor = localStorage.getItem("color_code");

  const classes = useStyles(alerOpen);

  useEffect(() => {
    const alert = localStorage.getItem("uploadFileAlert");

    if (alert === "saveUploadFile") {
      setAlertOpen(true);
      setAlertMessage("Add Success...");
      localStorage.removeItem("uploadFileAlert");
    }
    if (alert === "updateUploadFile") {
      setAlertOpen(true);
      setAlertMessage("Update Success...");
      localStorage.removeItem("uploadFileAlert");
    }
    if (alert === "deleteUploadFile") {
      setAlertOpen(true);
      setAlertMessage("Remove Success...");
      localStorage.removeItem("uploadFileAlert");
    }

    setTimeout(() => {
      setAlertOpen(false);
    }, 3000);
  }, []);

  return (
    <div
      style={{ backgroundColor: footerColor, color: "white" }}
      className="flex flex-col sm:flex-row space-y-12 sm:space-y-0 flex-1 w-full justify-between py-32 px-24 md:px-32"
    >
      <div className="flex items-center">
        <Icon
          component={motion.span}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.2 } }}
          className="text-24 md:text-32"
        >
          person
        </Icon>
        <Typography
          component={motion.span}
          initial={{ x: -10 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
        >
          Upload / Download Employees Info
        </Typography>
      </div>
    </div>
  );
};

export default UploadFilesHeader;
