import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: 'none',
  },
}));

function ExperienceTab(props) {
  const userID = localStorage.getItem('user_id');
  const designations = useSelector((state) => state.data.designations);

  const classes = useStyles(props);

  const methods = useFormContext();

  const routeParams = useParams();
  const { candidateApplicationId } = routeParams;
  const { control, formState, getValues, reset } = methods;
  const { errors, isValid, dirtyFields } = formState;
  const history = useHistory();
  const handleDelete = localStorage.getItem('candidateApplicationEvent');
  const dispatch = useDispatch();

  // For Experience
  const { fields: experience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experience',
    keyName: 'key',
  });

  console.log('experience', experience);
  function handleSaveCandidateApplication() {
    const data = getValues();
    data.primary_phone = data.country_code1 + data.primary_phone;
    if (data.country_code2 && data.secondary_phone)
      data.secondary_phone = data.country_code2 + data.secondary_phone;
    dispatch(saveCandidateApplication(data)).then((res) => {
      if (res.payload) {
        localStorage.setItem(
          'candidateApplicationAlertPermission',
          'saveCandidateApplicationSuccessfully'
        );
        history.push(
          '/apps/candidateApplication-management/candidateApplications'
        );
      }
    });
  }

  function handleUpdateCandidateApplication() {
    dispatch(updateCandidateApplication(getValues())).then((res) => {
      if (res.payload) {
        localStorage.setItem(
          'candidateApplicationAlertPermission',
          'updateCandidateApplicationSuccessfully'
        );
        history.push(
          '/apps/candidateApplication-management/candidateApplications'
        );
      }
    });
  }

  const handleSubmitOnKeyDownEnter = (ev) => {
    if (ev.key === 'Enter') {
      if (
        routeParams.candidateApplicationId === 'new' &&
        !(_.isEmpty(dirtyFields) || !isValid)
      ) {
        handleSaveCandidateApplication();
      } else if (!handleDelete && routeParams?.candidateApplicationName) {
        handleUpdateCandidateApplication();
      }
    }
  };

  return (
    <div>
      {experience?.length === 0 && (
        <div>
          <h2 className='text-center'>No Job Experience Found!!</h2>
          <div className='text-center'>
            <Button
              className='whitespace-nowrap mx-4 mt-20 px-4'
              color='secondary'
              variant='contained'
              style={{ backgroundColor: '#4dc08e', color: 'white' }}
              onClick={() => {
                const values = getValues();
                reset({
                  ...values,
                  experience: [
                    ...values?.experience,
                    {
                      company_name: '',
                      working_period: '',
                      duties: '',
                      supervisor_email: '',
                    },
                  ],
                });
              }}>
              Add Job Experience
            </Button>
          </div>
        </div>
      )}
      {experience?.length > 0 && (
        <div>
          <h2>Working Experience</h2>

          <Grid xs={12}>
            <div className={classes.mainContainer}>
              <TableContainer
                component={Paper}
                className={classes.tblContainer}>
                <Table className={classes.table} aria-label='simple table'>
                  <TableHead className={classes.tableHead}>
                    <TableRow>
                      <TableCell className={classes.tableCell}>No.</TableCell>
                      <TableCell className={classes.tableCell} align='center'>
                        Company Name
                      </TableCell>
                      <TableCell className={classes.tableCell} align='center'>
                        Eorking Period
                      </TableCell>
                      <TableCell className={classes.tableCell} align='center'>
                        Supervisor Email
                      </TableCell>
                      <TableCell className={classes.tableCell} align='center'>
                        Duties
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {experience.map((item, idx) => {
                      console.log('item', item);

                      return (
                        <TableRow key={item.key}>
                          <TableCell
                            className={classes.tableCellInBody}
                            component='th'
                            scope='row'>
                            {idx + 1}
                          </TableCell>
                          <TableCell className={classes.tableCellInBody}>
                            <Controller
                              name={`experience.${idx}.company_name`}
                              control={control}
                              render={({ field }) => {
                                return (
                                  <TextField
                                    {...field}
                                    className='mt-8 mb-16'
                                    label='Company Name'
                                    id={`experience.${idx}.company_name`}
                                    variant='outlined'
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                  />
                                );
                              }}
                            />
                          </TableCell>
                          <TableCell className={classes.tableCellInBody}>
                            <Controller
                              name={`experience.${idx}.working_period`}
                              control={control}
                              render={({ field }) => {
                                return (
                                  <TextField
                                    {...field}
                                    className='mt-8 mb-16'
                                    label='Working Period'
                                    id={`experience.${idx}.working_period`}
                                    variant='outlined'
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                  />
                                );
                              }}
                            />
                          </TableCell>
                          <TableCell className={classes.tableCellInBody}>
                            <Controller
                              name={`experience.${idx}.supervisor_email`}
                              control={control}
                              render={({ field }) => {
                                return (
                                  <TextField
                                    {...field}
                                    className='mt-8 mb-16'
                                    label='Supervisor Email'
                                    id={`experience.${idx}.supervisor_email`}
                                    variant='outlined'
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                  />
                                );
                              }}
                            />
                          </TableCell>{' '}
                          <TableCell className={classes.tableCellInBody}>
                            <Controller
                              name={`experience.${idx}.duties`}
                              control={control}
                              render={({ field }) => {
                                return (
                                  <TextField
                                    {...field}
                                    className='mt-8 mb-16'
                                    label='Duties'
                                    id={`experience.${idx}.duties`}
                                    variant='outlined'
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                  />
                                );
                              }}
                            />
                          </TableCell>
                          {idx === 0 && (
                            <TableCell
                              className='p-0 md:p-0'
                              align='center'
                              component='th'
                              scope='row'
                              style={{ minWidth: '80px' }}>
                              <div>
                                <div
                                  variant='outlined'
                                  className={classes.btnContainer}
                                  onClick={() => {
                                    const values = getValues();
                                    reset({
                                      ...values,
                                      experience: [
                                        ...values?.experience,
                                        {
                                          company_name: '',
                                          working_period: '',
                                          duties: '',
                                          supervisor_email: '',
                                        },
                                      ],
                                    });
                                  }}
                                  onBlur={() => {}}>
                                  <AddIcon className='bg-green text-white rounded cursor-pointer' />
                                </div>
                              </div>
                            </TableCell>
                          )}
                          {idx !== 0 && (
                            <TableCell
                              className='p-0 md:p-0'
                              align='center'
                              component='th'
                              scope='row'
                              style={{ minWidth: '80px' }}>
                              <div>
                                <DeleteIcon
                                  onClick={() => {
                                    removeExperience(idx);
                                  }}
                                  className='h-52 cursor-pointer'
                                  style={{ color: 'red' }}
                                />
                              </div>
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default ExperienceTab;
