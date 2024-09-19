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
import setIdIfValueIsObjArryData from 'src/app/@helpers/setIdIfValueIsObjArryData';
import setIdIfValueIsObject2 from 'src/app/@helpers/setIdIfValueIsObject2';
import ContraHeader from './ContraHeader';
import ContraModel from './models/ContraModel';
import { useGetContraQuery } from '../ContrasApi';
import ContraForm from './ContraForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
/**
 * Form Validation Schema
 */
const schema = z.object({});

function Contra() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { contraId, invoice_no } = routeParams;

	const {
		data: contra,
		isLoading,
		isError
	} = useGetContraQuery(invoice_no, {
		skip: !contraId || contraId === 'new'
	});

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (contraId === 'new') {
			reset(ContraModel({}));
		}
	}, [contraId, reset]);

	useEffect(() => {
		if (contra) {
			const convertedContraItems = setIdIfValueIsObjArryData(contra?.items);
			const convertedContra = setIdIfValueIsObject2(contra);
			reset({
				...convertedContra,
				items: convertedContraItems
			});
		}
	}, [contra, reset, contra?.id]);

	if (isLoading) {
		return <FuseLoading />;
	}

	/**
	 * Show Message if the requested contras is not exists
	 */
	if (isError && contraId !== 'new') {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography
					color="text.secondary"
					variant="h5"
				>
					There is no such contra!
				</Typography>
				<Button
					className="mt-24"
					component={Link}
					variant="outlined"
					to="/apps/contra/contras"
					color="inherit"
				>
					Go to Contras Page
				</Button>
			</motion.div>
		);
	}

	return (
    <FormProvider {...methods}>
      {hasPermission('CONTRA_DETAILS') && (
        <FusePageCarded
          header={<ContraHeader />}
          content={
            <div className='p-16 '>
              <div>
                <ContraForm contraId={contraId} />
              </div>
            </div>
          }
          scroll={isMobile ? 'normal' : 'content'}
        />
      )}
    </FormProvider>
  );
}

export default Contra;
