import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { hasPermission } from 'src/app/constant/permission/permissionList';
import { z } from 'zod';
import { useGetUnitQuery } from '../UnitsApi';
import UnitForm from './UnitForm';
import UnitHeader from './UnitHeader';
import UnitModel from './models/UnitModel';
/**
 * Form Validation Schema
 */
const schema = z.object({
  decimal_places: z.string(),
  formal_name: z.string(),
  symbol: z.string(),
  symbol_value: z.string(),
  type: z.string(),
});

function Unit() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { unitId } = routeParams;

  const {
    data: unit,
    isLoading,
    isError,
  } = useGetUnitQuery(unitId, {
    skip: !unitId || unitId === 'new',
  });
  console.log('unitId', unit, unitId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (unitId === 'new') {
      reset(UnitModel({}));
    }
  }, [unitId, reset]);

  useEffect(() => {
    if (unit) {
      reset({ ...unit });
    }
  }, [unit, reset, unit?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested units is not exists
   */
  if (isError && unitId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such unit!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/unit/units'
          color='inherit'>
          Go to Units Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission('DEPARTURE_DETAILS') && (
        <FusePageCarded
          header={<UnitHeader />}
          content={
            <div className='p-16 '>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <UnitForm unitId={unitId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default Unit;
