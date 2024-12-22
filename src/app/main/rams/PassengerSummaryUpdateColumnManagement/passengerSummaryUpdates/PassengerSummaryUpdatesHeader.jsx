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

/**
 * The passengerSummaryUpdates header.
 */
function PassengerSummaryUpdatesHeader(props) {
	const dispatch = useAppDispatch();
	const searchText = useSelector(selectSearchText);
	useEffect(() => {
		return () => {
			dispatch(resetSearchText());
		};
	}, []);
	const navigate = useNavigate();

	return (
    <div className='flex flex-col sm:flex-row space-y-12 sm:space-y-0 flex-1 w-full justify-between py-32 px-24 md:px-32'>
      <motion.span
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}>
        <Typography className='text-24 md:text-22 font-extrabold tracking-tight'>
          Passenger  Update
        </Typography>
      </motion.span>

      <div className='flex w-full sm:w-auto flex-1 items-center justify-end space-x-8'>
        <PassengerSummaryFilterMenu/>

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
