import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@mui/material";
import {
  AddedSuccessfully,
  CustomNotification,
  DeletedSuccessfully,
  UpdatedSuccessfully,
} from "src/app/@customHooks/notificationAlert";
import { useDispatch } from "react-redux";
import {
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useUpdateRoleMutation,
} from "../RolesApi";
import { hasPermission } from "src/app/constant/permission/permissionList";
import _ from "lodash";

/**
 * The role header.
 */
function RoleHeader() {
  const dispatch = useDispatch();
  const footerColor = localStorage.getItem("color_code");

  const routeParams = useParams();
  const { roleId } = routeParams;
  const [createRole] = useCreateRoleMutation();
  const [saveRole] = useUpdateRoleMutation();
  const [removeRole] = useDeleteRoleMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem("deleteRole");
  const handleUpdate = localStorage.getItem("updateRole");

  function handleUpdateRole() {
    saveRole(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/role/roles`);
    });
  }

  function handleCreateRole() {
    createRole(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/role/roles`);
      });
  }

  function handleRemoveRole() {
    removeRole(roleId)
      .unwrap()
      .then((data) => {
        if (data) {
          DeletedSuccessfully();
        }

        navigate("/apps/role/roles");
      })
      .catch((error) => {
        CustomNotification("error", `${error.response.data.detail}`);
      });
  }

  function handleCancel() {
    navigate(`/apps/role/roles`);
  }

  return (
    <div
      style={{ backgroundColor: footerColor, color: "white" }}
      className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32"
    >
      <div className="flex flex-col items-start max-w-full w-2/3 min-w-0">
        <motion.div
          initial={{ x: 20, oparole: 0 }}
          animate={{ x: 0, oparole: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/role-management/roles"
            color="inherit"
          >
            <Icon className="text-20">
              {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
            </Icon>
            <span className="hidden sm:flex mx-4 font-medium">Roles</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          />
          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.3 } }}
            >
              <Typography className="text-16 sm:text-20 truncate font-semibold">
                {name || "Create New"}
              </Typography>
              <Typography variant="caption" className="font-medium">
                Role Detail
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
        {handleDelete === "deleteRole" && roleId !== "new" && (
          <Typography className="mt-6" variant="subtitle2">
            Do you want to remove this role?
          </Typography>
        )}
        {handleDelete === "deleteRole" &&
          roleId !== "new" &&
          hasPermission("ROLE_DELETE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
              variant="contained"
              color="secondary"
              onClick={handleRemoveRole}
              startIcon={<Icon className="hidden sm:flex">delete</Icon>}
            >
              Remove
            </Button>
          )}
        {roleId === "new" && hasPermission("ROLE_CREATE") && (
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
            onClick={handleCreateRole}
          >
            Save
          </Button>
        )}
        {handleDelete !== "deleteRole" &&
          handleUpdate === "updateRole" &&
          roleId !== "new" &&
          hasPermission("ROLE_UPDATE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              color="secondary"
              variant="contained"
              onClick={handleUpdateRole}
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

export default RoleHeader;
