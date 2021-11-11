import { Checkbox, FormControl, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { GET_MENUS_BY_ROLE } from 'app/constant/constants';
import axios from 'axios';
import _ from "lodash";
import React, { useEffect } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getAllMenuNested, getRoles } from '../../../../store/dataSlice';
import { saveRoleMenu, updateRoleMenu } from '../store/roleMenuSlice';

const useStyles = makeStyles(theme => ({
    hidden: {
        display: "none"
    }
}));

function RoleMenuForm(props) {

    const userID = localStorage.getItem('UserID')

    const dispatch = useDispatch()
    const roles = useSelector(state => state.data.roles)
    const roleId = useSelector(({ roleMenusManagement }) => roleMenusManagement.roleMenu?.role);
    const roleMenus = useSelector(state => state.data.nestedMenus)
    const classes = useStyles(props);
    const methods = useFormContext();
    const { control, formState, getValues, reset, watch } = methods;
    const { errors, isValid, dirtyFields } = formState;
    const routeParams = useParams();
    const { roleMenuId } = routeParams;
    const name = watch('role');

    const history = useHistory();
    const handleDelete = localStorage.getItem('roleMenuEvent');

    // const roleMenus = useSelector(selectNavigationAll);

    useEffect(() => {
        dispatch(getRoles())
        // dispatch(setMenuItem())
        dispatch(getAllMenuNested())
    }, [])

    useEffect(() => {
        if (!_.isEmpty(roleMenus)) {
            roleMenus.map(parenMenu => {
                reset({ ...getValues(), [`extend${parenMenu.id}`]: true })
            })
        }
    }, [roleMenus])

    useEffect(() => {
        if (roleId) {
            getRoleSpecificMenus(roleId)
        }
    }, [roleId])

    const getRoleSpecificMenus = (roleId) => {
        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        axios.get(`${GET_MENUS_BY_ROLE}${roleId}`, authTOKEN).then(res => {
            console.log("rolesmenu", res.data.menu_items)
            let menuItemIds = []
            res.data.menu_items?.map(parentMenu => {
                menuItemIds.push(parentMenu.id)

                if (!_.isEmpty(parentMenu.children)) {
                    parentMenu.children.map(childMenu => {
                        menuItemIds.push(childMenu.id)
                    })
                }
            })
            reset({ ...getValues(), menu_items: _.uniq(menuItemIds) })
        })
    }


    function handleSaveRoleMenu() {
        dispatch(saveRoleMenu(getValues())).then((res) => {
            console.log("saveRoleMenuRes", res)
            if (res.payload) {
                localStorage.setItem("roleMenuAlert", "saveRoleMenu")
                history.push('/apps/roleMenu-management/roleMenus');
            }
        });
    }

    function handleUpdateRoleMenu() {
        dispatch(updateRoleMenu(getValues())).then((res) => {
            console.log("updateRoleMenuRes", res)
            if (res.payload) {
                localStorage.setItem("roleMenuAlert", "updateRoleMenu")
                history.push('/apps/roleMenu-management/roleMenus');
            }
        });
    }

    const handleSubmitOnKeyDownEnter = (ev) => {
        if (ev.key === 'Enter') {
            if (routeParams.roleMenuId === "new" && name) {
                handleSaveRoleMenu()
                console.log("saved")
            }
            else if (handleDelete !== 'Delete' && routeParams?.roleMenuName) {
                handleUpdateRoleMenu()
                console.log("updated")
            }
        }
    }


    return (
        <div>

            <Controller
                name={roleMenuId === 'new' ? 'created_by' : 'updated_by'}
                control={control}
                defaultValue={userID}
                render={({ field }) => {
                    return (<TextField
                        {...field}
                        className={classes.hidden}
                        label="created by"
                        id="created_by"
                        error={false}
                        helperText=""
                        required
                        variant="outlined"
                        fullWidth
                    />)
                }}
            />

            <Controller
                name="role"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        freeSolo
                        value={value ? roles.find(data => data.id == value) : null}
                        options={roles}
                        getOptionLabel={(option) => `${option.name}`}
                        onChange={(event, newValue) => {
                            onChange(newValue?.id);
                            getRoleSpecificMenus(newValue?.id)
                        }}
                        renderInput={params => (

                            <TextField
                                {...params}
                                placeholder="Select Role"
                                label="Role"
                                error={!!errors.role}
                                required
                                helperText={errors?.role?.message}
                                variant="outlined"
                                autoFocus
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onKeyDown={handleSubmitOnKeyDownEnter}
                            />
                        )}
                    />
                )}
            />


            <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
                {roleMenus.map((Parent_menu) => {
                    return (
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                            <Controller
                                name={`extend${Parent_menu.id}`}
                                control={control}
                                render={({ field }) => (
                                    <FormControl>
                                        <div style={{ display: "flex", flexDirection: "row" }}>

                                            {getValues()[`extend${Parent_menu.id}`] ?
                                                (<KeyboardArrowDown
                                                    style={{ marginTop: "10px", marginRight: "5px", cursor: "pointer" }}
                                                    onClick={() => reset({ ...getValues(), [`extend${Parent_menu.id}`]: false })}
                                                />) :
                                                (<KeyboardArrowRight
                                                    style={{ marginTop: "10px", marginRight: "5px", cursor: "pointer" }}
                                                    onClick={() => reset({ ...getValues(), [`extend${Parent_menu.id}`]: true })}
                                                />)
                                            }

                                            <FormControlLabel
                                                required
                                                label={`${Parent_menu?.translate}`}
                                                control={
                                                    <>
                                                        <Checkbox
                                                            {...field}
                                                            color="primary"
                                                            onChange={(event) => {
                                                                let uniqMenuItemIds = _.uniq(getValues().menu_items)

                                                                if (event.target.checked) {
                                                                    Parent_menu.children?.map((menu_item) => {
                                                                        uniqMenuItemIds.push(menu_item.id)
                                                                    })
                                                                    uniqMenuItemIds.push(Parent_menu.id)

                                                                    reset({ ...getValues(), menu_items: _.uniq(uniqMenuItemIds) })
                                                                }
                                                                else {
                                                                    let menuItemIdAll = _.uniq(getValues()?.menu_items)

                                                                    Parent_menu.children?.map((menu_item) => {
                                                                        let removableIndex = menuItemIdAll?.indexOf(menu_item?.id)

                                                                        if (removableIndex >= 0) {
                                                                            menuItemIdAll.splice(removableIndex, 1)
                                                                        }
                                                                    })
                                                                    menuItemIdAll.splice(menuItemIdAll?.indexOf(Parent_menu.id), 1)

                                                                    reset({ ...getValues(), menu_items: _.uniq(menuItemIdAll) })
                                                                }
                                                            }}
                                                            checked={getValues().menu_items?.find(id => id == Parent_menu?.id) || false}
                                                        />

                                                    </>}
                                            />

                                        </div>
                                    </FormControl>
                                )}
                            />

                            {
                                Parent_menu.children && getValues()[`extend${Parent_menu.id}`] ? Parent_menu.children?.map((menu_item) => {

                                    return (<Controller
                                        key={menu_item?.id}
                                        name={`menu_item${menu_item?.id}`}
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl style={{ marginLeft: "55px" }}>
                                                <FormControlLabel
                                                    required
                                                    label={`${menu_item?.translate}`}
                                                    control={
                                                        <Checkbox
                                                            {...field}
                                                            color="primary"
                                                            checked={getValues()?.menu_items?.find(id => id == menu_item.id) || false}
                                                            onChange={(event) => {
                                                                if (event.target.checked) {
                                                                    let unicMenuItemds = _.uniq(getValues()?.menu_items)
                                                                    unicMenuItemds.push(menu_item.id)
                                                                    unicMenuItemds.push(Parent_menu.id)
                                                                    reset({ ...getValues(), menu_items: _.uniq(unicMenuItemds) })
                                                                }
                                                                else {
                                                                    let menuItemIdAll = _.uniq(getValues()?.menu_items)
                                                                    let removableIndex = menuItemIdAll?.indexOf(menu_item.id)
                                                                    if (removableIndex >= 0) {
                                                                        menuItemIdAll.splice(removableIndex, 1)
                                                                    }
                                                                    reset({ ...getValues(), menu_items: _.uniq(menuItemIdAll) })
                                                                }
                                                            }
                                                            }
                                                        />}
                                                />
                                            </FormControl>
                                        )}
                                    />)
                                }) : null
                            }
                        </div>
                    )
                })
                }
            </div>

        </div>
    );
}

export default RoleMenuForm