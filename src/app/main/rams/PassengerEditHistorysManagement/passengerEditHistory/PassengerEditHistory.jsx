import FusePageCarded from '@fuse/core/FusePageCarded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PassengerEditHistoryHeader from './PassengerEditHistoryHeader';
import PassengerEditHistoryModel from './models/PassengerEditHistoryModel';
import PassengerEditHistoryForm from './PassengerEditHistoryForm';
import { hasPermission } from 'src/app/constant/permission/permissionList';
import {
  BASE_URL,
  GET_PASSENGER_BY_PASSENGER_ID,
  GET_SITESETTINGS,
} from 'src/app/constant/constants';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { selectFilteredPassengerEditHistorys } from '../PassengerEditHistorysApi';
import { useDispatch } from 'react-redux';
import { getUserPermissions } from 'app/store/dataSlice';
import getUserData from 'src/app/@helpers/getUserData';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.default,
    color:
      theme.palette.type === 'dark'
        ? theme.palette.common.white
        : theme.palette.primary.dark,
    height: 'fit-content',
    paddingTop: '40px',
    paddingBottom: '40px',
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

function PassengerEditHistory() {
  const classes = useStyles();

  // const searchText = useSelector(
  //   ({ passengerEditHistorysManagement }) =>
  //     passengerEditHistorysManagement.officeWorkEditHistorys.searchText
  // );

  const searchText = '';

  useEffect(() => {
    dispatch(getUserPermissions());
  }, []);
  const passengerEditHistorys = useSelector(
    selectFilteredPassengerEditHistorys
  );

  const UserPermissions = useSelector((state) => state.data.UserPermissions);
  const dispatch = useDispatch();
  const DataId = sessionStorage.getItem('PassengerEditHistoryId');

  const [siteSetting, setSiteSetting] = useState({});
  const [pId, setpId] = useState(0);

  const [pstatus, setpstatus] = useState('');

  const [noData, setNoData] = useState(false);

  const [pimage, setpimage] = useState('');

  //get paasenger id when searh keyord changed
  useEffect(() => {
    if (searchText) {
      const authTOKEN = {
        headers: {
          'Content-type': 'application/json',
          Authorization: localStorage.getItem('jwt_access_token'),
        },
      };
      axios
        .get(`${GET_PASSENGER_BY_PASSENGER_ID}${searchText}`, authTOKEN)
        .then((res) => {
          setpId(res?.data?.passenger_id || 0);
          setpstatus(res?.data?.current_status?.name || '');
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
  }, [searchText]);

  //get site's logo & address
  useEffect(() => {
    const { authToken } = getUserData();
    axios
      .get(GET_SITESETTINGS, authToken)
      .then((res) => {
        setSiteSetting(res?.data?.general_settings[0] || {});
      })
      .catch(() => null);

    return () => sessionStorage.removeItem('passenger_search_key');
  }, []);
  return (
    <div>
      <div
        style={{
          color: 'white',
          backgroundColor: 'blue',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}>
        {<PassengerEditHistoryHeader />}
      </div>

      {noData ? (
        <div
          className={`flex-row md:flex-row rounded-4 mx-0 md:mx-40 ${classes.noData}`}>
          <h1>no data found</h1>
        </div>
      ) : (
        <div style={{ display: DataId === null ? 'none' : 'block' }}>
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

          {/* {<PassengerEditHistorysTable />} */}

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

export default PassengerEditHistory;
