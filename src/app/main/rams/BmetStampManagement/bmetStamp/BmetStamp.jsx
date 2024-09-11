import FusePageCarded from "@fuse/core/FusePageCarded";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BmetStampHeader from "./BmetStampHeader";
import BmetStampModel from "./models/BmetStampModel";
import { useGetBmetStampsQuery } from "../BmetStampsApi";
import BmetStampForm from "./BmetStampForm";
import BmetStamps from "../bmetStamps/BmetStamps";

const schema = z.object({});

function BmetStamp() {
  const emptyValue = {
    man_power_date: "",
  };

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [selectedDate, setSelectedDate] = useState(null);
  const [formKey, setFormKey] = useState(0);

  const methods = useForm({
    mode: "onChange",
    defaultValues: emptyValue,
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;

  const handleReset = (defaultValues) => {
    reset(defaultValues);

    setFormKey((prevKey) => prevKey + 1);
  };

  const manPowerDate = watch("man_power_date");

  const { data } = useGetBmetStampsQuery({
    manPowerDate: selectedDate,
  });
  const bmetStampId =
    data && data.length > 0 ? data[0].man_power_list.id : null;

  function handleSearchManPowerDateClick() {
    setSelectedDate(manPowerDate);
  }

  useEffect(() => {
    if (bmetStampId === "new") {
      reset(BmetStampModel({}));
    }
  }, [bmetStampId, reset]);

  return (
    <FormProvider {...methods} key={formKey}>
      <FusePageCarded
        header={<BmetStampHeader />}
        content={
          <div className="p-16 ">
            <BmetStampForm
              bmetStampId={bmetStampId}
              handleSearchManPowerDateClick={handleSearchManPowerDateClick}
            />
            <br />

            <BmetStamps
              data={data}
              handleReset={handleReset}
              emptyValue={emptyValue}
              selectedDate={selectedDate}
              manPowerDate={manPowerDate}
            />
          </div>
        }
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}

export default BmetStamp;
