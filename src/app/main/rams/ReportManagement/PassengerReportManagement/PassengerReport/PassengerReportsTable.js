
import { makeStyles, TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
import { GetApp } from "@material-ui/icons";
import ListIcon from '@material-ui/icons/List';
import PrintIcon from '@material-ui/icons/Print';
import { Autocomplete } from '@material-ui/lab';
import { KeyboardDatePicker } from '@material-ui/pickers';
import useReportData from "app/@customHooks/useReportData";
import useUserInfo from 'app/@customHooks/useUserInfo';
import { getCities, getGroups } from 'app/store/dataSlice';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { GET_SITESETTINGS } from '../../../../../constant/constants';
import '../../Print.css';
import Pagination from '../../reportComponents/Pagination';
import SinglePage from '../../reportComponents/SiglePage';
import { getAgents, getAllAgents } from '../store/passengerReportSlice';


const useStyles = makeStyles(theme => ({
    pageContainer: {
        width: '90%',
        backgroundColor: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '20px',
        paddingTop: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    menubar: {
        backgroundColor: theme.palette.primary.light,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        position: 'sticky',
        top: '0px',
        '& .inside': {
            color: theme.palette.primary.main
        }
    },
    pagination: {
        '& button': {
            color: theme.palette.primary.dark,
            borderColor: theme.palette.primary.dark,
        }
    },
    pageHead: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10px',
        '& .logoContainer': {
            height: '50px',
            '& img': {
                height: '100%',
                with: 'auto'
            }
        },
        '& .title': {
            width: 'fit-content',
        }
    },
    table: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxHeight: '',
        '& .tableRow': {
            height: '37px',
            overflow: 'hidden',
        },
        '& .tableCell': {
            padding: '0px',
            height: '37px',
            '& div': {
                height: '37px',
                padding: '0px 2px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
            }
        },
    },
    pageBottmContainer: {
        width: '100%',
        padding: '10px',
        background: '#e9e9e9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pageBottm: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        '& > div': {
            display: 'flex',
            flexWrap: 'wrap',
            '& > h5': {
                paddingRight: '5px'
            }
        }
    }
}))



const PassengerReportsTable = (props) => {

    const classes = useStyles()

    const methods = useForm();
    const { reset, control, formState, getValues, setValue } = methods;
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

    const [modifiedAgentData, setModifiedAgentData] = useReportData()

    const { authTOKEN } = useUserInfo()

    console.log("modifiedAgentData", modifiedAgentData)

    //pagination state
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(25)

    const totalPages = sessionStorage.getItem('total_report_agents_pages')
    const totalElements = sessionStorage.getItem('total_report_agents_elements')

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


    //pagination handler
    const firstPageHandler = (event) => {
        dispatch(getAgents({ values: getValues(), pageAndSize: { page, size } })).then(res => {
            setModifiedAgentData(res.payload)
        });
    }

    const previousPageHandler = (event) => {
        dispatch(getAgents({ values: getValues(), pageAndSize: { page, size } })).then(res => {
            setModifiedAgentData(res.payload)
        });
    }

    const nextPageHandler = (event) => {

    }

    const lastPageHandler = (event) => {

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
                                    dispatch(getAgents({ values: getValues(), pageAndSize: { page, size } })).then(res => {
                                        setModifiedAgentData(res.payload)
                                        console.log("res.payload", res.payload)
                                    });
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
                                    dispatch(getAgents({ values: getValues(), pageAndSize: { page, size } })).then(res => {
                                        setModifiedAgentData(res.payload)
                                    });
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
                                    dispatch(getAgents({ values: getValues(), pageAndSize: { page, size } })).then(res => {
                                        setModifiedAgentData(res.payload)
                                    });
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
                                    dispatch(getAgents({ values: getValues(), pageAndSize: { page, size } })).then(res => {
                                        setModifiedAgentData(res.payload)
                                    });
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
                                    dispatch(getAgents({ values: getValues(), pageAndSize: { page, size } })).then(res => {
                                        setModifiedAgentData(res.payload)
                                    });
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
                                    dispatch(getAgents({ values: getValues(), pageAndSize: { page, size } })).then(res => {
                                        setModifiedAgentData(res.payload)
                                    });
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
                        dispatch(getAllAgents(getValues())).then(res => {
                            setModifiedAgentData(res.payload)
                        });
                    }}
                >Show All <ListIcon /></Button>
            </div>
            <div
                className={classes.menubar}
            >
                <Pagination
                    page={page}
                    size={size}
                    totalPages={totalPages || 0}
                    totalElements={totalElements || 0}
                    onClickFirstPage={firstPageHandler}
                    onClickPreviousPage={previousPageHandler}
                    onClickNextPage={nextPageHandler}
                    onClickLastPage={lastPageHandler}
                />
                <GetApp
                    className="cursor-pointer inside inside"
                    style={{
                        marginLeft: '7px',
                        marginRight: '7px',
                        height: '30px',
                        width: '30px'
                    }} />
                <PrintIcon
                    onClick={handlePrint}
                    className="cursor-pointer inside"
                    style={{
                        marginLeft: '7px',
                        marginRight: '7px',
                        height: '30px',
                        width: '30px'
                    }} />

                <ListIcon
                    className="cursor-pointer inside"
                    style={{
                        height: '30px',
                        marginLeft: '7px',
                        marginRight: '7px',
                        width: '30px'
                    }} />
            </div>

            <div ref={componentRef}>

                {modifiedAgentData.map(agent => (//{((pageAndSize.page * pageAndSize.size) - pageAndSize.size) + serialNumber++}
                    <SinglePage classes={classes} data={agent.data} generalData={generalData} serialNumber={((agent.page * agent.size) - agent.size) + 1} />
                ))}

            </div>
        </>
    );
};
export default withRouter(PassengerReportsTable);
