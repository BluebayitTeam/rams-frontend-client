import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Box from '@mui/material/Box';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { Card, CardContent, Divider } from '@mui/material';
import { useGetProfilePhotosVideosQuery } from './ProfileApi';
import { BASE_URL } from 'src/app/constant/constants';
import { Edit } from '@mui/icons-material';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    '& > .container': {
      maxWidth: '100%',
    },
  },
}));

/**
 * The profile page.
 */
function ProfileApp() {
  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const { data, isLoading, refetch } = useGetProfilePhotosVideosQuery();
  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  return (
    <Root
      header={
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
            ml='auto'>
            <Edit
              // onClick={() => handleUpdateAgent(n, 'updateAgent')}
              className='cursor-pointer custom-edit-icon-style'
            />
          </Box>
        </Card>
      }
      scroll={isMobile ? 'normal' : 'page'}
    />
  );
}

export default ProfileApp;
