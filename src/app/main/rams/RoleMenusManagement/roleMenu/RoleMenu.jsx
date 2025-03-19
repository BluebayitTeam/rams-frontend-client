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
import RoleMenuHeader from "./RoleMenuHeader";
import RoleMenuModel from "./models/RoleMenuModel";
import { useGetRoleMenuQuery } from "../RoleMenusApi";
import RoleMenuForm from "./RoleMenuForm";
import { hasPermission } from "src/app/constant/permission/permissionList";
/**
 * Form Validation Schema
 */
const schema = z.object({
  //   role: z
  //     .number()
  //     .nonempty("You must enter a roleMenu name")
  //     .min(5, "The roleMenu name must be at least 5 characters"),
});

function RoleMenu() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { roleMenuId } = routeParams;

  const {
    data: roleMenu,
    isLoading,
    isError,
  } = useGetRoleMenuQuery(roleMenuId, {
    skip: !roleMenuId || roleMenuId === "new",
  });
  console.log("roleMenuId", roleMenu, roleMenuId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (roleMenuId === "new") {
      reset(RoleMenuModel({}));
    }
  }, [roleMenuId, reset]);

  useEffect(() => {
    if (roleMenu) {
      reset({ ...roleMenu });
    }
  }, [roleMenu, reset, roleMenu?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested roleMenus is not exists
   */
  if (isError && roleMenuId !== "new") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such roleMenu!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/roleMenu/roleMenus"
          color="inherit"
        >
          Go to RoleMenus Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission("ROLE_MENU_DETAILS") && (
        <FusePageCarded
          header={<RoleMenuHeader />}
          content={
            <div className="p-16 ">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <RoleMenuForm roleMenuId={roleMenuId} />
              </div>
            </div>
          }
          scroll={isMobile ? "normal" : "content"}
        />
      )}
    </FormProvider>
  );
}

export default RoleMenu;
