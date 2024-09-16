import FusePageCarded from "@fuse/core/FusePageCarded";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dayjs from "dayjs";

import BmetV2ApplicationHeader from "./BmetV2ApplicationHeader";
import BmetV2ApplicationModel from "./models/BmetV2ApplicationModel";
import { useGetBmetV2ApplicationsQuery } from "../BmetV2ApplicationsApi";
import BmetV2ApplicationForm from "./BmetV2ApplicationForm";
import BmetV2Applications from "../bmetV2Applications/BmetV2Applications";

const schema = z.object({
  agency: z
    .string()
    .nonempty("Agency is required")
    .or(z.number().min(1, "Agency is required")),

  gender: z.string().nonempty("Gender is required"), // Updated with nonempty

  man_power_date: z
    .string()
    .nonempty("Date is required") // Apply nonempty check first
    .refine((value) => dayjs(value, "YYYY-MM-DD", true).isValid(), {
      message: "Invalid date format",
    }),
});

function BmetV2Application() {
  const emptyValue = {
    man_power_date: "",
    agency: "",
  };

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [selectedDate, setSelectedDate] = useState(null);
  const [formKey, setFormKey] = useState(0);

  const methods = useForm({
    mode: "onChange",
    defaultValues: emptyValue,
    resolver: zodResolver(schema),
  });
  const { reset, watch, handleSubmit } = methods;

  const handleReset = (defaultValues) => {
    reset(defaultValues);
    setFormKey((prevKey) => prevKey + 1);
  };

  const bmetV2ApplicationDate = watch("man_power_date");

  const { data } = useGetBmetV2ApplicationsQuery({
    bmetV2ApplicationDate: selectedDate,
  });
  const bmetV2ApplicationId =
    data && data.length > 0 ? data[0].man_power_list.id : null;

  const onSubmit = (formData) => {
    setSelectedDate(formData.man_power_date);
  };

  useEffect(() => {
    if (bmetV2ApplicationId === "new") {
      reset(BmetV2ApplicationModel({}));
    }
  }, [bmetV2ApplicationId, reset]);

  return (
    <FormProvider {...methods} key={formKey}>
      <FusePageCarded
        header={<BmetV2ApplicationHeader />}
        content={
          <div className="p-16 ">
            <BmetV2ApplicationForm
              bmetV2ApplicationId={bmetV2ApplicationId}
              handleSearchManPowerDateClick={handleSubmit(onSubmit)}
            />
            <br />
            <BmetV2Applications
              data={data}
              handleReset={handleReset}
              emptyValue={emptyValue}
              selectedDate={selectedDate}
              bmetV2ApplicationDate={bmetV2ApplicationDate}
            />
          </div>
        }
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}

export default BmetV2Application;
