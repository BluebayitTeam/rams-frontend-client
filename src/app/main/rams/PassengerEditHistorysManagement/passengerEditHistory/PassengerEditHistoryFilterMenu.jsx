import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getCities, getGroups } from 'app/store/dataSlice';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Keyword from 'src/app/@components/ReportComponents/Keyword';
import ReportDatePicker from 'src/app/@components/ReportComponents/ReportDatePicker';
import ReportSelect from 'src/app/@components/ReportComponents/ReportSelect';
import ReportTextField from 'src/app/@components/ReportComponents/ReportTextField';
import { getReportFilterMakeStyles } from '../../ReportUtilities/reportMakeStyls';
import {
  BASE_URL,
  GET_PASSENGER_BY_PASSENGER_ID,
  GET_SITESETTINGS,
} from 'src/app/constant/constants';
import ReportTextFieldPassenger from 'src/app/@components/ReportComponents/ReportTextFieldPassenger';
import PassengerEditHistorysTable from './PassengerEditHistorysTable';
import axios from 'axios';
import getUserData from 'src/app/@helpers/getUserData';

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.default,
    color:
      theme.palette.type === 'dark'
        ? theme.palette.common.white
        : theme.palette.primary.dark,
    height: 'fit-content',
    paddingTop: '80px',
    paddingBottom: '80px',
    overflow: 'hidden',
  },
  passengerImgContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    '& .passengerImgHolder': {
      height: 'fit-content',
      width: 'fit-content',
      overflow: 'hidden',
      border: `1px solid ${
        theme.palette.type === 'dark'
          ? theme.palette.primary.light
          : theme.palette.primary.dark
      }`,
      '& > img': {
        //usesed passport size hight by width
        height: '150px',
        width: '125px',
      },
    },
  },
  noData: {
    marginTop: '60px',
    display: 'flex',
    justifyContent: 'center',
    height: 'fit-content',
    border: `1px solid red`,
    alignItems: 'center',
    '& h1': {
      color: 'red',
      textAlign: 'center',
    },
  },

  currentStsContainer: {
    marginTop: '60px',
    display: 'flex',
    justifyContent: 'space-evenly',
    height: 'fit-content',
    border: `1px solid ${theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark}`,
    alignItems: 'center',
    '& .leftRow, .rightRow': {
      display: 'flex',
      justifyContent: 'center',
      '& .label': {
        color:
          theme.palette.type === 'dark'
            ? theme.palette.primary.light
            : theme.palette.primary.main,
        fontWeight: 400,
        padding: '8px 5px',
        borderBottom: `1px solid ${theme.palette.primary.light}`,
        fontSize: '17px',
      },
      '& .value': {
        // color: theme.palette.type === "light" ? theme.palette.common.black : theme.palette.common.white,
        fontWeight: 500,
        padding: '8px 5px',
        borderBottom: `1px solid ${theme.palette.primary.light}`,
        overflowWrap: 'break-word',
        fontSize: '18px',
        color: 'green',
      },
    },
    '& .rightRow': {
      '& .value': {
        color: 'red !important',
      },
    },
    '& .border': {
      borderLeft: `1px solid ${
        theme.palette.type === 'dark'
          ? theme.palette.primary.light
          : theme.palette.primary.dark
      }`,
    },
  },
}));

