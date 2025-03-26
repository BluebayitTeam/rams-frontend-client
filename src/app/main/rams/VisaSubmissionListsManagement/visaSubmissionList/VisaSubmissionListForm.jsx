/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  getAgencys,
  getCountries,
  getCurrentStatuss,
  getPassengers,
} from "app/store/dataSlice";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import CustomDropdownField from "src/app/@components/CustomDropdownField";
import { makeStyles } from "@mui/styles";
import { Search } from "@mui/icons-material";
import { Button, Checkbox } from "@mui/material";
import CustomDatePicker from "src/app/@components/CustomDatePicker";

import {
  GET_FORM_CONTENT_DETAILS_BY_TITLE,
  VISASBLISTS_BY_DATE,
} from "src/app/constant/constants";
import { MANPOWER_SUBMISSION_LIST_FOOTER } from "src/app/constant/FormContentTitle/formContentTitle";
import { useCreateVisaSubmissionListMutation } from "../VisaSubmissionListsApi";
import {
  AddedSuccessfully,
  CustomNotification,
} from "src/app/@customHooks/notificationAlert";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  searchContainer: ({ isPassenger }) => ({
    color: theme.palette.primary.main,
    background: "transparent",
    borderColor: theme.palette.primary.main,
    cursor: isPassenger && "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid",
    height: "52px",
    width: "52px",

    borderRadius: "5px",
    "&:hover": {
      color: isPassenger
        ? theme.palette.primary.dark
        : theme.palette.primary.main,
      background: isPassenger ? theme.palette.primary.light : "transparent",
      borderColor: isPassenger
        ? theme.palette.primary.dark
        : theme.palette.primary.main,
    },
    "&:active": {
      color: isPassenger
        ? theme.palette.primary.light
        : theme.palette.primary.main,
      background: isPassenger ? theme.palette.primary.dark : "transparent",
      borderColor: isPassenger
        ? theme.palette.primary.light
        : theme.palette.primary.main,
    },
  }),
  searchContainerCheck: ({ isPassenger }) => ({
    color: theme.palette.primary.main,
    background: "transparent",
    borderColor: theme.palette.primary.main,
    cursor: isPassenger && "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid",
    height: "52px",
    width: "52px",
    marginTop: "15px",
    borderRadius: "5px",
    "&:hover": {
      color: isPassenger
        ? theme.palette.primary.dark
        : theme.palette.primary.main,
      background: isPassenger ? theme.palette.primary.light : "transparent",
      borderColor: isPassenger
        ? theme.palette.primary.dark
        : theme.palette.primary.main,
    },
    "&:active": {
      color: isPassenger
        ? theme.palette.primary.light
        : theme.palette.primary.main,
      background: isPassenger ? theme.palette.primary.dark : "transparent",
      borderColor: isPassenger
        ? theme.palette.primary.light
        : theme.palette.primary.main,
    },
  }),
}));

function VisaSubmissionListForm({
  handleSearchPassengerClick,
  handleSearchManPowerDateClick,
  handleCreateVisaSubmissionList,
  handleCancelVisaSubmissionList,
  handlecancelList,
  cancelList,
  newList,
  handlenewList,
}) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { watch, getValues, setValue } = methods;

  const { agencies, passengers } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getPassengers());
    dispatch(getAgencys());
    sessionStorage.setItem("NewVisaList", true);
    sessionStorage.setItem("CancelVisaList", false);
  }, []);

  const classes = useStyles({ isPassenger: watch("passenger") });

  return (
    <div>
      <div>
        <Checkbox
          cancelList={cancelList}
          onChange={handlecancelList}
          inputProps={{ "aria-label": "controlled" }}
        />{" "}
        Cancel List
        <Checkbox
          defaultChecked
          newList={newList}
          onChange={handlenewList}
          inputProps={{ "aria-label": "controlled" }}
        />{" "}
        New List
      </div>

      <CustomDropdownField
        name="agency"
        label="Agency"
        options={agencies}
        optionLabelFormat={(option) => `${option?.name}`}
        onChange={(newValue) => setValue("agency_info", newValue)}
      />

      <CustomDropdownField
        name="agency"
        label="Agency"
        options={agencies}
        style={{ display: "none" }}
        optionLabelFormat={(option) => `${option?.name}`}
        onChange={(newValue) => setValue("agency_info", newValue)}
      />

      <div className="flex flex-nowrap">
        <CustomDatePicker
          name="submission_date"
          label="Submission Date"
          required
          placeholder="DD-MM-YYYY"
        />
        <div
          className={classes.searchContainer}
          onClick={() => {
            handleSearchManPowerDateClick();
          }}
        >
          <Search />
        </div>
      </div>
      <p
        className="text-base text-red-900"
        style={{ display: newList ? "block" : "none" }}
      >
        New List
      </p>
      <div style={{ display: newList ? "block" : "none" }}>
        <div className="flex flex-nowrap">
          <div className="w-full">
            <CustomDropdownField
              name="passenger"
              label="Passenger"
              options={passengers}
              className="mt-8 mb-16 "
              optionLabelFormat={(option) =>
                `${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
              }
            />
          </div>

          <div
            className={classes.searchContainerCheck}
            onClick={() => {
              handleSearchPassengerClick();
            }}
          >
            <Search />
          </div>
        </div>
      </div>
      <Button
        className="whitespace-nowrap mx-4"
        style={{ display: newList ? "block" : "none" }}
        variant="contained"
        color="secondary"
        onClick={() => handleCreateVisaSubmissionList()}
      >
        Save
      </Button>
      <p
        className="text-base text-red-900"
        style={{ display: cancelList ? "block" : "none" }}
      >
        Cancel List
      </p>
      {/* <div style={{ display: cancelList ? "block" : "none" }}>
        <div className="flex flex-nowrap">
          <div className="w-full">
            <CustomDropdownField
              name="cancelpassenger"
              label="cancelpassenger"
              options={passengers}
              className="mt-8 mb-16 "
              optionLabelFormat={(option) =>
                `${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
              }
            />
          </div>
          <div
            className={classes.searchContainer}
            onClick={() =>
              watch("passenger") &&
              dispatch(getVisaSubmissionList({ passenger: watch("passenger") }))
            }
          >
            <Search />
          </div>
        </div>
      </div> */}

      <div style={{ display: cancelList ? "block" : "none" }}>
        <div className="flex flex-nowrap">
          <div className="w-full">
            <CustomDropdownField
              name="cancelpassenger"
              label="cancel Passenger"
              options={passengers}
              className="mt-8 mb-16 "
              optionLabelFormat={(option) =>
                `${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`
              }
            />
          </div>

          <div
            className={classes.searchContainerCheck}
            onClick={() => {
              handleSearchPassengerClick();
            }}
          >
            <Search />
          </div>
        </div>
      </div>

      <Button
        style={{ display: cancelList ? "block" : "none" }}
        className="whitespace-nowrap mx-4"
        variant="contained"
        color="secondary"
        onClick={handleCancelVisaSubmissionList}
      >
        Save
      </Button>
    </div>
  );
}

export default VisaSubmissionListForm;
