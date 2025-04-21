import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Icon } from "@mui/material";
import { showMessage } from "@fuse/core/FuseMessage/store/fuseMessageSlice";
import {
  AddedSuccessfully,
  DeletedSuccessfully,
  UpdatedSuccessfully,
} from "src/app/@customHooks/notificationAlert";
import {
  useCreateRecruitingAgencyMutation,
  useDeleteRecruitingAgencyMutation,
  useUpdateRecruitingAgencyMutation,
} from "../RecruitingAgencysApi";
import { hasPermission } from "src/app/constant/permission/permissionList";

/**
 * The recruitingAgency header.
 */
function RecruitingAgencyHeader() {
  const routeParams = useParams();
  const { recruitingAgencyId } = routeParams;
  const footerColor = localStorage.getItem("color_code");

  const [createRecruitingAgency] = useCreateRecruitingAgencyMutation();
  const [saveRecruitingAgency] = useUpdateRecruitingAgencyMutation();
  const [removeRecruitingAgency] = useDeleteRecruitingAgencyMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem("deleteRecruitingAgency");
  const handleUpdate = localStorage.getItem("updateRecruitingAgency");

  function handleUpdateRecruitingAgency() {
    saveRecruitingAgency(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/recruitingAgency/recruitingAgencys`);
    });
  }

  function handleCreateRecruitingAgency() {
    createRecruitingAgency(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/recruitingAgency/recruitingAgencys`);
      });
  }

  function handleRemoveRecruitingAgency(dispatch) {
    removeRecruitingAgency(recruitingAgencyId);
    DeletedSuccessfully();
    navigate("/apps/recruitingAgency/recruitingAgencys");
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: "error" })
    );
  }

  function handleCancel() {
    navigate(`/apps/recruitingAgency/recruitingAgencys`);
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
            to="/apps/recruitingAgency/recruitingAgencys"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Recruiting Agencys</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="flex flex-col min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {name || "New RecruitingAgency"}
            </Typography>
            <Typography variant="caption" className="font-medium">
              RecruitingAgency Detail
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {handleDelete === "deleteRecruitingAgency" &&
          recruitingAgencyId !== "new" && (
            <Typography className="mt-6" variant="subtitle2">
              Do you want to remove this recruitingAgency?
            </Typography>
          )}
        {handleDelete === "deleteRecruitingAgency" &&
          recruitingAgencyId !== "new" &&
          hasPermission("RECRUITING_AGENCY_DELETE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
              variant="contained"
              color="secondary"
              onClick={handleRemoveRecruitingAgency}
              style={{ padding: "0 28px" }}
              startIcon={<Icon className="hidden sm:flex">delete</Icon>}
            >
              Remove
            </Button>
          )}
        {recruitingAgencyId === "new" &&
          hasPermission("RECRUITING_AGENCY_CREATE") && (
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              color={
                !_.isEmpty(dirtyFields) && isValid ? "secondary" : "inherit"
              }
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
              onClick={handleCreateRecruitingAgency}
            >
              Save
            </Button>
          )}
        {handleDelete !== "deleteRecruitingAgency" &&
          handleUpdate === "updateRecruitingAgency" &&
          recruitingAgencyId !== "new" &&
          hasPermission("RECRUITING_AGENCY_UPDATE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              color="secondary"
              variant="contained"
              onClick={handleUpdateRecruitingAgency}
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

export default RecruitingAgencyHeader;
