import { Add, Delete } from '@mui/icons-material';
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: 'none',
  },
}));

function EducationTab(props) {
  const userID = localStorage.getItem('user_id');

  const classes = useStyles(props);

  const routeParams = useParams();
  const { candidateApplicationId } = routeParams;

  const { control, formState, getValues, reset } = useForm({
    defaultValues: {
      education: [
        {
          degree: '',
          institution: '',
          gpa: '',
          comment: '',
        },
      ],
    },
  });
  const { errors, isValid, dirtyFields } = formState;
  //   const history = useHistory();
  const handleDelete = localStorage.getItem('candidateApplicationEvent');
  // const dispatch = useDispatch();

  // For Education
  const { fields: education, remove: removeEducation } = useFieldArray({
    control,
    name: 'education',
    keyName: 'key',
  });

  // Ensure education is initialized if empty
  useEffect(() => {
    if (education.length === 0) {
      reset({
        education: [
          {
            degree: '',
            institution: '',
            gpa: '',
            comment: '',
          },
        ],
      });
    }
  }, [education, reset]);

  console.log('education', education);
  //   function handleSaveCandidateApplication() {
  //     const data = getValues();
  //     data.primary_phone = data.country_code1 + data.primary_phone;
  //     if (data.country_code2 && data.secondary_phone)
  //       data.secondary_phone = data.country_code2 + data.secondary_phone;
  //     dispatch(saveCandidateApplication(data)).then((res) => {
  //       if (res.payload) {
  //         localStorage.setItem(
  //           'candidateApplicationAlertPermission',
  //           'saveCandidateApplicationSuccessfully'
  //         );
  //         history.push(
  //           '/apps/candidateApplication-management/candidateApplications'
  //         );
  //       }
  //     });
  //   }

  //   function handleUpdateCandidateApplication() {
  //     dispatch(updateCandidateApplication(getValues())).then((res) => {
  //       if (res.payload) {
  //         localStorage.setItem(
  //           'candidateApplicationAlertPermission',
  //           'updateCandidateApplicationSuccessfully'
  //         );
  //         history.push(
  //           '/apps/candidateApplication-management/candidateApplications'
  //         );
  //       }
  //     });
  //   }

  //   const handleSubmitOnKeyDownEnter = (ev) => {
  //     if (ev.key === 'Enter') {
  //       if (
  //         routeParams.candidateApplicationId === 'new' &&
  //         !(_.isEmpty(dirtyFields) || !isValid)
  //       ) {
  //         handleSaveCandidateApplication();
  //       } else if (!handleDelete && routeParams?.candidateApplicationName) {
  //         handleUpdateCandidateApplication();
  //       }
  //     }
  //   };

  return (
    <div>
      {education?.length === 0 && (
        <div>
          <h2 className='text-center'>No Education Qualification Found!!</h2>
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
                  education: [
                    ...values?.education,
                    {
                      degree: '',
                      institution: '',
                      gpa: '',
                      comment: '',
                    },
                  ],
                });
              }}>
              Add Education Qualification
            </Button>
          </div>
        </div>
      )}
      {education?.length > 0 && (
        <div>
          <h2>Education Qualification :</h2>

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
                        Degree
                      </TableCell>
                      <TableCell className={classes.tableCell} align='center'>
                        Institution
                      </TableCell>
                      <TableCell className={classes.tableCell} align='center'>
                        CGPA
                      </TableCell>
                      <TableCell className={classes.tableCell} align='center'>
                        Comment
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {education.map((item, idx) => {
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
                              name={`education.${idx}.degree`}
                              control={control}
                              render={({ field }) => {
                                return (
                                  <TextField
                                    {...field}
                                    className='mt-8 mb-16'
                                    label='Degree'
                                    id={`education.${idx}.degree`}
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
                              name={`education.${idx}.institution`}
                              control={control}
                              render={({ field }) => {
                                return (
                                  <TextField
                                    {...field}
                                    className='mt-8 mb-16'
                                    label='Institution'
                                    id={`education.${idx}.institution`}
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
                              name={`education.${idx}.gpa`}
                              control={control}
                              render={({ field }) => {
                                return (
                                  <TextField
                                    {...field}
                                    className='mt-8 mb-16'
                                    label='CGPA'
                                    id={`education.${idx}.gpa`}
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
                              name={`education.${idx}.comment`}
                              control={control}
                              render={({ field }) => {
                                return (
                                  <TextField
                                    {...field}
                                    className='mt-8 mb-16'
                                    label='Comment'
                                    id={`education.${idx}.comment`}
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
                                      education: [
                                        ...values?.education,
                                        {
                                          degree: '',
                                          institution: '',
                                          gpa: '',
                                          comment: '',
                                        },
                                      ],
                                    });
                                  }}
                                  onBlur={() => {}}>
                                  <Add className='bg-green text-white rounded cursor-pointer' />
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
                                <Delete
                                  onClick={() => {
                                    removeEducation(idx);
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

export default EducationTab;
