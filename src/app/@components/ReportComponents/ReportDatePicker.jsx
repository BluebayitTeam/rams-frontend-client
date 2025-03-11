import { useState } from 'react'; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; 
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; 
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp'; 
import dayjs from 'dayjs'; 
import { Controller, useFormContext } from 'react-hook-form'; 
import { Popper, ClickAwayListener } from '@mui/material'; 
import { makeStyles } from '@mui/styles'; 

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
    position: 'relative',
    '& .dateLabel': { 
      width: 'fit-content', 
      padding: '3px 5px 0px 8px', 
      cursor: 'pointer', 
      color: theme.palette.primary.main, 
      transition: 'font-size 0.3s ease' 
    }, 
    '& .icon': { 
      fontSize: '20px', 
      cursor: 'pointer' 
    },
    '& .selectedDate': {
      marginLeft: '8px',
      color: theme.palette.text.primary
    }
  },
  calendarContainer: {
    backgroundColor: 'white',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    zIndex: 1500
  }
})); 

function ReportDatePicker({ 
  name, 
  label, 
  minDate, 
  maxDate, 
  setReRender, 
  onEnter = () => null,
  displayFormat = 'MM/DD/YYYY'
}) { 
  const classes = useStyles(); 
  const { control } = useFormContext(); 
  const [isOpen, setIsOpen] = useState(false); 
  const [anchorEl, setAnchorEl] = useState(null); 

  const handleClick = (event) => { 
    setAnchorEl(event.currentTarget); 
    setIsOpen(!isOpen); 
  }; 

  const handleClose = () => { 
    setIsOpen(false); 
  }; 

  const handleClickAway = () => {
    if (isOpen) {
      handleClose();
    }
  };

  return ( 
    <ClickAwayListener onClickAway={handleClickAway}>
      <Controller 
        name={name} 
        control={control} 
        render={({ field }) => ( 
          <LocalizationProvider dateAdapter={AdapterDayjs}> 
            <div className={classes.fieldContainer}> 
              <CalendarMonthSharpIcon 
                className="icon" 
                onClick={handleClick} 
              /> 
              <div 
                className="dateLabel" 
                onClick={handleClick} 
              > 
                {label || name.replace(/_/g, ' ')} 
              </div>
              
              {field.value && (
                <div className="selectedDate">
                  {dayjs(field.value).format(displayFormat)}
                </div>
              )}
              
              <Popper 
                open={isOpen} 
                anchorEl={anchorEl} 
                placement="bottom-start"
                className={classes.calendarContainer}
                modifiers={[ 
                  { 
                    name: 'preventOverflow', 
                    options: { 
                      boundary: 'window' 
                    } 
                  }, 
                  { 
                    name: 'flip', 
                    options: { 
                      fallbackPlacements: ['bottom', 'top'] 
                    } 
                  } 
                ]} 
              > 
                <DatePicker 
                  {...field} 
                  open={true}
                  onClose={handleClose} 
                  value={field.value ? dayjs(field.value) : null} 
                  onChange={(date) => { 
                    field.onChange(date ? dayjs(date).format('YYYY-MM-DD') : null); 
                    onEnter(); 
                    setReRender(Math.random()); 
                    handleClose(); 
                  }}
                  slots={{
                    textField: () => null
                  }}
                  slotProps={{
                    popper: {
                      disablePortal: true
                    }
                  }}
                  minDate={minDate ? dayjs(minDate) : undefined} 
                  maxDate={maxDate ? dayjs(maxDate) : undefined} 
                /> 
              </Popper> 
            </div> 
          </LocalizationProvider> 
        )} 
      />
    </ClickAwayListener>
  ); 
} 

export default ReportDatePicker;