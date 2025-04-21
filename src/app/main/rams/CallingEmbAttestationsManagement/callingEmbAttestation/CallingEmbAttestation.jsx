import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, Tab, TextField, Autocomplete } from "@mui/material";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import {
  GET_PASSENGER_BY_ID,
  CALLINGEMBATTESTATION_BY_PASSENGER_ID,
} from "src/app/constant/constants";
import { doneNotDone } from "src/app/@data/data";
import setIdIfValueIsObject from "src/app/@helpers/setIdIfValueIsObject";
import moment from "moment";
import CallingEmbAttestationHeader from "./CallingEmbAttestationHeader";
// import { useGetCallingEmbAttestationQuery } from '../CallingEmbAttestationsApi';
import CallingEmbAttestationForm from "./CallingEmbAttestationForm";
import { useGetCallingEmbAttestationQuery } from "../CallingEmbAttestationsApi";
import { hasPermission } from "src/app/constant/permission/permissionList";
import { useThemeMediaQuery } from "@fuse/hooks";

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
  passenger: z.number().min(1, { message: "You must enter a passenger" }),
});

function CallingEmbAttestation() {
  const emptyValue = {
    passenger: "",
    emb_attestation_status: "",
    calling_status: "",
    bio_submitted_status: "",
    interviewed_date: "",
    interviewed: "",
    submitted_for_sev_date: "",
    submitted_for_sev: "",
    sev_received_date: "",
    sev_received: "",
    submitted_for_permission_immigration_clearance_date: "",
    submitted_for_permission_immigration_clearance: "",
    immigration_clearance_date: "",
    immigration_clearance: "",
    handover_passport_ticket_date: "",
    handover_passport_ticket: "",
    accounts_cleared_date: "",
    accounts_cleared: "",
    dispatched_date: "",
    dispatched: "",
    repatriation_date: "",
    repatriation: "",
  };
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { malayasiaStatussId, fromSearch } = routeParams;
  const passengers = useSelector((state) => state.data.passengers);

  const classes = useStyles();
  const navigate = useNavigate();

  const methods = useForm({
    mode: "onChange",
    defaultValues: emptyValue,
    resolver: zodResolver(schema),
  });

  const { data: callingEmbAttestation, isLoading } =
    useGetCallingEmbAttestationQuery(malayasiaStatussId, {
      skip: !malayasiaStatussId || malayasiaStatussId === "new",
    });

  const [tabValue, setTabValue] = useState(0);
  const [formKey, setFormKey] = useState(0);

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
        .get(
          `${CALLINGEMBATTESTATION_BY_PASSENGER_ID}${malayasiaStatussId}`,
          authTOKEN
        )
        .then((res) => {
          if (res.data.id) {
            handleReset({
              ...setIdIfValueIsObject(res.data),
              passenger: malayasiaStatussId,
            });
          } else {
            handleReset({
              passenger: malayasiaStatussId,
              emb_attestation_status: doneNotDone.find((data) => data.default)
                ?.id,
              calling_status: doneNotDone.find((data) => data.default)?.id,
              bio_submitted_status: doneNotDone.find((data) => data.default)
                ?.id,
            });
            sessionStorage.setItem("operation", "save");
          }
        })
        .catch(() => {
          handleReset({
            passenger: malayasiaStatussId,
            emb_attestation_status: doneNotDone.find((data) => data.default)
              ?.id,
            calling_status: doneNotDone.find((data) => data.default)?.id,
            bio_submitted_status: doneNotDone.find((data) => data.default)?.id,
          });
          sessionStorage.setItem("operation", "save");
        });
    } else {
      handleReset({
        emb_attestation_status: doneNotDone.find((data) => data.default)?.id,
        calling_status: doneNotDone.find((data) => data.default)?.id,
        bio_submitted_status: doneNotDone.find((data) => data.default)?.id,
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
      {hasPermission("CALLING_EMB_ATTESTATION_DETAILS") && (
        <FusePageCarded
          header={
            <div className="flex flex-col w-full">
              <CallingEmbAttestationHeader
                handleReset={handleReset}
                emptyValue={emptyValue}
              />
            </div>
          }
          content={
            <div className="p-16">
              {tabValue === 0 && (
                <div className="p-16">
                  <div className="flex justify-center w-full px-16">
                    <Controller
                      name="passenger"
                      control={control}
                      render={({ field: { value } }) => (
                        <Autocomplete
                          className={`w-full max-w-320 h-48 ${classes.container}`}
                          freeSolo
                          autoHighlight
                          disabled={!!fromSearch}
                          value={
                            value
                              ? passengers.find((data) => data.id === value)
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
                            axios
                              .get(
                                `${GET_PASSENGER_BY_ID}${newValue?.id}`,
                                authTOKEN
                              )
                              .then((res) => {
                                setValue("passenger", res.data?.id);
                                setValue(
                                  "current_status",
                                  res.data?.current_status?.id
                                );
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
                                  `${CALLINGEMBATTESTATION_BY_PASSENGER_ID}${newValue?.id}`,
                                  authTOKEN
                                )
                                .then((res) => {
                                  console.log("fkjgjfkghdfkhgh", res.data);
                                  if (res.data.id) {
                                    handleReset({
                                      ...setIdIfValueIsObject(res.data),

                                      interviewed_date: res.data
                                        ?.interviewed_date
                                        ? moment(
                                            res.data?.interviewed_date
                                          ).format("YYYY-MM-DD")
                                        : null,

                                      submitted_for_sev_date: res.data
                                        ?.submitted_for_sev_date
                                        ? moment(
                                            res.data?.submitted_for_sev_date
                                          ).format("YYYY-MM-DD")
                                        : null,

                                      sev_received_date: res.data
                                        ?.sev_received_date
                                        ? moment(
                                            res.data?.sev_received_date
                                          ).format("YYYY-MM-DD")
                                        : null,

                                      submitted_for_permission_immigration_clearance_date:
                                        res.data
                                          ?.submitted_for_permission_immigration_clearance_date
                                          ? moment(
                                              res.data
                                                ?.submitted_for_permission_immigration_clearance_date
                                            ).format("YYYY-MM-DD")
                                          : null,

                                      immigration_clearance_date: res.data
                                        ?.immigration_clearance_date
                                        ? moment(
                                            res.data?.immigration_clearance_date
                                          ).format("YYYY-MM-DD")
                                        : null,

                                      handover_passport_ticket_date: res.data
                                        ?.handover_passport_ticket_date
                                        ? moment(
                                            res.data
                                              ?.handover_passport_ticket_date
                                          ).format("YYYY-MM-DD")
                                        : null,

                                      accounts_cleared_date: res.data
                                        ?.accounts_cleared_date
                                        ? moment(
                                            res.data?.accounts_cleared_date
                                          ).format("YYYY-MM-DD")
                                        : null,

                                      dispatched_date: res.data?.dispatched_date
                                        ? moment(
                                            res.data?.dispatched_date
                                          ).format("YYYY-MM-DD")
                                        : null,

                                      repatriation_date: res.data
                                        ?.repatriation_date
                                        ? moment(
                                            res.data?.repatriation_date
                                          ).format("YYYY-MM-DD")
                                        : null,

                                      passenger: newValue?.id,
                                    });

                                    navigate(
                                      `/apps/malayasiaStatus/malayasiaStatuss/${
                                        newValue?.passenger?.id || newValue?.id
                                      }`
                                    );
                                  } else {
                                    navigate(
                                      `/apps/malayasiaStatus/malayasiaStatuss/new`
                                    );
                                    handleReset({
                                      passenger: newValue?.id,
                                      emb_attestation_status: doneNotDone.find(
                                        (data) => data.default
                                      )?.id,
                                      calling_status: doneNotDone.find(
                                        (data) => data.default
                                      )?.id,
                                      bio_submitted_status: doneNotDone.find(
                                        (data) => data.default
                                      )?.id,
                                    });
                                    getCurrentStatus(newValue?.id);
                                  }
                                })
                                .catch(() => {
                                  handleReset({
                                    passenger: newValue?.id,
                                    emb_attestation_status: doneNotDone.find(
                                      (data) => data.default
                                    )?.id,
                                    calling_status: doneNotDone.find(
                                      (data) => data.default
                                    )?.id,
                                    bio_submitted_status: doneNotDone.find(
                                      (data) => data.default
                                    )?.id,
                                  });
                                  getCurrentStatus(newValue?.id);

                                  navigate(
                                    `/apps/malayasiaStatus/malayasiaStatuss/new`
                                  );
                                });
                            } else {
                              handleReset({
                                passenger: newValue?.id,
                                emb_attestation_status: doneNotDone.find(
                                  (data) => data.default
                                )?.id,
                                calling_status: doneNotDone.find(
                                  (data) => data.default
                                )?.id,
                                bio_submitted_status: doneNotDone.find(
                                  (data) => data.default
                                )?.id,
                              });
                              getCurrentStatus(newValue?.id);

                              navigate(
                                `/apps/malayasiaStatus/malayasiaStatuss/new`
                              );
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
                      )}
                    />
                  </div>
                  <CallingEmbAttestationForm />
                </div>
              )}
            </div>
          }
          scroll={isMobile ? "normal" : "content"}
        />
      )}
    </FormProvider>
  );
}

export default CallingEmbAttestation;
