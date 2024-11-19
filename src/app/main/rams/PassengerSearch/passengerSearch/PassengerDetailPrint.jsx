/* eslint-disable no-undef */

import { makeStyles } from '@mui/material';
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

function PassengerDetailPrint() {
  const classesComponentScope = useStyles();
  const navigate = useNavigate();
  const gotoEditpage = () => {
    navigate(
      `/apps/passenger-management/passenger/${pid}/fromSearch/${fillSpaceByUnderscore(
        data.passenger_type?.name || ''
      ).toLocaleLowerCase()}`
    );
  };
  return <div></div>;
}

export default PassengerDetailPrint;
