import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useAppDispatch } from "app/store/store";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useEffect } from "react";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { resetSearchText, selectSearchText } from "../store/searchTextSlice";
import { hasPermission } from "src/app/constant/permission/permissionList";

/**
 * The ticketedits header.
 */
function TicketeditsHeader(props) {
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
      <motion.span
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
      >
        <Typography className="text-24 md:text-32 font-extrabold tracking-tight">
          Ticket Edits
        </Typography>
      </motion.span>

      <div className="flex flex-1 items-center justify-center px-12">
        {" "}
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
        >
          <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder="Search by Ticket No"
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
    </div>
  );
}

export default TicketeditsHeader;
