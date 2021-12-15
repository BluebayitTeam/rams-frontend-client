import FuseLoading from '@fuse/core/FuseLoading';
import _ from '@lodash';
import { createMuiTheme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { motion } from 'framer-motion';
import MaterialDatatable from 'material-datatable';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { BASE_URL, SEARCH_AGENT } from '../../../../constant/constants';
import { getAgents, selectAgents } from '../store/agentsSlice';


const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        '& > *': {
            marginTop: theme.spacing(1),
            // marginBottom: theme.spacing(3),
        }
    },
}))

const AgentsTable = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const agents = useSelector(selectAgents);
    const searchText = useSelector(({ agentsManagement }) => agentsManagement.agents.searchText);
    const [searchAgent, setSearchAgent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(30);
    const [pageAndSize, setPageAndSize] = useState({ page: 1, size: 30 });

    let serialNumber = 1;
    const totalPages = sessionStorage.getItem('total_agents_pages');
    const totalElements = sessionStorage.getItem('total_agents_elements');

    const componentRef = useRef(null);

    useEffect(() => {
        dispatch(getAgents(pageAndSize)).then(() => setLoading(false));
    }, [dispatch]);

    useEffect(() => {
        searchText ? getSearchAgent() : setSearchAgent([])
    }, [searchText])

    const getSearchAgent = () => {
        fetch(`${SEARCH_AGENT}?username=${searchText}`)
            .then(response => response.json())
            .then(searchedAgentData => {
                setSearchAgent(searchedAgentData?.agents);
                console.log("searchedAgentData", searchedAgentData)
            })
            .catch(() => setSearchAgent([]))
    }

    function handleUpdateAgent(item) {
        localStorage.removeItem('agentEvent')
        props.history.push(`/apps/agent-management/agents/${item.id}/${item.name}`);
    }
    function handleDeleteAgent(item, agentEvent) {
        localStorage.removeItem('agentEvent')
        localStorage.setItem('agentEvent', agentEvent);
        props.history.push(`/apps/agent-management/agents/${item.id}/${item.name}`);
    }


    //pagination
    const handlePagination = (e, handlePage) => {
        setPageAndSize({ ...pageAndSize, page: handlePage })
        setPage(handlePage - 1)
        dispatch(getAgents({ ...pageAndSize, page: handlePage }))
    }

    function handleChangePage(event, value) {
        setPage(value);
        setPageAndSize({ ...pageAndSize, page: value + 1 })
        dispatch(getAgents({ ...pageAndSize, page: value + 1 }))
    }

    function handleChangeRowsPerPage(agentEvent) {
        setRowsPerPage(agentEvent.target.value);
        setPageAndSize({ ...pageAndSize, size: agentEvent.target.value })
        dispatch(getAgents({ ...pageAndSize, size: agentEvent.target.value }))
    }


    if (loading) {
        return <FuseLoading />;
    }

    if (agents?.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-1 items-center justify-center h-full"
            >
                <Typography color="textSecondary" variant="h5">
                    There are no agent!
                </Typography>
            </motion.div>
        );
    }






    const columns = [
        {
            field: 'id',
            name: 'SL_NO',
            options: {
                headerNoWrap: true,
                customBodyRender: () => {
                    const rowCount = searchText !== "" && !_.isEmpty(searchAgent) && _.isArray(searchAgent) ? searchAgent.length : agents.length
                    return <p>{((pageAndSize.page * pageAndSize.size) - (pageAndSize.size + (rowCount < pageAndSize.size ? rowCount : pageAndSize.size))) + serialNumber++}</p>
                }
            },
        },
        {
            field: 'image',
            name: 'Image',
            options: {
                print: false,
                headerNoWrap: true,
                customBodyRender: (value) => {
                    console.log("imgValue", value.image)
                    return value.image ? (<img
                        className="h-full block rounded"
                        style={{
                            marginTop: "-10px",
                            marginBottom: "-10px",
                            height: "60px",
                            borderRadius: "15px"
                        }}
                        src={`${BASE_URL}${value.image}`} />
                    ) : null
                }
            },
        },
        {
            field: 'username',
            name: 'UserName',
            options: {
                headerNoWrap: true,
                setCellProps: value => {
                    return {
                        style: {
                            fontSize: '25px !important'
                        }
                    };
                }
            }
        },
        {
            field: 'email',
            name: 'Email',
            options: {
                headerNoWrap: true,
            }
        },
        {
            field: 'primary_phone',
            name: 'Phone',
            options: {
                headerNoWrap: true,
            }
        },
        {
            field: 'street_address_one',
            name: 'Address',
            options: {
                headerNoWrap: true,
            }
        },
        {
            field: 'action',
            name: 'Action',
            options: {
                headerNoWrap: true,
                print: false,
                customBodyRender: (value) => {
                    return (
                        <div>
                            <EditIcon onClick={() => handleUpdateAgent(value)} className="cursor-pointer" style={{ color: 'green' }} /> <DeleteIcon onClick={() => handleDeleteAgent(value, "Delete")} className="cursor-pointer" style={{ color: 'red' }} />
                        </div>
                    )
                }
            }
        }
    ];


    // const memoizedColumns = useMemo(() => columns, []);


    const getMuiTheme = () => createMuiTheme({
        overrides: {
            MaterialDatatableBodyCell: {
                root: {
                    fontSize: "12px"
                }
            },
            MaterialDatatableToolbar: {
                display: "none"
            }
        }
    })


    const options = {
        // filterType: 'checkbox',
        // count: totalElements,
        // page: page,
        // onChangeRowsPerPage: rowsPerPage,
        // // customFooter: () => null,
        // customToolbar: () => null,
        // onRowsDelete: (deletedIds) => console.log({ deletedIds }),
        // responsive: 'scroll',
        // fixedHeader: true,
        // print: false,
        // toolbar: false

    };



    return (
        <div>
            <MaterialDatatable
                title={"Agent List"}
                data={searchText !== "" && !_.isEmpty(searchAgent) ? searchAgent : agents}
                columns={columns}
                options={options}
                className={classes}
            />
        </div>
    );
};

export default withRouter(AgentsTable);



