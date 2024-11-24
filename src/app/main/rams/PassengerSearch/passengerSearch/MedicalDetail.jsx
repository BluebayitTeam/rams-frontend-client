import { Edit } from '@mui/icons-material';
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

function MedicalDetail({ classes, data, pid }) {
  const classesComponentScope = useStyles();
  console.log('dataAsdz', pid);

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
              <i className='label text-xs md:text-sm'>Medical Serial No:</i>
              <b className='label text-xs md:text-sm'>
                {data?.medical_serial_no || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Medical Result:</i>
              <b className='label text-xs md:text-sm'>
                {data?.medical_result || ''}
              </b>
            </div>
          </div>

          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Medical Card:</i>
              <b className='label text-xs md:text-sm'>
                {data?.medical_card || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Medical Center:</i>
              <b className='label text-xs md:text-sm'>
                {data?.medical_center?.name || ''}
              </b>
            </div>
          </div>

          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Medical Exam Date:</i>
              <b className='label text-xs md:text-sm'>
                {data?.medical_exam_date
                  ? moment(new Date(data.medical_exam_date)).format(
                      'DD/MM/YYYY'
                    )
                  : ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Medical Issue Date:</i>
              <b className='label text-xs md:text-sm'>
                {data?.medical_issue_date
                  ? moment(new Date(data.medical_issue_date)).format(
                      'DD/MM/YYYY'
                    )
                  : ''}
              </b>
            </div>
          </div>

          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Medical Expiry Date:</i>
              <b className='label text-xs md:text-sm'>
                {data?.medical_expiry_date
                  ? moment(new Date(data.medical_expiry_date)).format(
                      'DD/MM/YYYY'
                    )
                  : ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>medical Report Date:</i>
              <b className='label text-xs md:text-sm'>
                {data?.medical_report_date
                  ? moment(new Date(data.medical_report_date)).format(
                      'DD/MM/YYYY'
                    )
                  : ''}
              </b>
            </div>
          </div>

          <div className='container flex-col md:flex-row'>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Notes:</i>
              <b className='label text-xs md:text-sm'>{data?.notes || ''}</b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Last Update By:</i>
              <b className='label text-xs md:text-sm'>{`${data?.updated_by?.username || ''} [DT: ${
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
