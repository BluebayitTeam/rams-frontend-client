import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneOutline';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import PeopleOutlineIcon from '@mui/icons-material/Groups3';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import FeedIcon from '@mui/icons-material/Feed';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FaxIcon from '@mui/icons-material/Fax';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { memo } from 'react';
import { useNavigate } from 'react-router';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 25,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#00AEEF',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#00AEEF',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, green 0%, green 50%, green 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, green 0%, green 50%, green 100%)',
    position: 'relative',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <FaxIcon />,
    2: <MedicalServicesIcon />,
    3: <FeedIcon />,
    4: <WysiwygIcon />,
    5: <AirplanemodeActiveIcon />,
    6: <VideoLabelIcon />,
    7: <CastForEducationIcon />,
    8: <PeopleOutlineIcon />,
    9: <AirplaneTicketIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}>
      {icons[String(props.icon)]}
      {completed && (
        <DoneAllIcon
          style={{
            position: 'absolute',
            color: 'white',
            backgroundColor: 'green',
            fontSize: '30px',
            fontWeight: '800',
          }}
        />
      )}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

function StatusStepDetail({ classes, data, pid, completed }) {
  const navigate = useNavigate();

  console.log('calinndsfjgdjfsd', data);
  // const gotoEditpage = () => {
  //   navigate(`/apps/medical/medicals/${pid}/fromSearch`);
  // };

  const steps = Object.keys(data);

  const activeStepIndex = steps.findIndex((label) => data[label]);

  return (
    <>
      <Stack sx={{ width: '100%' }} className='mt-48' spacing={4}>
        <Stepper
          alternativeLabel
          activeStep={activeStepIndex}
          connector={<QontoConnector />}>
          {steps.map((label, index) => (
            <Step key={index} completed={completed.includes(index)}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                <span style={{ fontSize: '14px', fontWeight: '800' }}>
                  {label?.replace(/_/g, ' ')}
                </span>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
    </>
  );
}

export default StatusStepDetail;
