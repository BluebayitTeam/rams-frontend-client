/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { useParams } from "react-router-dom";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import {
  getAgencys,
  getAgents,
  getCities,
  getCountries,
  getCurrentStatuss,
  getPassengers,
  getProfessions,
  getThanas,
} from "app/store/dataSlice";
import { makeStyles } from "@mui/styles";

import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "src/app/constant/constants";
import { genders, maritalStatuses, religions } from "src/app/@data/data";
import CustomDatePicker from "src/app/@components/CustomDatePicker";
import FileUpload from "src/app/@components/FileUploader";
import { DatePicker } from "@mui/x-date-pickers";
import CustomDropdownField from "src/app/@components/CustomDropdownField";
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

function CvBankForm(props) {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("user_id");
  const { countries, cities, thanas, professions } = useSelector(
    (state) => state.data || {}
  );

  const classes = useStyles(props);

  const methods = useFormContext();
  const routeParams = useParams();
  const { cvBankId } = routeParams;
  const { control, formState, watch, getValues, setValue } = methods;
  const { errors } = formState;

  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(getProfessions());
    dispatch(getCountries());
    dispatch(getCurrentStatuss());
    dispatch(getAgents());
    dispatch(getAgencys());
    dispatch(getCountries());
    dispatch(getThanas());
    dispatch(getCities());
  }, []);

  useEffect(() => {}, [watch("date_of_birth")]);

  useEffect(() => {
    const currentImage = getValues("file");

    if (currentImage && !currentImage.name) {
      setFile(`${BASE_URL}/${currentImage}`);
    }
  }, [cvBankId, watch("file")]);

  return (
    <div>
      <Controller
        name={cvBankId === "new" ? "created_by" : "updated_by"}
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
      <Controller
        name="passenger_name"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              className="mt-8 mb-16 w-full  "
              // error={!!errors.passenger_name || !field.value}
              helperText={errors?.passenger_name?.message}
              label="Passenger Name"
              id="passenger_name"
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
        name="gender"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16 w-full  "
            freeSolo
            value={value ? genders?.find((data) => data.id === value) : null}
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
                InputLabelProps={{
                  shrink: true,
                }}
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
              value ? professions?.find((data) => data.id === value) : null
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
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <BirthDatePicker
        name="date_of_birth"
        label="Date Of Birth"
        placeholder="DD-MM-YYYY"
        required
      />
      <CustomDropdownField
        name="target_country"
        label="Target Country"
        options={countries}
        className="mt-8 mb-16 w-full"
        optionLabelFormat={(option) => `${option.name}`}
        onChange={(newValue) => setValue("target_country", newValue)}
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
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
              onChange={(event, newValue) => {
                field.onChange(event.target.value);
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
                ? cities?.find(
                    (data) => data.id === value || data.name === value
                  )
                : null
            }
            options={cities}
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
      <Controller
        name="district"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className="mt-8 mb-16 w-full  "
            freeSolo
            value={value ? cities?.find((data) => data.id === value) : null}
            options={cities}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
              dispatch(getThanasBasedOnCity(newValue?.id));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select District"
                label="District"
                // error={!!errors.district}
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
        name="police_station"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Autocomplete
            className="mt-8 mb-16 w-full  "
            freeSolo
            value={value ? thanas?.find((data) => data.id === value) : null}
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
                // error={!!errors.police_station}
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
              className="mt-8 mb-16 w-full  "
              label="Father Name"
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
              className="mt-8 mb-16 w-full  "
              label="Mother Name"
              id="mother_name"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
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
            value={value ? religions?.find((data) => data.id === value) : null}
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
              value ? maritalStatuses?.find((data) => data.id === value) : null
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
            />
          );
        }}
      />{" "}
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
            />
          );
        }}
      />
      <Controller
        name="post"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              value={field.value || ""}
              className="mt-8 mb-16"
              // error={!!errors.post}
              helperText={errors?.post?.message}
              label="Post"
              id="post"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="experience"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              value={field.value || ""}
              className="mt-8 mb-16"
              // error={!!errors.experience}
              helperText={errors?.experience?.message}
              label="Experience Task"
              id="experience"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="year_of_experience"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              value={field.value || ""}
              className="mt-8 mb-16"
              // error={!!errors.year_of_experience}
              helperText={errors?.year_of_experience?.message}
              label="Experience Period"
              id="year_of_experience"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
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
              value={field.value || ""}
              className="mt-8 mb-16"
              // error={!!errors.place_of_birth}
              helperText={errors?.place_of_birth?.message}
              label="Place Of Birth"
              id="place_of_birth"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="place_of_residence"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              value={field.value || ""}
              className="mt-8 mb-16"
              // error={!!errors.place_of_residence}
              helperText={errors?.place_of_residence?.message}
              label="Place Of Residence"
              id="place_of_residence"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="number_of_children"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              value={field.value || ""}
              className="mt-8 mb-16"
              // error={!!errors.number_of_children}
              helperText={errors?.number_of_children?.message}
              label="Number Of Children"
              id="number_of_children"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="height"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              value={field.value || ""}
              className="mt-8 mb-16"
              // error={!!errors.height}
              helperText={errors?.height?.message}
              label="Height"
              id="height"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="weight"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              value={field.value || ""}
              className="mt-8 mb-16"
              // error={!!errors.weight}
              helperText={errors?.weight?.message}
              label="weight"
              id="weight"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="education"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              value={field.value || ""}
              className="mt-8 mb-16"
              // error={!!errors.education}
              helperText={errors?.education?.message}
              label="Education"
              id="education"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="arabic_skill"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              value={field.value || ""}
              className="mt-8 mb-16"
              // error={!!errors.arabic_skill}
              helperText={errors?.arabic_skill?.message}
              label="Arabic Skill"
              id="arabic_skill"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="english_skill"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              value={field.value || ""}
              className="mt-8 mb-16"
              // error={!!errors.english_skill}
              helperText={errors?.english_skill?.message}
              label="English Skill"
              id="english_skill"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="salary"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              value={field.value || ""}
              className="mt-8 mb-16"
              // error={!!errors.salary}
              helperText={errors?.salary?.message}
              label="Salary"
              id="salary"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="complexion"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              value={field.value || ""}
              className="mt-8 mb-16"
              // error={!!errors.complexion}
              helperText={errors?.complexion?.message}
              label="Complexion"
              id="complexion"
              variant="outlined"
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
      <Controller
        name="remarks"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              value={field.value || ""}
              className="mt-8 mb-16"
              // error={!!errors.remarks}
              helperText={errors?.remarks?.message}
              label="Remarks"
              id="remarks"
              variant="outlined"
              multiline
              rows={4}
              InputLabelProps={field.value && { shrink: true }}
              fullWidth
            />
          );
        }}
      />
      <div className="text-center">
        <div>
          <FileUpload
            name="file"
            label="file"
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

export default CvBankForm;
