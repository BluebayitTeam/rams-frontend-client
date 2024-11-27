import { selectMainTheme } from '@fuse/core/FuseSettings/store/fuseSettingsSlice';
import Input from '@mui/material/Input';
import { Icon, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles, ThemeProvider } from '@mui/styles';
import { getUserPermissions } from 'app/store/dataSlice';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

const useStyles = makeStyles((theme) => ({
  alert: (props) => ({
    width: 'fit-content',
    height: '35px',
    position: 'fixed',
    right: '30px',
    paddingTop: '0px',
    fontSize: '15px',
    borderRadius: '15px',
    transitionTimingFunction: 'ease-out',
    zIndex: props ? '1' : '-1',
    transition: props ? '0s' : '1s',
    opacity: props ? 1 : 0,
  }),
}));
function PassengerEditHistoryHeader() {
  useEffect(() => {
    dispatch(getUserPermissions());
  }, []);

  const UserPermissions = useSelector((state) => state.data.UserPermissions);
  const dispatch = useDispatch();

  const [alerOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const mainTheme = useSelector(selectMainTheme);
  // const searchText = useSelector(
  //   ({ passengerEditHistorysManagement }) =>
  //     passengerEditHistorysManagement.passengerEditHistorys.searchText
  // );

  const searchText = '';

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
          Passenger History{' '}
        </Typography>
      </div>

      <div
        className='flex flex-1 items-center justify-center px-12'
        style={{ marginTop: '20px', marginBottom: '20px' }}>
        {' '}
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className='flex items-center w-full sm:max-w-556 mx-24  space-x-8 px-16 rounded-full border-1 shadow-0'>
          <FuseSvgIcon color='disabled'>heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder='search by passenger Id'
            className='flex flex-1'
            disableUnderline
            fullWidth
            inputProps={{
              'aria-label': 'Search',
            }}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter') {
                props?.setSearchKey(ev?.target?.value);
              } else if (
                ev.key === 'Backspace' &&
                ev?.target?.value?.length === 1
              ) {
                props?.setSearchKey('');
              }
            }}
          />
        </Paper>
      </div>
    </div>
  );
}

export default PassengerEditHistoryHeader;
