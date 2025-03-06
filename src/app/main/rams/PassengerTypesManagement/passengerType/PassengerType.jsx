import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PassengerTypeHeader from './PassengerTypeHeader';
import PassengerTypeModel from './models/PassengerTypeModel';
import { useGetPassengerTypeQuery } from '../PassengerTypesApi';
import PassengerTypeForm from './PassengerTypeForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
  name: z.string().nonempty('You must enter a passengerType name'),
});

function PassengerType() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { passengerTypeId } = routeParams;

  const {
    data: passengerType,
    isLoading,
    isError,
  } = useGetPassengerTypeQuery(passengerTypeId, {
    skip: !passengerTypeId || passengerTypeId === 'new',
  });
  console.log('passengerTypeId', passengerType, passengerTypeId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (passengerTypeId === 'new') {
      reset(PassengerTypeModel({}));
    }
  }, [passengerTypeId, reset]);

  useEffect(() => {
    if (passengerType) {
      reset({ ...passengerType });
    }
  }, [passengerType, reset, passengerType?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested passengerTypes is not exists
   */
  if (isError && passengerTypeId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such passengerType!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/passengerType/passengerTypes'
          color='inherit'>
          Go to PassengerTypes Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission('PASSENGER_TYPE_DETAILS') && (
        <FusePageCarded
          header={<PassengerTypeHeader />}
          content={
            <div className='p-16 '>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <PassengerTypeForm passengerTypeId={passengerTypeId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default PassengerType;
