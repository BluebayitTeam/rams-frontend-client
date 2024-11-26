/* eslint-disable no-undef */

import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useNavigate } from 'react-router';
import fillSpaceByUnderscore from 'src/app/@helpers/fillSpaceByUnderscore';

const useStyles = makeStyles((theme) => ({
  passPortNameContainer: {
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    '& .passPortNameBorder': {
      height: '1px',
      background:
        theme.palette.type === 'dark'
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
      width: '100%',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      '& .passPortNameText': {
        fontSize: '18px',
        position: 'absolute',
        top: '-13px',
        background: theme.palette.background.default,
        color:
          theme.palette.type === 'dark'
            ? theme.palette.common.white
            : theme.palette.primary.dark,
        textAlign: 'center',
        fontStyle: 'italic',
        padding: '0px 5px',
        zIndex: 1,
      },
    },
  },
}));

function PassengerDetailPrint({ classes, data, pid }) {
  const classesComponentScope = useStyles();

  const navigate = useNavigate();
  const gotoEditpage = () => {
    navigate(
      `/apps/passenger/passengers/${pid}/fromSearch/${fillSpaceByUnderscore(
        data.passenger_type?.name || ''
      ).toLocaleLowerCase()}`
    );
  };
  return (
    <>
      <div
        className={`my-0 rounded-4 mx-0 md:mx-40 mt-60 pl-10 pr-10 ${classes.blockContainer}`}
        style={{
          columnBreakInside: 'avoid',
          pageBreakInside: 'avoid',
          breakInside: 'avoid',
          margin: '30px',
        }}>
        <div className='blockContentName'>Passenger</div>

        <div className='blockContentHolder'>
          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Agent:</i>
              <b
                className='value text-xs md:text-sm'
                style={{
                  color: 'black',
                }}>{`${data?.agent?.first_name || ''} `}</b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Passenger Type:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.passenger_type?.name || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Passenger Name:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.passenger_name || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Father's Name:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.father_name || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>mother's Name:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.mother_name || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Spouse's Name:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.spouse_name || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Date Of Birth:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.date_of_birth
                  ? moment(new Date(data.date_of_birth)).format('DD/MM/YYYY')
                  : ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Gender:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.gender || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Marital Status:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.marital_status || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Contact No:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.contact_no || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>District:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.district?.name || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Police Station:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.police_station?.name || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Post Office:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.post_office || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Village:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.village || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>NID:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.nid || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Place Of Birth:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.place_of_birth || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Religion:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.religion || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Profession:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.profession?.name || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Agency:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.agency?.name || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Demand:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.demand?.company_name || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Target Country:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.target_country?.name || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Visa Entry:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.visa_entry?.visa_number || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Emergency Contact No:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.emergency_contact_no || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Office Serial:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.office_serial || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Notes:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.notes || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Place Of Residence:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.place_of_residence || ''}
              </b>
            </div>
          </div>

          <div
            className={classesComponentScope.passPortNameContainer}
            style={{ marginTop: '20px' }}>
            <div className='passPortNameBorder mx-2 md:mx-16'>
              <div className='passPortNameText'>Passport Information</div>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Passport No:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.passport_no || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Passport Type:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.passport_type || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Passport Issue Date:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.passport_issue_date
                  ? moment(new Date(data.passport_issue_date)).format(
                      'DD/MM/YYYY'
                    )
                  : ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Passport Expiry Date:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.passport_expiry_date
                  ? moment(new Date(data.passport_expiry_date)).format(
                      'DD/MM/YYYY'
                    )
                  : ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Passport Issue Place:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.passport_issue_place || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Last Update By:</i>
              <b
                className='value text-xs md:text-sm'
                style={{
                  color: 'black',
                }}>{`${data?.updated_by?.username || ''} [DT: ${
                data.updated_at
                  ? moment(new Date(data.updated_at)).format('DD/MM/YYYY')
                  : ''
              }]`}</b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PassengerDetailPrint;
