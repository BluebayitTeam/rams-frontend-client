import { getAgencys } from "app/store/dataSlice";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CustomDatePicker from "src/app/@components/CustomDatePicker";
import CustomDropdownField from "src/app/@components/CustomDropdownField";
import CustomTextField from "src/app/@components/CustomTextField";

function BmetV2ApplicationForm({ handleSearchManPowerDateClick }) {
  const dispatch = useDispatch();
  const {
    formState: { errors },
  } = useFormContext();


  const { agencies } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(getAgencys());
  }, [dispatch]);

  return (
    <div>
      <div className="flex flex-nowrap gap-7 ">
        <div className="w-full">
          <CustomDropdownField
            name="agency"
            label="Agency"
            options={agencies}
            optionLabelFormat={(option) => `${option?.name}`}
            error={errors.agency?.message}
            required
          />
        </div>

        <div className="w-full">
          <CustomDatePicker
            name="man_power_date"
            label="Manpower Date"
            placeholder="DD-MM-YYYY"
            required
            error={errors?.man_power_date?.message}
          />
        </div>
        <div className="w-full">
          <CustomTextField
            name="gender"
            label="Gender"
            error={errors.gender?.message}
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
          onClick={handleSearchManPowerDateClick}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default BmetV2ApplicationForm;
