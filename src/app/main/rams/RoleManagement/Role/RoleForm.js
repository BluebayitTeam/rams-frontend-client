import { Checkbox, FormControlLabel } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getPermissions } from '../../../../store/dataSlice';

const useStyles = makeStyles(theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: orange[400],
        opacity: 0
    },
    productImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut
    },
    productImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& $productImageFeaturedStar': {
                opacity: 0.8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $productImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));


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

    const [permissionIds, setPermissionIds] = useState([])

    useEffect(() => {
        dispatch(getPermissions());
    }, [])

    return (
        <div>
            <Controller
                name="name"
                control={control}
                render={({ field }) =>
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.first_name}
                        required
                        helperText={errors?.first_name?.message}
                        label="Name"
                        id="name"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                }
            />
            {/* <Controller
                name="permissions"
                control={control}
                render={({ field: { onChange, value } }) =>
                    <FormControl >
                        <InputLabel shrink htmlFor="select-multiple-native">
                            Permissions
                        </InputLabel>
                        <Select
                            multiple
                            native
                            value={value}
                            //label="Permissions"
                            onChange={(event, newValue) => {
                                const { options } = event.target;
                                const values = [];
                                for (let i = 0, l = options.length; i < l; i += 1) {
                                    if (options[i].selected) {
                                        values.push(options[i].value);
                                    }
                                }
                                onChange(values);
                            }}
                            inputProps={{
                                id: 'select-multiple-native',
                            }}
                        >
                            {permissions.map((permission) => (
                                <option key={permission.id} value={permission.id}>
                                    {permission?.name}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                }
            /> */}
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
                                        onChange={(event) => {

                                            field.onChange(event)

                                            let uniqPermissinsIds = _.uniq(permissionIds)

                                            if (event.target.checked) {
                                                permissions?.map((permission, indx) => {
                                                    uniqPermissinsIds.push(permission.id)
                                                    reset({ ...getValues(), [`permission${indx}`]: true, permissions: _.uniq(uniqPermissinsIds) })
                                                })
                                                setPermissionIds(_.uniq(uniqPermissinsIds))
                                            }
                                            else {
                                                permissions?.map((permissions, indx) => {
                                                    reset({ ...getValues(), [`permission${indx}`]: false, permissions: [] })
                                                })
                                                setPermissionIds([])
                                            }

                                        }}
                                        checked={field.value ? field.value : false}
                                    />}
                            />
                        </FormControl>
                    )}
                />

                {permissions.map((permission, indx) => {

                    return (<Controller
                        key={indx}
                        name={`permission${indx}`}
                        control={control}
                        render={({ field }) => (
                            <FormControl style={{ marginLeft: "5px" }}>
                                <FormControlLabel
                                    required
                                    label={`${permission.name}`}
                                    control={
                                        <Checkbox
                                            {...field}
                                            // onChange={(event) => handleOnChange(event)}
                                            checked={field.value ? field.value : false}
                                            onChange={(event) => {
                                                field.onChange(event)

                                                if (event.target.checked) {
                                                    const unicPermissionIds = _.uniq(permissionIds)
                                                    setPermissionIds([...unicPermissionIds, permission.id])
                                                    reset({ ...getValues(), permissions: [...unicPermissionIds, permission.id] })
                                                }
                                                else {
                                                    let removableId = permissionIds.indexOf(permissions.id)
                                                    let permissionIdAll = _.uniq(permissionIds)
                                                    permissionIdAll.splice(removableId, 1)
                                                    setPermissionIds(permissionIdAll)
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