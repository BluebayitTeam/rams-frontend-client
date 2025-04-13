import { showMessage } from "@fuse/core/FuseMessage/store/fuseMessageSlice";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import _ from "@lodash";
import { Icon } from "@mui/material";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AddedSuccessfully,
  DeletedSuccessfully,
  UpdatedSuccessfully,
} from "src/app/@customHooks/notificationAlert";
import {
  useCreatePayorderClearingMutation,
  useDeletePayorderClearingMutation,
  useUpdatePayorderClearingMutation,
} from "../PayorderClearingsApi";

/**
 * The payorderClearing header.
 */
function PayorderClearingHeader() {
  const routeParams = useParams();
  const { payorderClearingId } = routeParams;
  const [createPayorderClearing] = useCreatePayorderClearingMutation();
  const [savePayorderClearing] = useUpdatePayorderClearingMutation();
  const [removePayorderClearing] = useDeletePayorderClearingMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem("deletePayorderClearing");
  const handleUpdate = localStorage.getItem("updatePayorderClearing");
  const footerColor = localStorage.getItem("color_code");

  function handleUpdatePayorderClearing() {
    savePayorderClearing(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/payorderClearing/payorderClearings`);
    });
  }

  function handleCreatePayorderClearing() {
    createPayorderClearing(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/payorderClearing/payorderClearings`);
      });
  }

  function handleRemovePayorderClearing(dispatch) {
    removePayorderClearing(payorderClearingId);
    DeletedSuccessfully();
    navigate("/apps/payorderClearing/payorderClearings");
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: "error" })
    );
  }

  function handleCancel() {
    navigate(`/apps/payorderClearing/payorderClearings`);
  }

  return (
    <div
      style={{ backgroundColor: footerColor, color: "white" }}
      className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32"
    >
      <div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/payorderClearing/payorderClearings"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Post Date Clearing</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
            {images && images.length > 0 && featuredImageId ? (
              <img
                className="w-32 sm:w-48 rounded"
                src={_.find(images, { id: featuredImageId })?.url}
                alt={name}
              />
            ) : (
              <img
                className="w-32 sm:w-48 rounded"
                src="assets/images/apps/ecommerce/payorderClearing-image-placeholder.png"
                alt={name}
              />
            )}
          </motion.div>
          <motion.div
            className="flex flex-col min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {name || "New PayorderClearing"}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Post Date Clearing Detail
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {handleDelete === "deletePayorderClearing" &&
          payorderClearingId !== "new" && (
            <Typography className="mt-6" variant="subtitle2">
              Do you want to remove this Pay Order Clearing?
            </Typography>
          )}
        {handleDelete === "deletePayorderClearing" &&
          payorderClearingId !== "new" && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
              variant="contained"
              color="secondary"
              onClick={handleRemovePayorderClearing}
              startIcon={<Icon className="hidden sm:flex">delete</Icon>}
              style={{ padding: "0 28px" }}
            >
              Remove
            </Button>
          )}
        {payorderClearingId === "new" && (
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            disabled={_.isEmpty(dirtyFields) || !isValid}
            color={!_.isEmpty(dirtyFields) && isValid ? "secondary" : "inherit"}
            sx={{
              backgroundColor:
                _.isEmpty(dirtyFields) || !isValid
                  ? "#9e9e9e !important"
                  : undefined,
              color: "white", // force white text
              border:
                _.isEmpty(dirtyFields) || !isValid
                  ? "1px solid #ccc"
                  : undefined,
            }}
            onClick={handleCreatePayorderClearing}
          >
            Save
          </Button>
        )}
        {handleDelete !== "deletePayorderClearing" &&
          handleUpdate === "updatePayorderClearing" &&
          payorderClearingId !== "new" && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              color="secondary"
              variant="contained"
              onClick={handleUpdatePayorderClearing}
            >
              Update
            </Button>
          )}
        <Button
          className="whitespace-nowrap mx-4 text-white bg-orange-500 hover:bg-orange-800 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300"
          variant="contained"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </motion.div>
    </div>
  );
}

export default PayorderClearingHeader;
