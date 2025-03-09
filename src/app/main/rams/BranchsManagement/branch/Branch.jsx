import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import BranchHeader from './BranchHeader';
import BranchModel from './models/BranchModel';
import { useGetBranchQuery } from '../BranchsApi';
import BranchForm from './BranchForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({
  name: z.string().nonempty('You must enter a branch name'),

  street_address_one: z
    .string()
    .nonempty('You must enter a street address one'),
  country: z.number().refine((val) => val !== null && val !== undefined, {
    message: 'You must enter a country',
  }),
  city: z.number().refine((val) => val !== null && val !== undefined, {
    message: 'You must enter a city',
  }),
  thana: z.number().refine((val) => val !== null && val !== undefined, {
    message: 'You must enter a thana',
  }),
});

function Branch() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const { branchId } = routeParams;

  const {
    data: branch,
    isLoading,
    isError,
  } = useGetBranchQuery(branchId, {
    skip: !branchId || branchId === 'new',
  });
  console.log('branchId', branch, branchId);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();
  useEffect(() => {
    if (branchId === 'new') {
      reset(BranchModel({}));
    }
  }, [branchId, reset]);

  useEffect(() => {
    if (branch) {
      reset({ ...branch });
    }
  }, [branch, reset, branch?.id]);

  if (isLoading) {
    return <FuseLoading />;
  }

  /**
   * Show Message if the requested branchs is not exists
   */
  if (isError && branchId !== 'new') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'>
        <Typography color='text.secondary' variant='h5'>
          There is no such branch!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/branch/branchs'
          color='inherit'>
          Go to Branchs Page
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      {hasPermission('BRANCH_DETAILS') && (
        <FusePageCarded
          header={<BranchHeader />}
          content={
            <div className='p-16 '>
              <div>
                <BranchForm branchId={branchId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default Branch;
