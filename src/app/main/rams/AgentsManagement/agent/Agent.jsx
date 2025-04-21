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
import AgentHeader from "./AgentHeader";
import AgentModel from "./models/AgentModel";
import { useGetAgentQuery } from "../AgentsApi";
import AgentForm from "./AgentForm";
import OpeningBalance from "./tabs/OpeningBalance";
import { hasPermission } from "src/app/constant/permission/permissionList";

/**
 * Form Validation Schema
 */
const schema = z.object({
  group: z.number().min(1, { message: "You must enter a group" }),
  first_name: z.string().min(1, { message: "You must enter a first_name" }),
  username: z.string().min(1, { message: "You must enter a username" }),
  date_of_birth: z
    .string()
    .min(1, { message: "You must enter a date_of_birth" }),
});

function Agent() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { agentId } = useParams();

  const {
    data: agent,
    isLoading,
    isError,
  } = useGetAgentQuery(agentId, {
    skip: !agentId || agentId === "new",
  });

  const [tabValue, setTabValue] = useState(0);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const { reset, watch } = methods;

  useEffect(() => {
    if (agentId === "new") {
      reset(AgentModel({}));
    }
  }, [agentId, reset]);

  useEffect(() => {
    if (agent) {
      reset({ ...agent });
    }
  }, [agent, reset, agent?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  if (isError && agentId !== "new") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such agent!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/agent/agent"
          color="inherit"
        >
          Go to Agents Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission("AGENT_DETAILS") && (
        <FusePageCarded
          header={
            <div className="flex flex-col w-full">
              <AgentHeader />
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="secondary"
                textColor="secondary"
                variant="scrollable"
                scrollButtons="auto"
                classes={{ root: "w-full h-64 border-b-1" }}
              >
                <Tab className="h-64" label="Basic Info" />

                {agentId !== "new" && (
                  <Tab className="h-64" label="Opening Balance" />
                )}
              </Tabs>
            </div>
          }
          content={
            <div className="p-16">
              {tabValue === 0 && <AgentForm agentId={agentId} />}

              {tabValue === 1 && agentId !== "new" && <OpeningBalance />}
            </div>
          }
          scroll={isMobile ? "normal" : "content"}
        />
      )}
    </FormProvider>
  );
}

export default Agent;
