import { faPhoneAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeStyles } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';

const useStyles = makeStyles(theme => ({
    filterMenuContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: '0px 10px',
        '& .fieldContainer': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            color: theme.palette.primary.main,
            height: '30px',
            width: 'fit-content',
            margin: '5px',
            '& .textField': {
                height: '100%',
                margin: '0px 10px',
                background: 'inherit',
                border: 'none',
                outline: 'none',
                borderBottom: `1px solid ${theme.palette.primary.main}`,
                color: theme.palette.primary.main,
                width: '100%',
                '&::placeholder': {
                    color: theme.palette.primary.main,
                    opacity: 0.6,
                },
                '&::-ms-input-placeholder': {
                    color: theme.palette.primary.main,
                    opacity: 0.6,
                },
                '&:-ms-input-placeholder': {
                    color: theme.palette.primary.main,
                    opacity: 0.6,
                },
            },
            '& .icon': {
                fontSize: '25px',
            }
        }
    }
}))

function PassengerFilterMenu() {

    const classes = useStyles()

    const methods = useForm();
    const { reset, control, formState, getValues, setValue } = methods;
    const { errors } = formState;


    console.log("values", getValues())

    return (
        <>
            <div className={classes.filterMenuContainer}>
                <div className='fieldContainer'>
                    <FontAwesomeIcon
                        className='icon'
                        icon={faUser}
                    />
                    <Controller
                        name="username"
                        control={control}
                        render={({ field, }) => {
                            return (
                                <input
                                    onBlur={(e) => field.onBlur(e.target.value)}
                                    className='textField'
                                    style={{ width: '75px' }}
                                    placeholder='User Name'
                                />
                            )
                        }}
                    />

                </div>



                <div className='fieldContainer'>
                    <FontAwesomeIcon
                        className='icon'
                        icon={faPhoneAlt}
                    />
                    <Controller
                        name="primary_phone"
                        control={control}
                        render={({ field, }) => (
                            <input
                                value={field.value}
                                onBlur={(e) => field.onBlur(e.target.value)}
                                className='textField'
                                style={{ width: '45px' }}
                                placeholder='Phone'
                            />
                        )
                        }
                    />

                </div>
            </div><br />
            <br />
        </>
    )
}

export default PassengerFilterMenu
