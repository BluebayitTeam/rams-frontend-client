import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "app/store/store";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useEffect } from "react";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { useSelector } from "react-redux";
import { ViewWeek } from "@mui/icons-material";
import { resetSearchText, selectSearchText } from "../store/searchTextSlice";
import { hasPermission } from "src/app/constant/permission/permissionList";

/**
 * The cvFemales header.
 */
function CvFemalesHeader(props) {
  const dispatch = useAppDispatch();
  const searchText = useSelector(selectSearchText);
  const footerColor = localStorage.getItem("color_code");

  useEffect(() => {
    return () => {
      dispatch(resetSearchText());
    };
  }, []);
  const navigate = useNavigate();

  return (
    <div
      style={{ backgroundColor: footerColor, color: "white" }}
      className="flex flex-col sm:flex-row space-y-12 sm:space-y-0 flex-1 w-full justify-between py-32 px-24 md:px-32"
    >
      <motion.span
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
      >
        <Typography className="text-24 md:text-32 font-extrabold tracking-tight">
          Female CV
        </Typography>
      </motion.span>

      <div className="flex w-full sm:w-auto flex-1 items-center justify-end space-x-8">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full sm:max-w-556 mx-24  space-x-8 px-16 rounded-full border-1 shadow-0"
        >
          <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder="Search by Passenger Name or Id or No"
            className="flex flex-1"
            disableUnderline
            fullWidth
            inputProps={{
              "aria-label": "Search",
            }}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                props?.setSearchKey(ev?.target?.value);
              } else if (
                ev.key === "Backspace" &&
                ev?.target?.value?.length === 1
              ) {
                props?.setSearchKey("");
              }
            }}
          />
        </Paper>

        <ViewWeek
          onClick={() => navigate(`/apps/column/columns/female_cv`)}
          className="cursor-pointer mr-10 "
          style={{ color: "green", marginLeft: "15%", fontSize: "40px" }}
        />
        {hasPermission("FEMALE_CV_CREATE") && (
          <motion.div
            className="flex flex-grow-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
          >
            <Button
              className="mx-8"
              variant="contained"
              color="secondary"
              component={NavLinkAdapter}
              to="/apps/cvFemale/cvFemales/new"
            >
              <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
              <span className="hidden sm:flex mx-8">Add</span>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default CvFemalesHeader;
