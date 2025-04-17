/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { FormControl } from "@mui/base";
import { useNavigate, useParams } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  Icon,
  IconButton,
  InputAdornment,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {
  getAgents,
  getCities,
  getCountries,
  getGroups,
  getThanas,
  getThanasBasedOnCity,
} from "app/store/dataSlice";
import { makeStyles } from "@mui/styles";

import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import countryCodes from "src/app/@data/countrycodes";
import { genders } from "src/app/@data/data";

import {
  BASE_URL,
  CHECK_EMAIL_EMPLOYEE,
  CHECK_PRIMARY_PHONE,
  CHECK_USERNAME_EMPLOYEE,
} from "src/app/constant/constants";
import FileUpload from "src/app/@components/FileUploader";
import CustomDatePicker from "src/app/@components/CustomDatePicker";
import {
  AddedSuccessfully,
  UpdatedSuccessfully,
} from "src/app/@customHooks/notificationAlert";
import {
  useCreateSubAgentMutation,
  useUpdateSubAgentMutation,
} from "../SubAgentsApi";
import CustomTextField from "src/app/@components/CustomTextField";
import CustomPhoneWithCountryCode from "src/app/@components/CustomPhoneWithCountryCode";
import axios from "axios";
import _ from "lodash";

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

function SubAgentForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch, setValue, getValues, setError } = methods;
  const { errors, isValid, dirtyFields } = formState;
  const routeParams = useParams();
  const { subAgentId } = routeParams;
  const classes = useStyles(props);
  const thanas = useSelector((state) => state.data.thanas);
  const navigate = useNavigate();

  const cities = useSelector((state) => state.data.cities);
  const agents = useSelector((state) => state.data.agents);
  const countries = useSelector((state) => state.data.countries);
  const groups = useSelector((state) => state.data.groups);
  const getCountryCode1 = watch("country_code1");
  const [createSubAgent] = useCreateSubAgentMutation();
  const [saveSubAgent] = useUpdateSubAgentMutation();
  const [file, setFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    dispatch(getThanas());
    dispatch(getAgents());
    dispatch(getCities());
    dispatch(getCountries());
    dispatch(getGroups());
  }, []);

  useEffect(() => {
    const currentImage = getValues("image");

    if (currentImage && !currentImage.name) {
      setFile(`${BASE_URL}/${currentImage}`);
    }
  }, [subAgentId, watch("image")]);
  const handleChnageCountry = (selectedCountry) => {
    const countryID = countries.find(
      (data) => data.name === selectedCountry
    )?.id;
    setValue("country", countryID);
  };

  const handleCheckUserName = async (name) => {
    const response = await axios.get(
      `${CHECK_USERNAME_EMPLOYEE}?username=${name}&id=${subAgentId === "new" ? "" : subAgentId}&type=${subAgentId === "new" ? "create" : "update"}`
    );

    if (response?.data.username_exists) {
      setError("username", {
        type: "manual",
        message: "User Name Already Exists",
      });
    }
  };

  const handleCheckEmail = async (email) => {
    if (!email.trim()) {
      // Optionally clear the email error if it's empty
      setError("email", {
        type: "manual",
        message: "Email cannot be empty",
      });
      return;
    }

    try {
      const response = await axios.get(
        `${CHECK_EMAIL_EMPLOYEE}?email=${email}&id=${subAgentId === "new" ? "" : subAgentId}&type=${subAgentId === "new" ? "create" : "update"}`
      );

      if (response?.data.email_exists) {
        setError("email", {
          type: "manual",
          message: "Email Already Exists",
        });
      } else {
        // Optionally clear the error if the email doesn't exist
        clearErrors("email");
      }
    } catch (error) {
      s;
      // Handle error, possibly log it or show a user-friendly message
      console.error("Error checking email:", error);
    }
  };

  const handleCheckPhone = async () => {
    const formattedPhoneNumber = `${watch("country_code1")}${watch("primary_phone")}`;
    try {
      const response = await axios.get(
        `${CHECK_PRIMARY_PHONE}?primary_phone=${formattedPhoneNumber}&id=${subAgentId === "new" ? "" : subAgentId}&type=${subAgentId === "new" ? "create" : "update"}`
      );

      if (response?.data?.primary_phone_exists) {
        setError("primary_phone", {
          type: "manual",
          message: "Phone number already exists",
        });
      }
    } catch (error) {
      console.error("Error checking phone number:", error);
      // Handle errors if needed
    }
  };

  function handleUpdateSubAgent() {
    saveSubAgent(getValues()).then((data) => {
      UpdatedSuccessfully();

      navigate(`/apps/subAgent/subAgents`);
    });
  }

  function handleCreateSubAgent() {
    createSubAgent(getValues())
      .unwrap()
      .then((data) => {
        AddedSuccessfully();

        navigate(`/apps/subAgent/subAgents`);
      });
  }

  const handleSubmitOnKeyDownEnter = (ev) => {
    if (ev.key === "Enter") {
      if (subAgentId === "new" && !_.isEmpty(dirtyFields) && isValid) {
        handleCreateSubAgent();
      } else if (subAgentId !== "new") {
        handleUpdateSubAgent();
      }
    }
  };

  return (
    <div>
      <Controller
        name="agents"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            freeSolo
            value={value ? agents.find((data) => data.id === value) : null}
            options={agents}
            getOptionLabel={(option) =>
              `${option.first_name || ""} ${option.last_name || ""}- ${option.agent_code || ""}`
            }
            onChange={(event, newValue) => {
              onChange(newValue?.id);
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
      />

      <Controller
        name="first_name"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16  "
              helperText={
                <span style={{ color: "red" }}>
                  {errors?.first_name?.message}
                </span>
              }
              label="Sub Agent Name"
              id="first_name"
              onKeyDown={handleSubmitOnKeyDownEnter}
              variant="outlined"
              InputLabelProps={
                field.value ? { shrink: true } : { style: { color: "red" } }
              }
              fullWidth
            />
          );
        }}
      />

      <Controller
        name="father_name"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16"
              helperText={errors?.father_name?.message}
              label="Father Name"
              onKeyDown={handleSubmitOnKeyDownEnter}
              id="father_name"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
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
              className="mt-8 mb-16"
              helperText={errors?.mother_name?.message}
              label="Mother Name"
              onKeyDown={handleSubmitOnKeyDownEnter}
              id="mother_name"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />

      <CustomTextField
        name="username"
        label="UserName"
        required
        onKeyDown={handleSubmitOnKeyDownEnter}
        onChange={(e) => {
          handleCheckUserName(e.target.value);
        }}
      />

      <CustomTextField
        name="email"
        label="Email"
        onKeyDown={handleSubmitOnKeyDownEnter}
        required
        onChange={(e) => {
          handleCheckEmail(e.target.value);
        }}
      />

      {subAgentId === "new" && (
        <>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                label="Password"
                type="password"
                helperText={
                  <span style={{ color: "red" }}>
                    {errors?.password?.message}
                  </span>
                }
                variant="outlined"
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
                InputProps={{
                  className: "pr-2",
                  type: showPassword ? "text" : "password",
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon className="text-20" color="action">
                          {showPassword ? "visibility" : "visibility_off"}
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={
                  field.value ? { shrink: true } : { style: { color: "red" } }
                }
                required
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                label="Confirm Password"
                type="password"
                helperText={
                  <span style={{ color: "red" }}>
                    {errors.confirmPassword?.message ||
                      (watch("password") !== watch("confirmPassword") &&
                        "Passwords must match")}
                  </span>
                }
                variant="outlined"
                fullWidth
                onKeyDown={handleSubmitOnKeyDownEnter}
                InputProps={{
                  className: "pr-2",
                  type: showConfirmPassword ? "text" : "password",
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <Icon className="text-20" color="action">
                          {showConfirmPassword
                            ? "visibility"
                            : "visibility_off"}
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={
                  field.value ? { shrink: true } : { style: { color: "red" } }
                }
                required
              />
            )}
          />
        </>
      )}

      <Controller
        name="gender"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            freeSolo
            value={value ? genders.find((data) => data.id === value) : null}
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
                helperText={errors?.gender?.message}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />

      <CustomPhoneWithCountryCode
        getCountryCode1={getCountryCode1}
        countryName="country_code1"
        countryLabel="Select Country"
        countryCodeLabel="Country Code"
        phoneName="primary_phone"
        phoneLabel="Phone"
        onKeyDown={handleSubmitOnKeyDownEnter}
        onChange={() => {
          handleCheckPhone();
        }}
        required
      />

      <Controller
        name="user_type"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16"
              helperText={errors?.user_type?.message}
              onKeyDown={handleSubmitOnKeyDownEnter}
              label="User Type"
              id="user_type"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />

      <CustomDatePicker
        name="date_of_birth"
        label="Date of Birth"
        required
        placeholder="DD-MM-YYYY"
      />

      <Controller
        name="is_active"
        control={control}
        render={({ field }) => (
          <FormControl>
            <FormControlLabel
              label="Is active"
              control={
                <Checkbox
                  {...field}
                  color="primary"
                  checked={field.value || false}
                />
              }
            />
          </FormControl>
        )}
      />

      <Controller
        name="street_address_one"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16"
              helperText={errors?.street_address_one?.message}
              onKeyDown={handleSubmitOnKeyDownEnter}
              label="Street Address One"
              id="street_address_one"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />

      <Controller
        name="street_address_two"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16"
              helperText={errors?.street_address_two?.message}
              onKeyDown={handleSubmitOnKeyDownEnter}
              label="Street Address Two"
              id="street_address_two"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="country"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            freeSolo
            value={value ? countries.find((data) => data.id === value) : null}
            options={countries}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Country"
                label="Country"
                helperText={errors?.country?.message}
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
        name="city"
        control={control}
        render={({ field: { onChange, value } }) => (
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
                onKeyDown={handleSubmitOnKeyDownEnter}
                helperText={errors?.city?.message}
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
        name="thana"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            freeSolo
            value={value ? thanas.find((data) => data?.id === value) : null}
            options={thanas}
            getOptionLabel={(option) => `${option?.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Police Station"
                label="Police Station"
                helperText={errors?.thana?.message}
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
        name="postal_code"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16"
              helperText={errors?.postal_code?.message}
              label="Postal Code"
              onKeyDown={handleSubmitOnKeyDownEnter}
              id="postal_code"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
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
              className="mt-8 mb-16"
              helperText={errors?.nid?.message}
              label="NID"
              id="nid"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
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
              className="mt-8 mb-16"
              helperText={errors.notes?.message}
              label="Notes*"
              id="notes"
              multiline
              rows={4}
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />

      <div className="text-center">
        <div>
          <FileUpload
            name="image"
            label="File"
            control={control}
            setValue={setValue}
            setFile={setFile}
            file={file}
            BASE_URL={BASE_URL}
            classes={classes}
          />
        </div>
      </div>
    </div>
  );
}

export default SubAgentForm;
