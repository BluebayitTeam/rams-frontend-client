import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { BASE_URL, GET_SITESETTINGS } from 'src/app/constant/constants';

function SinglePageWithDynamicColumn({
  classes,
  reportTitle = 'Report',
  tableColumns = [],
  dispatchTableColumns,
  data,
  serialNumber,
  inSiglePageMode,
  setSortBy,
  setSortBySubKey,
  filteredData,
}) {
  console.log('tableColumns', tableColumns);

  let pageBasedSerialNo = serialNumber;

  console.log('datasasasasa', data);

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

  const filteredKeys = Object.keys(filteredData).filter(
    (key) => filteredData[key] !== null
  );

  // Separate non-date fields and date fields
  const nonDateFields = [];
  const dateFields = [];

  // Map filteredValues
  filteredKeys.forEach((key) => {
    const formattedKey = key.replace(/_/g, ' ');
    const value = filteredData[key];

    if (formattedKey === 'Date From' || formattedKey === 'Date To') {
      dateFields.push(
        `<b>${formattedKey}</b>: ${moment(value).format('DD-MM-YYYY')}`
      );
    } else {
      nonDateFields.push(`<b>${formattedKey}</b>: ${value}`);
    }
  });

  // Join non-date fields in one line, date fields on a new line
  const FilteredCriteria = `
		<div style="text-align: center; margin-top: -8px">
			${nonDateFields.join(', ')}<br/>
			${dateFields.join(', ')}
		</div>
	`;

  return (
    <div
      className={`${classes.pageContainer} printPageContainer  `}
      style={{ padding: '0px 90px  ' }}
      onMouseOver={() => {
        inSiglePageMode;
      }}>
      <div>
        <div className={classes.pageHead}>
          <div className='logoContainer pr-0 md:-pr-20'>
            <img
              style={{
                visibility: generalData.logo ? 'visible' : 'hidden',
                textAlign: 'center',
                marginTop: '20px',
              }}
              src={generalData.logo ? `${BASE_URL}${generalData.logo}` : null}
              alt='Not found'
            />
          </div>
        </div>

        <div className={classes.pageHead}>
          <h1 className='title  pl-0 md:-pl-20' style={{ marginTop: '-5px' }}>
            <u>{reportTitle}</u>
          </h1>
        </div>

        {/* Render FilteredCriteria with dangerouslySetInnerHTML */}
        <div className={classes.pageHead}>
          <p
            className='title  pl-0 md:-pl-20'
            dangerouslySetInnerHTML={{ __html: FilteredCriteria }}
          />
        </div>
        <Table aria-label='simple table' className={`${classes.table} w-fit `}>
          <TableHead style={{ backgroundColor: '#D7DBDD' }}>
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
                      draggable
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
                      <ArrowDownwardIcon
                        className={`sortIcon ${column.sortAction === false && 'invisible'}`}
                        style={{
                          transform:
                            data.sortBy === column.name
                              ? 'rotate(180deg)'
                              : 'rotate(0deg)',
                        }}
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
                hove>
                {tableColumns.map((column) => {
                  return column.show ? (
                    <TableCell align='center' className='tableCell'>
                      <div
                        style={{
                          whiteSpace: column.type === 'date' && 'nowrap',
                          ...column.style,
                          ...dataArr.rowStyle,
                        }}
                        {...(column.columnProps
                          ? column.columnProps(dataArr)
                          : {})}>
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

      <table className={classes.pageFooterContainer} style={{}}>
        <tbody>
          <tr>
            <td>
              <span style={{ textAlign: 'left' }}>
                Printed Date & Time: {moment().format('DD/MM/YY')},{' '}
                {moment().format('LT')}
              </span>
            </td>

            <td>
              <span>&nbsp;</span>
            </td>
            <td>
              {!inSiglePageMode && (
                <span style={{ textAlign: 'right', marginRight: '20px' }}>
                  Page : {inSiglePageMode ? page : data?.page}
                </span>
              )}
            </td>

            <td>
              <span style={{ textAlign: 'left' }}>
                Developed by RAMS(Bluebay IT Limited)-01861650206
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SinglePageWithDynamicColumn;
