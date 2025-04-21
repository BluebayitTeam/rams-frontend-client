import { showMessage } from "@fuse/core/FuseMessage/store/fuseMessageSlice";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
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
  DeletedSuccessfully,
  UpdatedSuccessfully,
} from "src/app/@customHooks/notificationAlert";
import {
  useCreateJobCategoryMutation,
  useDeleteJobCategoryMutation,
  useUpdateJobCategoryMutation,
} from "../JobCategorysApi";

/**
 * The jobCategory header.
 */
function JobCategoryHeader() {
  const routeParams = useParams();

  // console.log('hhhhhhh', routeParams);
  const { jobCategoryId } = routeParams;
  const [createJobCategory] = useCreateJobCategoryMutation();
  const [saveJobCategory] = useUpdateJobCategoryMutation();
  const [removeJobCategory] = useDeleteJobCategoryMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const handleDelete = localStorage.getItem("deleteJobCategory");
  const handleUpdate = localStorage.getItem("updateJobCategory");
  const footerColor = localStorage.getItem("color_code");

  function handleUpdateJobCategory() {
    saveJobCategory(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/jobCategory/jobCategorys`);
    });
  }

  function handleCreateJobCategory() {
    createJobCategory(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/jobCategory/jobCategorys`);
      });
  }

  function handleRemoveJobCategory(dispatch) {
    removeJobCategory(jobCategoryId);
    DeletedSuccessfully();
    navigate("/apps/jobCategory/jobCategorys");
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: "error" })
    );
  }

  function handleCancel() {
    navigate(`/apps/jobCategory/jobCategorys`);
  }

  return (
    <div
      style={{ backgroundColor: footerColor, color: "white" }}
      className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32"
    >
      <div className="flex flex-col items-start space-y-8 sm:space-y-0 w-2/3 sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/jobCategory/jobCategorys"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Job Categorys</span>
          </Typography>
        </motion.div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {handleDelete === "deleteJobCategory" && jobCategoryId !== "new" && (
          <Typography className="mt-6" variant="subtitle2">
            Do you want to remove this Job Category?
          </Typography>
        )}
        {
          handleDelete === "deleteJobCategory" && jobCategoryId !== "new" && (
            // hasPermission('PAY_HEAD_TYPE_DELETE') && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
              variant="contained"
              color="secondary"
              style={{ padding: "0 28px" }}
              onClick={handleRemoveJobCategory}
              startIcon={<Icon className="hidden sm:flex">delete</Icon>}
            >
              Remove
            </Button>
          )
          // )
        }
        {jobCategoryId === "new" && (
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
            onClick={handleCreateJobCategory}
          >
            Save
          </Button>
        )}
        {handleDelete !== "deleteJobCategory" &&
          handleUpdate === "updateJobCategory" &&
          jobCategoryId !== "new" && (
            // hasPermission('PAY_HEAD_TYPE_UPDATE') &&
            <Button
              className="whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              color="secondary"
              variant="contained"
              onClick={handleUpdateJobCategory}
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

export default JobCategoryHeader;
