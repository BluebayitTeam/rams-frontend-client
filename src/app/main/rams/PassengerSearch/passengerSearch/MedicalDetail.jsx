import { Edit } from '@mui/icons-material';
import moment from 'moment';
import { useNavigate } from 'react-router';

function MedicalDetail({ classes, data, pid }) {
  console.log('fddsjflkjdsf', data);
  const navigate = useNavigate();

  const gotoEditpage = () => {
    navigate(`/apps/medical/medicals/${pid}/fromSearch`);
  };

  return (
    <>
      <div
        className={`my-0 rounded-4 mx-0 md:mx-40 mt-60 ${classes.blockContainer}`}>
        <div className='blockContentName'>Medical</div>

        <div
          className='blockContentHolder'
          style={{ display: data.id ? 'block' : 'none' }}>
          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>New Visa No:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.new_visa_no || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Registration ID:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.registration_id || ''}
              </b>
            </div>
          </div>

          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Man Power Status:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.man_power_status || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Man Power Date:</i>
              <b
                className='value text-xs md:text-sm '
                style={{ color: 'black' }}>
                {data?.man_power_date
                  ? moment(new Date(data.man_power_date)).format('DD/MM/YYYY')
                  : ''}
              </b>
            </div>
          </div>

          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Submit Date:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.submit_date
                  ? moment(new Date(data.submit_date)).format('DD/MM/YYYY')
                  : ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Delivery Date:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.delivery_date
                  ? moment(new Date(data.delivery_date)).format('DD/MM/YYYY')
                  : ''}
              </b>
            </div>
          </div>

          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Recruiting Agency:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.recruiting_agency?.name || ''}
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

export default MedicalDetail;
