/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from "react";
import CustomDatePicker from "src/app/@components/CustomDatePicker";

import { GET_FORM_CONTENT_DETAILS_BY_TITLE } from "src/app/constant/constants";
import { MANPOWER_SUBMISSION_LIST_FOOTER } from "src/app/constant/FormContentTitle/formContentTitle";
import { makeStyles } from "@mui/styles";
import { Search } from "@mui/icons-material";
import CustomDropdownField from "src/app/@components/CustomDropdownField";
import { getAgencys, getCountries } from "app/store/dataSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

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
    marginTop: "8px",
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

function BmetStampForm({ handleSearchManPowerDateClick }) {
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
  const classes = useStyles({});
  const dispatch = useDispatch();
  const methods = useFormContext();  
  const {setValue ,control,errors   } = methods;
	const { agencies, countries} = useSelector((state) => state.data);

  useEffect(() => {
	
		dispatch(getAgencys());
		dispatch(getCountries());
	
	}, []);
  return (
    <div>
      <div >
      
			<CustomDropdownField
				name="country"
				label="Country"
				options={countries}
          optionLabelFormat={(option) => `${option?.name}`}
         onChange={(newValue) =>
				  setValue('country_name', newValue)
				}
        />
          <CustomDropdownField
				name="agency"
				label="Recruiting Agencys"
				options={agencies}
          optionLabelFormat={(option) => `${option?.name}`}
           onChange={(newValue) =>
				  setValue('agency_info', newValue)
				}
			/>
      
        <div className="w-full flex flex-nowrap ">
          <CustomDatePicker
            name="man_power_date"
            label="Manpower Date"
            placeholder="DD-MM-YYYY"
          />
          <div
          className={classes.searchContainer}
          onClick={() => {
            handleSearchManPowerDateClick();
          }}
        >
          <Search className="cursor-pointer" />
        </div>
        </div>

        
      </div>

      <div></div>
    </div>
  );
}

export default BmetStampForm;
