import { Checkbox, FormControlLabel } from '@material-ui/core';
// import { orange } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getPermissions } from '../../../../store/dataSlice';

// const useStyles = makeStyles(theme => ({
//     productImageFeaturedStar: {
//         position: 'absolute',
//         top: 0,
//         right: 0,
//         color: orange[400],
//         opacity: 0
//     },
//     productImageUpload: {
//         transitionProperty: 'box-shadow',
//         transitionDuration: theme.transitions.duration.short,
//         transitionTimingFunction: theme.transitions.easing.easeInOut
//     },
//     productImageItem: {
//         transitionProperty: 'box-shadow',
//         transitionDuration: theme.transitions.duration.short,
//         transitionTimingFunction: theme.transitions.easing.easeInOut,
//         '&:hover': {
//             '& $productImageFeaturedStar': {
//                 opacity: 0.8
//             }
//         },
//         '&.featured': {
//             pointerEvents: 'none',
//             boxShadow: theme.shadows[3],
//             '& $productImageFeaturedStar': {
//                 opacity: 1
//             },
//             '&:hover $productImageFeaturedStar': {
//                 opacity: 1
//             }
//         }
//     }
// }));


const RoleForm = (props) => {
    const dispatch = useDispatch();
    //const thanas = useSelector(state => state.data.thanas);
    //console.log(thanas);
    const methods = useFormContext();
    const { control, watch, formState, reset, getValues } = methods;

    const image = watch('image', []);
    console.log(image);
    const { errors } = formState;
    const permissions = useSelector(state => state.data.permissions);


    useEffect(() => {
        dispatch(getPermissions());
    }, [])

    console.log("permissions", watch("permissions"))

    return (
        <div>
            <Controller
                name="name"
                control={control}
                render={({ field }) =>
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.name}
                        required
                        helperText={errors?.name?.message}
                        label="Name"
                        id="name"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={field.value && { shrink: true }}
                    />
                }
            />
            <div style={{ display: "flex", flexDirection: "column", }}>

                <Controller
                    name={`all`}
                    control={control}
                    render={({ field }) => (
                        <FormControl>
                            <FormControlLabel
                                required
                                label={`ALL`}
                                control={
                                    <Checkbox
                                        {...field}
                                        color="primary"
                                        onChange={(event) => {

                                            field.onChange(event)

                                            let uniqPermissinsIds = _.uniq(getValues()?.permissions)

                                            if (event.target.checked) {
                                                permissions?.map((permission, indx) => {
                                                    uniqPermissinsIds.push(permission.id)
                                                })
                                                reset({ ...getValues(), permissions: _.uniq(uniqPermissinsIds) })
                                            }
                                            else {
                                                reset({ ...getValues(), permissions: [] })
                                            }

                                        }}
                                        checked={field.value ? field.value : false}
                                    />}
                            />
                        </FormControl>
                    )}
                />

                {permissions.map((permission) => {

                    return (<Controller
                        key={permission?.id}
                        name={`permission${permission?.id}`}
                        control={control}
                        render={({ field }) => (
                            <FormControl >
                                <FormControlLabel
                                    required
                                    label={`${permission.name}`}
                                    control={
                                        <Checkbox
                                            {...field}
                                            color="primary"
                                            // onChange={(event) => handleOnChange(event)}
                                            checked={getValues()?.permissions?.find(id => id == permission?.id) || false}
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    const unicPermissionIds = _.uniq(getValues()?.permissions)
                                                    reset({ ...getValues(), permissions: [...unicPermissionIds, permission?.id] })
                                                }
                                                else {
                                                    let removableId = getValues()?.permissions?.indexOf(permission?.id)
                                                    let permissionIdAll = _.uniq(getValues()?.permissions)
                                                    permissionIdAll.splice(removableId, 1)
                                                    reset({ ...getValues(), permissions: permissionIdAll })
                                                }
                                            }
                                            }
                                        />}
                                />
                            </FormControl>
                        )}
                    />)
                })
                }
            </div>


        </div>
    );
};

export default RoleForm;