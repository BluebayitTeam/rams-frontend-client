
import { faBookOpen, faScroll } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles, TextField } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import PrintIcon from '@material-ui/icons/Print';
import { Autocomplete } from '@material-ui/lab';
import { KeyboardDatePicker } from '@material-ui/pickers';
import useReportData from "app/@customHooks/useReportData";
import useUserInfo from 'app/@customHooks/useUserInfo';
import { getCities, getGroups } from 'app/store/dataSlice';
import html2PDF from 'jspdf-html2canvas';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
        padding: '5px',
        position: 'sticky',
        top: '0px',
        '& .inside': {
            color: theme.palette.primary.main
        },
        '& .icon': {
            margin: '0px 3px',
            height: '40px',
            padding: '5px',
            width: '40px',
            '&:active': {
                borderRadius: '50%',
                border: '1px solid'
            }
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
            height: '75px',
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
            height: '36px',
            overflow: 'hidden',
        },
        '& .tableCell': {
            padding: '0px',
            height: '36px',
            '& div': {
                height: '36px',
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

    const districts = useSelector(state => state.data.cities);
    const groups = useSelector(state => state.data.groups);

    const { authTOKEN } = useUserInfo()

    const [generalData, setGeneralData] = useState({});

    const [modifiedAgentData, setModifiedAgentData] = useReportData([], 25)

    console.log("modifiedAgentData", modifiedAgentData)

    //tools state
    const [inPrint, setInPrint] = useState(false)
    const [inSiglePageMode, setInSiglePageMode] = useState(true)
    const [inShowAllMode, setInShowAllMode] = useState(false)

    //pagination state
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(25)
    const [totalPages, setTotalPages] = useState(0)
    const [totalElements, setTotalElements] = useState(0)

    let downloadPage = document.getElementById('downloadPage');

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

    //print action when show all mode or fecth data to go show all mode
    useEffect(() => {
        if (inPrint) {
            if (inSiglePageMode && (totalPages > 1)) {
                handleGetAllAgents()
            }
            else {
                handlePrint()
                setInPrint(false)
            }
        }
    }, [inPrint])

    //print action after show all mode's data fething 
    useEffect(() => {
        if (inPrint) {
            handlePrint()
            setInPrint(false)
            handleGetAgents()
        }
    }, [modifiedAgentData])

    //download handler
    const downloadHandler = () => {
        html2PDF(downloadPage, {
            jsPDF: {
                format: 'a4',
            },
            imageType: 'image/jpeg',
            output: './pdf/generate.pdf'
        });
    };

    //pagination handler
    const firstPageHandler = (event) => {
        handleGetAgents(event.page)
    }
    const previousPageHandler = (event) => {
        handleGetAgents(event.page)
    }
    const nextPageHandler = (event) => {
        handleGetAgents(event.page)
    }
    const lastPageHandler = (event) => {
        handleGetAgents(event.page)
    }

    //get agents
    const handleGetAgents = (pagePram, callBack) => {
        dispatch(getAgents({ values: getValues(), pageAndSize: { page: pagePram || page, size } })).then(res => {
            if (res.payload) {
                callBack && callBack(res.payload)
                setModifiedAgentData(res.payload.agents || [])
                setPage(res.payload.page || 1)
                setSize(res.payload.size || 25)
                setTotalPages(res.payload.total_pages || 0)
                setTotalElements(res.payload.total_elements || 0)
                setInSiglePageMode(true)
                setInShowAllMode(false)
            }
        });
    }

    const handleGetAllAgents = (callBack) => {
        dispatch(getAllAgents(getValues())).then(res => {
            if (res.payload) {
                callBack && callBack(res.payload)
                setModifiedAgentData(res.payload.agents)
                setInSiglePageMode(false)
                setInShowAllMode(true)
                //disablepagination
            }
        });
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
                                    handleGetAgents()
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
                                    handleGetAgents()
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
                                    handleGetAgents()
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
                                options={groups}
                                getOptionLabel={(option) => `${option.name}`}
                                InputLabelProps={{ shrink: true }}
                                onChange={(event, newValue) => {
                                    onChange(newValue?.id);
                                    setValue('groupName', newValue?.name || "");
                                    handleGetAgents()
                                }}
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
                                    handleGetAgents()
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
                                    handleGetAgents()
                                }}
                                InputAdornmentProps={{ position: "start" }}
                            />)
                        }}
                    />

                </div>
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
                    className="cursor-pointer inside icon"
                    onClick={() => downloadHandler()}
                />
                <PrintIcon
                    onClick={() => setInPrint(true)}
                    className="cursor-pointer inside icon"
                />

                <FontAwesomeIcon
                    className="cursor-pointer inside icon"
                    onClick={() => handleGetAgents()}
                    icon={faBookOpen}
                />

                <FontAwesomeIcon
                    className="cursor-pointer inside icon"
                    onClick={() => handleGetAllAgents()}
                    icon={faScroll}
                />

            </div>

            <div ref={componentRef} id="downloadPage">

                {modifiedAgentData.map(agent => (
                    <SinglePage classes={classes} data={agent} generalData={generalData} serialNumber={((agent.page * agent.size) - agent.size) + 1} setPage={setPage} />
                ))}

            </div>
        </>
    );
};
export default withRouter(PassengerReportsTable);
