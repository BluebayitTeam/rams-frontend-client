/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-alert */

import { Autocomplete, Box, Icon, IconButton, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

import _ from "@lodash";

import axios from "axios";

import {
  getAgencys,
  getAgents,
  getCities,
  getCountries,
  getCurrentStatuss,
  getDemands,
  getPassengerTypes,
  getProfessions,
  getRecruitingAgencys,
  getSubAgents,
  getThanas,
  getThanasBasedOnCity,
  getVisaEntrys,
} from "app/store/dataSlice";
import replaceSpaceToUnderscore from "src/app/@helpers/replaceSpaceToUnderscore";
import CustomDatePicker from "src/app/@components/CustomDatePicker";
import { maritalStatuses, passportTypes, religions } from "src/app/@data/data";
import Image from "src/app/@components/Image";
import {
  BASE_URL,
  CHECK_PASSPORT_NO_WHEN_CREATE,
  CHECK_PASSPORT_NO_WHEN_UPDATE,
  CHECK_VISA_NO_WHEN_CREATE,
  CREATE_PASSENGER_DATA_FROM_IMAGE,
} from "../../../../constant/constants";
import { useCreatePassengerImageMutation } from "../PassengersApi";
import { DatePicker } from "@mui/x-date-pickers";
import { PictureAsPdf } from "@mui/icons-material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DescriptionIcon from "@mui/icons-material/Description";
import jsonToFormData from "src/app/@helpers/jsonToFormData";
import { differenceInYears } from "date-fns";
import { dateAlert } from "src/app/@customHooks/notificationAlert";
import BirthDatePicker from "src/app/@components/BirthDatePicker";
const useStyles = makeStyles((theme) => ({
  hidden: {
    display: "none",
  },
  productImageUpload: {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
}));

function PassengerForm(props) {
  const [previewImage2, setPreviewImage2] = useState();
  const [previewImage1, setPreviewImage1] = useState();
  const [passportImg, setPassportImg] = useState();
  const userID = localStorage.getItem("user_id");
  const [createPassengerImage, data] = useCreatePassengerImageMutation();

  const agents = useSelector((state) => state.data.agents);
  const demands = useSelector((state) => state.data.demands);
  const professions = useSelector((state) => state.data.professions);
  const agencys = useSelector((state) => state.data.agencies);
  const targetCountrys = useSelector((state) => state.data.countries);
  const passengerTypes = useSelector((state) => state.data.passengerTypes);
  const currentStatuss = useSelector((state) => state.data.currentStatuss);
  const visaEntrys = useSelector((state) => state.data.visaEntries);
  const subagents = useSelector((state) => state.data.subagents || []);
  console.log("passengerTypes", passengerTypes);
  const recruitingAgencys = useSelector(
    (state) => state.data.recruitingAgencys
  );

  console.log(`recruitingAgencysxcxc`, subagents);
  const thanas = useSelector((state) => state.data.thanas);
  const districts = useSelector((state) => state.data.cities);
  const classes = useStyles(props);
  const methods = useFormContext();
  const { control, formState, watch, getValues, setError, setValue, reset } =
    methods;
  const { errors, isValid, dirtyFields } = formState;
  const routeParams = useParams();

  const { passengerId } = routeParams;
  const handleDelete = localStorage.getItem("passengerEvent");
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.data.cities);
  console.log("passengerIdxx", handleDelete);

  const [previewslipPicFile, setPreviewslipPicFile] = useState("");
  const [fileExtPCName, setFileExtPCName] = useState("");
  const passportPic = watch("passport_pic");
  console.log("previewslipPicFile", previewslipPicFile);
  const slipPic = watch("passportPic") || "";
  const fileInputRef = useRef(null);
  const [imagesrc, setImagesrc] = useState("");
  const [crop, setCrop] = useState({ aspect: 11 / 9 });
  const [image, setImage] = useState("");
  const [output, setOutput] = useState("");
  const [hide, setHide] = useState(false);

  // eslint-disable-next-line no-console
  console.log("passportPic", passportPic);

  const [passportText, setPassportText] = useState("");

  useEffect(() => {
    console.log(`bsdsfm`, data?.passenger_info);
    reset(data?.data?.passenger_info);
  }, [data?.data?.passenger_info]);

  const genders = [
    { id: "male", name: "Male" },
    { id: "female", name: "Female" },
    { id: "others", name: "Others" },
  ];

  const childSubmitFunc = useRef(null);
  useEffect(() => {
    if (!_.isEmpty(genders) && routeParams.passengerType === "female") {
      const getGender = genders.find(
        (data) => data.name === "Female" || data.name === "female"
      )?.id;

      setValue("gender", getGender);
    }

    if (!_.isEmpty(genders) && routeParams.passengerType === "recruiting") {
      const getGender = genders.find(
        (data) => data.name === "Male" || data.name === "Male"
      )?.id;

      setValue("gender", getGender);
    }

    if (!_.isEmpty(genders) && routeParams.passengerType === "processing") {
      const getGender = genders.find(
        (data) => data.name === "Male" || data.name === "Male"
      )?.id;

      setValue("gender", getGender);
    }
  }, [getValues("passenger_name")]);

  useEffect(() => {
    if (!_.isEmpty(passengerTypes) && routeParams?.passengerType) {
      const matchingPassengerTypes = passengerTypes.find((data) => {
        const passengerTypeName = new RegExp(data.name, "i");

        return replaceSpaceToUnderscore(routeParams.passengerType).match(
          passengerTypeName
        );
      });

      setValue("passenger_type", matchingPassengerTypes?.id);
    }
  }, [watch("passenger_name"), passengerTypes]);

  useEffect(() => {
    if (!_.isEmpty(districts)) {
      const getPspIssPlace = districts.find(
        (data) => data.name === "Dhaka" || data.name === "dhaka"
      )?.id;

      setValue("passport_issue_place", getPspIssPlace);
    }
  }, [districts]);

  useEffect(() => {
    if (!_.isEmpty(currentStatuss)) {
      const getCurrentStatus = currentStatuss.find(
        (data) => data.name === "New File" || data.name === "new file"
      )?.id;

      setValue("current_status", getCurrentStatus);
    } else if (!_.isEmpty(currentStatuss)) {
      const getCurrentStatus = currentStatuss.find(
        (data) => data.name === "New File" || data.name === "new file"
      )?.id;

      setValue("current_status", getCurrentStatus);
    }
  }, [currentStatuss]);

  useEffect(() => {
    if (
      routeParams.passengerType === "hajj" ||
      routeParams.passengerType === "umrah"
    ) {
      const targetCountry = targetCountrys.find(
        (data) => data.name === "Saudi Arabia" || data.name === "Saudi Arabia"
      )?.id;

      setValue("target_country", targetCountry);
    }
  }, [targetCountrys]);

  useEffect(() => {
    dispatch(getAgents());
    dispatch(getSubAgents(""));
    dispatch(getDemands());
    dispatch(getAgencys());
    dispatch(getCountries());
    dispatch(getPassengerTypes());
    dispatch(getCurrentStatuss());
    dispatch(getVisaEntrys());
    dispatch(getThanas());
    dispatch(getCities());
    dispatch(getProfessions());
    dispatch(getRecruitingAgencys());
  }, []);

  function checkPassportNoDuplicate(passportNo) {
    if (routeParams.passengerId === "new") {
      axios
        .get(`${CHECK_PASSPORT_NO_WHEN_CREATE}?passport_no=${passportNo}`)
        .then((res) => {
          if (res.data.passport_no_exists) {
            setError("passport_no", {
              type: "manual",
              message: "Passport No Already Exists",
            });
            props.setDisableCreate(true);
          } else {
            props.setDisableCreate(false);
          }
        });
    } else if (
      routeParams.passengerId !== "new" &&
      routeParams?.passengerType
    ) {
      axios
        .get(
          `${CHECK_PASSPORT_NO_WHEN_UPDATE}?passport_no=${passportNo}&id=${getValues().id}`
        )
        .then((res) => {
          if (res.data.passport_no_exists) {
            setError("passport_no", {
              type: "manual",
              message: "Passport No Already Exists",
            });
            props.setDisableUpdate(true);
          } else {
            props.setDisableUpdate(false);
          }
        });
    }
  }

  function checkVisaNoDuplicate(visaNo) {
    if (routeParams.passengerId === "new") {
      axios.get(`${CHECK_VISA_NO_WHEN_CREATE}${visaNo}`).then((res) => {
        if (res.data.available_visa === 0) {
          setError("visa_entry", {
            type: "manual",
            message: `Sorry You have no visa`,
          });
          // props.setDisableCreate(true);
        } else {
          setError("visa_entry", {
            type: "manual",
            message: `You have only ${res.data.available_visa} Visa`,
          });
          // props.setDisableCreate(false);
        }
      });
    }
  }

  const selectImage = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    const ImageData = URL.createObjectURL(file);

    setImagesrc(ImageData);
  };

  const handleGetPassportImageData = async (passengerImageData) => {
    try {
      const getFormData = jsonToFormData({ image: passengerImageData });

      const authTOKEN = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: localStorage.getItem("jwt_access_token"),
        },
      };

      const response = await axios.post(
        `${CREATE_PASSENGER_DATA_FROM_IMAGE}`,
        getFormData,
        authTOKEN
      );

      reset(response.data.passenger_info);
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle error as per your requirement
    }
  };

  function handleSavePassenger() {
    dispatch(
      savePassenger({
        ...getValues(),
        passport_issue_place: thanas.find(
          (data) => data?.id === getValues()?.passport_issue_place
        )?.name,
        passport_pic: passportPic,
      })
    ).then((res) => {
      if (res.payload?.data?.id) {
        localStorage.setItem("passengerAlert", "savePassenger");
        history.push(`/apps/passenger/passengers/${routeParams.passengerType}`);
      }
    });
  }

  useEffect(() => {
    watch("passport_no") && checkPassportNoDuplicate(watch("passport_no"));
  }, [watch("passport_no")]);

  function handleUpdatePassenger() {
    dispatch(
      updatePassenger({
        ...getValues(),
        passport_issue_place: thanas.find(
          (data) => data?.id === getValues()?.passport_issue_place
        )?.name,
        passport_img: { File: passportImg },
      })
    ).then((res) => {
      console.log("resfdfd", passengerType);
      if (res.payload?.data?.id) {
        if (routeParams.fromSearch === "fromSearch") {
          history.goBack();
        } else {
          localStorage.setItem("passengerAlert", "updatePassenger");
          history.push(
            `/apps/passenger/passengers/${routeParams?.passengerType}`
          );
        }
      }
    });
  }

  const handleSubmitOnKeyDownEnter = (ev) => {
    if (ev.key === "Enter") {
      if (
        routeParams.passengerId === "new" &&
        !(_.isEmpty(dirtyFields) || !isValid)
      ) {
        handleSavePassenger();
      } else if (
        handleDelete !== "Delete" &&
        routeParams?.passengerName &&
        !props.disableUpdate
      ) {
        handleUpdatePassenger();
      }
    }
  };

  const handleRemoveslipPicFile = () => {
    setPreviewslipPicFile(null);

    setFileExtPCName(null);

    setValue("passportPic", "");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <div>
      <Controller
        name={passengerId === "new" ? "created_by" : "updated_by"}
        control={control}
        defaultValue={userID}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className={classes.hidden}
              label="created by"
              id="created_by"
              error={false}
              helperText=""
              variant="outlined"
              fullWidth
            />
          );
        }}
      />
      <div>
        <p className="mt-5">Passport Picture</p>
        <div className="flex flex-col md:flex-row w-full mt-8 mb-16">
          <Controller
            name="passport_pic"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="flex flex-row justify-between w-full items-center">
                <label
                  htmlFor="button-file-1"
                  className={clsx(
                    classes.productImageUpload,
                    "flex items-center justify-center relative w-80 h-60 rounded-12 overflow-hidden cursor-pointer hover:shadow-lg"
                  )}
                >
                  <input
                    accept="image/*"
                    className="hidden"
                    id="button-file-1"
                    type="file"
                    onChange={async (e) => {
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (reader.readyState === 2) {
                          setPreviewImage1(reader.result);
                        }
                      };

                      const file = e.target.files[0];
                      setPassportImg(file);
                      onChange(file);

                      if (file?.size > 5134914) {
                        document.getElementById(
                          "passportPicSizeValidation"
                        ).innerText =
                          "Image file size should not exceed 500 KB";
                      } else {
                        document.getElementById(
                          "passportPicSizeValidation"
                        ).innerText = "";
                        if (routeParams.passengerId === "new") {
                          try {
                            await dispatch(createPassengerImage(file));
                          } catch (error) {
                            console.error(
                              "Error occurred while creating passenger image:",
                              error
                            );
                          }
                        }
                        reader.readAsDataURL(file);
                      }
                    }}
                  />

                  <Icon fontSize="large" color="action">
                    cloud_upload
                  </Icon>
                </label>
              </div>
            )}
          />

          <div className="flex flex-wrap w-full items-center mb-16">
            {/* Render Existing Image */}
            {passportPic && !previewImage1 && (
              <div
                style={{ width: "70px", height: "70px", position: "relative" }}
              >
                <img src={`${BASE_URL}${passportPic}`} alt="not_found" />
              </div>
            )}

            {/* Render Selected Image with Cross Icon */}
            {previewImage1 && (
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img src={previewImage1} alt="Passport" />
                <IconButton
                  style={{
                    position: "absolute",
                    top: "-25px",
                    right: "-8px",
                    color: "red",
                    borderRadius: "50%",
                  }}
                  size="small"
                  onClick={() => {
                    setPreviewImage1(null);
                    setPassportImg(null);
                    onChange(null); // Reset file input
                  }}
                >
                  <HighlightOffIcon fontSize="small" />
                </IconButton>
              </div>
            )}
          </div>
        </div>
        <p className="mb-5 text-red-700	" id="passportPicSizeValidation"></p>
      </div>
      <Controller
        name="agent"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className="mt-8 mb-16 w-full"
            freeSolo
            value={value ? agents.find((data) => data?.id === value) : null}
            options={agents}
            getOptionLabel={(option) =>
              `${option.first_name}  -${option.agent_code} `
            }
            onChange={(event, newValue) => {
              onChange(newValue?.id);
              dispatch(getSubAgents(newValue?.id));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Agent"
                label="Agent"
                helperText={errors?.agent?.message}
                variant="outlined"
                autoFocus
                InputLabelProps={
                  value ? { shrink: true } : { style: { color: "red" } }
                }
              />
            )}
          />
        )}
      />{" "}
      {watch("agent") && (
        <Controller
          name="sub_agent"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <Autocomplete
              className="mt-8 mb-16 w-full"
              freeSolo
              value={
                value ? subagents.find((data) => data?.id === value) : null
              }
              options={subagents}
              getOptionLabel={(option) =>
                `${option.first_name || ""}  ${option.agent_code || ""} `
              }
              onChange={(event, newValue) => {
                onChange(newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Sub Agent"
                  label="Sub Agent"
                  // error={!!errors.agent || !value}
                  helperText={errors?.sub_agent?.message}
                  variant="outlined"
                  autoFocus
                  InputLabelProps={value && { shrink: true }}
                />
              )}
            />
          )}
        />
      )}
      <Controller
        name="passenger_name"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16 w-full  "
              helperText={errors?.passenger_name?.message}
              label="Passenger Name"
              id="passenger_name"
              variant="outlined"
              InputLabelProps={
                field.value ? { shrink: true } : { style: { color: "red" } }
              }
              fullWidth
              onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <Controller
        name="gender"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16 w-full "
            freeSolo
            value={value ? genders.find((data) => data?.id === value) : null}
            options={genders}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Gender"
                label="Gender"
                id="gender"
                // error={!!errors.gender || !value}
                helperText={errors?.gender?.message}
                variant="outlined"
                InputLabelProps={
                  value ? { shrink: true } : { style: { color: "red" } }
                }
              />
            )}
          />
        )}
      />
      <Controller
        name="profession"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className="mt-8 mb-16 w-full  "
            freeSolo
            value={
              value ? professions.find((data) => data?.id === value) : null
            }
            options={professions}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Profession"
                label="Profession"
                // error={!!errors.profession || (!value && routeParams.passengerType != 'female')}
                helperText={errors?.profession?.message}
                variant="outlined"
                InputLabelProps={
                  value ? { shrink: true } : { style: { color: "red" } }
                }
              />
            )}
          />
        )}
      />
      <Controller
        name="agency"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            freeSolo
            value={
              value
                ? recruitingAgencys.find((data) => data?.id === value)
                : null
            }
            options={recruitingAgencys}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Recruiting Agency"
                label="Recruiting Agency"
                error={!!errors.agency}
                helperText={errors?.agency?.message}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      {/* <Controller
        control={control}
        name='date_of_birth'
        render={({ field: { value, onChange } }) => (
          <DatePicker
            value={value ? new Date(value) : null}
            onChange={(val) => {
              onChange(val ? val.toISOString().split('T')[0] : '');
            }}
            className='mt-8 mb-16 w-full'
            slotProps={{
              textField: {
                id: 'date_of_birth',
                label: 'Date Of Birth',
                InputLabelProps: {
                  shrink: true,
                },
                fullWidth: true,
                variant: 'outlined',
                error: !!errors.date_of_birth,
              },
              actionBar: {
                actions: ['clear', 'today'],
              },
            }}
          />
        )}
      /> */}
      <BirthDatePicker
        name="date_of_birth"
        label="Date Of Birth"
        placeholder="DD-MM-YYYY"
        required
      />
      <Controller
        name="target_country"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className="mt-8 mb-16 w-full  "
            freeSolo
            value={
              value ? targetCountrys.find((data) => data?.id === value) : null
            }
            options={targetCountrys}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Target Country"
                label="Target Country"
                // error={!!errors.target_country || !value}
                helperText={errors?.target_country?.message}
                variant="outlined"
                InputLabelProps={
                  value ? { shrink: true } : { style: { color: "red" } }
                }
              />
            )}
          />
        )}
      />
      <Controller
        name="passport_no"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16 w-full  "
              // error={!!errors.passport_no || !field.value}
              helperText={errors?.passport_no?.message}
              label="Passport No"
              id="passport_no"
              variant="outlined"
              InputLabelProps={
                field.value ? { shrink: true } : { style: { color: "red" } }
              }
              fullWidth
              onKeyDown={handleSubmitOnKeyDownEnter}
              onChange={(event, newValue) => {
                field.onChange(event.target.value);
                checkPassportNoDuplicate(event.target.value);
              }}
            />
          );
        }}
      />
      <Controller
        name="passport_issue_place"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className="mt-8 mb-16 w-full  "
            freeSolo
            value={
              value
                ? districts.find(
                    (data) => data.id === value || data.name === value
                  )
                : null
            }
            options={districts}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!value}
                placeholder="Select Passport Issue Place"
                label="Passport Issue Place"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        control={control}
        name="passport_issue_date"
        render={({ field: { value, onChange } }) => (
          <DatePicker
            value={value ? new Date(value) : null}
            onChange={(val) => {
              if (val) {
                const issueDate = new Date(val);
                const expiryDate = new Date(issueDate);
                expiryDate.setFullYear(issueDate.getFullYear() + 10);

                onChange(issueDate.toISOString().split("T")[0]); // Format to YYYY-MM-DD
                setValue(
                  "passport_expiry_date",
                  expiryDate.toISOString().split("T")[0]
                );
              } else {
                onChange("");
                setValue("passport_expiry_date", "");
              }
            }}
            className="mt-8 mb-16 w-full"
            slotProps={{
              textField: {
                id: "passport_issue_date",
                label: "Passport Issue Date",
                InputLabelProps: value
                  ? { shrink: true }
                  : { style: { color: "red" } },
                fullWidth: true,
                variant: "outlined",
                error: !!errors.passport_issue_date,
                helperText: errors?.passport_issue_date?.message,
              },
              actionBar: {
                actions: ["clear", "today"],
              },
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="passport_expiry_date"
        render={({ field: { value, onChange } }) => (
          <DatePicker
            value={value ? new Date(value) : null}
            onChange={(val) => {
              onChange(val ? val.toISOString().split("T")[0] : ""); // Format to YYYY-MM-DD
            }}
            className="mt-8 mb-16 w-full"
            slotProps={{
              textField: {
                id: "passport_expiry_date",
                label: "Passport Expiry Date",
                InputLabelProps: {
                  shrink: true,
                },
                fullWidth: true,
                variant: "outlined",
                error: !!errors.passport_expiry_date,
                helperText: errors?.passport_expiry_date?.message,
              },
              actionBar: {
                actions: ["clear", "today"],
              },
            }}
          />
        )}
      />
      <div
        style={{
          display: routeParams.passengerType === "hajj" ? "block" : "none",
        }}
      >
        <CustomDatePicker
          name="travel_year"
          views={["year"]}
          label="Travel Year"
          required
          placeholder="YYYY"
        />
      </div>
      <Controller
        name="tracking_no"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16 w-full "
              style={{
                display:
                  routeParams.passengerType === "hajj" ? "block" : "none",
              }}
              label="Tracking No"
              id="tracking_no"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <Controller
        name="serial_no"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16 w-full "
              style={{
                display:
                  routeParams.passengerType === "hajj" ? "block" : "none",
              }}
              label="Hajj Serial No"
              id="serial_no"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <Controller
        name="district"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            freeSolo
            value={value ? cities.find((data) => data.id === value) : null}
            options={cities}
            getOptionLabel={(option) => `${option?.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
              dispatch(getThanasBasedOnCity(newValue?.id));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select District"
                label="District"
                helperText={errors?.city?.message}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                //
              />
            )}
          />
        )}
      />
      <Controller
        name="police_station"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className="mt-8 mb-16 w-full  "
            freeSolo
            value={value ? thanas.find((data) => data.id === value) : null}
            options={thanas}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Police Station"
                label="Police Station"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name="office_serial"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16 w-full "
              label="Office Serial"
              id="office_serial"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <div
        style={{
          display: "none",
        }}
      >
        <Controller
          name="passenger_type"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <Autocomplete
              className="mt-8 mb-16 w-full  "
              freeSolo
              disabled
              value={
                value ? passengerTypes.find((data) => data.id === value) : null
              }
              options={passengerTypes}
              getOptionLabel={(option) => `${option.name}`}
              onChange={(event, newValue) => {
                onChange(newValue?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Passenger Type"
                  label="Passenger Type"
                  helperText={errors?.passenger_type?.message}
                  variant="outlined"
                  InputLabelProps={
                    value ? { shrink: true } : { style: { color: "red" } }
                  }
                />
              )}
            />
          )}
        />
      </div>
      <Controller
        name="father_name"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16 w-full  "
              label="Father Name"
              id="father_name"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <Controller
        name="mother_name"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16 w-full  "
              label="Mother Name"
              id="mother_name"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <Controller
        name="spouse_name"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16 w-full  "
              label="Spouse Name"
              id="spouse_name"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <Controller
        name="religion"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className="mt-8 mb-16 w-full  "
            freeSolo
            value={value ? religions.find((data) => data.id === value) : null}
            options={religions}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Religion"
                label="Religion"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name="post_office"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16 w-full  "
              label="Post Office"
              id="post_office"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <Controller
        name="village"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16 w-full  "
              label="Village"
              id="village"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <Controller
        name="marital_status"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className="mt-8 mb-16 w-full  "
            freeSolo
            value={
              value ? maritalStatuses.find((data) => data.id === value) : null
            }
            options={maritalStatuses}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Marital Status"
                label="Marital Status"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name="contact_no"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16 w-full  "
              label="Contact No"
              id="contact_no"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <Controller
        name="nid"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16 w-full  "
              label="NID"
              id="nid"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <Controller
        name="place_of_birth"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16 w-full  "
              label="Place Of Birth"
              id="place_of_birth"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <Controller
        name="demand"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className="mt-8 mb-16 w-full  "
            freeSolo
            value={value ? demands.find((data) => data.id === value) : null}
            options={demands}
            getOptionLabel={(option) =>
              `${option.profession?.name || ""}(${option.company_name || ""})`
            }
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Demand"
                label="Demand"
                // error={!!errors.demand}
                helperText={errors?.demand?.message}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name="emergency_contact_no"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16 w-full  "
              label="Emergency Contact No"
              id="emergency_contact_no"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <Controller
        name="visa_entry"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className="mt-8 mb-16 w-full  "
            freeSolo
            value={value ? visaEntrys.find((data) => data.id === value) : null}
            options={visaEntrys}
            getOptionLabel={(option) => `${option.visa_number}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);

              checkVisaNoDuplicate(newValue?.visa_number);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Visa Entry"
                // error={!!errors.visa_entry}
                helperText={errors?.visa_entry?.message}
                label="Visa Entry"
                id="visa_entry"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name="current_status"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className="mt-8 mb-16 w-full  "
            freeSolo
            value={
              value ? currentStatuss.find((data) => data.id === value) : null
            }
            options={currentStatuss}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Current Status"
                label="Current Status"
                id="current_status"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name="passport_type"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className="mt-8 mb-16 w-full  "
            freeSolo
            value={
              value ? passportTypes.find((data) => data?.id === value) : null
            }
            options={passportTypes}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Passport Type"
                label="Passport Type"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name="place_of_residence"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16 w-full  "
              label="Place Of Residence"
              id="place_of_residence"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              onKeyDown={handleSubmitOnKeyDownEnter}
            />
          );
        }}
      />
      <Controller
        name="notes"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16 w-full"
              label="Remarks"
              id="notes"
              variant="outlined"
              multiline
              rows={3}
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
      <div className="flex md:space-x-12 flex-col md:flex-row">
        <div className="flex flex-wrap w-full   my-2 justify-evenly items-center">
          {passportPic && !previewImage1 && (
            <div style={{ width: "100px", height: "100px" }}>
              <img src={`${BASE_URL}${passportPic}`} alt="not_found" />
            </div>
          )}

          <div style={{ width: "100px", height: "100px" }}>
            <img label="Passport Picture" src={previewImage1} alt="" />
          </div>
        </div>

        <div className="flex flex-wrap w-full   my-2 justify-evenly">
          <Image
            name="passenger_pic"
            label="Passenger Picture"
            previewImage={previewImage2}
            setPreviewImage={setPreviewImage2}
          />
        </div>
      </div>
    </div>
  );
}

export default PassengerForm;
