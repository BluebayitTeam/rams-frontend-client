import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@mui/material";
import { showMessage } from "@fuse/core/FuseMessage/store/fuseMessageSlice";
import {
  AddedSuccessfully,
  DeletedSuccessfully,
  UpdatedSuccessfully,
} from "src/app/@customHooks/notificationAlert";
import {
  useCreateTodotasktypeMutation,
  useDeleteTodotasktypeMutation,
  useUpdateTodotasktypeMutation,
} from "../TodotasktypesApi";
import { hasPermission } from "src/app/constant/permission/permissionList";
import _ from "lodash";

/**
 * The todotasktype header.
 */
function TodotasktypeHeader() {
  const routeParams = useParams();
  const { todotasktypeId } = routeParams;
  const [createTodotasktype] = useCreateTodotasktypeMutation();
  const [saveTodotasktype] = useUpdateTodotasktypeMutation();
  const [removeTodotasktype] = useDeleteTodotasktypeMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem("deleteTodotasktype");
  const handleUpdate = localStorage.getItem("updateTodotasktype");
  const footerColor = localStorage.getItem("color_code");

  function handleUpdateTodotasktype() {
    saveTodotasktype(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/todotasktype/todotasktypes`);
    });
  }

  function handleCreateTodotasktype() {
    createTodotasktype(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/todotasktype/todotasktypes`);
      });
  }

  function handleRemoveTodotasktype(dispatch) {
    removeTodotasktype(todotasktypeId);
    DeletedSuccessfully();
    navigate("/apps/todotasktype/todotasktypes");
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: "error" })
    );
  }

  function handleCancel() {
    navigate(`/apps/todotasktype/todotasktypes`);
  }

  return (
    <div
      style={{ backgroundColor: footerColor, color: "white" }}
      className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32"
    >
      <div className="flex flex-col items-start max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/todotasktype/todotasktypes"
            color="inherit"
          >
            <Icon className="text-20">
              {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
            </Icon>
            <span className="hidden sm:flex mx-4 font-medium">
              To Do Task Type
            </span>
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
                {name || "Create New To-Do Task Type"}
              </Typography>
              <Typography variant="caption" className="font-medium">
                To Do Task Type Detail
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
        {handleDelete === "deleteTodotasktype" &&
          todotasktypeId !== "new" &&
          hasPermission("TODO_TASK_TYPE_DELETE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
              variant="contained"
              color="secondary"
              onClick={handleRemoveTodotasktype}
              style={{ padding: "0 28px" }}
              startIcon={<Icon className="hidden sm:flex">delete</Icon>}
            >
              Remove
            </Button>
          )}
        {todotasktypeId === "new" && hasPermission("TODO_TASK_TYPE_CREATE") && (
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
            onClick={handleCreateTodotasktype}
          >
            Save
          </Button>
        )}
        {handleDelete !== "deleteTodotasktype" &&
          handleUpdate === "updateTodotasktype" &&
          todotasktypeId !== "new" &&
          hasPermission("TODO_TASK_TYPE_UPDATE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              color="secondary"
              variant="contained"
              onClick={handleUpdateTodotasktype}
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

export default TodotasktypeHeader;
