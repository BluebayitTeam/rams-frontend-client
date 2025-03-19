import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { getAllMenuNested, getRoles } from "app/store/dataSlice";
import axios from "axios";
import _ from "lodash";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { GET_MENUS_BY_ROLE } from "src/app/constant/constants";

function RoleMenuForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch, reset, getValues } = methods;
  const { errors } = formState;
  const roles = useSelector((state) => state.data.roles);
  const roleId = useSelector(
    ({ roleMenusManagement }) => roleMenusManagement?.roleMenu?.role
  );
  const roleMenus = useSelector((state) => state.data.nestedMenus);

  useEffect(() => {
    dispatch(getRoles());
    dispatch(getAllMenuNested());
  }, []);

  useEffect(() => {
    if (!_.isEmpty(roleMenus)) {
      roleMenus.map((parenMenu) => {
        reset({ ...getValues(), [`extend${parenMenu.id}`]: true });
      });
    }
  }, [roleMenus]);

  useEffect(() => {
    if (watch("role")) {
      getRoleSpecificMenus(watch("role"));
    }
  }, [watch("role")]);

  const getRoleSpecificMenus = (roleId) => {
    const authTOKEN = {
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("jwt_access_token"),
      },
    };
    axios.get(`${GET_MENUS_BY_ROLE}${roleId}`, authTOKEN).then((res) => {
      const menuItemIds = [];
      res.data.menu_items?.map((parentMenu) => {
        menuItemIds.push(parentMenu.id);

        if (!_.isEmpty(parentMenu.children)) {
          parentMenu.children.map((childMenu) => {
            menuItemIds.push(childMenu.id);
          });
        }
      });
      reset({ ...getValues(), menu_items: _.uniq(menuItemIds) });
    });
  };

  return (
    <div>
      <Controller
        name="role"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            freeSolo
            value={value ? roles.find((data) => data.id === value) : null}
            options={roles}
            getOptionLabel={(option) => `${option.name}`}
            onChange={(event, newValue) => {
              onChange(newValue?.id);
              getRoleSpecificMenus(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Role"
                label="Role"
                helperText={errors?.role?.message}
                variant="outlined"
                autoFocus
                InputLabelProps={
                  value ? { shrink: true } : { style: { color: "red" } }
                }
              />
            )}
          />
        )}
      />

      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
      >
        {roleMenus.map((parentMenu) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
              }}
            >
              <Controller
                name={`extend${parentMenu.id}`}
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      {getValues()[`extend${parentMenu.id}`] ? (
                        <KeyboardArrowDown
                          style={{
                            marginTop: "10px",
                            marginRight: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            reset({
                              ...getValues(),
                              [`extend${parentMenu.id}`]: false,
                            })
                          }
                        />
                      ) : (
                        <KeyboardArrowRight
                          style={{
                            marginTop: "10px",
                            marginRight: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            reset({
                              ...getValues(),
                              [`extend${parentMenu.id}`]: true,
                            })
                          }
                        />
                      )}

                      <FormControlLabel
                        label={`${parentMenu?.translate}`}
                        control={
                          <Checkbox
                            {...field}
                            color="primary"
                            onChange={(event) => {
                              const uniqMenuItemIds = _.uniq(
                                getValues().menu_items
                              );

                              if (event.target.checked) {
                                parentMenu.children?.map((menuItem) => {
                                  uniqMenuItemIds.push(menuItem.id);
                                });
                                uniqMenuItemIds.push(parentMenu.id);

                                reset({
                                  ...getValues(),
                                  menu_items: _.uniq(uniqMenuItemIds),
                                });
                              } else {
                                const menuItemIdAll = _.uniq(
                                  getValues()?.menu_items
                                );

                                parentMenu.children?.map((menuItem) => {
                                  const removableIndex = menuItemIdAll?.indexOf(
                                    menuItem?.id
                                  );

                                  if (removableIndex >= 0) {
                                    menuItemIdAll.splice(removableIndex, 1);
                                  }
                                });
                                menuItemIdAll.splice(
                                  menuItemIdAll?.indexOf(parentMenu.id),
                                  1
                                );

                                reset({
                                  ...getValues(),
                                  menu_items: _.uniq(menuItemIdAll),
                                });
                              }
                            }}
                            checked={
                              getValues().menu_items?.find(
                                (id) => id === parentMenu?.id
                              ) || false
                            }
                          />
                        }
                      />
                    </div>
                  </FormControl>
                )}
              />

              {parentMenu.children && getValues()[`extend${parentMenu.id}`]
                ? parentMenu.children.map((menuItem) => (
                    <div
                      key={menuItem?.id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                      }}
                    >
                      {menuItem?.children?.length === 0 && (
                        <Controller
                          name={`menuItem${menuItem?.id}`}
                          control={control}
                          render={({ field }) => (
                            <FormControl style={{ marginLeft: "55px" }}>
                              <FormControlLabel
                                label={`${menuItem?.translate}`}
                                control={
                                  <Checkbox
                                    {...field}
                                    color="primary"
                                    checked={
                                      getValues()?.menu_items?.includes(
                                        menuItem.id
                                      ) || false
                                    }
                                    onChange={(event) => {
                                      const menuItemId = menuItem.id;
                                      const menuItems =
                                        getValues()?.menu_items || [];
                                      const updatedMenuItems = event.target
                                        .checked
                                        ? [
                                            ...new Set([
                                              ...menuItems,
                                              menuItemId,
                                              parentMenu.id,
                                            ]),
                                          ]
                                        : menuItems.filter(
                                            (id) => id !== menuItemId
                                          );

                                      reset({
                                        ...getValues(),
                                        menu_items: updatedMenuItems,
                                      });
                                    }}
                                  />
                                }
                              />
                            </FormControl>
                          )}
                        />
                      )}
                      {menuItem?.children?.length > 0 && (
                        <div>
                          {/* Parent Menu */}
                          <Controller
                            name={`menuItem${menuItem?.id}`}
                            control={control}
                            render={({ field }) => (
                              <FormControl style={{ marginLeft: "55px" }}>
                                <FormControlLabel
                                  label={`${menuItem?.translate}`}
                                  control={
                                    <Checkbox
                                      {...field}
                                      color="primary"
                                      checked={
                                        getValues()?.menu_items?.includes(
                                          menuItem.id
                                        ) || false
                                      }
                                      onChange={(event) => {
                                        const menuItemId = menuItem.id;
                                        const menuItems =
                                          getValues()?.menu_items || [];
                                        let updatedMenuItems = [...menuItems];

                                        if (event.target.checked) {
                                          // Select the parent menu and all its children
                                          updatedMenuItems = [
                                            ...new Set([
                                              ...menuItems,
                                              menuItemId,
                                              ...menuItem.children.map(
                                                (child) => child.id
                                              ),
                                            ]),
                                          ];
                                        } else {
                                          // Deselect the parent menu and all its children
                                          updatedMenuItems = menuItems.filter(
                                            (id) =>
                                              ![
                                                menuItemId,
                                                ...menuItem.children.map(
                                                  (child) => child.id
                                                ),
                                              ].includes(id)
                                          );
                                        }

                                        reset({
                                          ...getValues(),
                                          menu_items: updatedMenuItems,
                                        });
                                      }}
                                    />
                                  }
                                />
                              </FormControl>
                            )}
                          />

                          {/* Child Menu */}
                          {menuItem?.children?.map((nestedMenuItem) => (
                            <div
                              key={nestedMenuItem?.id}
                              style={{ marginLeft: "110px" }}
                            >
                              <Controller
                                name={`menuItem${nestedMenuItem?.id}`}
                                control={control}
                                render={({ field }) => (
                                  <FormControl>
                                    <FormControlLabel
                                      label={`${nestedMenuItem?.title}`}
                                      control={
                                        <Checkbox
                                          {...field}
                                          color="primary"
                                          checked={
                                            getValues()?.menu_items?.includes(
                                              nestedMenuItem.id
                                            ) || false
                                          }
                                          onChange={(event) => {
                                            const nestedMenuItemId =
                                              nestedMenuItem.id;
                                            const menuItems =
                                              getValues()?.menu_items || [];
                                            let updatedMenuItems = [
                                              ...menuItems,
                                            ];

                                            if (event.target.checked) {
                                              // Select the child menu and its parent (if not already selected)
                                              updatedMenuItems = [
                                                ...new Set([
                                                  ...menuItems,
                                                  nestedMenuItemId,
                                                  menuItem.id,
                                                ]),
                                              ];
                                            } else {
                                              // Deselect the child menu
                                              updatedMenuItems =
                                                menuItems.filter(
                                                  (id) =>
                                                    id !== nestedMenuItemId
                                                );
                                            }

                                            reset({
                                              ...getValues(),
                                              menu_items: updatedMenuItems,
                                            });
                                          }}
                                        />
                                      }
                                    />
                                  </FormControl>
                                )}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RoleMenuForm;
