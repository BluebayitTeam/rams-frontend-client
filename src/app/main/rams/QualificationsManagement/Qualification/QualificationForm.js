import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { BASE_URL } from '../../../../constant/constants';
import { getEmployees } from '../../../../store/dataSlice';
import { saveQualification, updateQualification } from '../store/qualificationSlice';


const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    },
    productImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut
    },
    imgMainContainer: {
        display: "flex",
        justifyContent: "space-around",
        marginTop: "25px"
    },
    imgContainer: {
        minWidth: "160px",
        float: "left"
    },
    imgSize: {
        width: '100px',
        height: '100px',
        display: 'flex',
        alignItems: 'center'
    }
}));


function QualificationForm(props) {

    const [previewImage1, setPreviewImage1] = useState(null)
    const [previewImage2, setPreviewImage2] = useState(null)
    const [previewImage3, setPreviewImage3] = useState(null)
    const [previewImage4, setPreviewImage4] = useState(null)
    const dispatch = useDispatch()
    const userID = localStorage.getItem('UserID')
    const employees = useSelector(state => state.data.employees)
    const routeParams = useParams();
    const classes = useStyles(props);
    const methods = useFormContext();
    const { control, formState, watch, getValues } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const image1 = watch('image_doc_one');
    const image2 = watch('image_doc_two');
    const image3 = watch('image_doc_three');
    const image4 = watch('image_doc_four');
    const history = useHistory();
    const handleDelete = localStorage.getItem('qualificationEvent');

    useEffect(() => {
        dispatch(getEmployees())
    }, [])

    function handleSaveQualification() {
        dispatch(saveQualification(getValues())).then((res) => {
            console.log("saveQualificationRes", res)
            if (res.payload) {
                localStorage.setItem("qualificationAlert", "saveQualification")
                history.push('/apps/qualification-management/qualifications');
            }
        });
    }

    function handleUpdateQualification() {
        dispatch(updateQualification(getValues())).then((res) => {
            console.log("updateQualificationRes", res)
            if (res.payload) {
                localStorage.setItem("qualificationAlert", "updateQualification")
                history.push('/apps/qualification-management/qualifications');
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.qualificationId === "new" && !(_.isEmpty(dirtyFields) || !isValid)) {
                handleSaveQualification()
                console.log("saved")
            }
            else if (handleDelete !== 'Delete' && routeParams?.qualificationName) {
                handleUpdateQualification()
                console.log("updated")
            }
        }
    }


    return (
        <div>
            <Controller
                name="employee_id"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? employees.find(data => data.id === value) : null}
                        options={employees}
                        getOptionLabel={(option) => `${option.first_name} ${option.last_name} [${option.email}]`}
                        //{ `${option.first_name} &nbsp; ${option.last_name} &nbsp; [${option.email}]`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select A Employee ID"
                                label="Employee ID"
                                error={!!errors.employee_id}
                                required
                                helperText={errors?.employee_id?.message}
                                variant="outlined"
                                autoFocus
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        )}
                    />
                )}
            />

            <Controller
                name="degree_name"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.degree_name}
                        helperText={errors?.degree_name?.message}
                        label="Degree Name"
                        id="degree_name"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

            <Controller
                name="passign_year"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.passign_year}
                        helperText={errors?.passign_year?.message}
                        label="Passign Year"
                        id="passign_year"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

            <Controller
                name="board"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.board}
                        helperText={errors?.board?.message}
                        label="Board"
                        id="board"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

            <Controller
                name="institute_name"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.institute_name}
                        helperText={errors?.institute_name?.message}
                        label="Institute Name"
                        id="institute_name"
                        required
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />

            <Controller
                name="grade"
                control={control}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        type="number"
                        className="mt-8 mb-16"
                        error={!!errors.grade}
                        helperText={errors?.grade?.message}
                        label="Grade"
                        id="grade"
                        variant="outlined"
                        InputLabelProps={field.value && { shrink: true }}
                        fullWidth
                        onKeyDown={handleSubmitOnKeyDownEnter}
                    />)
                }}
            />


            <div className={classes.imgMainContainer} id="imgMainContainer">
                {/* image_1 */}
                <div className={`${classes.imgContainer} flex justify-center sm:justify-start flex-wrap -mx-16`}>
                    <Controller
                        name="image_doc_one"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <label
                                htmlFor="button-file1"
                                className={clsx(
                                    classes.productImageUpload,
                                    'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
                                )}
                            >
                                <input
                                    accept="image/*"
                                    className="hidden"
                                    id="button-file1"
                                    type="file"
                                    onChange={async e => {
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            if (reader.readyState === 2) {
                                                setPreviewImage1(reader.result);
                                                console.log('setPreviewImage1')
                                            }
                                        }
                                        reader.readAsDataURL(e.target.files[0]);

                                        const file = e.target.files[0];
                                        onChange(file);
                                    }}
                                />
                                <Icon fontSize="large" color="action">
                                    cloud_upload
                                </Icon>
                            </label>
                        )}
                    />
                    {
                        image1 && !previewImage1 && <img src={`${BASE_URL}${image1}`} className={classes.imgSize} id="imgtop" alt="Not found" />
                    }

                    <div className={classes.imgSize}>
                        <img
                            src={previewImage1}
                            alt="Not found"
                        />
                    </div>
                </div>


                {/* image_2 */}
                <div className={`${classes.imgContainer} flex justify-center sm:justify-start flex-wrap -mx-16`}>
                    <Controller
                        name="image_doc_two"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <label
                                htmlFor="button-file2"
                                className={clsx(
                                    classes.productImageUpload,
                                    'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
                                )}
                            >
                                <input
                                    accept="image/*"
                                    className="hidden"
                                    id="button-file2"
                                    type="file"
                                    onChange={async e => {
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            if (reader.readyState === 2) {
                                                setPreviewImage2(reader.result);
                                            }
                                        }
                                        reader.readAsDataURL(e.target.files[0]);

                                        const file = e.target.files[0];
                                        onChange(file);
                                    }}
                                />
                                <Icon fontSize="large" color="action">
                                    cloud_upload
                                </Icon>
                            </label>
                        )}
                    />
                    {
                        image2 && !previewImage2 && <img src={`${BASE_URL}${image2}`} className={classes.imgSize} alt="Not Found" />
                    }

                    <div className={classes.imgSize}>
                        <img
                            src={previewImage2}
                            alt="Not found"
                        />
                    </div>
                </div>


                {/* image_3 */}
                <div className={`${classes.imgContainer} flex justify-center sm:justify-start flex-wrap -mx-16`}>
                    <Controller
                        name="image_doc_three"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <label
                                htmlFor="button-file3"
                                className={clsx(
                                    classes.productImageUpload,
                                    'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
                                )}
                            >
                                <input
                                    accept="image/*"
                                    className="hidden"
                                    id="button-file3"
                                    type="file"
                                    onChange={async e => {
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            if (reader.readyState === 2) {
                                                setPreviewImage3(reader.result);
                                            }
                                        }
                                        reader.readAsDataURL(e.target.files[0]);

                                        const file = e.target.files[0];
                                        onChange(file);
                                    }}
                                />
                                <Icon fontSize="large" color="action">
                                    cloud_upload
                                </Icon>
                            </label>
                        )}
                    />
                    {
                        image3 && !previewImage3 && <img src={`${BASE_URL}${image3}`} className={classes.imgSize} alt="Not found" />
                    }

                    <div className={classes.imgSize}>
                        <img
                            src={previewImage3}
                            alt="Not found"
                        />
                    </div>
                </div>


                {/* image_4 */}
                <div className={`${classes.imgContainer} flex justify-center sm:justify-start flex-wrap -mx-16`}>
                    <Controller
                        name="image_doc_four"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <label
                                htmlFor="button-file4"
                                className={clsx(
                                    classes.productImageUpload,
                                    'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
                                )}
                            >
                                <input
                                    accept="image/*"
                                    className="hidden"
                                    id="button-file4"
                                    type="file"
                                    onChange={async e => {
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            if (reader.readyState === 2) {
                                                setPreviewImage4(reader.result);
                                            }
                                        }
                                        reader.readAsDataURL(e.target.files[0]);

                                        const file = e.target.files[0];
                                        onChange(file);
                                    }}
                                />
                                <Icon fontSize="large" color="action">
                                    cloud_upload
                                </Icon>
                            </label>
                        )}
                    />
                    {
                        image4 && !previewImage4 && <img src={`${BASE_URL}${image4}`} className={classes.imgSize} alt="Not found" />
                    }

                    <div className={classes.imgSize}>
                        <img
                            src={previewImage4}
                            alt="Not found"
                        />
                    </div>
                </div>

            </div>


        </div>
    );
}

export default QualificationForm