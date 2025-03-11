import { getCities, getCountries, getThanas } from 'app/store/dataSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CustomCheckbox from 'src/app/@components/CustomCheckbox';
import CustomDropdownField from 'src/app/@components/CustomDropdownField';
import CustomTextField from 'src/app/@components/CustomTextField';

function BranchForm(props) {
  const dispatch = useDispatch();
  const { cities, countries } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(getThanas());
    dispatch(getCountries());
    dispatch(getCities());
  }, []);
  return (
    <div>
      <CustomTextField name='name' label='Name' required />

      <CustomDropdownField
        name='country'
        label='Country'
        options={countries}
        optionLabelFormat={(option) => `${option?.name}`}
        required
      />

      <CustomDropdownField
        name='city'
        label='City'
        options={cities}
        required
        optionLabelFormat={(option) => `${option?.name}`}
      />

      <CustomDropdownField
        name='thana'
        label='Thana'
        options={cities}
        required
        optionLabelFormat={(option) => `${option?.name}`}
      />

      <CustomTextField
        name='street_address_one'
        label='Primary address'
        required
      />
      <CustomTextField
        name='short_desc'
        label='Short Description'
        multiline
        rows={3}
      />

      <CustomTextField
        name='full_desc'
        label='Full Description'
        multiline
        rows={3}
      />
      <CustomCheckbox name='is_active' label='Is active' />

      <CustomTextField name='postal_code' label='Postal Code' />
    </div>
  );
}

export default BranchForm;
