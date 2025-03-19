import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetRoleQuery } from "../RolesApi";
import RoleModel from "./models/RoleModel";
import RoleHeader from "./RoleHeader";
import RoleForm from "./RoleForm";
import { hasPermission } from "src/app/constant/permission/permissionList";

/**
 * Form Validation Schema
 */
const schema = z.object({
  name: z
    .string()
    .nonempty("You must enter a role name")
    .min(5, "The role name must be at least 5 characters"),
});

function Role() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { roleId } = routeParams;

  const {
    data: role,
    isLoading,
    isError,
  } = useGetRoleQuery(roleId, {
    skip: !roleId || roleId === "new",
  });
  console.log("roleId", role, roleId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (roleId === "new") {
      reset(RoleModel({}));
    }
  }, [roleId, reset]);

  useEffect(() => {
    if (role) {
      reset({ ...role });
    }
  }, [role, reset, role?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested roles is not exists
   */
  if (isError && roleId !== "new") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such role!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/role/roles"
          color="inherit"
        >
          Go to Roles Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission("ROLE_DETAILS") && (
        <FusePageCarded
          header={<RoleHeader />}
          content={
            <div className="p-16 ">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <RoleForm roleId={roleId} />
              </div>
            </div>
          }
          scroll={isMobile ? "normal" : "content"}
        />
      )}
    </FormProvider>
  );
}

export default Role;
