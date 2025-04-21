import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { Icon } from "@mui/material";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "app/store/store";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { hasPermission } from "src/app/constant/permission/permissionList";
import { resetSearchText, selectSearchText } from "../store/searchTextSlice";

/**
 * The Shift header.
 */
function ShiftsHeader(props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const footerColor = localStorage.getItem("color_code");

  const searchText = useSelector(selectSearchText);
  useEffect(() => {
    return () => {
      dispatch(resetSearchText());
    };
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
          Shifts
        </Typography>
      </div>

      <div className="flex w-full sm:w-auto flex-1 items-center justify-end space-x-8">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
        >
          <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder="Search Name"
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

        <motion.div
          className="flex flex-grow-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          {hasPermission("TODO_TASK_TYPE_CREATE") && (
            <Button
              className="mx-8"
              variant="contained"
              color="secondary"
              component={NavLinkAdapter}
              to="/apps/shift/shifts/new"
            >
              <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
              <span className="hidden sm:flex mx-8">Add</span>
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default ShiftsHeader;
