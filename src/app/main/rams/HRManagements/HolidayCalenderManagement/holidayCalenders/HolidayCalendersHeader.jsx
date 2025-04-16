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
import { resetSearchText, selectSearchText } from "../store/searchTextSlice";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
/**
 * The holidayCalenders header.
 */
function HolidayCalendersHeader(props) {
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
      className="flex flex-col sm:flex-row items-center space-y-12 sm:space-y-0 flex-1 w-full justify-between py-32 px-24 md:px-32"
    >
      {/* Left Section - Title */}
      <div className="flex items-center">
        <CalendarMonthIcon className="text-24 md:text-32 text-black" />
        <Typography
          component={motion.span}
          initial={{ x: -10 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
        >
          Holidays Calendars
        </Typography>
      </div>

      {/* Center Section - Search Bar */}
      <div className="flex flex-1 justify-center w-full">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full sm:max-w-[30.6rem] space-x-8 px-16 rounded-full border-1 shadow-0"
        >
          <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>
          <Input
            placeholder="Search By Name or Type"
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
      </div>

      {/* Right Section - Button */}
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
          to="/apps/holidayCalender/holidayCalenders/new"
        >
          <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
          <span className="hidden sm:flex mx-8">Add New Holidays</span>
        </Button>
      </motion.div>
    </div>
  );
}

export default HolidayCalendersHeader;
