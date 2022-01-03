import _ from '@lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import {
    BASE_URL
} from '../../../../constant/constants';
import '../Print.css';

function SiglePage({ classes, data, generalData, serialNumber, setPage }) {

    let pageBasedSerialNo = serialNumber

    return (
        <div
            className={`${classes.pageContainer} printPageContainer`}
            onMouseOver={() => {
                setPage(data.page)
                console.log("onMouseOver", data.page)
            }}
        >

            <div>
                <div className={classes.pageHead}>
                    <h2 className='title  pl-0 md:-pl-20'>Agent Report</h2>

                    <div className='logoContainer pr-0 md:-pr-20'>
                        <img
                            style={{
                                visibility: generalData.logo ? 'visible' : 'hidden'
                            }}
                            src={generalData.logo ? `${BASE_URL}${generalData.logo}` : null}
                            alt="Not found"
                        />
                    </div>
                </div>


                <Table
                    aria-label="simple table"
                    className={classes.table}
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
                        {data?.data?.map((agent, idx) => (
                            <TableRow id={idx} className='tableRow'>
                                <TableCell align="center" className='tableCell'><div>{pageBasedSerialNo++}</div></TableCell>
                                <TableCell align="center" className='tableCell'><div>{agent?.username}</div></TableCell>
                                <TableCell align="center" className='tableCell'><div>{agent?.group?.name}</div></TableCell>
                                <TableCell align="center" className='tableCell'><div>{agent?.city?.name}</div></TableCell>
                                <TableCell align="center" className='tableCell'><div>{agent?.primary_phone}</div></TableCell>
                                <TableCell align="center" className='tableCell'><div>{agent?.email}</div></TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </div>

            <div className={classes.pageBottmContainer}>
                <div className={classes.pageBottm}
                    style={{
                        visibility: _.isEmpty(generalData) ? 'hidden' : 'visible'
                    }}>
                    <div>
                        <h5><b>Address:</b></h5>
                        <h5>{generalData?.address || ""}</h5>
                    </div>

                    <div>
                        <h5><b>Mobile:</b></h5>
                        <h5>{generalData?.phone || ""}</h5>
                    </div>

                    <div>
                        <h5><b>Email:</b></h5>
                        <h5>{generalData?.email || ""}</h5>
                    </div>

                    <div>
                        <h5><b>Website:</b></h5>
                        <a href={generalData?.site_address || ""} target='_blank' rel="noreferrer">{generalData?.site_address}</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SiglePage
