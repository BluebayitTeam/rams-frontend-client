/* eslint-disable no-undef */
import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, FormProvider, useForm } from "react-hook-form";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, Tab, TextField, Autocomplete } from "@mui/material";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import {
  GET_PASSENGER_BY_ID,
  MANPOWER_BY_PASSENGER_ID,
} from "src/app/constant/constants";
import { doneNotDone } from "src/app/@data/data";
import setIdIfValueIsObject from "src/app/@helpers/setIdIfValueIsObject";
import { EmabassyAlert } from "src/app/@customHooks/notificationAlert";
import ManPowerHeader from "./ManPowerHeader";
import { useGetManPowerQuery } from "../ManPowersApi";
import ManPowerForm from "./ManPowerForm";
import { hasPermission } from "src/app/constant/permission/permissionList";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  container: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    paddingTop: "0.8rem",
    paddingBottom: "0.7rem",
    boxSizing: "content-box",
  },
  textField: {
    height: "4.8rem",
    "& > div": {
      height: "100%",
    },
  },
}));

const schema = z.object({
  police_clearance_no: z
    .string()
    .nonempty("You must enter a manPower name")
    .min(5, "The manPower name must be at least 5 characters"),
  recruiting_agency: z
    .number()
    .min(1, { message: "You must enter a recruiting agency" }),
});

