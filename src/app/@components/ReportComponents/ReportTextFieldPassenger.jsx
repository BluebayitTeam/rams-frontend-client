import { Icon } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import fillUnderscoreBySpace from 'src/app/@helpers/fillUnderscoreBySpace';

const useStyles = makeStyles((theme) => ({
  fieldContainer: {
    display: 'flex',
    flexDirection: 'row', // Already set for horizontal layout
    justifyContent: 'center', // Centers items horizontally
    alignItems: 'center', // Centers items vertically
    color: theme.palette.primary.main,
    backgroundColor: 'white',

    borderRadius: '10px',
    height: '30px',
    width: 'fit-content', // Adjusts width to content
    margin: '10px 5px',
    '& .textField': {
      height: '100%',
      margin: '0px 10px',
      background: 'inherit',
      border: 'none',
      outline: 'none',

      color: theme.palette.primary.main,
      width: '100%',

      textAlign: 'center', // Centers text inside the field

      '&::placeholder': {
        color: theme.palette.primary.main,
      },

      '&:-ms-input-placeholder': {
        color: theme.palette.primary.main,
      },
    },
    '& .icon': {
      fontSize: '20px',
    },
  },
}));

function ReportTextFieldPassenger({
  name,
  label,
  domEl,
  icon,
  width,
  setReRender,
  onEnter = () => null,
} = {}) {
  const classes = useStyles();

  const methods = useFormContext();
  const { getValues, setValue } = methods;
  const values = getValues();

  const [Label] = useState(label || fillUnderscoreBySpace(name));

  return (
    <div className={classes.fieldContainer}>
      <Icon>{icon}</Icon>

      <input
        ref={domEl}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setValue(`${name}`, e.target.value);
            onEnter();
            domEl.current.blur();
            domEl.current.value = '';
            setReRender(Math.random());
          }
        }}
        // eslint-disable-next-line no-return-assign
        onFocus={() =>
          (domEl.current.value = domEl.current.value || values[`${name}`] || '')
        }
        className='textField'
        style={{ width }}
        placeholder={Label}
      />
    </div>
  );
}

export default ReportTextFieldPassenger;
