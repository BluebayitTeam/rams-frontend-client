import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { z } from "zod";
import MakeAListReportsTable from "./MakeAListReportsTable";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

/**
 * Form Validation Schema
 */
const schema = z.object({
  first_name: z
    .string()
    .nonempty("You must enter a makeAListReport name")
    .min(5, "The makeAListReport name must be at least 5 characters"),
});

function MakeAListReport() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const theme = useTheme();
  const footerColor = localStorage.getItem("color_code");

  return (
    <FusePageCarded
      headerBgHeight="102px"
      className="bg-grey-300"
      classes={{
        content: "bg-grey-300",
        contentCard: "overflow-hidden",
        header: "min-h-52 h-52",
      }}
      header={
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
          style={{ backgroundColor: footerColor, color: "white" }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/makeAList/makeALists"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium"> MakeAListReport</span>
          </Typography>
        </motion.div>
      }
      content={<MakeAListReportsTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default MakeAListReport;
