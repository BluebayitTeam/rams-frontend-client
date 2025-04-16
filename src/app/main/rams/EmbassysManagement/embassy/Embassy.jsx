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
  EMBASSY_BY_PASSENGER_IDS,
  GET_PASSENGER_BY_ID,
} from "src/app/constant/constants";
import { doneNotDone } from "src/app/@data/data";
import setIdIfValueIsObject from "src/app/@helpers/setIdIfValueIsObject";
import { getEmbassy } from "app/store/dataSlice";
import { setAlert } from "app/store/alertSlice";
import EmbassyHeader from "./EmbassyHeader";
// import { useGetEmbassyQuery } from '../EmbassysApi';
import EmbassyForm from "./EmbassyForm";
import { useGetEmbassyQuery } from "../EmbassysApi";
import { hasPermission } from "src/app/constant/permission/permissionList";

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
  passenger: z
    .string()
    .nonempty("You must enter a embassy name")
    .min(5, "The embassy name must be at least 5 characters"),
  recruiting_agency: z
    .number()
    .min(1, { message: "You must enter a recruiting agency" }),
});

function Embassy() {
  const emptyValue = {
    passenger: "",
    recruiting_agency: "",
    submit_date: "",
    profession_english: "",
    profession_arabic: "",
    salary: "",
    stamping_status: "",
    stamping_visa_new_no: "",
    stamping_date: "",
    visa_expiry_date: "",
    delivery_date: "",
    old_visa_image: "",
    stamp_visa_image: "",
    stamp_visa_pdf: "",
    created_at: "",
    updated_at: "",
    visa_number_readonly: "",
    sponsor_id_no_readonly: "",
    sponsor_name_english_readonly: "",
    sponsor_name_arabic_readonly: "",
    mofa_no_readonly: "",

    police_clearance_no_readonly: "",
    oakala_no_readonly: "",
    driving_license_no_readonly: "",
    musaned_okala_no_readonly: "",
    certificate_experience_no_readonly: "",
  };

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const routeParams = useParams();
  const { embassyId, fromSearch } = routeParams;
  const passengers = useSelector((state) => state.data.passengers);

  const classes = useStyles();
  const navigate = useNavigate();

  const methods = useForm({
    mode: "onChange",
    defaultValues: emptyValue,
    resolver: zodResolver(schema),
  });

  const {
    data: embassy,
    isLoading,
    isError,
  } = useGetEmbassyQuery(embassyId, {
    skip: !embassyId || embassyId === "new",
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

  useEffect(() => {
    const authTOKEN = {
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("jwt_access_token"),
      },
    };

    if (fromSearch) {
      axios
        .get(`${EMBASSY_BY_PASSENGER_IDS}${embassyId}`, authTOKEN)
        .then((res) => {
          // update scope
          if (
            res.data?.visa_entry?.id &&
            res.data?.mofa?.id &&
            res.data?.embassy?.id
          ) {
            const visa_entry = res.data?.visa_entry;
            const mofa = res.data?.mofa;
            const office_work = res.data?.officework;
            const musanedokala = res.data?.musanedokala;
            reset({
              ...setIdIfValueIsObject(res.data.embassy),
              visa_number_readonly: visa_entry.visa_number,
              sponsor_id_no_readonly: visa_entry.sponsor_id_no,
              sponsor_name_english_readonly: visa_entry?.sponsor_name_english,
              sponsor_name_arabic_readonly: visa_entry?.sponsor_name_arabic,
              mofa_no_readonly: mofa.mofa_no,
              passenger: embassyId,
              updatePermission: true,
              createPermission: false,
              police_clearance_no_readonly: office_work.police_clearance_no,
              oakala_no_readonly: musanedokala.okala_no,
              driving_license_no_readonly: office_work.driving_license_no,
              musaned_okala_no_readonly: musanedokala.musaned_no,
              certificate_experience_no_readonly:
                office_work.certificate_experience,
            });
          }
        })
        .catch(() => null);
    } else {
      reset({ stamping_status: doneNotDone.find((data) => data.default)?.id });
    }

    // if (fromSearch) {
    //   const authTOKEN = {
    //     headers: {
    //       "Content-type": "application/json",
    //       Authorization: localStorage.getItem("jwt_access_token"),
    //     },
    //   };
    //   axios
    //     .get(`${EMBASSY_BY_PASSENGER_IDS}${embassyId}`, authTOKEN)
    //     .then((res) => {
    //       if (res.data.id) {
    //         reset({
    //           ...setIdIfValueIsObject(res.data),
    //           passenger: embassyId,
    //         });
    //       }
    //       console.log("resfdfdfdf", res);
    //     })
    //     .catch(() => null);
    // } else {
    //   handleReset({
    //     ...emptyValue,
    //     stamping_status: doneNotDone.find((data) => data.default)?.id,
    //   });
    // }
  }, [fromSearch]);

  useEffect(() => {
    if (fromSearch) {
      const authTOKEN = {
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("jwt_access_token"),
        },
      };
      axios
        .get(`${EMBASSY_BY_PASSENGER_IDS}${embassyId}`, authTOKEN)
        .then((res) => {
          if (
            res.data?.visa_entry?.id &&
            res.data?.mofa?.id &&
            res.data?.embassy?.id
          ) {
            const visa_entry = res.data?.visa_entry;
            const mofa = res.data?.mofa;
            const office_work = res.data?.officework;
            const musanedokala = res.data?.musanedokala;
            handleReset({
              ...setIdIfValueIsObject(res.data.embassy),
              visa_number_readonly: visa_entry.visa_number,
              sponsor_id_no_readonly: visa_entry.sponsor_id_no,
              sponsor_name_english_readonly: visa_entry?.sponsor_name_english,
              sponsor_name_arabic_readonly: visa_entry?.sponsor_name_arabic,
              mofa_no_readonly: mofa.mofa_no,
              passenger: embassyId,
              updatePermission: true,
              createPermission: false,
              police_clearance_no_readonly: office_work.police_clearance_no,
              oakala_no_readonly: musanedokala.okala_no,
              driving_license_no_readonly: office_work.driving_license_no,
              musaned_okala_no_readonly: musanedokala.musaned_no,
              certificate_experience_no_readonly:
                office_work.certificate_experience,
            });
          } else {
            handleReset({
              passenger: embassyId,
              stamping_status: doneNotDone.find((data) => data.default)?.id,
            });
            sessionStorage.setItem("operation", "save");
          }
        })
        .catch(() => {
          reset({
            passenger: embassyId,
            stamping_status: doneNotDone.find((data) => data.default)?.id,
          });
          sessionStorage.setItem("operation", "save");
        });
    } else {
      reset({ stamping_status: doneNotDone.find((data) => data.default)?.id });
    }
  }, [fromSearch]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  const handleReset = (defaultValues) => {
    reset(defaultValues);
    setFormKey((prevKey) => prevKey + 1);
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
  return (
    <FormProvider {...methods} key={formKey}>
      {hasPermission("EMBASSY_DETAILS") && (
        <FusePageCarded
          classes={{
            toolbar: "p-0",
            header: "min-h-80 h-80",
          }}
          header={
            <div className="flex flex-col w-full">
              <EmbassyHeader
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
                            if (newValue?.id) {
                              getEmbassy(newValue?.id);
                              const authTOKEN = {
                                headers: {
                                  "Content-type": "application/json",
                                  Authorization:
                                    localStorage.getItem("jwt_access_token"),
                                },
                              };

                              axios
                                .get(
                                  `${EMBASSY_BY_PASSENGER_IDS}${newValue?.id}`,
                                  authTOKEN
                                )
                                .then((res) => {
                                  // update scope
                                  if (
                                    res.data?.visa_entry?.id &&
                                    res.data?.mofa?.id &&
                                    res.data?.embassy?.id
                                  ) {
                                    const visa_entry = res.data?.visa_entry;
                                    const mofa = res.data?.mofa;
                                    const office_work = res.data?.officework;
                                    const musanedokala = res.data?.musanedokala;
                                    handleReset({
                                      ...setIdIfValueIsObject(res.data.embassy),
                                      visa_number_readonly:
                                        visa_entry.visa_number,

                                      sponsor_id_no_readonly:
                                        visa_entry.sponsor_id_no,
                                      sponsor_name_english_readonly:
                                        visa_entry.sponsor_name_english,
                                      sponsor_name_arabic_readonly:
                                        visa_entry.sponsor_name_arabic,
                                      mofa_no_readonly: mofa.mofa_no,
                                      passenger: newValue?.id,
                                      updatePermission: true,
                                      createPermission: false,
                                      police_clearance_no_readonly:
                                        office_work.police_clearance_no,
                                      oakala_no_readonly: musanedokala.okala_no,
                                      driving_license_no_readonly:
                                        office_work.driving_license_no,
                                      musaned_okala_no_readonly:
                                        musanedokala.musaned_no,
                                      certificate_experience_no_readonly:
                                        office_work.certificate_experience,
                                    });
                                    getCurrentStatus(newValue?.id);
                                    navigate(
                                      `/apps/embassy-management/embassys/${
                                        newValue?.passenger?.id || newValue?.id
                                      }`
                                    );
                                  }
                                  // create scope
                                  else if (
                                    res.data?.visa_entry?.id &&
                                    res.data?.mofa?.id
                                  ) {
                                    const visa_entry = res.data?.visa_entry;
                                    const mofa = res.data?.mofa;
                                    const office_work = res.data?.officework;
                                    const musanedokala = res.data?.musanedokala;
                                    handleReset({
                                      profession_english:
                                        visa_entry.profession_english,
                                      profession_arabic:
                                        visa_entry.profession_arabic,
                                      visa_number_readonly:
                                        visa_entry.visa_number,
                                      sponsor_id_no_readonly:
                                        visa_entry.sponsor_id_no,
                                      sponsor_name_english_readonly:
                                        visa_entry.sponsor_name_english,
                                      sponsor_name_arabic_readonly:
                                        visa_entry.sponsor_name_arabic,
                                      mofa_no_readonly: mofa.mofa_no,
                                      police_clearance_no_readonly:
                                        office_work.police_clearance_no,
                                      oakala_no_readonly: musanedokala.okala_no,
                                      driving_license_no_readonly:
                                        office_work.driving_license_no,
                                      musaned_okala_no_readonly:
                                        musanedokala.musaned_no,
                                      certificate_experience_no_readonly:
                                        office_work.certificate_experience,
                                      passenger: newValue?.id,
                                      createPermission: true,
                                      updatePermission: false,
                                    });
                                    getCurrentStatus(newValue?.id);
                                    navigate(
                                      `/apps/embassy-management/embassys/new`
                                    );
                                  }
                                  // no data scope show alert
                                  else {
                                    navigate(
                                      `/apps/embassy-management/embassys/new`
                                    );

                                    handleReset({
                                      passenger: newValue?.id,
                                      stamping_status: doneNotDone.find(
                                        (data) => data.default
                                      )?.id,
                                    });
                                    getCurrentStatus(newValue?.id);

                                    const medical = `${
                                      res.data?.medical === false
                                        ? "medical,"
                                        : ""
                                    }`;
                                    const mofa = `${
                                      res.data?.mofa == false
                                        ? medical
                                          ? "Mofa,"
                                          : "Mofa"
                                        : ""
                                    }`;
                                    const visaEntry = `${
                                      res.data?.visa_entry == false
                                        ? mofa
                                          ? "Visa-Entry,"
                                          : "Visa-Entry"
                                        : ""
                                    }`;
                                    const noDataItems = `${visaEntry} ${mofa} ${medical}`;

                                    // if(passengerData)

                                    axios
                                      .get(
                                        `${GET_PASSENGER_BY_ID}${newValue?.id}`,
                                        authTOKEN
                                      )
                                      .then((res) => {
                                        if (
                                          res?.data?.target_country?.id === 193
                                        ) {
                                          const message =
                                            `please check "${noDataItems.trim()}" information`.replace(
                                              /\s\s+/g,
                                              " "
                                            );
                                          dispatch(
                                            setAlert({
                                              alertType: "warning",
                                              alertValue: message,
                                            })
                                          );
                                        }
                                      })
                                      .catch(() => {});
                                  }
                                })
                                .catch(() => {
                                  navigate(
                                    `/apps/embassy-management/embassys/new`
                                  );
                                  handleReset({
                                    passenger: newValue?.id,
                                    stamping_status: doneNotDone.find(
                                      (data) => data.default
                                    )?.id,
                                  });
                                  getCurrentStatus(newValue?.id);
                                });
                            } else {
                              navigate(`/apps/embassy-management/embassys/new`);
                              handleReset({
                                passenger: newValue?.id,
                                stamping_status: doneNotDone.find(
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
                      )}
                    />
                  </div>
                  <EmbassyForm />
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

export default Embassy;
