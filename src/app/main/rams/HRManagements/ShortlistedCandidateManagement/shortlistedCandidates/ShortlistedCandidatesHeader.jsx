import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { Icon } from '@mui/material';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from 'app/store/store';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { resetSearchText, selectSearchText } from '../store/searchTextSlice';
import PostAddIcon from '@mui/icons-material/PostAdd';
/**
 * The ShortlistedCandidates header.
 */
function ShortlistedCandidatesHeader(props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const searchText = useSelector(selectSearchText);
  useEffect(() => {
    return () => {
      dispatch(resetSearchText());
    };
  }, []);
  return (
    <div className='flex flex-col sm:flex-row space-y-12 sm:space-y-0 flex-1 w-full justify-between py-32 px-24 md:px-32'>
      <div className='flex items-center'>
        <PostAddIcon className='text-24 md:text-32 text-black' />

        <Typography
          component={motion.span}
          initial={{ x: -10 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className='hidden sm:flex text-16 md:text-24 mx-12 font-semibold'>
          Shortlisted Candidate
        </Typography>
      </div>

      <div className='flex w-full sm:w-auto flex-1 items-center justify-end space-x-8'>
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className='flex items-center w-full sm:max-w-[42.6rem] space-x-8 px-16 rounded-full border-1 shadow-0'>
          <FuseSvgIcon color='disabled'>heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder='Search by Job or Candiadate Name or Phone or Email or Status'
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

export default ShortlistedCandidatesHeader;
