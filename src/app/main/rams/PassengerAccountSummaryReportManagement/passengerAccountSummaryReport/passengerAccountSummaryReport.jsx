import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { z } from "zod";
import PassengerAccountSummaryReportsTable from "./PassengerAccountSummarysTable";
/**
 * Form Validation Schema
 */
const schema = z.object({
  first_name: z
    .string()
    .nonempty("You must enter a passengerAccountSummaryReport name")
    .min(
      5,
      "The passengerAccountSummaryReport name must be at least 5 characters"
    ),
});

function PassengerAccountSummaryReport() {
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
          className="flex"
          style={{ backgroundColor: footerColor, color: "white" }}
        >
          <h1 className="hidden sm:flex text-16 md:text-24 mt-5 mx-12 font-semibold">
            Passenger Account Summary Report
          </h1>
        </div>
      }
      content={<PassengerAccountSummaryReportsTable />}
      innerScroll
    />
  );
}

export default PassengerAccountSummaryReport;
