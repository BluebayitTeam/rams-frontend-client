import { Autocomplete, Icon, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import fillUnderscoreBySpace from 'src/app/@helpers/fillUnderscoreBySpace';

const useStyles = makeStyles((theme) => ({
  fieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.main,
    height: '30px',
    width: 'fit-content',
    margin: '10px 5px',
    '& .selectLabel': {
      cursor: 'pointer',
      overflow: 'hidden',
      transition: '0.3s',
      color: theme.palette.primary.main,
      whiteSpace: 'nowrap',
    },
    '& .selectOpenIcon': {
      fontSize: '18px',
      overflow: 'hidden',
    },
    '& .selectField': {
      overflow: 'hidden',
      transition: '0.3s',
      '& .endAdornment': {
        '& > button': {
          color: theme.palette.primary.main,
        },
      },
      '& .textFieldUnderSelect': {
        '& > div': {
          color: theme.palette.primary.main,
          '&::before': {
            borderColor: theme.palette.primary.main,
          },
        },
      },
    },
    '& .icon': {
      fontSize: '20px',
    },
  },
}));

function ReportSelect({
  name,
  label,
  options = [],
  icon,
  width,
  setReRender,
  onEnter = () => null,
  getOptionLabel = (option) => `${option.name}`, // Default to option.name
} = {}) {
  const classes = useStyles();

  const methods = useFormContext();
  const { getValues, setValue, control } = methods;
  const values = getValues();

  const isFocused = values[`${name}Focused`];

  const [Label] = useState(label || fillUnderscoreBySpace(name));

  return (
    <div className={classes.fieldContainer}>
      <Icon>{icon}</Icon>

      <div
        className='selectLabel'
        style={{
          width: isFocused ? '0px' : width,
          margin: isFocused ? '0px' : '2px 5px 0px 10px',
        }}
        onClick={() => {
          setValue(`${name}Focused`, true);
          setReRender(Math.random());
          setTimeout(
            () => document.getElementById(`${name}groupEl`).focus(),
            300
          );
        }}>
        {Label}
      </div>

      <Icon
        className='selectOpenIcon cursor-pointer'
        style={{
          width: isFocused ? '0px' : '15px',
          margin: isFocused ? '0px' : '2px 10px 0px 0px',
        }}
        onClick={() => {
          setValue(`${name}Focused`, true);
          setReRender(Math.random());
          setTimeout(
            () => document.getElementById(`${name}groupEl`).focus(),
            300
          );
        }}>
        arrow_drop_down_icon
      </Icon>

      <Controller
        name={`${name}`}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            id={`${name}groupEl`}
            className='mb-3 selectField'
            style={{
              width: isFocused ? '130px' : '0px',
              margin: isFocused ? '0px 10px' : '0px',
              display: isFocused ? 'block' : 'none',
            }}
            classes={{ endAdornment: 'endAdornment' }}
            openOnFocus
            onClose={() => {
              setValue(`${name}Focused`, false);
              setReRender(Math.random());
            }}
            freeSolo
            options={options}
            value={value ? options.find((data) => data.id == value) : null}
            getOptionLabel={getOptionLabel}
            onChange={(_event, newValue) => {
              onChange(newValue?.id || '');
              onEnter();
              setValue(`${name}Name`, newValue?.name || '');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className='textFieldUnderSelect'
                placeholder={`Select ${Label}`}
              />
            )}
          />
        )}
      />
    </div>
  );
}

export default ReportSelect;
