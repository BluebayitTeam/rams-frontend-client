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
  useCreateGdsMutation,
  useDeleteGdsMutation,
  useUpdateGdsMutation,
} from "../GdssApi";
import _ from "lodash";

/**
 * The gds header.
 */
function GdsHeader() {
  const dispatch = useDispatch();

  const routeParams = useParams();
  const { gdsId } = routeParams;
  const [createGds] = useCreateGdsMutation();
  const [saveGds] = useUpdateGdsMutation();
  const [removeGds] = useDeleteGdsMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const handleDelete = localStorage.getItem("deleteGds");
  const handleUpdate = localStorage.getItem("updateGds");

  function handleUpdateGds() {
    saveGds(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/gds/gdss`);
    });
  }

  function handleCreateGds() {
    createGds(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/gds/gdss`);
      });
  }

  function handleRemoveGds() {
    removeGds(gdsId)
      .unwrap()
      .then((data) => {
        if (data) {
          DeletedSuccessfully();
        }

        navigate("/apps/gds/gdss");
      })
      .catch((error) => {
        CustomNotification("error", `${error.response.data.detail}`);
      });
  }

  function handleCancel() {
    navigate(`/apps/gds/gdss`);
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
      <div className="flex flex-col items-start max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opagds: 0 }}
          animate={{ x: 0, opagds: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/gds-management/gdss"
            color="inherit"
          >
            <Icon className="text-20">
              {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
            </Icon>
            <span className="hidden sm:flex mx-4 font-medium">Gdss</span>
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
                Gds Detail
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
        {handleDelete === "deleteGds" && gdsId !== "new" && (
          <Typography className="mt-6" variant="subtitle2">
            Do you want to remove this gds?
          </Typography>
        )}
        {handleDelete === "deleteGds" && gdsId !== "new" && (
          <Button
            className="whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
            variant="contained"
            color="secondary"
            onClick={handleRemoveGds}
            startIcon={<Icon className="hidden sm:flex">delete</Icon>}
          >
            Remove
          </Button>
        )}
        {gdsId === "new" && (
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateGds}
          >
            Save
          </Button>
        )}
        {handleDelete !== "deleteGds" &&
          handleUpdate === "updateGds" &&
          gdsId !== "new" && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              color="secondary"
              variant="contained"
              onClick={handleUpdateGds}
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

export default GdsHeader;
