import FusePageCarded from '@fuse/core/FusePageCarded';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles, Tabs } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import withReducer from 'app/store/withReducer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { MEDICAL_BY_PASSENGER_ID } from '../../../../constant/constants';
import reducer from '../store/index.js';
import { resetMedical } from '../store/medicalSlice';
import MedicalForm from './MedicalForm.js';
import NewMedicalHeader from './NewMedicalHeader.js';


const useStyles = makeStyles(theme => ({
    container: {
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        paddingTop: '0.8rem',
        paddingBottom: '0.7rem',
        boxSizing: "content-box",
    },
    textField: {
        height: '4.8rem',
        '& > div': {
            height: '100%'
        }
    }
}));


/**
 * Form Validation Schema
 */
const schema = yup.object().shape({

    passenger: yup.string()
        .required("Passenger is required"),
})

const Medical = () => {

    const dispatch = useDispatch();
    // const medical = useSelector(({ medicalsManagement }) => medicalsManagement.medical);

    const passengers = useSelector(state => state.data.passengers)

    const [noMedical, setNoMedical] = useState(false);
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });
    const routeParams = useParams();

    const { reset, control, formState } = methods;
    const { errors } = formState;

    const classes = useStyles();

    const history = useHistory();

    useEffect(() => {
        return () => {
            /**
             * Reset Medical on component unload
             */
            dispatch(resetMedical());
            setNoMedical(false);
        };
    }, [dispatch]);

    /**
     * Show Message if the requested products is not exists
     */
    if (noMedical) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="textSecondary" variant="h5">
                    There is no such medical!
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/apps/e-commerce/products"
                    color="inherit"
                >
                    Go to Medical Page
                </Button>
            </motion.div>
        );
    }


    return (
        <FormProvider {...methods}>
            <FusePageCarded
                classes={{
                    toolbar: 'p-0',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
                }}
                contentToolbar={
                    <Tabs
                        // value={tabValue}
                        // onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{ root: 'w-full h-64 p-0' }}
                    >
                        <div className="flex justify-center w-full px-16">
                            <Controller
                                name="passenger"
                                control={control}
                                render={({ field: { onChange, value, name } }) => (
                                    <Autocomplete
                                        className={`w-full max-w-320 h-48 ${classes.container}`}
                                        freeSolo
                                        value={value ? passengers.find(data => data.id == value) : null}
                                        options={passengers}
                                        getOptionLabel={(option) => `${option.passenger_id} ${option.office_serial} ${option.passport_no} ${option.passenger_name}`}
                                        onChange={(event, newValue) => {
                                            if (newValue?.id) {
                                                axios.get(`${MEDICAL_BY_PASSENGER_ID}${newValue?.id}`).then(res => {
                                                    console.log("Res", res.data)
                                                    if (res.data.id) {
                                                        reset({ ...res.data, passenger: newValue?.id })
                                                        history.push(`/apps/medical-management/medical/${newValue?.passenger_id || newValue?.id}`)
                                                    } else {
                                                        history.push(`/apps/medical-management/medical/new`)
                                                        reset({ passenger: newValue?.id })
                                                    }
                                                }).catch(() => {
                                                    history.push(`/apps/medical-management/medical/new`)
                                                    reset({ passenger: newValue?.id })
                                                })
                                            } else {
                                                history.push(`/apps/medical-management/medical/new`)
                                                reset({ passenger: newValue?.id })
                                            }
                                        }}
                                        renderInput={params => (

                                            <TextField
                                                {...params}
                                                className={classes.textField}
                                                placeholder="Select Passenger"
                                                label="Passenger"
                                                error={!!errors.passenger}
                                                required
                                                helperText={errors?.passenger?.message}
                                                variant="outlined"
                                                autoFocus
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                            // onKeyDown={handleSubmitOnKeyDownEnter}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </div>
                    </Tabs>
                }
                header={<NewMedicalHeader />}
                content={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <MedicalForm />
                    </div>
                }
                innerScroll
            />
        </FormProvider>
    );
};
export default withReducer('medicalsManagement', reducer)(Medical);