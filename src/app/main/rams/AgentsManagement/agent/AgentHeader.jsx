import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { showMessage } from "@fuse/core/FuseMessage/store/fuseMessageSlice";
import {
  AddedSuccessfully,
  CustomNotification,
  DeletedSuccessfully,
  UpdatedSuccessfully,
} from "src/app/@customHooks/notificationAlert";
import {
  useCreateAgentMutation,
  useDeleteAgentMutation,
  useUpdateAgentMutation,
} from "../AgentsApi";
import { hasPermission } from "src/app/constant/permission/permissionList";
import { BASE_URL } from "src/app/constant/constants";
import { PictureAsPdf } from "@mui/icons-material";
import DescriptionIcon from "@mui/icons-material/Description";

/**
 * The agent header.
 */
function AgentHeader() {
  const routeParams = useParams();
  const { agentId } = routeParams;
  const [createAgent] = useCreateAgentMutation();
  const [saveAgent] = useUpdateAgentMutation();
  const [removeAgent] = useDeleteAgentMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { first_name, image, featuredImageId } = watch();
  const handleDelete = localStorage.getItem("deleteAgent");
  const handleUpdate = localStorage.getItem("updateAgent");
  const footerColor = localStorage.getItem("color_code");

  // console.log('image', image);

  function handleUpdateAgent() {
    saveAgent(getValues()).then((data) => {
      UpdatedSuccessfully();

      navigate(`/apps/agent/agents`);
    });
  }

  function handleCreateAgent() {
    createAgent(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/agent/agents`);
      });
  }

  function handleRemoveAgent() {
    removeAgent(agentId)
      .unwrap()
      .then(() => {
        DeletedSuccessfully();
        navigate("/apps/agent/agents");
      })
      .catch((error) => {
        CustomNotification("error", error?.response?.data?.detail);
      });
  }

  function handleCancel() {
    navigate(`/apps/agent/agents`);
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
            to="/apps/agent/agents"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Agents</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
            {typeof image === "string" && image.length > 0 ? (
              image.endsWith(".pdf") ? (
                <PictureAsPdf
                  style={{
                    color: "red",
                    cursor: "pointer",
                    display: "block",
                    fontSize: "35px",
                  }}
                  onClick={() => window.open(`${BASE_URL}${image}`)}
                />
              ) : image.endsWith(".doc") || image.endsWith(".docx") ? (
                <DescriptionIcon
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    display: "block",
                    fontSize: "35px",
                  }}
                  onClick={() => window.open(`${BASE_URL}${image}`)}
                />
              ) : (
                <img
                  className="w-32 sm:w-48 rounded"
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "50%",
                  }}
                  src={`${BASE_URL}${image}`}
                  alt={name}
                />
              )
            ) : (
              <img
                className="w-32 sm:w-48 rounded"
                src="/assets/images/logos/user.jpg"
                alt={name}
              />
            )}
          </motion.div>
          <motion.div
            className="flex flex-col min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {first_name || "New Agent"}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Agent Detail
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      >
        {handleDelete === "deleteAgent" &&
          agentId !== "new" &&
          hasPermission("AGENT_DELETE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-red-500 hover:bg-red-800 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
              variant="contained"
              color="secondary"
              onClick={handleRemoveAgent}
            >
              Remove
            </Button>
          )}
        {agentId === "new" && hasPermission("AGENT_CREATE") && (
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
            onClick={handleCreateAgent}
          >
            Save
          </Button>
        )}
        {handleDelete !== "deleteAgent" &&
          handleUpdate === "updateAgent" &&
          agentId !== "new" &&
          hasPermission("AGENT_UPDATE") && (
            <Button
              className="whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
              color="secondary"
              variant="contained"
              onClick={handleUpdateAgent}
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

export default AgentHeader;
