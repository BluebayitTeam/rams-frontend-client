import FusePageCarded from "@fuse/core/FusePageCarded";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { z } from "zod";
import PassengerDeliverysTable from "./PassengerDeliveryReportsTable";
/**
 * Form Validation Schema
 */
const schema = z.object({
  delivery_date: z.string().refine(
    (value) => {
      if (!value) return false; // Ensure the field is not empty
      const date = new Date(value);
      return !isNaN(date.getTime()); // Check if it's a valid date
    },
    {
      message: "You must enter a valid delivery date",
    }
  ),
});

function PassengerDelivery() {
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
            Passenger Delivery
          </h1>
        </div>
      }
      content={<PassengerDeliverysTable />}
      innerScroll
    />
  );
}

export default PassengerDelivery;
