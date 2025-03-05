import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from 'src/app/constant/constants';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  TextField,
} from '@mui/material';
import { rowsPerPageOptions } from 'src/app/@data/data';
import ProfilesTableHead from './ProfilesTableHead';
import { selectFilteredProfiles, useGetProfilesQuery } from '../ProfilesApi';
import { Edit } from '@mui/icons-material';

/**
 * The profiles table.
 */
function ProfilesTable(props) {
  const dispatch = useDispatch();
  const { navigate, searchKey } = props;
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
  const { data, isLoading, refetch } = useGetProfilesQuery({
    ...pageAndSize,
    searchKey,
  });
  const totalData = useSelector(selectFilteredProfiles(data));
  const profiles = useSelector(selectFilteredProfiles(data?.profiles));
  let serialNumber = 1;

  useEffect(() => {
    // Fetch data with specific page and size when component mounts or when page and size change
    refetch({ page, rowsPerPage });
  }, [page, rowsPerPage]);
  const [selected, setSelected] = useState([]);

  const [tableOrder, setTableOrder] = useState({
    direction: 'asc',
    id: '',
  });

  function handleRequestSort(event, property) {
    const newOrder = { id: property, direction: 'desc' };

    if (tableOrder.id === property && tableOrder.direction === 'desc') {
      newOrder.direction = 'asc';
    }

    setTableOrder(newOrder);
  }

  useEffect(() => {
    refetch(searchKey);
  }, [searchKey]);

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Handle input change
  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // Handle password update
  const handlePasswordUpdate = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    console.log('Updating Password:', passwords);
    // Call API to update password here

    handleClose(); // Close modal after update
  };

  // Open modal
  const handleOpen = () => setOpen(true);

  // Close modal
  const handleClose = () => {
    setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setOpen(false);
  };

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(profiles.map((n) => n.id));
      return;
    }

    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    navigate(`/apps/profile/profiles/${item}`);
  }

  function handleUpdateProfile(item, event) {
    console.log('jkfhdksjfhdsf', item);
    localStorage.removeItem('deleteProfile');
    localStorage.setItem('updateProfile', event);
    navigate(`/apps/profile/profiles/${item}`);
  }

  function handleDeleteProfile(item, event) {
    localStorage.removeItem('updateProfile');
    localStorage.setItem('deleteProfile', event);
    navigate(`/apps/profile/profiles/${item.id}/${item.handle}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  // pagination
  const handlePagination = (e, handlePage) => {
    setPageAndSize({ ...pageAndSize, page: handlePage });
    setPage(handlePage - 1);
  };

  function handleChangePage(event, value) {
    setPage(value);
    setPageAndSize({ ...pageAndSize, page: value + 1 });
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPageAndSize({ ...pageAndSize, size: event.target.value });
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <FuseLoading />
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col min-h-full'>
      <Card className='max-w-full shadow-md rounded-lg p-6'>
        <CardContent className='flex items-center space-x-6'>
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={`${BASE_URL}${data?.image}`}
            alt='User avatar'
          />

          <div>
            <Typography variant='h6' className='font-bold'>
              {data?.first_name} {data?.last_name}
            </Typography>
            <Typography>
              {data?.city?.name}, {data?.country?.name}
            </Typography>
          </div>
        </CardContent>

        <CardContent>
          <Typography variant='h6' className='font-bold mb-2'>
            About
          </Typography>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex'>
              <Typography variant='body2'>First Name :</Typography>
              <Typography variant='body1' className='ml-4'>
                {data?.first_name}
              </Typography>
            </div>
            <div className='flex'>
              <Typography variant='body2'>Last Name :</Typography>
              <Typography variant='body1' className='ml-4'>
                {data?.last_name}
              </Typography>
            </div>
            <div className='flex'>
              <Typography variant='body2'>Gender :</Typography>
              <Typography variant='body1' className='ml-4'>
                {data?.gender}
              </Typography>
            </div>
            <div className='flex'>
              <Typography variant='body2'>Contact No :</Typography>
              <Typography variant='body1' className='ml-4'>
                {data?.country_code1 || ''} {data?.primary_phone || ''}
              </Typography>
            </div>
            <div className='flex'>
              <Typography variant='body2'>Email :</Typography>
              <Typography variant='body1' className='ml-4'>
                {data?.email}
              </Typography>
            </div>
            <div className='flex'>
              <Typography variant='body2'>Branch :</Typography>
              <Typography variant='body1' className='ml-4'>
                {data?.branch?.name}
              </Typography>
            </div>
            <div className='flex'>
              <Typography variant='body2'>City :</Typography>
              <Typography variant='body1' className='ml-4'>
                {data?.city?.name}
              </Typography>
            </div>
            <div className='flex'>
              <Typography variant='body2'>Country :</Typography>
              <Typography variant='body1' className='ml-4'>
                {data?.country?.name}
              </Typography>
            </div>
            <div className='flex'>
              <Typography variant='body2'>ID No :</Typography>
              <Typography variant='body1' className='ml-4'>
                {data?.emp_id_no}
              </Typography>
            </div>
            <div className='flex'>
              <Typography variant='body2'>Thana :</Typography>
              <Typography variant='body1' className='ml-4'>
                {data?.thana?.name}
              </Typography>
            </div>
            <div className='flex'>
              <Typography variant='body2'>Birth Date :</Typography>
              <Typography variant='body1' className='ml-4'>
                {data?.date_of_birth}
              </Typography>
            </div>
          </div>

          <Typography variant='h6' className='font-bold mb-2 mt-7'>
            Personal Info
          </Typography>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex'>
              <Typography variant='body2'>Department :</Typography>
              <Typography variant='body1' className='ml-4'>
                {data?.department?.name}
              </Typography>
            </div>
            <div className='flex'>
              <Typography variant='body2'>Father Name :</Typography>
              <Typography variant='body1' className='ml-4'>
                {data?.father_name}
              </Typography>
            </div>
            <div className='flex'>
              <Typography variant='body2'>Mother Name :</Typography>
              <Typography variant='body1' className='ml-4'>
                {data?.mother_name}
              </Typography>
            </div>
            <div className='flex'>
              <Typography variant='body2'>Designation :</Typography>
              <Typography variant='body1' className='ml-4'>
                {data?.designation?.name}
              </Typography>
            </div>
            <div className='flex'>
              <Typography variant='body2'>Marital Status :</Typography>
              <Typography variant='body1' className='ml-4'>
                {data?.marital_status}
              </Typography>
            </div>
            <div className='flex'>
              <Typography variant='body2'>Marriage Date :</Typography>
              <Typography variant='body1' className='ml-4'>
                {data?.marriage_date}
              </Typography>
            </div>
            <div className='flex'>
              <Typography variant='body2'>Spouse Name :</Typography>
              <Typography variant='body1' className='ml-4'>
                {data?.spouse_name}
              </Typography>
            </div>
          </div>
        </CardContent>

        <Box
          display='flex'
          justifyContent='flex-end'
          alignItems='center'
          ml='auto'>
          <Edit
            className='cursor-pointer custom-edit-icon-style'
            onClick={() => handleUpdateProfile('updateProfile')}
          />
        </Box>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setOpen(true)}
          className='ml-4'>
          Change Password
        </Button>
      </Card>

      {/* Change Password Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label='Old Password'
            type='password'
            name='oldPassword'
            fullWidth
            margin='dense'
            value={passwords.oldPassword}
            onChange={handleChange}
          />
          <TextField
            label='New Password'
            type='password'
            name='newPassword'
            fullWidth
            margin='dense'
            value={passwords.newPassword}
            onChange={handleChange}
          />
          <TextField
            label='Retype New Password'
            type='password'
            name='confirmPassword'
            fullWidth
            margin='dense'
            value={passwords.confirmPassword}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handlePasswordUpdate} color='primary'>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withRouter(ProfilesTable);
