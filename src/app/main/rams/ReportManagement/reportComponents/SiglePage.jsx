import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { BASE_URL } from '../../../../constant/constants';
import '../Print.css';

function SiglePage({
    classes,
    data,
    generalData,
    serialNumber,
    setPage,
    inSiglePageMode,
    setSortBy
}) {

    let pageBasedSerialNo = serialNumber

    return (
        <div
            className={`${classes.pageContainer} printPageContainer`}
            onMouseOver={() => {
                inSiglePageMode || setPage(data.page)
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
                            <TableCell align="center" className='tableCellHead'>
                                <div onClick={() => setSortBy(data.sortBy === 'username' ? '' : 'username')}>
                                    Name{' '}
                                    <FontAwesomeIcon
                                        className='sortIcon'
                                        style={{ transform: data.sortBy === 'username' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                        icon={faArrowUp}
                                    />
                                </div>
                            </TableCell>
                            <TableCell align="center" className='tableCellHead'>
                                <div onClick={() => setSortBy(data.sortBy === 'group' ? '' : 'group')}>
                                    Group{' '}
                                    <FontAwesomeIcon
                                        className='sortIcon'
                                        style={{ transform: data.sortBy === 'group' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                        icon={faArrowUp}
                                    />
                                </div>
                            </TableCell>
                            <TableCell align="center" className='tableCellHead'>
                                <div onClick={() => setSortBy(data.sortBy === 'city' ? '' : 'city')}>
                                    District{' '}
                                    <FontAwesomeIcon
                                        className='sortIcon'
                                        style={{ transform: data.sortBy === 'city' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                        icon={faArrowUp}
                                    />
                                </div>
                            </TableCell>
                            <TableCell align="center" className='tableCellHead'>
                                <div onClick={() => setSortBy(data.sortBy === 'primary_phone' ? '' : 'primary_phone')}>
                                    Mobile{' '}
                                    <FontAwesomeIcon
                                        className='sortIcon'
                                        style={{ transform: data.sortBy === 'primary_phone' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                        icon={faArrowUp}
                                    />
                                </div>
                            </TableCell>
                            <TableCell align="center" className='tableCellHead'>
                                <div onClick={() => setSortBy(data.sortBy === 'email' ? '' : 'email')}>
                                    Email{' '}
                                    <FontAwesomeIcon
                                        className='sortIcon'
                                        style={{ transform: data.sortBy === 'email' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                        icon={faArrowUp}
                                    />
                                </div>
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



            <table className={classes.pageBottmContainer}>
                <tbody>
                    <tr>
                        <td>
                            <h5><b>Address: </b>{generalData?.address || ""}</h5>
                        </td>
                        <td>
                            <h5><b>Mobile: </b>{generalData?.phone || ""}</h5>
                        </td>
                        <td>
                            <h5><b>Email: </b>{generalData?.email || ""}</h5>
                        </td>
                        <td>
                            <h5><b>Website:</b><a href={generalData?.site_address || ""} target='_blank' rel="noreferrer">{generalData?.site_address}</a></h5>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SiglePage