function PassengerEditHistoryFilterMenu({
  inShowAllMode,
  handleGetPassengerEditHistorys,
  handleGetAllPassengerEditHistorys,
  passengerEditHistorysId,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  console.log('passengerEditHistorysId', passengerEditHistorysId);
  const methods = useFormContext();
  const { getValues } = methods;
  const [noData, setNoData] = useState(false);

  const theme = useTheme();
  const { groups, cities } = useSelector((state) => state.data);
  const values = getValues();
  const [_reRender, setReRender] = useState(0);
  const [pimage, setpimage] = useState('');
  const [pstatus, setpstatus] = useState('');
  const [siteSetting, setsiteSetting] = useState({});

  // element refs
  const userNameEl = useRef(null);

  const [pId, setpId] = useState(0);

  const commonFieldProps = {
    setReRender,
    onEnter: () =>
      inShowAllMode
        ? handleGetAllPassengerEditHistorys()
        : handleGetPassengerEditHistorys(),
  };
  const commonKewordProps = {
    setReRender,
    onClick: () =>
      inShowAllMode
        ? handleGetAllPassengerEditHistorys()
        : handleGetPassengerEditHistorys(),
  };

  useEffect(() => {
    if (passengerEditHistorysId) {
      const authTOKEN = {
        headers: {
          'Content-type': 'application/json',
          Authorization: localStorage.getItem('jwt_access_token'),
        },
      };
      axios
        .get(
          `${GET_PASSENGER_BY_PASSENGER_ID}${passengerEditHistorysId}`,
          authTOKEN
        )
        .then((res) => {
          setpId(res?.data?.passenger_id || 0);
          setpstatus(res?.data?.current_status || '');
          setpimage(res?.data?.passenger_pic || '');
          if (res?.data?.id) {
            setNoData(false);
          } else {
            setNoData(true);
          }
        })
        .catch(() => {
          setpId(0);
          setNoData(true);
          setpimage('');
          setpstatus('');
        });
    }
  }, [passengerEditHistorysId]);

  //get site's logo & address
  useEffect(() => {
    const { authToken } = getUserData();
    axios
      .get(GET_SITESETTINGS, authToken)
      .then((res) => {
        setsiteSetting(res?.data?.general_settings[0] || {});
      })
      .catch(() => null);

    return () => sessionStorage.removeItem('passenger_search_key');
  }, []);

  return (
    <div>
      <div
        style={{
          display: 'flex',

          alignItems: 'center', // Center items horizontally
          color: 'white',
          backgroundColor: 'blue',
          paddingTop: '10px',
          paddingBottom: '10px',
          gap: '10px', // Add spacing between rows
        }}>
        <h1 className='hidden sm:flex text-16 md:text-24 mt-5 mx-12 font-semibold'>
          Passenger History
        </h1>
        {/* Search Field */}
        <div className='relative w-72 mr-[500px] ml-auto '>
          <ReportTextFieldPassenger
            {...commonFieldProps}
            name='username'
            label='Search by Passenger Id'
            domEl={userNameEl}
            width='300px'
          />
        </div>
      </div>

      {noData ? (
        <div
          className={`flex-row md:flex-row rounded-4 mx-0 md:mx-40 ${classes.noData}`}>
          <h1>no data found</h1>
        </div>
      ) : (
        <div
          style={{
            display: !passengerEditHistorysId ? 'none' : 'block',
          }}>
          <div style={{ display: noData ? '' : 'block' }}>
            <center>
              <img
                src={`${siteSetting?.logo ? `${BASE_URL}${siteSetting?.logo}` : null}`}
              />
              <div>
                <pre>{siteSetting?.address || ''}</pre>
              </div>
              {/* <div >
							<img src={`${BASE_URL}${pimage}`} height="150px" width="150px"/>
							</div> */}
              <div
                className={`w-full md:w-1/4 justify-center md:justify-start mt-20 md:mt-0 ${classes.passengerImgContainer}`}>
                <div className='passengerImgHolder rounded-2'>
                  <img src={`${BASE_URL}${pimage}`} />
                </div>
              </div>
              <div
                className={`flex-row md:flex-row rounded-4 mx-0 md:mx-40 ${classes.currentStsContainer}`}
                style={{ margin: '30px' }}>
                <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                  <i className='label text-xs md:text-sm'>Passenger ID :</i>
                  <b className='value text-xs md:text-sm'>{pId}</b>
                </div>
                <div className='border hidden md:block'></div>
                <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                  <i className='label text-xs md:text-sm'>Current Status :</i>

                  <b className='value text-xs md:text-sm'>{pstatus || ''}</b>
                </div>
              </div>
            </center>
          </div>

          {/* {<MedicalEditHistorysTable />}

          {<MusanedOkalaEditHistorysTable />}

          {<MofaEditHistorysTable />}

          {<OfficeWorkEditHistorysTable />}

          {<EmbassyEditHistorysTable />}

          {<TrainingEditHistorysTable />}

          {<ManpowerEditHistorysTable />}

          {<FlightEditHistorysTable />} */}
        </div>
      )}
    </div>
  );
}

export default PassengerEditHistoryFilterMenu;
