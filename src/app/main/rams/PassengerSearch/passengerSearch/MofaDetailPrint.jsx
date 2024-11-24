import moment from 'moment';
import { useNavigate } from 'react-router';

function MofaDetailPrint({ classes, data, pid }) {
  const navigate = useNavigate();

  const gotoEditpage = () => {
    navigate(`/apps/mofa-management/mofas/${pid}/fromSearch`);
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
        <div className='blockContentName'>Mofa</div>

        <div
          className='blockContentHolder'
          style={{ display: data.id ? 'block' : 'none' }}>
          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Mofa Status:</i>
              <b className='value text-xs md:text-sm'>
                {data?.mofa_status || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Mofa No:</i>
              <b className='value text-xs md:text-sm'>{data?.mofa_no || ''}</b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Mofa Date:</i>
              <b className='value text-xs md:text-sm'>
                {data?.mofa_date
                  ? moment(new Date(data.mofa_date)).format('DD/MM/YYYY')
                  : ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Re Mofa Charge:</i>
              <b className='value text-xs md:text-sm'>
                {data?.remofa_charge || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Re Mofa Status:</i>
              <b className='value text-xs md:text-sm'>
                {data?.remofa_status || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>why Re Mofa:</i>
              <b className='value text-xs md:text-sm'>
                {data?.why_remofa || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Mofa Agency:</i>
              <b className='value text-xs md:text-sm'>
                {data?.mofa_agency?.name || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>

            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Last Update By:</i>
              <b className='value text-xs md:text-sm'>{`${data?.updated_by?.username || ''} [DT: ${
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

export default MofaDetailPrint;
