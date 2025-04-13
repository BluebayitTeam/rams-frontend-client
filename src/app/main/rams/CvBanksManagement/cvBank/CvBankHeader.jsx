import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Icon } from "@mui/material";
import { showMessage } from "@fuse/core/FuseMessage/store/fuseMessageSlice";
import {
  AddedSuccessfully,
  DeletedSuccessfully,
  UpdatedSuccessfully,
} from "src/app/@customHooks/notificationAlert";
import _ from "lodash";
import {
  useCreateCvBankMutation,
  useDeleteCvBankMutation,
  useUpdateCvBankMutation,
} from "../CvBanksApi";
import { hasPermission } from "src/app/constant/permission/permissionList";
import { useGetSiteSettingsQuery } from "../../SiteSettingsManagement/SiteSettingsApi";

/**
 * The cvBank header.
 */
function CvBankHeader() {
  const routeParams = useParams();
  const { cvBankId } = routeParams;
  const { data } = useGetSiteSettingsQuery({});

  const footerColor = data?.general_settings[0]?.color_code;
  const [createCvBank] = useCreateCvBankMutation();
  const [saveCvBank] = useUpdateCvBankMutation();
  const [removeCvBank] = useDeleteCvBankMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, image, featuredImageId } = watch();
  const handleDelete = localStorage.getItem("deleteCvBank");
  const handleUpdate = localStorage.getItem("updateCvBank");

  // console.log('image', image);

  function handleUpdateCvBank() {
    saveCvBank(getValues()).then((data) => {
      UpdatedSuccessfully();

      navigate(`/apps/cvBank/cvBanks`);
    });
  }

  function handleCreateCvBank() {
    createCvBank(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/cvBank/cvBanks`);
      });
  }

  function handleRemoveCvBank(dispatch) {
    removeCvBank(cvBankId);
    DeletedSuccessfully();
    navigate("/apps/cvBank/cvBanks");
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: "error" })
    );
  }

  function handleCancel() {
    navigate(`/apps/cvBank/cvBanks`);
  }

  return (
    <div
      style={{ backgroundColor: footerColor, color: "white" }}
      className="flex flex-col sm:flex-row bg-footerColor flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32"
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
            to="/apps/cvBank/cvBanks"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Bank CV</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="flex flex-col min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {name || "Create New Bank CV"}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Bank CV Detail
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      >
        {handleDelete === "deleteCvBank" &&
          cvBankId !== "new" &&
          hasPermission("CVBANK_DELETE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
              variant="contained"
              color="secondary"
              onClick={handleRemoveCvBank}
              startIcon={<Icon className="hidden sm:flex">delete</Icon>}
              // style={{ backgroundColor: '#ea5b78', color: 'white' }}
            >
              Remove
            </Button>
          )}
        {cvBankId === "new" && hasPermission("CVBANK_CREATE") && (
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            disabled={_.isEmpty(dirtyFields) || !isValid}
            color={!_.isEmpty(dirtyFields) && isValid ? "secondary" : "inherit"}
            onClick={handleCreateCvBank}
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
          >
            Save
          </Button>
        )}

        {handleDelete !== "deleteCvBank" &&
          handleUpdate === "updateCvBank" &&
          cvBankId !== "new" &&
          hasPermission("CVBANK_UPDATE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              color="secondary"
              variant="contained"
              // style={{ backgroundColor: '#4dc08e', color: 'white' }}
              onClick={handleUpdateCvBank}
            >
              Update
            </Button>
          )}
        <Button
          className="whitespace-nowrap mx-4 text-white bg-orange-500 hover:bg-orange-800 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300"
          variant="contained"
          // style={{ backgroundColor: '#FFAA4C', color: 'white' }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </motion.div>
    </div>
  );
}

export default CvBankHeader;
