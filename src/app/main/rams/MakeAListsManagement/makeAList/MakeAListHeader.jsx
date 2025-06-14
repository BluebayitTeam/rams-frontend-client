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
  useCreateMakeAListMutation,
  useDeleteMakeAListMutation,
  useUpdateMakeAListMutation,
} from "../MakeAListsApi";
import { hasPermission } from "src/app/constant/permission/permissionList";

/**
 * The makeAList header.
 */
function MakeAListHeader() {
  const routeParams = useParams();
  const { makeAListId } = routeParams;
  const [createMakeAList] = useCreateMakeAListMutation();
  const [saveMakeAList] = useUpdateMakeAListMutation();
  const [removeMakeAList] = useDeleteMakeAListMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { title, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem("deleteMakeAList");
  const footerColor = localStorage.getItem("color_code");

  function handleUpdateMakeAList() {
    saveMakeAList(getValues()).then(() => {
      UpdatedSuccessfully();
      navigate(`/apps/makeAList/makeALists`);
    });
  }

  function handleCreateMakeAList() {
    createMakeAList(getValues())
      .unwrap()
      .then(() => {
        AddedSuccessfully();

        navigate(`/apps/makeAList/makeALists`);
      });
  }

  function handleRemoveMakeAList(dispatch) {
    removeMakeAList(makeAListId);
    DeletedSuccessfully();
    navigate("/apps/makeAList/makeALists");
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: "error" })
    );
  }

  function handleCancel() {
    navigate(`/apps/makeAList/makeALists`);
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
            to="/apps/makeAList/makeALists"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">MakeALists</span>
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
                alt={title}
              />
            ) : (
              <img
                className="w-32 sm:w-48 rounded"
                src="assets/images/apps/ecommerce/makeAList-image-placeholder.png"
                alt={title}
              />
            )}
          </motion.div> */}
          <motion.div
            className="flex flex-col min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {title || "New MakeAList"}
            </Typography>
            <Typography variant="caption" className="font-medium">
              MakeAList Detail
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {handleDelete === "Delete" &&
          makeAListId !== "new" &&
          hasPermission("MAKE_LIST_DELETE") && (
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              onClick={handleRemoveMakeAList}
              startIcon={<Icon className="hidden sm:flex">delete</Icon>}
            >
              Remove
            </Button>
          )}
        {makeAListId === "new" && hasPermission("MAKE_LIST_CREATE") && (
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
            onClick={handleCreateMakeAList}
          >
            Save
          </Button>
        )}
        {handleDelete !== "Delete" &&
          makeAListId !== "new" &&
          hasPermission("MAKE_LIST_UPDATE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-[#4dc08e]-500 hover:bg-[#4dc08e]-800 active:bg-[#4dc08e]-700 focus:outline-none focus:ring focus:ring-[#4dc08e]-300"
              color="secondary"
              variant="contained"
              onClick={handleUpdateMakeAList}
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

export default MakeAListHeader;
