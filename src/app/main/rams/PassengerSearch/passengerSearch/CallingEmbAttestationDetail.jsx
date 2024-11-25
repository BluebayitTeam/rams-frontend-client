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

function CallingEmbAttestationDetail({ classes, data, pid }) {
  const classesComponentScope = useStyles();

  const navigate = useNavigate();

  const gotoEditpage = () => {
    navigate(
      `/apps/callingEmbAttestation-management/callingEmbAttestation/${pid}/fromSearch`
    );
  };

  return (
    <>
      <div
        className={`my-0 rounded-4 mx-0 md:mx-40 mt-60 ${classes.blockContainer}`}>
        <div className='blockContentName'>Calling</div>

        <div
          className='blockContentHolder'
          style={{ display: data.id ? 'block' : 'none' }}>
          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Ministry Attestation:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.ministry_attestation || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Bio Submitted Date:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.bio_submitted_date
                  ? moment(new Date(data.bio_submitted_date)).format(
                      'DD/MM/YYYY'
                    )
                  : ''}
              </b>
            </div>
          </div>

          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Calling Date:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.calling_date
                  ? moment(new Date(data.calling_date)).format('DD/MM/YYYY')
                  : ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>
                Emb Attestation Status:
              </i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.emb_attestation_status || ''}
              </b>
            </div>
          </div>

          <div className='container flex-col md:flex-row'>
            <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Bio Submitted Status:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.bio_submitted_status || ''}
              </b>
            </div>
            <div className='border hidden md:block'></div>
            <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
              <i className='label text-xs md:text-sm'>Calling Status:</i>
              <b
                className='value text-xs md:text-sm'
                style={{ color: 'black' }}>
                {data?.calling_status || ''}
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
                }}>{`${data?.updated_by?.username || ''} [DT: ${data.updated_at ? moment(new Date(data.updated_at)).format('DD/MM/YYYY') : ''}]`}</b>
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

export default CallingEmbAttestationDetail;
