import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import UserHeader from './UserHeader';
import UserModel from './models/UserModel';
import UserForm from './UserForm';
/**
 * Form Validation Schema
 */
const schema = z.object({
	first_name: z.string().nonempty('You must enter a user name').min(5, 'The user name must be at least 5 characters')
});

function User() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const routeParams = useParams();
	const { userId } = routeParams;

	const [tabValue, setTabValue] = useState(0);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: zodResolver(schema)
	});
	const { reset, watch } = methods;
	const form = watch();
	useEffect(() => {
		if (userId === 'new') {
			reset(UserModel({}));
		}
	}, [userId, reset]);

	function handleTabChange(event, value) {
		setTabValue(value);
	}

	return (
		<FormProvider {...methods}>
			<FusePageCarded
				header={<UserHeader />}
				content={
					<div className="p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<UserForm userId={userId} />
						</div>
					</div>
				}
				scroll={isMobile ? 'normal' : 'content'}
			/>
		</FormProvider>
	);
}

export default User;
