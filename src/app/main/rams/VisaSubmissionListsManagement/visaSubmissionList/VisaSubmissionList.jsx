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
  const [cancelListData, setCancelListData] = useState([]);
  const [cancelList, setCancelList] = useState(false);

  console.log("cancelListData", cancelListData);
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

  const { data, error, isError, refetch } = useGetVisaSubmissionListsQuery({
    passenger: selectedPassenger,
    submissionDate: selectedDate,
  });

  const visaSubmissionListId =
    data?.length > 0 ? data[0]?.visa_submission_list?.id : null;

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
          refetch();
        }
      })
      .catch((error) => {
        CustomNotification("error", "Cancel List Added Successfully");
      });
    // refetch();
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

  const handlecancelList = async (event) => {
    const isChecked = event.target.checked;
    setCancelList(isChecked);
    sessionStorage.setItem("CancelVisaList", isChecked);

    try {
      axios.defaults.headers.common["Content-type"] = "application/json";
      axios.defaults.headers.common.Authorization =
        localStorage.getItem("jwt_access_token");

      const response = await axios.get(
        `${VISASBLISTS_BY_DATE}?submission_date=${watch("submission_date") || ""}`
      );

      console.log("API Response:", response.data);
      setCancelListData(response.data);
    } catch (error) {
      console.error("Error fetching visa submission list:", error);
    } finally {
      delete axios.defaults.headers.common["Content-type"];
      delete axios.defaults.headers.common.Authorization;
    }
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
            />
            <br />

            <VisaSubmissionLists
              data={data}
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
              cancelListData={cancelListData}
            />
          </div>
        }
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}

export default VisaSubmissionList;
