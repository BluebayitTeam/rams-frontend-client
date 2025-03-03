import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ProfileHeader from './ProfileHeader';
import ProfileForm from './ProfileForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
import { useGetProfilePhotosVideosQuery } from '../ProfileApi';
/**
 * Form Validation Schema
 */
const schema = z.object({
  first_name: z
    .string()
    .nonempty('You must enter a profile name')
    .min(5, 'The profile name must be at least 5 characters'),
});

function Profile() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { profileId } = routeParams;
  console.log('profileId', profileId);
  const {
    data: profile,
    isLoading,
    isError,
  } = useGetProfilePhotosVideosQuery(profileId, {
    skip: !profileId || profileId === 'new',
  });

  const [tabValue, setTabValue] = useState(0);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;

  useEffect(() => {
    if (profileId === 'new') {
      reset(ProfileModel({}));
    }
  }, [profileId, reset]);

  useEffect(() => {
    if (profile) {
      reset({
        ...profile,
        branch: profile.branch?.id,
        role: profile.role?.id,
        department: profile.department?.id,
        country: profile.country?.id,
      });
    }
  }, [profile, reset, profile?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  if (isError && profileId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such profile!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/profile/profile'
          color='inherit'>
          Go to Profiles Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission('PROFILE_DETAILS') && (
        <FusePageCarded
          classes={{
            toolbar: 'p-0',
            header: 'min-h-80 h-80',
          }}
          contentToolbar={
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor='primary'
              textColor='primary'
              variant='scrollable'
              scrollButtons='auto'
              classes={{ root: 'w-full h-64' }}>
              <Tab className='h-64' label='Basic Info' />
              <Tab className='h-64' label='Personal Info' />
            </Tabs>
          }
          header={<ProfileHeader />}
          content={
            <>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor='secondary'
                textColor='secondary'
                variant='scrollable'
                scrollButtons='auto'
                classes={{ root: 'w-full h-64 border-b-1' }}>
                <Tab className='h-64' label='Basic Info' />

                <Tab className='h-64' label='Personal Info' />
              </Tabs>
              <div className='p-16'>
                <div className={tabValue !== 0 ? 'hidden' : ''}>
                  <ProfileForm profileId={profileId} />
                </div>

                <div className={tabValue !== 1 ? 'hidden' : ''}>
                  <PersonalInfo />
                </div>
              </div>
            </>
          }
          innerScroll
        />
      )}
    </FormProvider>
  );
}

export default Profile;
