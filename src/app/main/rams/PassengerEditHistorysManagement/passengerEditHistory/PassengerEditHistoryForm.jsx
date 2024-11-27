/* eslint-disable react/no-unknown-property */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import { useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Print } from '@mui/icons-material';
import _ from 'lodash';
import moment from 'moment';
import CheckIcon from '@mui/icons-material/Check';
import { useGetPassengerEditHistoryQuery } from '../PassengerEditHistorysApi';

const useStyles = makeStyles(() => ({
  textField: {
    '& > div': {
      height: '35px',
    },
  },
  container: {
    padding: '0px 25px',
    minWidth: '1000px',
    '& *': {
      boxSizing: 'border-box',
    },
    '& .row': {
      // marginRight: '-15px',
      // marginLeft: '-15px'
    },
    '& .western': {
      marginBottom: '5px',
    },
    '& .borderedTable': {
      '& table, th, td': {
        border: '1px solid white',
      },
      '& table': {
        color: 'black',
        background: 'transparent',
        borderSpacing: 0,
        borderCollapse: 'collapse',
        '& td, th': {
          padding: '0px',
        },
      },
    },
  },
}));

function PassengerEditHistoryForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, watch, setValue, setError } = methods;

  const routeParams = useParams();
  const classes = useStyles(props);
  const [passengerEditHistoryId, setPassengerEditHistoryId] = useState('');
  const [showPrint, setShowPrint] = useState(false);
  const [localData, setLocalData] = useState([]);

  const { data, isSuccess } = useGetPassengerEditHistoryQuery(
    passengerEditHistoryId,
    {
      skip: !passengerEditHistoryId,
    }
  );
  useEffect(() => {
    if (isSuccess) {
      setLocalData(data);
      setShowPrint(true);
    } else {
      setLocalData([]);
      setShowPrint(false);
    }
  }, [isSuccess, data]);

  console.log('Fetched Data:', localData, isSuccess);

  useEffect(() => {
    if (_.isEmpty(data)) {
      setShowPrint(false);
    } else {
      setShowPrint(true);
    }

    if (routeParams.passengerEditHistoryId !== 'passengerEditHistory-form') {
      setValue('name', routeParams.passengerEditHistoryId);
    }
  }, [data, routeParams?.passengerEditHistoryId, setValue]);

  // print dom ref
  const componentRef = useRef();

  // printer action
  const printAction = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const { value } = e.target;

      if (value) {
        setPassengerEditHistoryId(value);
      } else {
        setError('name', {
          type: 'manual',
          message: 'Please enter a valid ID or Passport Number',
        });
      }
    }
  };

  const handleShowClick = () => {
    const value = watch('name');

    if (value) {
      setPassengerEditHistoryId(value);
    } else {
      setError('name', {
        type: 'manual',
        message: 'Please enter a valid ID or Passport Number',
      });
    }
  };

  return (
    <>
      <div className='flex justify-evenly items-center flex-wrap m-5'>
        <div>
          <h4>Passenger Job ID or Passport No.</h4>
        </div>
        <div className='flex'>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                id='name'
                className={classes.textField}
                variant='outlined'
                fullWidth
                onKeyDown={handleKeyDown}
              />
            )}
          />
          <button
            style={{
              background: 'white',
              border: '1px solid grey',
              borderRadius: '4px',
              padding: '0px 5px',
              height: '35px',
              marginTop: '3px',
              marginLeft: '1px',
            }}
            onClick={handleShowClick}>
            Show
          </button>
          {showPrint && (
            <button
              style={{
                background: 'white',
                border: '1px solid grey',
                borderRadius: '4px',
                padding: '0px 5px',
                height: '35px',
                marginTop: '3px',
                marginLeft: '1px',
              }}
              onClick={() => printAction()}>
              <Print />
            </button>
          )}
        </div>
        <div style={{ minWidth: '250px' }}>
          <h4>(Please use Chrome browser only to Print)</h4>
        </div>
      </div>
      <div ref={componentRef} className={classes.container}>
        <div className='row '>
          <div className='md:w-full '>
            <div>
              <table
                width='100%'
                cellpadding='7'
                cellspacing='2'
                className='mt-32 p-10'>
                <tr valign='middle'>
                  <td
                    valign='middle'
                    align='center'
                    style={{ width: '20%', padding: 0, marginLeft: '50px' }}>
                    <div
                      className='border border-black p-2 '
                      style={{
                        width: '133px',
                        height: '148px',
                        marginLeft: '40px',
                        paddingTop: '20px',
                      }}>
                      Please attach <br /> 2 photographs <br /> taken within{' '}
                      <br /> the last 6 months <br /> (3.5 * 4.5 cm)
                    </div>{' '}
                  </td>
                  <td valign='middle' style={{ width: '50%' }}>
                    <center>
                      <img
                        src='assets/images/logos/passengerEditHistory.jpg'
                        align='CENTER'
                        width='120'
                        height='120'
                        style={{ filter: 'grayscale(100%)' }}
                      />{' '}
                      <span style={{ fontSize: 'large' }}>
                        {' '}
                        <b>APPLICATION FOR VISA</b> <br />
                        Royal Thai Embassy , Dhaka <br />
                      </span>
                    </center>
                  </td>

                  <td valign='middle' style={{ width: '30%' }}>
                    <table cellspacing='15'>
                      <tr>
                        <td>
                          <b>Please Indicate Type of Visa Requested</b>
                        </td>
                      </tr>
                      <tr>
                        <td
                          valign='middle'
                          width='100%'
                          className=' d-flex'
                          style={{ display: 'flex' }}>
                          <div className='border border-black  w-20 d-flex '>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </div>{' '}
                          <div className='mx-10'>Diplomatic Visa</div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          valign='middle'
                          width='100%'
                          className=' d-flex'
                          style={{ display: 'flex' }}>
                          <div className='border border-black  w-20 d-flex '>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </div>{' '}
                          <div className='mx-10'>Official Visa</div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          valign='middle'
                          width='100%'
                          className=' d-flex'
                          style={{ display: 'flex' }}>
                          <div className='border border-black  w-20 d-flex '>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </div>{' '}
                          <div className='mx-10'>Courtesy Visa</div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          valign='middle'
                          width='100%'
                          className=' d-flex'
                          style={{ display: 'flex' }}>
                          <div className='border border-black  w-20 d-flex '>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </div>{' '}
                          <div className='mx-10'>Non-Immigration Visa</div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          valign='middle'
                          width='100%'
                          className=' d-flex'
                          style={{ display: 'flex' }}>
                          <div className='border border-black  w-20 d-flex '>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </div>{' '}
                          <div className='mx-10'>Tourist Visa</div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          valign='middle'
                          width='100%'
                          className=' d-flex'
                          style={{ display: 'flex' }}>
                          <div className='border border-black  w-20 d-flex '>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </div>{' '}
                          <div className='mx-10'>Transit Visa</div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <b>Number Of Entries Requested ____ </b>
                        </td>
                      </tr>
                    </table>
                    &nbsp;
                  </td>
                </tr>
              </table>

              <table
                width='100%'
                cellpadding='7'
                cellspacing='2'
                className='mt-10 p-10'>
                <tr>
                  <td
                    colspan='3'
                    valign='middle'
                    width='100%'
                    className=' d-flex w-full	'
                    style={{ display: 'flex' }}>
                    <div className='border border-black  w-16 d-flex '>
                      <CheckIcon
                        className='cursor-pointer inside icon'
                        style={{
                          visibility:
                            localData?.[0]?.passenger?.gender === 'male'
                              ? 'visible'
                              : 'hidden',
                        }}
                      />{' '}
                    </div>{' '}
                    <div className='mx-10'>Mr.</div>
                    <div className='border border-black  w-16 d-flex '>
                      <CheckIcon
                        className='cursor-pointer inside icon'
                        style={{
                          visibility:
                            localData?.[0]?.passenger?.gender == 'female' &&
                            localData?.[0]?.passenger?.marital_status ==
                              'married'
                              ? 'visible'
                              : 'hidden',
                        }}
                      />{' '}
                    </div>{' '}
                    <div className='mx-10'>Mrs.</div>
                    <div className='border border-black  w-16 d-flex '>
                      <CheckIcon
                        className='cursor-pointer inside icon'
                        style={{
                          visibility:
                            localData?.[0]?.passenger?.gender == 'female' &&
                            localData?.[0]?.passenger?.marital_status ==
                              'single'
                              ? 'visible'
                              : 'hidden',
                        }}
                      />{' '}
                    </div>{' '}
                    <div className='mx-10'>Miss.</div>
                    <div
                      className=' w-full	 d-flex  font-bold'
                      style={{
                        borderBottom: '1px solid black',
                        width: '800px',
                        paddingLeft: '50px',
                      }}>
                      <span style={{ marginLeft: '72px' }}>
                        {localData?.[0]?.passenger?.passenger_name
                          .split(' ')[0]
                          ?.toUpperCase()}
                      </span>
                      <span style={{ marginLeft: '280px' }}>
                        {/* {localData?.[0]?.passenger?.passenger_name?.toUpperCase()} */}
                        {localData?.[0]?.passenger?.passenger_name
                          .substring(
                            localData?.[0]?.passenger?.passenger_name.indexOf(
                              ' '
                            ) + 1
                          )
                          ?.toUpperCase()}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan='3'
                    valign='middle'
                    width='100%'
                    className=' d-flex w-full	m-0 p-0 '
                    style={{ display: 'flex' }}>
                    <div className='d-flex' style={{ marginLeft: '300px' }}>
                      {' '}
                      First Name
                    </div>
                    <div className='d-flex' style={{ marginLeft: '100px' }}>
                      {' '}
                      Middle Name
                    </div>
                    <div className='d-flex' style={{ marginLeft: '100px' }}>
                      {' '}
                      Family Name
                    </div>
                    <div className='d-flex' style={{ marginLeft: '100px' }}>
                      (in Block letters)
                    </div>
                  </td>
                </tr>
              </table>

              <table
                width='100%'
                cellpadding='7'
                cellspacing='2'
                className='mt-10 p-10'
                style={{ minHeight: '1000px' }}>
                <tr>
                  <td>
                    <table width='100%'>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Former Name (if any)
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                  paddingLeft: '100px',
                                }}>
                                &nbsp;
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>

                  <td>
                    <table width='100%'>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Countries for which travel document is valid
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width='100%'>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>Nationality</td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                  paddingLeft: '100px',
                                }}
                                className=' font-bold'>
                                BANGLADESHI
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>

                  <td>
                    <table width='100%'>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>&nbsp;</td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td>
                    <table width='100%'>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Nationality at Birth
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                  paddingLeft: '100px',
                                }}
                                className=' font-bold'>
                                BANGLADESHI
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>

                  <td>
                    <table width='100%'>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Proposed Address in Thailand
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <table width='100%'>
                    <tr>
                      <td>
                        <table width='100%'>
                          <tr>
                            <td className='whitespace-nowrap'>Birth Place</td>
                            <td
                              style={{
                                borderBottom: '1px solid black',
                                width: '100%',
                                paddingLeft: '100px',
                              }}
                              className=' font-bold'>
                              {localData?.[0]?.passenger?.place_of_birth?.toUpperCase()}
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td>
                        <table width='100%'>
                          <tr>
                            <td className='whitespace-nowrap'>
                              Marital Status
                            </td>
                            <td
                              style={{
                                borderBottom: '1px solid black',
                                width: '100%',
                                paddingLeft: '100px',
                              }}
                              className=' font-bold'>
                              {localData?.[0]?.passenger?.marital_status?.toUpperCase()}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <td>
                    <div
                      className=' w-full d-flex '
                      style={{
                        borderBottom: '1px solid black',
                        width: '100%',
                      }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width='100%'>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Date of Birth
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                  paddingLeft: '100px',
                                }}
                                className=' font-bold'>
                                {' '}
                                {moment(
                                  new Date(
                                    localData?.[0]?.passenger?.date_of_birth
                                  )
                                ).format('DD-MM-YYYY')}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>

                  <td>
                    <table width='100%'>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Name and Address of Local Gurantor
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width='100%'>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Type of Travel Document
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                  paddingLeft: '100px',
                                }}
                                className=' font-bold'>
                                {localData?.[0]?.passenger?.passport_type?.toUpperCase()}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>

                  <td>
                    <table width='100%'>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>&nbsp;</td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <table width='100%'>
                    <tr>
                      <td>
                        <table width='100%'>
                          <tr>
                            <td className='whitespace-nowrap'>No.</td>
                            <td
                              style={{
                                borderBottom: '1px solid black',
                                width: '100%',
                                paddingLeft: '100px',
                              }}
                              className=' font-bold'>
                              {localData?.[0]?.passenger?.passport_no}
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td>
                        <table width='100%'>
                          <tr>
                            <td className='whitespace-nowrap'>Issue at</td>
                            <td
                              style={{
                                borderBottom: '1px solid black',
                                width: '100%',
                                paddingLeft: '100px',
                              }}
                              className=' font-bold'>
                              {localData?.[0]?.passenger?.passport_issue_place?.toUpperCase()}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <td>
                    <table width='100%'>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>&nbsp;</td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width='100%'>
                      <tr>
                        <td className='whitespace-nowrap'>Date of Issue</td>
                        <td
                          style={{
                            borderBottom: '1px solid black',
                            width: '30%',
                            paddingLeft: '50px',
                          }}
                          className=' font-bold'>
                          {' '}
                          {moment(
                            new Date(
                              localData?.[0]?.passenger?.passport_issue_date
                            )
                          ).format('DD-MM-YYYY')}
                        </td>
                        <td className='whitespace-nowrap'>Expiry Date</td>
                        <td
                          style={{
                            borderBottom: '1px solid black',
                            width: '30%',
                            paddingLeft: '50px',
                          }}
                          className=' font-bold'>
                          {' '}
                          {moment(
                            new Date(
                              localData?.[0]?.passenger?.passport_expiry_date
                            )
                          ).format('DD-MM-YYYY')}
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td>
                    <table>
                      <tr>
                        <td>Tel./Fax.</td>
                        <td
                          style={{
                            borderBottom: '1px solid black',
                            width: '100%',
                          }}
                        />
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width='100%'>
                      <tr>
                        <td className='whitespace-nowrap'>
                          Occupation (Specify Present position and name of
                          employer)
                        </td>
                        <td
                          style={{
                            borderBottom: '1px solid black',
                            width: '100%',
                            paddingLeft: '60px',
                          }}
                          className=' font-bold'>
                          {localData?.[0]?.embassy?.profession_english?.toUpperCase()}
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td>
                    <table>
                      <tr>
                        <td className='whitespace-nowrap'>
                          Name and Address of Guarantor in Thailand
                        </td>
                        <td
                          style={{
                            borderBottom: '1px solid black',
                            width: '100%',
                          }}
                        />
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width='100%'>
                      <tr>
                        <td
                          style={{
                            borderBottom: '1px solid black',
                            width: '100%',
                          }}
                        />
                      </tr>
                    </table>
                  </td>
                  <td>
                    <table width='100%'>
                      <tr>
                        <td
                          style={{
                            borderBottom: '1px solid black',
                            width: '100%',
                          }}
                        />
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width='100%'>
                      <tr>
                        <td
                          style={{
                            borderBottom: '1px solid black',
                            width: '100%',
                          }}
                        />
                      </tr>
                    </table>
                  </td>
                  <td>
                    <table width='100%'>
                      <tr>
                        <td
                          style={{
                            borderBottom: '1px solid black',
                            width: '100%',
                          }}
                        />
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width='100%'>
                      <tr>
                        <td className='whitespace-nowrap'>Current Address</td>
                        <td
                          style={{
                            borderBottom: '1px solid black',
                            width: '100%',
                          }}
                          className='text-center font-bold'>
                          {localData?.[0]?.passenger?.village?.toUpperCase()},{' '}
                          {localData?.[0]?.passenger?.post_office?.toUpperCase()}
                          ,{' '}
                          {localData?.[0]?.passenger?.police_station?.name?.toUpperCase()}
                          ,
                          {localData?.[0]?.passenger?.district?.name?.toUpperCase()}
                          ,
                          {localData?.[0]?.passenger?.country?.name?.toUpperCase()}{' '}
                          &nbsp;
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td>
                    <table>
                      <tr>
                        <td className='whitespace-nowrap'>Tel./Fax.</td>
                        <td
                          style={{
                            borderBottom: '1px solid black',
                            width: '100%',
                          }}
                        />
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td>
                    <table width='100%'>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>Tel.</td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>Email</td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td>
                    <table>
                      <tr>
                        <td>
                          I hereby declare that I will not request any refund
                          from my paid visa <br /> fee even if my application
                          has been declined
                          <br />
                          <table width='100%'>
                            <tr>
                              <td>
                                <table width='100%'>
                                  <tr>
                                    <td className='whitespace-nowrap'>
                                      Signature.
                                    </td>
                                    <td
                                      style={{
                                        borderBottom: '1px solid black',
                                        width: '100%',
                                      }}
                                    />
                                  </tr>
                                </table>
                              </td>
                              <td>
                                <table width='100%'>
                                  <tr>
                                    <td className='whitespace-nowrap'>Date</td>
                                    <td
                                      style={{
                                        borderBottom: '1px solid black',
                                        width: '100%',
                                      }}
                                    />
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td>
                    <table width='100%'>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Permanent Address(if different from above)
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                (if accompanying)
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td>&nbsp;</td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>

                  <td style={{ border: '1px solid black', marginTop: '50px' }}>
                    <h3 className='whitespace-nowrap font-bold'>
                      {' '}
                      Attention for Tourist and Transit Visas Applicants{' '}
                    </h3>
                    <p>
                      I hereby declare that the purpose of my visit to Thailand
                      | is for pleasure or transit only and that in no case
                      shall I engage myself in any profession or occupation
                      while in the country.{' '}
                    </p>
                    <table width='100%'>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>Signature.</td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>Date</td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td>
                    <table width='100%'>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Date of Arrival in Thiland
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Travelling by{' '}
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Flight No. or Vessel Name{' '}
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Duration of Proposed Stay{' '}
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Date of Previous Visit to Thailand{' '}
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Purpose of Visit:{' '}
                              </td>
                              <td
                                style={{
                                  width: '100%',
                                }}>
                                <table width='100%'>
                                  <tr>
                                    <td>
                                      <table width='100%'>
                                        <td>
                                          <div className='border border-black  w-16 d-flex '>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                          </div>
                                        </td>
                                        <td
                                          style={{
                                            width: '100%',
                                          }}>
                                          Tourism
                                        </td>
                                      </table>
                                    </td>
                                    <td>
                                      <table width='100%'>
                                        <td>
                                          <div className='border border-black  w-16 d-flex '>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                          </div>
                                        </td>
                                        <td
                                          style={{
                                            width: '100%',
                                          }}>
                                          Business
                                        </td>
                                      </table>
                                    </td>
                                    <td>
                                      <table width='100%'>
                                        <td>
                                          <div className='border border-black  w-16 d-flex '>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                          </div>
                                        </td>
                                        <td
                                          style={{
                                            width: '100%',
                                          }}>
                                          Transit
                                        </td>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  width: '100%',
                                }}>
                                <table width='100%'>
                                  <tr>
                                    <td>
                                      <table width='100%'>
                                        <td>
                                          <div className='border border-black  w-16 d-flex '>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                          </div>
                                        </td>
                                        <td
                                          style={{
                                            width: '100%',
                                          }}
                                          className='whitespace-nowrap'>
                                          Diplomatic/ Official
                                        </td>
                                      </table>
                                    </td>
                                    <td>
                                      <table width='100%'>
                                        <td>
                                          <div className='border border-black  w-16 d-flex '>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                          </div>
                                        </td>
                                        <td
                                          style={{
                                            width: '100%',
                                          }}
                                          className='whitespace-nowrap'>
                                          Other (Please Specify)
                                          ....................
                                        </td>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr
                        className='p-5 mt-20 '
                        style={{ border: '1px solid black' }}>
                        <h3>
                          <u>
                            <b>FOR OFFICIAL USE ONLY</b>
                          </u>
                        </h3>
                        <table width='100'>
                          <tr>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  UG
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  PP
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  AF
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  RD
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  Multiple
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black   d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  Other
                                </td>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  GPV
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  CAF
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  STH
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  SES
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  FIT
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  GPT
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  GEL
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  NRR
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black   d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  Other
                                </td>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  FVP
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  IAF
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  FP
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  NF
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  OT
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  ECBS
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  ECWC
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  ECFL
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  CI
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  RR
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  FPT
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  SN
                                </td>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  HT
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  WP
                                </td>
                              </table>
                            </td>

                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black   d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  Other
                                </td>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  A
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  R
                                </td>
                              </table>
                            </td>

                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black   d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  VL
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black   d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  WL
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black   d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  BL
                                </td>
                              </table>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <table
                                width='100%'
                                className='border border-solid	'>
                                <tr>
                                  {' '}
                                  <td
                                    colspan='2'
                                    width='100%'
                                    className='border border-solid	'>
                                    2
                                  </td>
                                  <td
                                    colspan='2'
                                    width='100%'
                                    className='border border-solid	'>
                                    3
                                  </td>
                                  <td
                                    colspan='2'
                                    width='100%'
                                    className='border border-solid	'>
                                    1
                                  </td>
                                  <td
                                    colspan='2'
                                    width='100%'
                                    className='border border-solid	'>
                                    4
                                  </td>
                                  <td
                                    colspan='2'
                                    width='100%'
                                    className='border border-solid	'>
                                    5
                                  </td>
                                  <td
                                    colspan='2'
                                    width='100%'
                                    className='border border-solid	'>
                                    6
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </tr>
                    </table>
                  </td>

                  {/* For Official Use Only Table  */}
                  <td>
                    <table className='border border-solid w-full'>
                      <h3 className='font-bold underline text-lg underline-offset-8'>
                        <b>
                          <center>FOR OFFICIAL USE</center>
                        </b>
                      </h3>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Application/ Reference No.{' '}
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>Visa No.</td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Type of Visa:{' '}
                              </td>
                              <td
                                style={{
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <table width='100%'>
                          <tr>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  Diplomatic Visa
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  Official Visa
                                </td>
                              </table>
                            </td>

                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black   d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  Courtesy Visa
                                </td>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </tr>
                      <tr>
                        <table width='100%'>
                          <tr>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  Non-Immigration Visa
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  Tourist Visa
                                </td>
                              </table>
                            </td>

                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black   d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  Transit Visa
                                </td>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </tr>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Category of Visa :{' '}
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Number of Entries :{' '}
                              </td>
                              <td
                                style={{
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <table width='100%'>
                          <tr>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  Single{' '}
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black  w-16 d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  Double{' '}
                                </td>
                              </table>
                            </td>

                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black   d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  Multiple{' '}
                                </td>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <td>
                                  <div className='border border-black   d-flex '>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: '100%',
                                  }}>
                                  ______Entries{' '}
                                </td>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </tr>

                      <tr>
                        <table width='100%'>
                          <tr>
                            <td>
                              <table width='100%'>
                                <tr>
                                  <td className='whitespace-nowrap'>
                                    Date of Issue
                                  </td>
                                  <td
                                    style={{
                                      borderBottom: '1px solid black',
                                      width: '100%',
                                    }}
                                  />
                                </tr>
                              </table>
                            </td>
                            <td>
                              <table width='100%'>
                                <tr>
                                  <td className='whitespace-nowrap'>Fee</td>
                                  <td
                                    style={{
                                      borderBottom: '1px solid black',
                                      width: '100%',
                                    }}
                                  />
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <td>
                          <div
                            className=' w-full d-flex '
                            style={{
                              borderBottom: '1px solid black',
                              width: '100%',
                            }}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Expiry Date{' '}
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Document Submitted:{' '}
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>&nbsp; </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table width='100%'>
                            <tr>
                              <td className='whitespace-nowrap'>
                                Authorized Signature and Seal{' '}
                              </td>
                              <td
                                style={{
                                  borderBottom: '1px solid black',
                                  width: '100%',
                                }}
                              />
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PassengerEditHistoryForm;
