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
import ProfessionHeader from './ProfessionHeader';
import ProfessionModel from './models/ProfessionModel';
import { useGetProfessionQuery } from '../ProfessionsApi';
import ProfessionForm from './ProfessionForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
  name: z.string().nonempty('You must enter a profession name'),
});

function Profession() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { professionId } = routeParams;

  const {
    data: profession,
    isLoading,
    isError,
  } = useGetProfessionQuery(professionId, {
    skip: !professionId || professionId === 'new',
  });
  console.log('professionId', profession, professionId);

  const [tabValue, setTabValue] = useState(0);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (professionId === 'new') {
      reset(ProfessionModel({}));
    }
  }, [professionId, reset]);

  useEffect(() => {
    if (profession) {
      reset({ ...profession });
    }
  }, [profession, reset, profession?.id]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested professions is not exists
   */
  if (isError && professionId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such profession!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/profession/professions'
          color='inherit'>
          Go to Professions Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission('PROFESSION_DETAILS') && (
        <FusePageCarded
          header={<ProfessionHeader />}
          content={
            <div className='p-16 '>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <ProfessionForm professionId={professionId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default Profession;
