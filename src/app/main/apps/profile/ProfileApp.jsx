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
import AboutTab from './tabs/about/AboutTab';
import PhotosVideosTab from './tabs/photos-videos/PhotosVideosTab';
import TimelineTab from './tabs/timeline/TimelineTab';
import { Card, CardContent, Divider } from '@mui/material';
import { useGetProfilePhotosVideosQuery } from './ProfileApi';

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

  console.log('dataCheck', data);

  return (
    <Root
      header={
        <Card className='max-w-full  shadow-md rounded-lg p-6'>
          <CardContent className='flex items-center space-x-6'>
            <Avatar
              sx={{ width: 100, height: 100 }}
              src='assets/images/avatars/male-04.jpg'
              alt='User avatar'
            />
            <div>
              <Typography variant='h6' className='font-bold'>
                {data.first_name} {data.last_name}{' '}
              </Typography>
              <Typography color='textSecondary'>
                {data.city?.name}, {data.country?.name}
              </Typography>
            </div>
          </CardContent>

          <CardContent>
            <Typography variant='h6' className='font-bold mb-2'>
              About
            </Typography>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex'>
                <Typography variant='body2' color='textSecondary'>
                  First Name :
                </Typography>
                <Typography variant='body1' className='ml-4'>
                  {data.first_name}
                </Typography>
              </div>
              <div className='flex'>
                <Typography variant='body2' color='textSecondary'>
                  Last Name :
                </Typography>
                <Typography variant='body1'>{data.last_name}</Typography>
              </div>
              <div className='flex'>
                <Typography variant='body2' color='textSecondary'>
                  Gender :
                </Typography>
                <Typography variant='body1' className='ml-4'>
                  {' '}
                  {data.gender}
                </Typography>
              </div>
              <div className='flex'>
                <Typography variant='body2' color='textSecondary'>
                  Contact No :
                </Typography>
                <Typography variant='body1' className='ml-4'>
                  {data?.country_code1 || ''} {data.primary_phone || ''}
                </Typography>
              </div>
              <div className='flex'>
                <Typography variant='body2' color='textSecondary'>
                  Email :
                </Typography>
                <Typography variant='body1' className='ml-4'>
                  {data.email}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      }
      scroll={isMobile ? 'normal' : 'page'}
    />
  );
}

export default ProfileApp;
