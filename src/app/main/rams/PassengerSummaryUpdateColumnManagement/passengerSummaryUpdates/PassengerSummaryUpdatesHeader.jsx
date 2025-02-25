import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/store/store';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useEffect } from 'react';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { useSelector } from 'react-redux';
import { ViewWeek } from '@mui/icons-material';
import { resetSearchText, selectSearchText } from '../store/searchTextSlice';
import { hasPermission } from 'src/app/constant/permission/permissionList';
import PassengerSummaryFilterMenu from './PassengerSummaryFilterMenu';
import { Icon } from '@mui/material';

/**
 * The passengerSummaryUpdates header.
 */

function PassengerSummaryUpdatesHeader({
  inShowAllMode,
  handleGetAllPassengerSummarys,
}) {
  const dispatch = useAppDispatch();
  const searchText = useSelector(selectSearchText);
  useEffect(() => {
    return () => {
      dispatch(resetSearchText());
    };
  }, []);
  const navigate = useNavigate();

  return (
    <div className='flex flex-1 w-full items-center justify-between'>
      <div className='flex items-center'>
        <Icon
          component={motion.span}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.2 } }}
          className='text-24 md:text-32'>
          person
        </Icon>
        <Typography
          component={motion.span}
          initial={{ x: -10 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className='hidden sm:flex text-16 md:text-24 mx-12 font-semibold'>
          Passenger Summary Update
        </Typography>
      </div>
      <PassengerSummaryFilterMenu
        inShowAllMode={inShowAllMode}
        handleGetAllPassengerSummarys={handleGetAllPassengerSummarys}
      />

      <div className='flex items-center'>
        <ViewWeek
          onClick={() =>
            navigate(
              `/apps/passengerSummaryUpdateClm/passengerSummaryUpdateClms/passenger`
            )
          }
          className='cursor-pointer mr-10 '
          style={{ color: 'green', marginLeft: '15%', fontSize: '40px' }}
        />
      </div>
    </div>
  );
}

export default PassengerSummaryUpdatesHeader;
