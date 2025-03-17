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
  useCreateSiteSettingMutation,
  useDeleteSiteSettingMutation,
  useUpdateSiteSettingMutation,
} from "../SiteSettingsApi";

/**
 * The siteSetting header.
 */
function SiteSettingHeader() {
  const routeParams = useParams();
  const { siteSettingId } = routeParams;
  const [createSiteSetting] = useCreateSiteSettingMutation();
  const [saveSiteSetting] = useUpdateSiteSettingMutation();
  const [removeSiteSetting] = useDeleteSiteSettingMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem("deleteSiteSetting");
  const handleUpdate = localStorage.getItem("updateSiteSetting");

  function handleUpdateSiteSetting() {
    saveSiteSetting(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/siteSetting/siteSettings`);
    });
  }

  function handleCreateSiteSetting() {
    createSiteSetting(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/siteSetting/siteSettings`);
      });
  }

  function handleRemoveSiteSetting(dispatch) {
    removeSiteSetting(siteSettingId);
    DeletedSuccessfully();
    navigate("/apps/siteSetting/siteSettings");
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: "error" })
    );
  }

  function handleCancel() {
    navigate(`/apps/siteSetting/siteSettings`);
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
      <div className="flex flex-col items-start space-y-8 sm:space-y-0 w-2/3 sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/siteSetting/siteSettings"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">SiteSettings</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="flex flex-col min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {name || "New SiteSetting"}
            </Typography>
            <Typography variant="caption" className="font-medium">
              SiteSetting Detail
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {handleDelete === "deleteSiteSetting" && siteSettingId !== "new" && (
          <Typography className="mt-6" variant="subtitle2">
            Do you want to remove this siteSetting?
          </Typography>
        )}
        {handleDelete === "deleteSiteSetting" && siteSettingId !== "new" && (
          <Button
            className="whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
            variant="contained"
            color="secondary"
            style={{ padding: "0 28px" }}
            onClick={handleRemoveSiteSetting}
            startIcon={<Icon className="hidden sm:flex">delete</Icon>}
          >
            Remove
          </Button>
        )}
        {siteSettingId === "new" && (
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateSiteSetting}
          >
            Save
          </Button>
        )}
        {handleDelete !== "deleteSiteSetting" &&
          handleUpdate === "updateSiteSetting" &&
          siteSettingId !== "new" && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              color="secondary"
              variant="contained"
              onClick={handleUpdateSiteSetting}
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

export default SiteSettingHeader;
