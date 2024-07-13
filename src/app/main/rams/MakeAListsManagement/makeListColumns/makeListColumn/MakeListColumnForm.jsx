import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { GET_MAKEALIST_CLM_BY_LIST_ID } from 'src/app/constant/constants';
// Ensure this path is correct

function MakeListColumnForm() {
  const { control, setValue, getValues, reset } = useFormContext();
  const [columnValue, setColumnValue] = useState(false);
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
          console.log('booleanKeys', booleanKeys); // Debug statement
          setBooleanKeys(booleanArr);
          setApiData(data); // Assuming data structure is an array of columns
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      console.error('No ID provided');
    }
  }, [param]);

  useEffect(() => {
    reset({ ...getValues(), items: apiData });

    if (!columnValue && apiData.length > 0) {
      apiData.forEach((column) => {
        setValue(`columns.${column.id}.isChecked`, column.isChecked);
        setValue(
          `columns.${column.id}.serial`,
          column.isChecked ? column.serial : null
        );
        setValue(`columns.${column.id}.key`, column.key);
      });
      setColumnValue(true);
    }
  }, [apiData, setValue, getValues, reset, columnValue]);

  function snakeToTitleCase(text) {
    return text
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <div className='grid grid-cols-3 grid-flow-row gap-1'>
      {/* {apiData?.map((clm) => (
        <div
          key={clm.id}
          style={{ flex: '1 0 30%', display: 'flex', alignItems: 'center' }}>
          <Controller
            name={`columns.${clm.id}.serial`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant='outlined'
                className='w-48 mx-5'
                size='small'
                margin='normal'
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <FormControlLabel
            control={
              <Controller
                name={`columns.${clm.id}.isChecked`}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    checked={field.value ? field.value : false}
                  />
                )}
              />
            }
            label={clm.label}
          />
        </div>
      ))} */}
      {apiData &&
        booleanKeys.map((key) => (
          <FormControlLabel
            key={key}
            control={<Checkbox checked={apiData[key]} />}
            label={
              <Typography variant='body1'>{snakeToTitleCase(key)}</Typography>
            }
          />
        ))}
    </div>
  );
}

export default MakeListColumnForm;
