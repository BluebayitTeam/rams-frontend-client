import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { z } from "zod";
import AgentReportsTable from "./AgentReportsTable";
/**
 * Form Validation Schema
 */
const schema = z.object({
  first_name: z
    .string()
    .nonempty("You must enter a agentReport name")
    .min(5, "The agentReport name must be at least 5 characters"),
});

function AgentReport() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
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
        <div
          style={{ backgroundColor: footerColor, color: "white" }}
          className="flex"
        >
          <h1 className="hidden sm:flex text-16 md:text-24 mt-5 mx-12 font-semibold">
            Agent Report
          </h1>
        </div>
      }
      content={<AgentReportsTable />}
      scroll={isMobile ? "normal" : "content"}
    />
  );
}

export default AgentReport;
