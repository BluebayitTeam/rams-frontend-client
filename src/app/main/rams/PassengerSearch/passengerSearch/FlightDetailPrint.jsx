import moment from 'moment';
import { useNavigate } from 'react-router';

function FlightDetailPrint({ classes, data, pid }) {
  const navigate = useNavigate();
  const gotoEditpage = () => {
    navigate(`/apps/flight-management/flights/${pid}/fromSearch`);
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
        <div className='blockContentName' style={{ marginBottom: '20px' }}>
          Flight
        </div>

        <div
          className='blockContentHolder'
          style={{ display: data.id ? 'block' : 'none' }}>
          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Carrier Air Aay:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.carrier_air_way || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Flight No:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.flight_no || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Ticket No:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.ticket_no || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Sector Name:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.sector_name || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Ticket Status:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.ticket_status || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Flight Time:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.flight_time || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Arrival Time:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.arrival_time || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Issue Date:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.issue_date
                  ? moment(new Date(data.issue_date)).format('DD/MM/YYYY')
                  : ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Flight Date:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.flight_date
                  ? moment(new Date(data.flight_date)).format('DD/MM/YYYY')
                  : ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Ticket Agency:</i>
              <b
                className='value text-xs md:text-sm'
                style={{
                  color: 'black',
                }}>{`${data?.ticket_agency?.first_name || ''} ${
                data?.ticket_agency?.last_name || ''
              }`}</b>
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

export default FlightDetailPrint;
