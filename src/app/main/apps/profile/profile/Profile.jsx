import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ProfileHeader from './ProfileHeader';
import ProfileModel from './models/ProfileModel';
import ProfileForm from './ProfileForm';
import PersonalInfo from './tabs/PersonalInfo';
import { Tab, Tabs } from '@mui/material';
import { useGetProfilesQuery } from '../ProfilesApi';
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
  const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 25 });
  const {
    data: profile,
    isLoading,
    refetch,
  } = useGetProfilesQuery({
    ...pageAndSize,
  });
  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
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
        thana: profile.thana?.id,
        city: profile.city?.id,
        created_by: profile.created_by?.id,
        updated_by: profile.updated_by?.id,
      });
    }
  }, [profile, reset, profile?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  return (
    // <FormProvider {...methods}>
    //   <FusePageCarded
    //     header={<ProfileHeader />}
    //     content={
    //       <div className='p-16 '>
    //         <div className={tabValue !== 0 ? 'hidden' : ''}>
    //           <ProfileForm profileId={profileId} />
    //         </div>
    //       </div>
    //     }
    //     scroll={isMobile ? 'normal' : 'content'}
    //   />
    // </FormProvider>

    <FormProvider {...methods}>
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
    </FormProvider>
  );
}

export default Profile;
