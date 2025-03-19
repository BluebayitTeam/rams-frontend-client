import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { UpdatedSuccessfully } from "src/app/@customHooks/notificationAlert";
import { useUpdateUserMutation } from "../UsersApi";
import { BASE_URL } from "src/app/constant/constants";

/**
 * The user header.
 */
function UserHeader() {
  const routeParams = useParams();
  const { userId } = routeParams;
  const [saveUser] = useUpdateUserMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;

  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();

  console.log("fdhfdklsfhkldsh", getValues());
  const handleUpdate = localStorage.getItem("updateUser");

  function handleUpdateUser() {
    UpdatedSuccessfully();

    saveUser({ ...getValues(), id: userId });
    navigate(`/apps/user/users`);
  }

  function handleCancel() {
    navigate(`/apps/user/users`);
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
      <div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
        <motiodiv
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/user/users"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Users</span>
          </Typography>
        </motiodiv>

        <div className="flex items-center max-w-full">
          {/* <motiodiv
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
            {image ? (
              image.toLowerCase().endsWith(".pdf") ? (
                <PictureAsPdf
                  style={{
                    color: "red",
                    cursor: "pointer",
                    display: "block",
                    fontSize: "35px",
                  }}
                  onClick={() => window.open(`${BASE_URL}${n[key]}`)}
                />
              ) : (
                <img
                  className="h-full block rounded"
                  style={{ borderRadius: "30px" }}
                  width="40px"
                  height="40px"
                  src={`${BASE_URL}${image}`}
                />
              )
            ) : (
              <img
                className="h-full block rounded"
                style={{ borderRadius: "30px" }}
                width="40px"
                height="40px"
                src="/assets/images/logos/user.jpg"
              />
            )}
          </motiodiv> */}
          <motiodiv
            className="flex flex-col min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {name || "Update Password"}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Password
            </Typography>
          </motiodiv>
        </div>
      </div>

      <motiodiv
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        <Button
          className="whitespace-nowrap mx-4 text-white bg-green-500 hover:bg-green-800 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
          color="secondary"
          variant="contained"
          onClick={handleUpdateUser}
        >
          Update
        </Button>

        <Button
          className="whitespace-nowrap mx-4 text-white bg-orange-500 hover:bg-orange-800 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300"
          variant="contained"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </motiodiv>
    </div>
  );
}

export default UserHeader;
