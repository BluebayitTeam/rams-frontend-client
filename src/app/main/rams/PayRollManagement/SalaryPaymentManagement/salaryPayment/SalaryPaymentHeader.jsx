import { showMessage } from "@fuse/core/FuseMessage/store/fuseMessageSlice";
import { Icon } from "@mui/material";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import _ from "lodash";
import { useFormContext } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AddedSuccessfully,
  CustomNotification,
  DeletedSuccessfully,
  UpdatedSuccessfully,
} from "src/app/@customHooks/notificationAlert";
import {
  useCreateSalaryPaymentMutation,
  useDeleteSalaryPaymentMutation,
  useUpdateSalaryPaymentMutation,
} from "../SalaryPaymentsApi";

/**
 * The salaryPayment header.
 */
function SalaryPaymentHeader() {
  const routeParams = useParams();
  const { salaryPaymentId, invoiceId } = routeParams;
  const [createSalaryPayment] = useCreateSalaryPaymentMutation();
  const [saveSalaryPayment] = useUpdateSalaryPaymentMutation();
  const [removeSalaryPayment] = useDeleteSalaryPaymentMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const footerColor = localStorage.getItem("color_code");
  const handleDelete = localStorage.getItem("deleteSalaryPayment");

  const handleUpdate = localStorage.getItem("updateSalaryPayment");

  function handleUpdateSalaryPayment() {
    const payload = {
      ...getValues(),
      id: salaryPaymentId,
    };
    saveSalaryPayment(payload).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/salaryPayment/salaryPayments`);
    });
  }

  function handleCreateSalaryPayment() {
    createSalaryPayment(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();
        navigate(`/apps/salaryPayment/salaryPayments`);
      })
      .catch((error) => {
        CustomNotification("error", `${error.response.data.detail}`);
      });
  }

  function handleRemoveSalaryPayment(dispatch) {
    removeSalaryPayment(invoiceId);
    DeletedSuccessfully();
    navigate("/apps/salaryPayment/salaryPayments");
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: "error" })
    );
  }

  function handleCancel() {
    navigate(`/apps/salaryPayment/salaryPayments`);
  }

  return (
    <div
      style={{ backgroundColor: footerColor, color: "white" }}
      className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32"
    >
      <div className="flex flex-col items-start w-2/3 max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/salaryPayment/salaryPayments"
            color="inherit"
          >
            <Icon className="text-20">
              {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
            </Icon>
            <span className="hidden sm:flex mx-4 font-medium">
              Payment Salary
            </span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.3 } }}
            >
              <Typography className="text-16 sm:text-20 truncate font-semibold">
                Create New Payment Salary
              </Typography>
              <Typography variant="caption" className="font-medium">
                Payment Salary Detail
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {handleDelete === "deleteSalaryPayment" &&
          salaryPaymentId !== "new" && (
            <Typography className="mt-6" variant="subtitle2">
              Do you want to remove this salaryPayment?
            </Typography>
          )}
        {
          handleDelete === "deleteSalaryPayment" &&
            salaryPaymentId !== "new" && (
              // hasPermission('PAY_HEAD_TYPE_DELETE') && (
              <Button
                className="whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
                variant="contained"
                color="secondary"
                onClick={handleRemoveSalaryPayment}
                startIcon={<Icon className="hidden sm:flex">delete</Icon>}
              >
                Remove
              </Button>
            )
          // )
        }
        {salaryPaymentId === "new" && (
          //  && hasPermission('PAY_HEAD_TYPE_CREATE')
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
            onClick={handleCreateSalaryPayment}
          >
            Save
          </Button>
        )}
        {handleDelete !== "deleteSalaryPayment" &&
          handleUpdate === "updateSalaryPayment" &&
          salaryPaymentId !== "new" && (
            // hasPermission('PAY_HEAD_TYPE_UPDATE') &&
            <Button
              className="whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              color="secondary"
              variant="contained"
              onClick={handleUpdateSalaryPayment}
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

export default SalaryPaymentHeader;
