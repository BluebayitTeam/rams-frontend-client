import { Edit } from '@mui/icons-material';
import moment from 'moment';
import { useNavigate } from 'react-router';

function EmbassyDetail({ classes, data, pid }) {
  const navigate = useNavigate();

  console.log('dataPrint', data);
  const gotoEditpage = () => {
    navigate(`/apps/embassy-management/embassys/${pid}/fromSearch`);
  };

  return (
    <>
      <div
        className={`my-0 rounded-4 mx-0 md:mx-40 mt-60 ${classes.blockContainer}`}>
        <div className='blockContentName'>Embassy</div>

        <div
          className='blockContentHolder'
          style={{ display: data.id ? 'block' : 'none' }}>
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
              <i className='label text-xs md:text-sm'>Profession English:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.profession_english || ''}
              </b>
            </div>
          </div>

          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Profession Arabic:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.profession_arabic || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Salary:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.salary || ''}
              </b>
            </div>
          </div>

          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Stamping Status:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.stamping_status || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Stamping Date:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.stamping_date
                  ? moment(new Date(data.stamping_date)).format('DD/MM/YYYY')
                  : ''}
              </b>
            </div>
          </div>

          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Visa Expiry Date:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.visa_expiry_date
                  ? moment(new Date(data.visa_expiry_date)).format('DD/MM/YYYY')
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
              <i className='label text-xs md:text-sm'>Visa Number:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.visa_number_readonly || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Sponsor ID No:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.sponsor_id_no_readonly || ''}
              </b>
            </div>
          </div>

          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Sponsor Name English:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.sponsor_name_english_readonly || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Sponsor Name Arabic:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.sponsor_name_arabic_readonly || ''}
              </b>
            </div>
          </div>

          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
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

export default EmbassyDetail;
