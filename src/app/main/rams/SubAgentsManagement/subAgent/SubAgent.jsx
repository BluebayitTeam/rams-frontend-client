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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SubAgentHeader from "./SubAgentHeader";
import SubAgentModel from "./models/SubAgentModel";
import { useGetSubAgentQuery } from "../SubAgentsApi";
import SubAgentForm from "./SubAgentForm";
import OpeningBalance from "./tabs/OpeningBalance";
import { hasPermission } from "src/app/constant/permission/permissionList";
/**
 * Form Validation Schema
 */
const schema = z.object({
  agents: z.number().min(1, { message: "You must enter a agents" }),
  first_name: z.string().min(1, { message: "You must enter a first_name" }),
  username: z.string().min(1, { message: "You must enter a username" }),
});

function SubAgent() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { subAgentId } = routeParams;

  const {
    data: subAgent,
    isLoading,
    isError,
  } = useGetSubAgentQuery(subAgentId, {
    skip: !subAgentId || subAgentId === "new",
  });
  console.log("subAgentId", subAgent, subAgentId);

  const [tabValue, setTabValue] = useState(0);

  console.log("tabValue", tabValue);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (subAgentId === "new") {
      reset(SubAgentModel({}));
    }
  }, [subAgentId, reset]);

  useEffect(() => {
    if (subAgent) {
      reset({ ...subAgent });
    }
  }, [subAgent, reset, subAgent?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested subAgent is not exists
   */
  if (isError && subAgentId !== "new") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such subAgent!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/subAgent/subAgent"
          color="inherit"
        >
          Go to SubAgents Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission("AGENT_DETAILS") && (
        <FusePageCarded
          classes={{
            toolbar: "p-0",
            header: "min-h-80 h-80",
          }}
          contentToolbar={
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: "w-full h-64" }}
            >
              <Tab className="h-64" label="Basic Info" />
              <Tab className="h-64" label="Opening Balance" />
            </Tabs>
          }
          header={<SubAgentHeader />}
          content={
            <>
              <div className="p-16">
                <div>
                  <SubAgentForm subAgentId={subAgentId} />
                </div>
              </div>
            </>
          }
          scroll={isMobile ? "normal" : "content"}
        />
      )}
    </FormProvider>
  );
}

export default SubAgent;
