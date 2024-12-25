

import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


import {  Paper, Typography } from '@mui/material';
import history from '@history';
// import { getUpcomingMedical } from '../store/widgetsSlice';

function UpcomingMedical(props) {
//   const router = useHistory();

  const dispatch = useDispatch();
  const [days, setDays] = useState(15);

//   useEffect(() => {
//     dispatch(getUpcomingMedical(days));
//   }, [days]);
  const handleInputChange = (event) => {
    const inputValue = parseInt(event.target.value, 10);
    setDays(isNaN(inputValue) ? 0 : inputValue);
  };

  return (
    <Paper className='w-full rounded-20 shadow flex flex-col justify-between '>
      <div className='flex items-center justify-center px-4 pt-8'>
        <Typography
          className='text-28 text-center px-16 font-medium'
          color='textSecondary'>
          {/* {props.widget?.title} */}
          Medical
        </Typography>
      </div>
      <div className='text-center py-12 cursor-pointer'>
        <Typography
          className='text-72 font-semibold leading-none cursor-pointer text-purple tracking-tighter'
          onClick={() => {
            props?.widget?.total_elements > 0 &&
              history.push(`/apps/medicalExpires/report/${days}`);
          }}>
          {props?.widget?.total_elements || 0}
        </Typography>
      </div>

      <div className='flex items-center justify-center pt-8 text-primary mx-auto'>
        <Typography
          className='text-16 py-5 text-center font-medium'
          color='textSecondary'>
          Expired after
          <input
            type='text'
            value={days}
            onChange={handleInputChange}
            className='p-2  mx-3 '
            style={{
              width: '30px',
              marginLeft: '5px',
              border: '1px solid gray',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          />
          Days
        </Typography>
      </div>
    </Paper>
  );
}

export default memo(UpcomingMedical);
