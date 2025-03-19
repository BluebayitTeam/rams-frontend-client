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
import MenuHeader from "./MenuHeader";
import MenuModel from "./models/MenuModel";
import { useGetMenuQuery } from "../MenusApi";
import MenuForm from "./MenuForm";
import { hasPermission } from "src/app/constant/permission/permissionList";
/**
 * Form Validation Schema
 */
const schema = z.object({
  menu_id: z.string().nonempty("You must enter a menu name"),
  title: z.string().nonempty("You must enter a title"),
  translate: z.string().nonempty("You must enter a translate"),
  type: z.string().min(1, { message: "You must enter a type name" }), // Ensures it's a number & not empty
});

function Menu() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { menuId } = routeParams;

  const {
    data: menu,
    isLoading,
    isError,
  } = useGetMenuQuery(menuId, {
    skip: !menuId || menuId === "new",
  });
  console.log("menuId", menu, menuId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (menuId === "new") {
      reset(MenuModel({}));
    }
  }, [menuId, reset]);

  useEffect(() => {
    if (menu) {
      reset({ ...menu });
    }
  }, [menu, reset, menu?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested menus is not exists
   */
  if (isError && menuId !== "new") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such menu!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/menu/menus"
          color="inherit"
        >
          Go to Menus Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission("MENU_ITEM_DETAILS") && (
        <FusePageCarded
          header={<MenuHeader />}
          content={
            <div className="p-16 ">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <MenuForm menuId={menuId} />
              </div>
            </div>
          }
          scroll={isMobile ? "normal" : "content"}
        />
      )}
    </FormProvider>
  );
}

export default Menu;
