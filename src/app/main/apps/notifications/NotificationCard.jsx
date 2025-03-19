import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useNavigate } from "react-router";

/**
 * The notification card.
 */
function NotificationCard(props) {
  const { item, className, onClose } = props;
  const navigate = useNavigate();

  const variant = item?.variant || "";
  const handleClose = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    if (onClose) {
      onClose(item?.id);
    }
  };

  return (
    item.key !== "total_count" && (
      <Card
        className={clsx(
          "relative flex min-h-64 w-full items-center space-x-8 rounded-16 p-20 shadow cursor-pointer",

          className
        )}
        elevation={0}
        component={item.useRouter ? NavLinkAdapter : "div"}
        to={item.link || ""}
        onClick={() => {
          if (item.key === "MEDICAL" && item.value > 0) {
            navigate("/apps/medicalExpiresReport/medicalExpiresReports/");
          } else if (item.key === "VISA" && item.value > 0) {
            navigate("/apps/visaExpairsReport/visaExpairsReports");
          } else if (item.key === "PASSPORT" && item.value > 0) {
            navigate("/apps/passportExpireReport/passportExpireReports");
          }
        }}
        role={item.link ? "button" : undefined}
      >
        <div className="flex flex-auto flex-row justify-between items-center w-full">
          <Typography className="line-clamp-1 font-semibold">
            {item.key}
          </Typography>
          <span className={clsx("font-semibold text-lg")}>{item.value}</span>
        </div>
      </Card>
    )
  );
}

export default NotificationCard;
