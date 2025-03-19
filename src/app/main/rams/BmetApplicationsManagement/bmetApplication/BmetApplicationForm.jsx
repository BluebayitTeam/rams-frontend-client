/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from "react";
import CustomDatePicker from "src/app/@components/CustomDatePicker";

import { GET_FORM_CONTENT_DETAILS_BY_TITLE } from "src/app/constant/constants";
import { MANPOWER_SUBMISSION_LIST_FOOTER } from "src/app/constant/FormContentTitle/formContentTitle";
import CustomTextField from "src/app/@components/CustomTextField";
import { genders } from "src/app/@data/data";
import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

function BmetApplicationForm({ handleSearchManPowerDateClick }) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  useEffect(() => {
    const authTOKEN = {
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("jwt_access_token"),
      },
    };

    fetch(
      `${GET_FORM_CONTENT_DETAILS_BY_TITLE}${MANPOWER_SUBMISSION_LIST_FOOTER}`,
      authTOKEN
    )
      .then((response) => response.json())
      .then((data) =>
        sessionStorage.setItem(
          "formContentFooterData",
          data?.formcontent_detail[0]?.details || ""
        )
      );
  }, []);

  return (
    <div>
      <div className="flex flex-nowrap gap-4">
        <div className="w-full mt-8">
          <CustomDatePicker
            name="man_power_date"
            label="Manpower Date"
            placeholder="DD-MM-YYYY"
          />
        </div>

        <div className="w-full">
          {/* <CustomTextField name="gender" label="Gender" /> */}
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
                    //
                  />
                )}
              />
            )}
          />
        </div>
      </div>

      <div>
        <button
          style={{
            background: "white",
            border: "1px solid grey",
            borderRadius: "4px",
            padding: "0px 5px",
            height: "35px",
            marginLeft: "30px",
          }}
          onClick={() => {
            handleSearchManPowerDateClick();
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default BmetApplicationForm;
