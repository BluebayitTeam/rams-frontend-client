import { Edit } from '@mui/icons-material';
import moment from 'moment';
import { useNavigate } from 'react-router';

function OfficeWorkDetailPrint({ classes, data, pid }) {
  const navigate = useNavigate();

  const gotoEditpage = () => {
    navigate(`/apps/officeWork-management/officeWork/${pid}/fromSearch`);
  };

  return (
    <>
      <div
        className={`my-0 rounded-4 mx-0 md:mx-40 mt-60 ${classes.blockContainer}`}>
        <div className='blockContentName'>Office Work</div>

        <div
          className='blockContentHolder'
          style={{ display: data.id ? 'block' : 'none' }}>
          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Police Clearance No:</i>
              <b className='value text-xs md:text-sm'>
                {data?.police_clearance_no || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Driving License No:</i>
              <b className='value text-xs md:text-sm'>
                {data?.driving_license_no || ''}
              </b>
            </div>
          </div>

          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>
                Police Clearance Status:
              </i>
              <b className='value text-xs md:text-sm'>
                {data?.police_clearance_status || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>
                Driving License Status:
              </i>
              <b className='value text-xs md:text-sm'>
                {data?.driving_license_status || ''}
              </b>
            </div>
          </div>

          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Finger No:</i>
              <b className='value text-xs md:text-sm'>
                {data?.finger_no || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>
                Certificate & Experience :
              </i>
              <b className='value text-xs md:text-sm'>
                {data?.certificate_experience || ''}
              </b>
            </div>
          </div>

          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Finger Status:</i>
              <b className='value text-xs md:text-sm'>
                {data?.finger_status || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Finger Date:</i>
              <b className='value text-xs md:text-sm'>
                {data?.finger_date
                  ? moment(new Date(data.finger_date)).format('DD/MM/YYYY')
                  : ''}
              </b>
            </div>
          </div>
          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Police Clearance Date:</i>
              <b className='value text-xs md:text-sm'>
                {data?.police_clearance_date
                  ? moment(new Date(data.police_clearance_date)).format(
                      'DD/MM/YYYY'
                    )
                  : ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Driving License Date:</i>
              <b className='value text-xs md:text-sm'>
                {data?.driving_license_date
                  ? moment(new Date(data.driving_license_date)).format(
                      'DD/MM/YYYY'
                    )
                  : ''}
              </b>
            </div>
          </div>

          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Last Update By:</i>
              <b className='value text-xs md:text-sm'>{`${data?.updated_by?.username || ''} [DT: ${
                data.updated_at
                  ? moment(new Date(data.updated_at)).format('DD/MM/YYYY')
                  : ''
              }]`}</b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'></div>
          </div>
        </div>

        <div
          style={{
            display: data.id ? 'none' : 'block',
            height: '50px',
            color: 'red',
          }}>
          <h1 style={{ marginTop: '10px', marginBottom: '10px' }}>
            No Data Found
          </h1>
        </div>
        <div className='blockContentAction' onClick={() => gotoEditpage()}>
          <Edit />
        </div>
      </div>
    </>
  );
}

export default OfficeWorkDetailPrint;
