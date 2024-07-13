import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { GET_MAKEALIST_CLM_BY_LIST_ID } from 'src/app/constant/constants';

function MakeListColumnForm() {
  const { control, setValue, getValues, reset } = useFormContext();
  const [apiData, setApiData] = useState({});
  const [booleanKeys, setBooleanKeys] = useState([]);
  const param = useParams();

  useEffect(() => {
    console.log('Fetched ID from URL:', param.makeAListId, param['*']); // Debug statement
    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token'),
      },
    };

    if (param.makeAListId) {
      const url = `${GET_MAKEALIST_CLM_BY_LIST_ID}${param.makeAListId}`;
      console.log('API URL:', url); // Debug statement
      fetch(url, authTOKEN)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          return response.json();
        })
        .then((data) => {
          const booleanArr = Object.keys(data).filter(
            (key) => typeof data[key] === 'boolean'
          );
          console.log('booleanKeys', booleanArr); // Debug statement
          setBooleanKeys(booleanArr);
          setApiData(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      console.error('No ID provided');
    }
  }, [param]);

  useEffect(() => {
    if (apiData) {
      const formValues = {};
      booleanKeys.forEach((key) => {
        formValues[`columns.${key}.isChecked`] = apiData[key];
      });
      reset({ ...getValues(), ...formValues });
    }
  }, [apiData, booleanKeys, reset, getValues]);

  function snakeToTitleCase(text) {
    return text
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <div className='grid grid-cols-3 grid-flow-row gap-1'>
      {booleanKeys.map((key) => (
        <FormControlLabel
          key={key}
          control={
            <Controller
              name={`columns.${key}.isChecked`}
              control={control}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  checked={field.value || false}
                  onChange={(e) =>
                    setValue(`columns.${key}.isChecked`, e.target.checked)
                  }
                />
              )}
            />
          }
          label={
            <Typography variant='body1'>{snakeToTitleCase(key)}</Typography>
          }
        />
      ))}
    </div>
  );
}

export default MakeListColumnForm;
