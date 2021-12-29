
import _ from '@lodash';
import { makeStyles, TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { GetApp } from "@material-ui/icons";
import ListIcon from '@material-ui/icons/List';
import PrintIcon from '@material-ui/icons/Print';
import { Autocomplete } from '@material-ui/lab';
//import DownloadIcon from '@material-ui/icons/Download';
import Pagination from '@material-ui/lab/Pagination';
import { KeyboardDatePicker } from '@material-ui/pickers';
import useUserInfo from 'app/@customHooks/useUserInfo';
import { getCities, getGroups } from 'app/store/dataSlice';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import {
    BASE_URL, GET_SITESETTINGS
} from '../../../../../constant/constants';
import { getAgents, getAllAgents } from '../store/passengerReportSlice';
import './Print.css';





const useStyles = makeStyles(theme => ({
    menubar: {
        backgroundColor: theme.palette.primary.light,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        '& .inside': {
            color: theme.palette.primary.main
        }
    },
    pagination: {
        '& button': {
            color: theme.palette.primary.dark,
            borderColor: theme.palette.primary.dark,
        }
    }
}))



const PassengerReportsTable = (props) => {

    const classes = useStyles()

    const methods = useForm();
    const { reset, watch, control, formState, getValues, setValue } = methods;
    const { errors } = formState;
    const dispatch = useDispatch();
    const [orderInvoice, setOrderInvoice] = useState({});
    console.log(orderInvoice);

    const districts = useSelector(state => state.data.cities);
    const groups = useSelector(state => state.data.groups);

    const agents = useSelector(({ passengersReportManagement }) => passengersReportManagement.passengerReports.agents);
    const subTotal = 0
    const [generalData, setGeneralData] = useState({});
    const routeParams = useParams();
    const { orderId } = routeParams;
    //const classes = useStyles(props);
    const Theme = useTheme();
    const PaperColor = Theme.palette.background.paper;
    const [showPrintBtn, setShowPrintBtn] = useState(true);
    let serialNumber = 1;


    const { authTOKEN } = useUserInfo()

    useEffect(() => {
        dispatch(getCities());
        dispatch(getGroups())
        getGeneralData();
    }, []);

    //general setting data
    const getGeneralData = () => {
        fetch(`${GET_SITESETTINGS}`, authTOKEN)
            .then(response => response.json())
            .then(data => setGeneralData(data.general_settings[0] || {}))
            .catch(() => null)
    }

    //print
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    //pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(30);
    const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 30 });
    const totalPages = sessionStorage.getItem('total_products_pages');
    const totalElements = sessionStorage.getItem('total_products_elements');

    //pagination
    const handlePagination = (e, handlePage) => {
        // console.log("handlePage", handlePage);
        // setPageAndSize({ ...pageAndSize, page: handlePage });
        // setPage(handlePage - 1);
        // dispatch(getProducts({ ...pageAndSize, page: handlePage }));
    }

    return (
        <>
            <div
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: '40px',
                    width: 'fit-content'
                }}
            >
                <h2 style={{
                    marginBottom: '10px',
                    width: 'fit-content'
                }}>Filter</h2>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 'fit-content'
                    }}
                >

                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => {
                            return (<TextField
                                {...field}
                                autoFocus
                                value={field.value || ""}
                                className="mt-8 mb-16"
                                error={!!errors.username}
                                helperText={errors?.username?.message}
                                label="User Name"
                                id="username"
                                variant="outlined"
                                InputLabelProps={field.value && { shrink: true }}
                                onChange={(event) => {
                                    field.onChange(event.target.value)
                                    dispatch(getAgents(getValues(), pageAndSize));
                                }}
                            />)
                        }}
                    />

                    <Controller
                        name="district"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Autocomplete
                                className="mx-5 mt-8 mb-16"
                                freeSolo
                                //value={value ? parentCategories.find(parentCategory => parentCategory.id === value) : null}
                                options={districts}
                                getOptionLabel={(option) => `${option.name}`}
                                InputLabelProps={{ shrink: true }}
                                onChange={(event, newValue) => {
                                    onChange(newValue?.id)
                                    setValue('ditrictName', newValue?.name || "");
                                    dispatch(getAgents(getValues(), pageAndSize));
                                }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        style={{ width: '170px' }}
                                        placeholder="Select District"
                                        label="District"
                                        error={!!errors.district}
                                        required
                                        helperText={errors?.district?.message}
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                )}
                            />
                        )}
                    />

                    <Controller
                        name="primary_phone"
                        control={control}
                        render={({ field }) => {
                            return (<TextField
                                {...field}
                                value={field.value || ""}
                                className="mt-8 mb-16"
                                error={!!errors.primary_phone}
                                helperText={errors?.primary_phone?.message}
                                label="Mobile No"
                                id="primary_phone"
                                variant="outlined"
                                InputLabelProps={field.value && { shrink: true }}
                                onChange={(event) => {
                                    field.onChange(event.target.value)
                                    dispatch(getAgents(getValues(), pageAndSize));
                                }}
                            />)
                        }}
                    />

                    <Controller
                        name="group"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Autocomplete
                                className="mx-5 mt-8 mb-16"
                                freeSolo
                                //value={value ? parentCategories.find(parentCategory => parentCategory.id === value) : null}
                                options={groups}
                                getOptionLabel={(option) => `${option.name}`}
                                InputLabelProps={{ shrink: true }}
                                onChange={(event, newValue) => {
                                    onChange(newValue?.id);
                                    setValue('groupName', newValue?.name || "");
                                    dispatch(getAgents(getValues(), pageAndSize));
                                }}
                                //value={employee && employee.branch}
                                //defaultValue={{ id: null, name: "Select a branch" }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        style={{ width: '170px' }}
                                        placeholder="Select Agent Group"
                                        label="Agent Group"
                                        error={!!errors.group}
                                        helperText={errors?.group?.message}
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                )}
                            />
                        )}
                    />


                    <Controller
                        name="date_after"
                        control={control}
                        render={({ field }) => {
                            return (<KeyboardDatePicker
                                {...field}
                                style={{ width: '170px' }}
                                className="mt-8 mb-16 w-full"
                                label="Date to"
                                value={field.value || ""}
                                error={!!errors.date_after}
                                helperText={errors?.date_after?.message}
                                autoOk
                                variant="inline"
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                placeholder="dd/MM/yyyy"
                                onChange={(value) => {
                                    value && field.onChange(moment(new Date(value)).format("YYYY-MM-DD"))
                                    dispatch(getAgents(getValues(), pageAndSize));
                                }}
                                InputAdornmentProps={{ position: "start" }}
                            />)
                        }}
                    />

                    <Controller
                        name="date_before"
                        control={control}
                        render={({ field }) => {
                            return (<KeyboardDatePicker
                                {...field}
                                style={{ width: '170px' }}
                                className="mt-8 mb-16 w-full"
                                label="Date From"
                                value={field.value || ""}
                                error={!!errors.date_before}
                                helperText={errors?.date_before?.message}
                                autoOk
                                variant="inline"
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                placeholder="dd/MM/yyyy"
                                onChange={(value) => {
                                    value && field.onChange(moment(new Date(value)).format("YYYY-MM-DD"))
                                    dispatch(getAgents(getValues(), pageAndSize));
                                }}
                                InputAdornmentProps={{ position: "start" }}
                            />)
                        }}
                    />

                </div>
                <Button
                    variant="outlined"
                    onClick={() => {
                        reset({})
                        dispatch(getAllAgents(pageAndSize))
                    }}
                >Show All <ListIcon /></Button>
            </div>
            <div
                className={classes.menubar}
            >
                <Pagination
                    count={totalPages}
                    page={page + 1}
                    defaultPage={1}
                    showFirstButton
                    showLastButton
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePagination}
                    className={classes.pagination}
                />
                <GetApp
                    className="h-72 cursor-pointer inside inside"
                    style={{
                        marginLeft: '15px',
                        marginRight: '15px',
                        height: '30px',
                        width: '30px'
                    }} />
                <PrintIcon
                    onClick={handlePrint}
                    className="h-72 cursor-pointer inside"
                    style={{
                        height: '30px',
                        width: '30px'
                    }} />
            </div>
            <div
                className='printPageContainer'
                style={{
                    width: '75%',
                    backgroundColor: 'white',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    padding: '15px 0px'
                }}
                ref={componentRef}
            >
                <div >
                    <img
                        style={{
                            height: '100px',
                            width: '100px',
                            margin: 'auto',
                            marginTop: '20px',
                            marginBottom: '20px',
                            visibility: generalData.logo ? 'visible' : 'hidden'
                        }}
                        src={generalData.logo ? `${BASE_URL}${generalData.logo}` : null}
                        alt="Not found"
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'stretch',
                        marginTop: '10px',
                        marginBottom: '10px',
                        visibility: _.isEmpty(generalData) ? 'hidden' : 'visible'
                    }}>
                    <div>
                        <h5><b>Address:</b></h5>
                        <h5><b>Mobile:</b></h5>
                        <h5><b>Email:</b></h5>
                        <h5><b>Website:</b></h5>
                    </div>
                    <div style={{
                        marginLeft: 5
                    }}>
                        <h5>{generalData?.address || "_"}</h5>
                        <h5>{generalData?.phone || "_"}</h5>
                        <h5>{generalData?.email || "_"}</h5>
                        <a href={generalData?.site_address || "_"} target='_blank' rel="noreferrer">{generalData?.site_address}</a>
                    </div>
                </div>
                <h2 style={{
                    textAlign: 'center', marginTop: '15px', marginBottom: '15px'
                }}>Agent Report</h2>

            </div>
            <div ref={componentRef}>
                <div
                    className='printPageContainer'
                    style={{
                        width: '75%',
                        backgroundColor: 'white',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: '15px 0px'
                    }}
                >
                    <div >
                        <img
                            style={{
                                height: '100px',
                                width: '100px',
                                margin: 'auto',
                                marginTop: '20px',
                                marginBottom: '20px',
                                visibility: generalData.logo ? 'visible' : 'hidden'
                            }}
                            src={generalData.logo ? `${BASE_URL}${generalData.logo}` : null}
                            alt="Not found"
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'stretch',
                            marginTop: '10px',
                            marginBottom: '10px',
                            visibility: _.isEmpty(generalData) ? 'hidden' : 'visible'
                        }}>
                        <div>
                            <h5><b>Address:</b></h5>
                            <h5><b>Mobile:</b></h5>
                            <h5><b>Email:</b></h5>
                            <h5><b>Website:</b></h5>
                        </div>
                        <div style={{
                            marginLeft: 5
                        }}>
                            <h5>{generalData?.address || "_"}</h5>
                            <h5>{generalData?.phone || "_"}</h5>
                            <h5>{generalData?.email || "_"}</h5>
                            <a href={generalData?.site_address || "_"} target='_blank' rel="noreferrer">{generalData?.site_address}</a>
                        </div>
                    </div>
                    <h2 style={{
                        textAlign: 'center', marginTop: '15px', marginBottom: '15px'
                    }}>Agent Report</h2>
                    <Table
                        aria-label="simple table"
                        style={{
                            width: '90%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginBottom: '50px',
                        }}
                    >
                        <TableHead style={{ backgroundColor: '#D7DBDD' }}>
                            <TableRow>
                                <TableCell align="center">
                                    Sl_No
                                </TableCell>
                                <TableCell align="center">
                                    Name
                                </TableCell>
                                <TableCell align="center">
                                    Group
                                </TableCell>
                                <TableCell align="center">
                                    District
                                </TableCell>
                                <TableCell align="center">
                                    Mobile
                                </TableCell>
                                <TableCell align="center">
                                    Email
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {agents?.map((agent, idx) => (
                                <TableRow id={idx}>
                                    <TableCell align="center">{serialNumber++}</TableCell>
                                    <TableCell align="center">{`${agent?.first_name || ""} ${agent?.last_name || ""}`}</TableCell>
                                    <TableCell align="center">{agent?.group?.name}</TableCell>
                                    <TableCell align="center">{agent?.city?.name}</TableCell>
                                    <TableCell align="center">{agent?.primary_phone}</TableCell>
                                    <TableCell align="center">{agent?.email}</TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                        {!_.isEmpty(agents) &&
                            <TableRow style={{ backgroundColor: '#D7DBDD' }}>
                                <TableCell align="center" />
                                <TableCell align="center" />
                                <TableCell align="center" />
                                <TableCell align="center" />
                                <TableCell align="center">Total</TableCell>
                                <TableCell align="center">{subTotal}</TableCell>
                            </TableRow>}
                    </Table>

                </div>
                <div
                    className='printPageContainer'
                    style={{
                        width: '75%',
                        backgroundColor: 'white',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: '15px 0px'
                    }}
                >

                    <div
                        className='printHeader'
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                        <div >
                            <img
                                style={{
                                    height: '50px',
                                    width: 'auto',
                                    overflow: 'hidden',
                                    visibility: generalData.logo ? 'visible' : 'hidden'
                                }}
                                src={generalData.logo ? `${BASE_URL}${generalData.logo}` : null}
                                alt="Not found"
                            />
                        </div>
                        <h2 style={{
                            textAlign: 'center',
                            width: 'fit-content'
                        }}>Agent Report</h2>
                    </div>

                    <Table
                        aria-label="simple table"
                        style={{
                            width: '90%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginBottom: '50px',
                        }}
                    >
                        <TableHead style={{ backgroundColor: '#D7DBDD' }}>
                            <TableRow>
                                <TableCell align="center">
                                    Sl_No
                                </TableCell>
                                <TableCell align="center">
                                    Name
                                </TableCell>
                                <TableCell align="center">
                                    Group
                                </TableCell>
                                <TableCell align="center">
                                    District
                                </TableCell>
                                <TableCell align="center">
                                    Mobile
                                </TableCell>
                                <TableCell align="center">
                                    Email
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {agents?.map((agent, idx) => (
                                <TableRow id={idx}>
                                    <TableCell align="center">{serialNumber++}</TableCell>
                                    <TableCell align="center">{`${agent?.first_name || ""} ${agent?.last_name || ""}`}</TableCell>
                                    <TableCell align="center">{agent?.group?.name}</TableCell>
                                    <TableCell align="center">{agent?.city?.name}</TableCell>
                                    <TableCell align="center">{agent?.primary_phone}</TableCell>
                                    <TableCell align="center">{agent?.email}</TableCell>
                                </TableRow>
                            ))
                            }
                            <TableRow style={{
                                backgroundColor: '#D7DBDD', display: 'flex',
                                justifyContent: 'space-around',
                            }}>

                                <h5 style={{ width: 'fit-content' }}><b>Address:</b>{generalData?.address || "_"}</h5>
                                <h5 style={{ width: 'fit-content' }}><b>Mobile:</b>{generalData?.phone || "_"}</h5>
                                <h5 style={{ width: 'fit-content' }}><b>Email:</b>{generalData?.email || "_"}</h5>
                                <h5 style={{ width: 'fit-content' }}><b>Website:</b><a style={{ width: 'fit-content' }} href={generalData?.site_address || "_"} target='_blank' rel="noreferrer">{generalData?.site_address}</a></h5>

                            </TableRow>
                        </TableBody>

                    </Table>

                </div>
            </div>
        </>
    );
};
export default withRouter(PassengerReportsTable);
