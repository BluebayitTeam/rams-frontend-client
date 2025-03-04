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
import { Avatar, Box, Card, CardContent, Pagination } from '@mui/material';
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
    navigate(`/apps/profile/profiles/${item.id}/${item.handle}`);
  }

  function handleUpdateProfile(item, event) {
    localStorage.removeItem('deleteProfile');
    localStorage.setItem('updateProfile', event);
    navigate(`/apps/profile/profiles/${item.id}/${item.handle}`);
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
      {/* <FuseScrollbars className='grow overflow-x-auto'>
        <Table stickyHeader className='min-w-xl' aria-labelledby='tableTitle'>
          <TableBody>
            {_.orderBy(profiles, [tableOrder.id], [tableOrder.direction]).map(
              (n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className='h-20 cursor-pointer px-10'
                    hover
                    role='checkbox'
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}>
                    <TableCell
                      className='w-40 md:w-64'
                      component='th'
                      scope='row'
                      style={{
                        position: 'sticky',
                        left: 0,
                        zIndex: 1,
                        backgroundColor: '#fff',
                      }}>
                      {pageAndSize.page * pageAndSize.size -
                        pageAndSize.size +
                        serialNumber++}
                    </TableCell>
                    <TableCell
                      className='w-52 px-4 md:px-10'
                      component='th'
                      scope='row'
                      padding='none'>
                      {n.image ? (
                        <img
                          className='h-full block rounded'
                          style={{ borderRadius: '30px' }}
                          width='40px'
                          height='40px'
                          src={`${BASE_URL}${n.image}`}
                          alt={n.first_name}
                        />
                      ) : (
                        <img
                          className='h-full block rounded'
                          style={{ borderRadius: '30px' }}
                          width='40px'
                          height='40px'
                          src='/assets/images/profileImg/profile.png'
                          alt={n.first_name}
                        />
                      )}
                    </TableCell>
                    <TableCell
                      className='p-4 md:p-16'
                      component='th'
                      scope='row'>
                      {n.profilename}{' '}
                    </TableCell>
                    <TableCell
                      className='p-4 md:p-16 truncate'
                      component='th'
                      scope='row'>
                      {n?.email}
                    </TableCell>{' '}
                    <TableCell
                      className='p-4 md:p-16 truncate'
                      component='th'
                      scope='row'>
                      {n.secondary_phone}
                    </TableCell>
                    <TableCell
                      className='p-4 md:p-16'
                      component='th'
                      scope='row'
                      style={{
                        position: 'sticky',
                        right: 0,
                        zIndex: 1,
                        backgroundColor: '#fff',
                      }}>
                      <Box
                        onClick={(event) =>
                          handleUpdateProfile(n, 'updateProfile')
                        }>
                        <VpnKeyIcon className='cursor-pointer custom-edit-icon-style' />
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </FuseScrollbars> */}

      <Card className='max-w-full  shadow-md rounded-lg p-6'>
        <CardContent className='flex items-center space-x-6'>
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={`${BASE_URL}${data?.image}`}
            alt='User avatar'
          />

          <div>
            <Typography variant='h6' className='font-bold'>
              {data?.first_name} {data?.last_name}{' '}
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
                {' '}
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
              <Typography variant='body2'>branch :</Typography>
              <Typography variant='body1' className='ml-4'>
                {data?.branch?.name}
              </Typography>
            </div>
          </div>
        </CardContent>

        <Box
          display='flex'
          justifyContent='flex-end'
          alignItems='center'
          ml='auto'
          onClick={(event) => handleUpdateProfile('updateProfile')}>
          <Edit className='cursor-pointer custom-edit-icon-style' />
        </Box>
      </Card>
    </div>
  );
}

export default withRouter(ProfilesTable);
