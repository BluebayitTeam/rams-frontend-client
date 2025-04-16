import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { z } from "zod";
import PassengerStatusOverviewReportsTable from "./PassengerStatusOverviewsTable";
/**
 * Form Validation Schema
 */
const schema = z.object({
  first_name: z
    .string()
    .nonempty("You must enter a passengerStatusOverviewReport name")
    .min(
      5,
      "The passengerStatusOverviewReport name must be at least 5 characters"
    ),
});

function PassengerStatusOverviewReport() {
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
            Passenger Status Overview
          </h1>
        </div>
      }
      content={<PassengerStatusOverviewReportsTable />}
      innerScroll
    />
  );
}

export default PassengerStatusOverviewReport;
