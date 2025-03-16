import { useFormContext } from "react-hook-form";
import CustomDatePicker from "src/app/@components/CustomDatePicker";
import CustomTextField from "src/app/@components/CustomTextField";

function ShiftForm(props) {
  const methods = useFormContext();
  const { setValue, watch, getValues } = methods;

  return (
    <div>
      <CustomTextField name="name" label="Name" required />
      <div className="flex space-x-10">
        {/* <DatePicker2
          name="start_date"
          label="Start Date"
          required
          placeholder="DD-MM-YYYY"
        />
        <DatePicker2
          name="end_date"
          label="End Date"
          required
          placeholder="DD-MM-YYYY"
        /> */}

        <CustomDatePicker
          name="start_date"
          label="Start Date"
          required={true}
          placeholder="DD-MM-YYYY"
        />
        <CustomDatePicker
          name="end_date"
          label="End Date"
          required
          placeholder="DD-MM-YYYY"
        />
      </div>
    </div>
  );
}

export default ShiftForm;
