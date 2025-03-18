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
  useCreateMenuMutation,
  useDeleteMenuMutation,
  useUpdateMenuMutation,
} from "../MenusApi";
import { hasPermission } from "src/app/constant/permission/permissionList";

/**
 * The menu header.
 */
function MenuHeader() {
  const routeParams = useParams();
  const { menuId } = routeParams;
  const [createMenu] = useCreateMenuMutation();
  const [saveMenu] = useUpdateMenuMutation();
  const [removeMenu] = useDeleteMenuMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { menu_id, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem("deleteMenu");
  const handleUpdate = localStorage.getItem("updateMenu");

  function handleUpdateMenu() {
    saveMenu(getValues()).then((data) => {
      UpdatedSuccessfully();

      navigate(`/apps/menu/menus`);
    });
  }

  function handleCreateMenu() {
    createMenu(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/menu/menus`);
      });
  }

  function handleRemoveMenu(dispatch) {
    removeMenu(menuId);
    DeletedSuccessfully();
    navigate("/apps/menu/menus");
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: "error" })
    );
  }

  function handleCancel() {
    navigate(`/apps/menu/menus`);
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
            to="/apps/menu/menus"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Menus</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="flex flex-col min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {menu_id || "New Menu"}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Menu Detail
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {handleDelete === "deleteMenu" && menuId !== "new" && (
          <Typography className="mt-6" variant="subtitle2">
            Do you want to remove this menu?
          </Typography>
        )}
        {handleDelete === "deleteMenu" &&
          menuId !== "new" &&
          hasPermission("MENU_ITEM_DELETE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
              variant="contained"
              color="secondary"
              onClick={handleRemoveMenu}
              startIcon={<Icon className="hidden sm:flex">delete</Icon>}
            >
              Remove
            </Button>
          )}
        {menuId === "new" && hasPermission("MENU_ITEM_CREATE") && (
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateMenu}
          >
            Save
          </Button>
        )}
        {handleDelete !== "deleteMenu" &&
          handleUpdate === "updateMenu" &&
          menuId !== "new" &&
          hasPermission("MENU_ITEM_UPDATE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              color="secondary"
              variant="contained"
              onClick={handleUpdateMenu}
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

export default MenuHeader;
