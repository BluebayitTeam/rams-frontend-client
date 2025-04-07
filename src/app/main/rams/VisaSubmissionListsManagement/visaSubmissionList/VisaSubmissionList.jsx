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
import VisaSubmissionListHeader from "./VisaSubmissionListHeader";
import VisaSubmissionListModel from "./models/VisaSubmissionListModel";
import {
  useCreateVisaSubmissionListMutation,
  useGetVisaSubmissionListsQuery,
} from "../VisaSubmissionListsApi";
import VisaSubmissionListForm from "./VisaSubmissionListForm";
import VisaSubmissionLists from "../visaSubmissionLists/VisaSubmissionLists";
import axios from "axios";
import { VISASBLISTS_BY_DATE } from "src/app/constant/constants";

const schema = z.object({});

function VisaSubmissionList() {
  const emptyValue = {
    agency: "",
    passenger: "",
    submission_date: "",
  };

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [tableShow, setTableShow] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formKey, setFormKey] = useState(0);
  const [hideTabile, setHideTabile] = useState(false);
  // const [newListData, setNewData] = useState([]);
  const [cancelList, setCancelList] = useState(false);
  const [newList, setNewList] = useState(true);

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
  const submissionDate = watch("submission_date");

  const navigate = useNavigate();

  const {
    data: newListData,
    error,
    isError,
    refetch,
  } = useGetVisaSubmissionListsQuery({
    passenger: selectedPassenger || "",
    submissionDate: selectedDate || "",
  });

  const visaSubmissionListId =
    newListData?.length > 0 ? newListData[0]?.visa_submission_list?.id : null;

  useEffect(() => {
    if (isError && error?.response?.data?.detail) {
      CustomNotification("error", error.response.data.detail);
    }
  }, [isError, error]);

  function handleSearchPassengerClick() {
    if (error?.response?.data?.detail) {
      CustomNotification("error", error?.response?.data?.detail);
      return;
    }
    setSelectedPassenger(passenger);
  }
  function handleSearchManPowerDateClick() {
    if (isError && error?.response?.data?.detail) {
      CustomNotification("error", `${error?.response?.data?.detail}`);
    }
    setSelectedPassenger(passenger);
    setSelectedDate(submissionDate);
  }

  const [createVisaSubmissionList] = useCreateVisaSubmissionListMutation();

  function handleCreateVisaSubmissionList() {
    createVisaSubmissionList(getValues())
      .unwrap()
      .then((data) => {
        if (data) {
          AddedSuccessfully();

          setSelectedDate(submissionDate);

          navigate(`/apps/visaSubmissionList/visaSubmissionLists/new`);
          refetch();
        }
      })
      .catch((error) => {
        console.log("cfdsfdskhfksldhf", error);
        CustomNotification("error", `${error.response.data.passenger}`);
      });
  }

  function handleCancelVisaSubmissionList() {
    const submissionData = {
      submission_date: getValues().submission_date,
      agency: getValues().agency,
      passenger: getValues("cancelpassenger"),
      list_type: "cancel",
    };

    createVisaSubmissionList(submissionData)
      .unwrap()
      .then((submissionData) => {
        if (submissionData) {
          AddedSuccessfully();
          setSelectedDate(submissionDate);
          navigate("/apps/visaSubmissionList/visaSubmissionLists/new");
        }
        refetch();
      })
      .catch((error) => {
        CustomNotification("error", "Cancel List Added Successfully");
      });
  }

  function handleCancel() {
    handleReset({
      ...emptyValue,
    });
  }

  useEffect(() => {
    if (visaSubmissionListId === "new") {
      reset(VisaSubmissionListModel({}));
    }
  }, [visaSubmissionListId, reset]);

  const handlecancelList = (event) => {
    const isChecked = event.target.checked;
    setCancelList(isChecked);
    sessionStorage.setItem("CancelVisaList", isChecked);

    refetch();
  };

  const handlenewList = (event) => {
    const isChecked = event.target.checked;
    setNewList(isChecked);
    sessionStorage.setItem("NewVisaList", isChecked);
    refetch();
  };

  return (
    <FormProvider {...methods} key={formKey}>
      <FusePageCarded
        header={<VisaSubmissionListHeader handleCancel={handleCancel} />}
        content={
          <div className="p-16 ">
            <VisaSubmissionListForm
              isError={isError}
              error={error}
              refetch={refetch}
              visaSubmissionListId={visaSubmissionListId}
              handlecancelList={handlecancelList}
              handleSearchPassengerClick={handleSearchPassengerClick}
              handleSearchManPowerDateClick={handleSearchManPowerDateClick}
              handleCreateVisaSubmissionList={handleCreateVisaSubmissionList}
              handleCancelVisaSubmissionList={handleCancelVisaSubmissionList}
              handleReset={handleReset}
              cancelList={cancelList}
              handlenewList={handlenewList}
              newList={newList}
            />
            <br />

            <VisaSubmissionLists
              tableShow={tableShow}
              visaSubmissionListId={visaSubmissionListId}
              handleReset={handleReset}
              isError={isError}
              emptyValue={emptyValue}
              hideTabile={hideTabile}
              refetch={refetch}
              selectedDate={selectedDate}
              selectedPassenger={selectedPassenger}
              passenger={passenger}
              submissionDate={submissionDate}
              handlecancelList={handlecancelList}
              cancelList={cancelList}
              handlenewList={handlenewList}
              newList={newList}
              newListData={newListData}
            />
          </div>
        }
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}

export default VisaSubmissionList;
