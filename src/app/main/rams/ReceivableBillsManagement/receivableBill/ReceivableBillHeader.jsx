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
import { hasPermission } from "src/app/constant/permission/permissionList";
import {
  useCreateReceivableBillMutation,
  useDeleteReceivableBillMutation,
  useUpdateReceivableBillMutation,
} from "../ReceivableBillsApi";

/**
 * The receivableBill header.
 */
function ReceivableBillHeader() {
  const routeParams = useParams();
  const { receivableBillId, invoice_no } = routeParams;
  const [createReceivableBill] = useCreateReceivableBillMutation();
  const [saveReceivableBill] = useUpdateReceivableBillMutation();
  const [removeReceivableBill] = useDeleteReceivableBillMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem("deleteReceivableBill");
  const handleUpdate = localStorage.getItem("updateReceivableBill");
  const footerColor = localStorage.getItem("color_code");

  const requiredFields = ["branch", "passenger", "ledger"];
  const allFieldsFilled = requiredFields.every((field) => !!watch(field));

  function handleUpdateReceivableBill() {
    saveReceivableBill(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/receivableBill/receivableBills`);
    });
  }

  function handleCreateReceivableBill() {
    console.log(`nsdflksf`, getValues());
    createReceivableBill(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/receivableBill/receivableBills`);
      });
  }

  function handleRemoveReceivableBill(dispatch) {
    removeReceivableBill(invoice_no);
    DeletedSuccessfully();
    navigate("/apps/receivableBill/receivableBills");
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: "error" })
    );
  }

  function handleCancel() {
    navigate(`/apps/receivableBill/receivableBills`);
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
            to="/apps/receivableBill/receivableBills"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Receivable Bills</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          {/* <motion.div
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
                src="assets/images/apps/ecommerce/receivableBill-image-placeholder.png"
                alt={name}
              />
            )}
          </motion.div> */}
          <motion.div
            className="flex flex-col min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {invoice_no || "New Receivable Bill"}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Receivable Bill Detail
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {handleDelete === "deleteReceivableBill" &&
          receivableBillId !== "new" && (
            <Typography className="mt-6" variant="subtitle2">
              Do you want to remove this Receivable Bill?
            </Typography>
          )}
        {handleDelete === "deleteReceivableBill" &&
          receivableBillId !== "new" &&
          hasPermission("SALES_DELETE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
              variant="contained"
              color="secondary"
              onClick={handleRemoveReceivableBill}
              startIcon={<Icon className="hidden sm:flex">delete</Icon>}
              style={{ padding: "0 28px" }}
            >
              Remove
            </Button>
          )}
        {receivableBillId === "new" && hasPermission("SALES_CREATE") && (
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
            onClick={handleCreateReceivableBill}
          >
            Save
          </Button>
        )}
        {handleDelete !== "deleteReceivableBill" &&
          handleUpdate === "updateReceivableBill" &&
          receivableBillId !== "new" &&
          hasPermission("SALES_UPDATE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              color="secondary"
              variant="contained"
              onClick={handleUpdateReceivableBill}
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

export default ReceivableBillHeader;
