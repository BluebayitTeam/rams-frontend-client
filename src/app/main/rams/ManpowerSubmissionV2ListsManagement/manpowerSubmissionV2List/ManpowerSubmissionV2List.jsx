import FusePageCarded from "@fuse/core/FusePageCarded";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AddedSuccessfully,
  CustomNotification,
} from "src/app/@customHooks/notificationAlert";
import ManpowerSubmissionV2ListHeader from "./ManpowerSubmissionV2ListHeader";
import ManpowerSubmissionV2ListModel from "./models/ManpowerSubmissionV2List.Model";
import {
  useCreateManpowerSubmissionV2ListMutation,
  useGetManpowerSubmissionV2ListsQuery,
} from "../ManpowerSubmissionV2ListsApi";
import ManpowerSubmissionV2ListForm from "./ManpowerSubmissionV2ListForm";
import ManpowerSubmissionV2Lists from "../manpowerSubmissionV2Lists/ManpowerSubmissionV2Lists";

const schema = z.object({});

function ManpowerSubmissionV2List() {
  const emptyValue = {
    agency: "",
    passenger: "",

    country: "",
    man_power_date: "",
  };

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [tableShow, setTableShow] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formKey, setFormKey] = useState(0);
  const [hideTabile, setHideTabile] = useState(false);

  const methods = useForm({
    mode: "onChange",
    defaultValues: emptyValue,
    resolver: zodResolver(schema),
  });
  const { reset, watch, getValues } = methods;

  const handleReset = (defaultValues) => {
    reset(defaultValues);

    setFormKey((prevKey) => prevKey + 1);
  };

  const passenger = watch("passenger");
  const manPowerDate = watch("man_power_date");

  const navigate = useNavigate();

  const { data, refetch } = useGetManpowerSubmissionV2ListsQuery({
    passenger: selectedPassenger,
    manPowerDate: selectedDate,
  });
  const manpowerSubmissionV2ListId =
    data && data.length > 0 ? data[0].man_power_list.id : null;

  function handleSearchPassengerClick() {
    setSelectedPassenger(passenger);
    setSelectedDate("");
    setHideTabile(false);

    // setTableShow(true);
  }

  const [createManpowerSubmissionV2List] =
    useCreateManpowerSubmissionV2ListMutation();

  function handleCreateManpowerSubmissionV2List() {
    createManpowerSubmissionV2List(getValues())
      .unwrap()
      .then((data) => {
        if (data) {
          AddedSuccessfully();
          setSelectedPassenger(passenger);
          setSelectedDate(manPowerDate);

          navigate(
            `/apps/manpowerSubmissionV2List/manpowerSubmissionV2Lists/new`
          );
        }
      })
      .catch((error) => {
        CustomNotification("error", `${error.response.data.passenger}`);
      });
  }

  function handleCancel() {
    handleReset({
      ...emptyValue,
    });
    setHideTabile(true);
  }

  function handleSearchManPowerDateClick() {
    setSelectedPassenger("");
    setSelectedDate(manPowerDate);
    // setTableShow(true);
    setHideTabile(false);
  }

  useEffect(() => {
    if (manpowerSubmissionV2ListId === "new") {
      reset(ManpowerSubmissionV2ListModel({}));
    }
  }, [manpowerSubmissionV2ListId, reset]);

  return (
    <FormProvider {...methods} key={formKey}>
      <FusePageCarded
        header={<ManpowerSubmissionV2ListHeader />}
        content={
          <div className="p-16 ">
            <ManpowerSubmissionV2ListForm
              manpowerSubmissionV2ListId={manpowerSubmissionV2ListId}
              handleSearchPassengerClick={handleSearchPassengerClick}
              handleSearchManPowerDateClick={handleSearchManPowerDateClick}
              handleCreateManpowerSubmissionV2List={
                handleCreateManpowerSubmissionV2List
              }
              handleCancel={handleCancel}
            />
            <br />

            <ManpowerSubmissionV2Lists
              data={data}
              tableShow={tableShow}
              manpowerSubmissionV2ListId={manpowerSubmissionV2ListId}
              handleReset={handleReset}
              emptyValue={emptyValue}
              hideTabile={hideTabile}
              refetch={refetch}
              selectedDate={selectedDate}
              selectedPassenger={selectedPassenger}
              passenger={passenger}
              manPowerDate={manPowerDate}
            />
          </div>
        }
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}

export default ManpowerSubmissionV2List;