function ManPower() {
  const emptyValue = {
    passenger: "",
    man_power_status: doneNotDone.find((data) => data.default)?.id,
    recruiting_agency: "",
    new_visa_no: "",
    bank_name: "",
    bank_account_no: "",
    registration_id: "",
    man_power_date: "",
    submit_date: "",
    current_status: "",
    smart_card_image: "",
    delivery_date: "",
  };
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { manPowerId, fromSearch } = routeParams;
  const passengers = useSelector((state) => state.data.passengers);
  const classes = useStyles();
  const navigate = useNavigate();
  const [formKey, setFormKey] = useState(0);

  const methods = useForm({
    mode: "onChange",
    defaultValues: emptyValue,
    resolver: zodResolver(schema),
  });

  const {
    data: manPower,
    isLoading,
    isError,
  } = useGetManPowerQuery(manPowerId, {
    skip: !manPowerId || manPowerId === "new",
  });

  const [tabValue, setTabValue] = useState(0);

  const {
    reset,
    watch,
    control,
    formState: { errors },
    setValue,
  } = methods;

  const handleReset = (defaultValues) => {
    reset(defaultValues);
    setFormKey((prevKey) => prevKey + 1); // Trigger re-render with new form key
  };

  const getCurrentStatus = (passengerId) => {
    const authTOKEN = {
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("jwt_access_token"),
      },
    };
    axios.get(`${GET_PASSENGER_BY_ID}${passengerId}`, authTOKEN).then((res) => {
      setValue("current_status", res.data?.current_status?.id);
    });
  };

  useEffect(() => {
    if (fromSearch) {
      const authTOKEN = {
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("jwt_access_token"),
        },
      };
      axios
        .get(`${MANPOWER_BY_PASSENGER_ID}${manPowerId}`, authTOKEN)
        .then((res) => {
          if (res.data.id) {
            reset({
              ...setIdIfValueIsObject(res.data),
              passenger: manPowerId,
            });
          } else {
            handleReset({
              passenger: manPowerId,
              man_power_status: doneNotDone.find((data) => data.default)?.id,
            });
            sessionStorage.setItem("operation", "save");
          }
        })
        .catch(() => {
          handleReset({
            passenger: manPowerId,
            man_power_status: doneNotDone.find((data) => data.default)?.id,
          });
          sessionStorage.setItem("operation", "save");
        });
    } else {
      handleReset({
        ...emptyValue,
        man_power_status: doneNotDone.find((data) => data.default)?.id,
      });
    }
  }, [fromSearch]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods} key={formKey}>
      {hasPermission("MANPOWER_DETAILS") && (
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
              <Tab label="Passenger Details" />
              <Tab label="ManPower Information" />
            </Tabs>
          }
          header={
            <ManPowerHeader handleReset={handleReset} emptyValue={emptyValue} />
          }
          content={
            <div className="p-16">
              {tabValue === 0 && (
                <div className="p-16">
                  <div className="flex justify-center w-full px-16">
                    <Controller
                      name="passenger"
                      control={control}
                      render={({ field: { value } }) => {
                        return (
                          <Autocomplete
                            className={`w-full max-w-320 h-48 ${classes.container}`}
                            freeSolo
                            autoHighlight
                            disabled={!!fromSearch}
                            value={
                              value
                                ? passengers.find(
                                    (data) => data.id === Number(value)
                                  )
                                : null
                            }
                            options={passengers}
                            getOptionLabel={(option) =>
                              `${option?.passenger_id || ""} ${option?.office_serial || ""} ${option?.passport_no || ""} ${option?.passenger_name || ""}`
                            }
                            onChange={(event, newValue) => {
                              const authTOKEN = {
                                headers: {
                                  "Content-type": "application/json",
                                  Authorization:
                                    localStorage.getItem("jwt_access_token"),
                                },
                              };
                              // getManpower(newValue?.id);
                              axios
                                .get(
                                  `${GET_PASSENGER_BY_ID}${newValue?.id}`,
                                  authTOKEN
                                )
                                .then((res) => {
                                  setValue(
                                    "current_status",
                                    res.data?.current_status?.id
                                  );
                                  setValue("passenger", res.data?.id);
                                });

                              if (newValue?.id) {
                                const authTOKEN = {
                                  headers: {
                                    "Content-type": "application/json",
                                    Authorization:
                                      localStorage.getItem("jwt_access_token"),
                                  },
                                };
                                axios
                                  .get(
                                    `${MANPOWER_BY_PASSENGER_ID}${newValue?.id}`,
                                    authTOKEN
                                  )
                                  .then((res) => {
                                    if (res.data.id) {
                                      console.log("CheckData", res.data.id);

                                      handleReset({
                                        ...setIdIfValueIsObject(res.data),
                                        passenger: newValue?.id,
                                      });

                                      navigate(
                                        `/apps/manPower-management/manPowers/${
                                          newValue?.passenger?.id ||
                                          newValue?.id
                                        }`
                                      );
                                    } else {
                                      navigate(
                                        `/apps/manPower-management/manPowers/new`
                                      );
                                      handleReset({
                                        passenger: newValue?.id,
                                        man_power_status: doneNotDone.find(
                                          (data) => data.default
                                        )?.id,
                                      });
                                      getCurrentStatus(newValue?.id);
                                    }
                                  })
                                  .catch(() => {
                                    handleReset({
                                      passenger: newValue?.id,
                                      man_power_status: doneNotDone.find(
                                        (data) => data.default
                                      )?.id,
                                    });

                                    getCurrentStatus(newValue?.id);

                                    navigate(
                                      `/apps/manPower-management/manPowers/new`
                                    );
                                    EmabassyAlert();
                                  });
                              } else {
                                navigate(
                                  `/apps/manPower-management/manPowers/new`
                                );
                                handleReset({
                                  passenger: newValue?.id,
                                  man_power_status: doneNotDone.find(
                                    (data) => data.default
                                  )?.id,
                                });
                                getCurrentStatus(newValue?.id);
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                className={classes.textField}
                                placeholder="Select Passenger"
                                label="Passenger"
                                required
                                helperText={errors?.passenger?.message}
                                variant="outlined"
                                autoFocus
                                InputLabelProps={
                                  value
                                    ? { shrink: true }
                                    : { style: { color: "red" } }
                                }
                              />
                            )}
                          />
                        );
                      }}
                    />
                  </div>
                  <ManPowerForm />
                </div>
              )}
              {tabValue === 1 && <ManPowerForm manPowerId={manPowerId} />}
            </div>
          }
          scroll={isMobile ? "normal" : "content"}
        />
      )}
    </FormProvider>
  );
}

export default ManPower;
