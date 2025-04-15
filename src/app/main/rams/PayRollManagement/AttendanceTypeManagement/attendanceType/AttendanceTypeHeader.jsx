import { showMessage } from "@fuse/core/FuseMessage/store/fuseMessageSlice";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Icon } from "@mui/material";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import _ from "lodash";
import { useFormContext } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AddedSuccessfully,
  DeletedSuccessfully,
  UpdatedSuccessfully,
} from "src/app/@customHooks/notificationAlert";
import {
  useCreateAttendanceTypeMutation,
  useDeleteAttendanceTypeMutation,
  useUpdateAttendanceTypeMutation,
} from "../AttendanceTypesApi";

/**
 * The attendanceType header.
 */
function AttendanceTypeHeader() {
  const routeParams = useParams();

  const footerColor = localStorage.getItem("color_code");
  const { attendanceTypeId } = routeParams;
  const [createAttendanceType] = useCreateAttendanceTypeMutation();
  const [saveAttendanceType] = useUpdateAttendanceTypeMutation();
  const [removeAttendanceType] = useDeleteAttendanceTypeMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();

  const handleDelete = localStorage.getItem("deleteAttendanceType");
  const handleUpdate = localStorage.getItem("updateAttendanceType");

  function handleUpdateAttendanceType() {
    saveAttendanceType(getValues()).then((data) => {
      UpdatedSuccessfully();
      navigate(`/apps/attendanceType/attendanceTypes`);
    });
  }

  function handleCreateAttendanceType() {
    createAttendanceType(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/attendanceType/attendanceTypes`);
      });
  }

  function handleRemoveAttendanceType(dispatch) {
    removeAttendanceType(attendanceTypeId);
    DeletedSuccessfully();
    navigate("/apps/attendanceType/attendanceTypes");
    dispatch(
      showMessage({ message: `Please Restart The Backend`, variant: "error" })
    );
  }

  function handleCancel() {
    navigate(`/apps/attendanceType/attendanceTypes`);
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
            to="/apps/attendanceType/attendanceTypes"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">AttendanceTypes</span>
          </Typography>
        </motion.div>
      </div>

      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {handleDelete === "deleteAttendanceType" &&
          attendanceTypeId !== "new" && (
            <Typography className="mt-6" variant="subtitle2">
              Do you want to remove this Attendance Type?
            </Typography>
          )}
        {
          handleDelete === "deleteAttendanceType" &&
            attendanceTypeId !== "new" && (
              // hasPermission('PAY_HEAD_TYPE_DELETE') && (
              <Button
                className="whitespace-nowrap mx-4"
                variant="contained"
                color="secondary"
                onClick={handleRemoveAttendanceType}
                startIcon={<Icon className="hidden sm:flex">delete</Icon>}
                style={{
                  backgroundColor: "#ea5b78",
                  color: "white",
                  padding: "0 28px",
                }}
              >
                Remove
              </Button>
            )
          // )
        }
        {attendanceTypeId === "new" && (
          //  && hasPermission('PAY_HEAD_TYPE_CREATE')
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
            onClick={handleCreateAttendanceType}
          >
            Save
          </Button>
        )}
        {handleDelete !== "deleteAttendanceType" &&
          handleUpdate === "updateAttendanceType" &&
          attendanceTypeId !== "new" && (
            // hasPermission('PAY_HEAD_TYPE_UPDATE') &&
            <Button
              className="whitespace-nowrap mx-4"
              color="secondary"
              variant="contained"
              style={{ backgroundColor: "#4dc08e", color: "white" }}
              onClick={handleUpdateAttendanceType}
            >
              Update
            </Button>
          )}
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          style={{ backgroundColor: "#FFAA4C", color: "white" }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </motion.div>
    </div>
  );
}

export default AttendanceTypeHeader;
