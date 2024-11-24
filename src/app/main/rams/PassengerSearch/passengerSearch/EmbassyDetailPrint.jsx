import { Edit } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useNavigate } from 'react-router';
import fillSpaceByUnderscore from 'src/app/@helpers/fillSpaceByUnderscore';

// const useStyles = makeStyles((theme) => ({
//   passPortNameContainer: {
//     height: '50px',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',

//     marginTop: '20px',
//     '& .passPortNameBorder': {
//       height: '1px',
//       background:
//         theme.palette.type === 'dark'
//           ? theme.palette.primary.light
//           : theme.palette.primary.dark,
//       width: '100%',
//       position: 'relative',
//       display: 'flex',
//       justifyContent: 'center',
//       '& .passPortNameText': {
//         fontSize: '18px',

//         position: 'absolute',
//         top: '-13px',
//         background: theme.palette.background.default,
//         color:
//           theme.palette.type === 'dark'
//             ? theme.palette.common.white
//             : theme.palette.primary.dark,
//         textAlign: 'center',
//         fontStyle: 'italic',
//         padding: '0px 5px',
//         zIndex: 1,
//       },
//     },
//   },
// }));

function EmbassyDetailPrint({ classes, data, pid }) {
  const classesComponentScope = useStyles();
  console.log('dataAsd', pid);

  const navigate = useNavigate();

  const gotoEditpage = () => {
    navigate(`/apps/embassy/embassy/${pid}/fromSearch`);
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
        <div className='blockContentName'>Embassy</div>

        <div
          className='blockContentHolder'
          style={{ display: data.id ? 'block' : 'none' }}>
          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Submit Date:</i>
              <b className='value text-xs md:text-sm'>
                {data?.submit_date
                  ? moment(new Date(data.submit_date)).format('DD/MM/YYYY')
                  : ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Profession English:</i>
              <b className='value text-xs md:text-sm'>
                {data?.profession_english || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Profession Arabic:</i>
              <b className='value text-xs md:text-sm'>
                {data?.profession_arabic || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Salary:</i>
              <b className='value text-xs md:text-sm'>{data?.salary || ''}</b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Stamping Status:</i>
              <b className='value text-xs md:text-sm'>
                {data?.stamping_status || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Stamping Date:</i>
              <b className='value text-xs md:text-sm'>
                {data?.stamping_date
                  ? moment(new Date(data.stamping_date)).format('DD/MM/YYYY')
                  : ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Visa Expiry Date:</i>
              <b className='value text-xs md:text-sm'>
                {data?.visa_expiry_date
                  ? moment(new Date(data.visa_expiry_date)).format('DD/MM/YYYY')
                  : ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Delivery Date:</i>
              <b className='value text-xs md:text-sm'>
                {data?.delivery_date
                  ? moment(new Date(data.delivery_date)).format('DD/MM/YYYY')
                  : ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Visa Number:</i>
              <b className='value text-xs md:text-sm'>
                {data?.visa_number_readonly || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Sponsor ID No:</i>
              <b className='value text-xs md:text-sm'>
                {data?.sponsor_id_no_readonly || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Sponsor Name English:</i>
              <b className='value text-xs md:text-sm'>
                {data?.sponsor_name_english_readonly || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Sponsor Name Arabic:</i>
              <b className='value text-xs md:text-sm'>
                {data?.sponsor_name_arabic_readonly || ''}
              </b>
            </div>
          </div>

          <div className='container flex-row md:flex-row'>
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
      </div>
    </>
  );
}

export default EmbassyDetailPrint;
