import React, { useState } from 'react';
import { GET_SITESETTINGS } from 'src/app/constant/constants';

function SiglePage2ForPassengerDelivery() {
  const [generalData, setGeneralData] = useState({});
  // get general setting data
  useEffect(() => {
    const authTOKEN = {
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('jwt_access_token'),
      },
    };
    fetch(`${GET_SITESETTINGS}`, authTOKEN)
      .then((response) => response.json())
      .then((data) => setGeneralData(data.general_settings[0] || {}))
      .catch(() => setGeneralData({}));
  }, []);
  return (
    <div
      className={`${classes.pageContainer} printPageContainer p-24`}
      onMouseOver={() => {
        inSiglePageMode || setPage(data.page);
      }}>
      <div>
        <div className={classes.pageHead}>
          <div className='logoContainer pr-0 md:-pr-20'>
            <img
              style={{
                visibility: generalData.logo ? 'visible' : 'hidden',
                textAlign: 'center',
              }}
              src={generalData.logo ? `${BASE_URL}${generalData.logo}` : null}
              alt='Not found'
            />
          </div>
        </div>

        {/* <div className={classes.pageHead}>
					<p className="title  pl-0 md:-pl-20">
					{` ${generalData?.address || ''}`}
					</p>
				</div> */}
        <div className={classes.pageHead}>
          <h3 className='title  pl-0 md:-pl-20 '>
            <u style={{ fontSize: '20px', fontWeight: '500' }}>
              Passenger Delivery Report
            </u>
          </h3>
        </div>

        {/* Extra Heading  */}
        <div className='ml-20 mt-40 text-base mb-40 font-semibold'>
          <table>
            <tbody>
              <tr>
                <td>Agent Name:</td>
                <td>{PassengerDeliveryAgent}</td>
              </tr>
              <tr>
                <td>PID:</td>
                <td>{PassengerDeliveryPID}</td>
              </tr>
              <tr>
                <td>Passport No :</td>
                <td>{PassengerDeliveryPassportNo} </td>
              </tr>
              <tr>
                <td>Name :</td>
                <td>{PassengerDeliveryName} </td>
              </tr>
              {/* <tr>
									<td>District  :</td>
									<td>{PassengerDeliveryDistrict} </td>
								</tr>
								<tr>
									<td>Mobile   :</td>
									<td>{PassengerDeliveryMobileNo} </td>
								</tr> */}
            </tbody>
          </table>
        </div>

        <div className={classes.pageHead}>
          <h3 className='title  pl-0 md:-pl-20 '>
            <u style={{ fontSize: '20px', fontWeight: '500' }}>{reportTitle}</u>
          </h3>
        </div>

        <Table aria-label='simple table' className={classes.table}>
          <TableHead style={{ backgroundColor: '#D7DBDD', height: '35px' }}>
            <TableRow>
              {tableColumns.map((column, indx) => {
                return column.show ? (
                  <TableCell
                    key={column.id}
                    align='center'
                    className='tableCellHead'
                    onDrop={(e) =>
                      dispatchTableColumns({
                        type: 'dragAndDrop',
                        dragger: e.dataTransfer.getData('draggerLebel'),
                        dropper: column.id,
                      })
                    }
                    onDragOver={(e) => e.preventDefault()}>
                    <div
                      draggable={true}
                      onDragStart={(e) =>
                        e.dataTransfer.setData('draggerLebel', column.id)
                      }
                      onClick={() => {
                        if (column.sortAction !== false) {
                          setSortBy(
                            data.sortBy === column.name ? '' : column.name
                          );
                          setSortBySubKey &&
                            column.subName &&
                            setSortBySubKey(column.subName);
                        }
                      }}
                      style={{
                        margin: indx === 0 && '0px -5px 0px 5px',
                      }}>
                      {column.label}
                      <FontAwesomeIcon
                        className={`sortIcon ${column.sortAction === false && 'invisible'}`}
                        style={{
                          transform:
                            data.sortBy === column.name
                              ? 'rotate(180deg)'
                              : 'rotate(0deg)',
                        }}
                        icon={faArrowUp}
                      />
                    </div>
                  </TableCell>
                ) : null;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map((dataArr, idx) => (
              <TableRow
                key={dataArr.id}
                className='tableRow cursor-pointer'
                hover
                style={{
                  backgroundColor: `${dataArr?.current_status?.color_code}`,
                }}>
                {tableColumns.map((column) => {
                  return column.show ? (
                    <TableCell align='center' className='tableCell'>
                      <div
                        style={{
                          whiteSpace: column.type === 'date' && 'nowrap',
                          ...column.style,
                          ...dataArr.rowStyle,
                        }}>
                        {column?.subName
                          ? dataArr?.[column.name]?.[column?.subName]
                          : column.type === 'date'
                            ? dataArr?.[column.name]
                              ? moment(new Date(dataArr?.[column.name])).format(
                                  'DD-MM-YYYY'
                                )
                              : ''
                            : column.name
                              ? dataArr?.[column.name]
                              : column?.isSerialNo
                                ? dataArr.hideSerialNo || pageBasedSerialNo++
                                : dataArr.getterMethod
                                  ? dataArr.getterMethod(dataArr)
                                  : column.getterMethod
                                    ? column.getterMethod(dataArr)
                                    : ''}
                      </div>
                    </TableCell>
                  ) : null;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default SiglePage2ForPassengerDelivery;
