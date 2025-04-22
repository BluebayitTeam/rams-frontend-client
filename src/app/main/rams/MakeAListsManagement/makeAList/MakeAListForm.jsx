import {
  Autocomplete,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {
  getCurrentStatuss,
  getDemandVisaEntrys,
  getMedicalCenters,
  getRecruitingAgencys,
} from "app/store/dataSlice";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import CustomDatePicker from "src/app/@components/CustomDatePicker";

function MakeAListForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch, setValue } = methods;
  const { errors } = formState;
  const trades = useSelector((state) => state.data.demandVisaEntrys);
  const medicalCenters = useSelector((state) => state.data.medicalCenters);
  const currentStatuss = useSelector((state) => state.data.currentStatuss);
  const recruitingAgencys = useSelector(
    (state) => state.data.recruitingAgencys
  );
  const routeParams = useParams();
  const { makeAListId } = routeParams;

  useEffect(() => {
    dispatch(getDemandVisaEntrys());
    dispatch(getMedicalCenters());
    dispatch(getCurrentStatuss());
    dispatch(getRecruitingAgencys());
  }, [dispatch]);

  const resetValuesForTypeOthers = () => {
    setValue("trade", "");
    setValue("medical_center", "");
    setValue("recruiting_agency", "");
    setValue("recruiting_agency_transfer", "");
  };

  useEffect(() => {
    if (watch("type") === "others") {
      resetValuesForTypeOthers();
    }
  }, [watch("type")]);

  return (
    <div>
      <Controller
        name="type"
        control={control}
        defaultValue="medical_re_medical"
        className="my-10"
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            style={{ flexDirection: "row" }}
            id="type"
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
          >
            <FormControlLabel
              value="medical_re_medical"
              control={<Radio />}
              label="Medical/Re-Medical"
            />
            <FormControlLabel
              value="transfer"
              control={<Radio />}
              label="Transfer"
            />
            <FormControlLabel
              value="others"
              control={<Radio />}
              label="Others"
            />
          </RadioGroup>
        )}
      />
      {/* Text Field for 'title' */}
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value || ""}
            className="mt-8 mb-16"
            helperText={errors?.title?.message}
            label="Title"
            id="title"
            variant="outlined"
            InputLabelProps={
              field.value ? { shrink: true } : { style: { color: "red" } }
            }
            fullWidth
            autoFocus
          />
        )}
      />

      {/* Autocomplete for 'trade' */}
      {watch("type") !== "others" && (
        <Controller
          name="trade"
          control={control}
          render={({ field }) => (
            <Autocomplete
              className="mt-8 mb-16"
              freeSolo
              value={
                field.value
                  ? trades.find((data) => data.id === field.value)
                  : null
              }
              options={trades}
              getOptionLabel={(option) =>
                `${option.profession}(${option.company_name})`
              }
              onChange={(event, newValue) => field.onChange(newValue?.id)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Trade"
                  label="Trade"
                  helperText={errors?.trade?.message}
                  variant="outlined"
                  autoFocus
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />
      )}

      {/* Autocomplete for 'medical_center' */}
      {watch("type") !== "others" && (
        <Controller
          name="medical_center"
          control={control}
          render={({ field }) => (
            <Autocomplete
              className="mt-8 mb-16"
              freeSolo
              value={
                field.value
                  ? medicalCenters.find((data) => data.id === field.value)
                  : null
              }
              options={medicalCenters}
              getOptionLabel={(option) => `${option.name}`}
              onChange={(event, newValue) => field.onChange(newValue?.id)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Medical Center"
                  label="Medical Center"
                  helperText={errors?.medical_center?.message}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />
      )}

      {/* Autocomplete for 'recruiting_agency_transfer' */}
      {watch("type") !== "others" && (
        <Controller
          name="recruiting_agency_transfer"
          control={control}
          render={({ field }) => (
            <Autocomplete
              className="mt-8 mb-16"
              freeSolo
              value={
                field.value
                  ? recruitingAgencys.find((data) => data.id === field.value)
                  : null
              }
              options={recruitingAgencys}
              getOptionLabel={(option) => `${option.name}`}
              onChange={(event, newValue) => field.onChange(newValue?.id)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Office/Visa Agent:"
                  label="Office/Visa Agent:"
                  id="recruiting_agency_transfer"
                  error={!!errors.recruiting_agency_transfer}
                  helperText={errors?.recruiting_agency_transfer?.message}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />
      )}

      {/* DatePicker for 'make_date' */}

      <CustomDatePicker
        name="make_date"
        label="Make Date"
        required
        placeholder="DD-MM-YYYY"
      />

      {/* Autocomplete for 'current_status' */}
      <Controller
        name="current_status"
        control={control}
        render={({ field }) => (
          <Autocomplete
            className="mt-16 mb-16"
            freeSolo
            value={
              field.value
                ? currentStatuss.find((data) => data.id === field.value)
                : null
            }
            options={currentStatuss}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => field.onChange(newValue?.id)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select current status"
                label="Current Status"
                id="current_status"
                helperText={errors?.current_status?.message}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />

      {/* TextField for 'note' */}
      <Controller
        name="note"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value || ""}
            className="mt-8 mb-16"
            label="Note"
            id="note"
            variant="outlined"
            multiline
            rows={4}
            InputLabelProps={field.value && { shrink: true }}
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default MakeAListForm;
