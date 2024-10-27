import TextField from '@mui/material/TextField';
import { getEmployees } from 'app/store/dataSlice';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import CustomDropdownField from 'src/app/@components/CustomDropdownField';
import CustomTextField from 'src/app/@components/CustomTextField';
import FileUpload from 'src/app/@components/FileUploader';
import { BASE_URL } from 'src/app/constant/constants';
import { makeStyles } from '@mui/styles';
import { Box, Icon, Typography } from '@mui/material';
import clsx from 'clsx';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: 'none',
  },
  productImageUpload: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
}));

function QualificationForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const classes = useStyles(props);
  const { control, formState, watch, setValue, getValues } = methods;
  const { errors } = formState;
  const routeParams = useParams();
  const { qualificationId } = routeParams;
  const pcFile = watch('pc_image') || '';
  const dlFile = watch('dl_image') || '';
  const doc1File = watch('doc1_image') || '';
  const doc2File = watch('doc2_image') || '';

  const [previewPCFile, setPreviewPCFile] = useState('');
  const [previewDLFile, setPreviewDLFile] = useState('');
  const [previewDoc2File, setPreviewDoc2File] = useState('');

  const [fileExtPCName, setFileExtPCName] = useState('');
  const [fileExtDLName, setFileExtDLName] = useState('');
  const [fileExtDoc1Name, setFileExtDoc1Name] = useState('');

  const [previewDoc1Image, setPreviewDoc1Image] = useState('');
  const [fileExtDoc2Name, setFileExtDoc2Name] = useState('');
  // const [fileExtName, setFileExtName] = useState(null);
  const file = watch('file') || '';

  const employees = useSelector((state) => state.data.employees);
  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  useEffect(() => {
    setFileExtPCName('');
    setFileExtDLName('');

    setPreviewPCFile('');
    setPreviewDLFile('');
    setFileExtDoc1Name('');
    setPreviewDoc1Image('');
    // setpreviewDoc2Image('');
  }, [getValues('police_clearance_no')]);

  // removed image
  const handleRemovePCFile = () => {
    setPreviewPCFile(null);

    setFileExtPCName(null);

    setValue('pc_image', '');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    console.log('sfsdferwer', getValues());
  };
  const handleRemoveDLFile = () => {
    setPreviewDLFile(null);
    setFileExtDLName(null);
    setValue('dl_image', '');

    if (fileInputdLRef.current) {
      fileInputdLRef.current.value = '';
    }

    console.log('878787', getValues());
  };
  const handleRemoveDOC1File = () => {
    setFileExtDoc1Name(null);
    setPreviewDoc1Image(null);
    setValue('doc1_image', '');

    if (fileInputdoc1Ref.current) {
      fileInputdoc1Ref.current.value = '';
    }

    console.log('sfsdferwer', getValues());
  };
  const handleRemoveDOC2File = () => {
    setFileExtDoc2Name(null);
    setPreviewDoc2File(null);
    setValue('doc2_image', '');

    if (fileInputdoc2Ref.current) {
      fileInputdoc2Ref.current.value = '';
    }

    console.log('sfsdferwer', getValues());
  };

  return (
    <div>
      <CustomDropdownField
        name='employee'
        label='Employee'
        options={employees}
        optionLabelFormat={(option) =>
          `${option.first_name || ''} ${option.last_name || ''} [${option.email}]`
        }
        required
      />

      <CustomTextField name='degree_name' label='Degree Name' required />
      <CustomTextField name='passign_year' label='Passign Year' required />
      <CustomTextField name='board' label='Board' required />
      <CustomTextField name='institute_name' label='Institute Name' required />
      <CustomTextField name='grade' label='Grade' required />

      <div className='flex justify-start -mx-16 flex-col md:flex-row'>
        <Controller
          name='pc_image'
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className='flex w-full flex-row items-center justify-center ml-16'>
              <div className='flex-col'>
                <Typography className='text-center'>PC File</Typography>
                <label
                  htmlFor='pc_image-button-file'
                  className={clsx(
                    classes.productImageUpload,
                    'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
                  )}>
                  <input
                    accept='image/x-png,image/gif,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    className='hidden'
                    id='pc_image-button-file'
                    type='file'
                    onChange={async (e) => {
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (reader.readyState === 2) {
                          setPreviewPCFile(reader.result);
                        }
                      };
                      reader.readAsDataURL(e.target.files[0]);

                      const file = e.target.files[0];

                      if (file) {
                        const fileExtension = file.name
                          .split('.')
                          .pop()
                          .toLowerCase();
                        setFileExtPCName(fileExtension);
                        onChange(file);
                      }

                      // Force reset the input value to allow re-uploading the same file
                      e.target.value = '';
                    }}
                  />
                  <Icon fontSize='large' color='action'>
                    cloud_upload
                  </Icon>
                </label>
              </div>
              {!previewPCFile && pcFile && (
                <div
                  style={{
                    display: 'flex',
                    position: 'relative',
                    width: 'fit-content',
                  }}>
                  <div
                    id='cancelIcon'
                    style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      zIndex: 1,
                      color: 'red',
                      cursor: 'pointer',
                      backgroundColor: 'white',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <HighlightOffIcon onClick={handleRemovePCFile} />
                  </div>
                  <div
                    style={{
                      width: 'auto',
                      height: '150px',
                      overflow: 'hidden',
                      display: 'flex',
                    }}>
                    {typeof pcFile === 'string' &&
                    ['pdf', 'doc', 'docx'].includes(
                      pcFile.split('.').pop().toLowerCase()
                    ) ? (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                        }}>
                        {pcFile.toLowerCase().includes('pdf') ? (
                          <PictureAsPdf
                            style={{
                              color: 'red',
                              cursor: 'pointer',
                              display: 'block',
                              fontSize: '137px',
                              margin: 'auto',
                            }}
                            onClick={() => window.open(`${BASE_URL}${pcFile}`)}
                          />
                        ) : (
                          <DescriptionIcon
                            style={{
                              color: 'blue',
                              cursor: 'pointer',
                              display: 'block',
                              fontSize: '137px',
                              margin: 'auto',
                            }}
                            onClick={() => window.open(`${BASE_URL}${pcFile}`)}
                          />
                        )}
                      </div>
                    ) : (
                      <img
                        src={`${BASE_URL}${pcFile}`}
                        style={{ height: '100px' }}
                      />
                    )}
                  </div>
                </div>
              )}

              {previewPCFile ? (
                <div
                  style={{
                    width: 'auto',
                    height: '150px',
                    overflow: 'hidden',
                  }}>
                  {fileExtPCName &&
                  ['pdf', 'doc', 'docx'].includes(fileExtPCName) ? (
                    <div
                      style={{
                        display: 'flex',
                        position: 'relative',
                        width: 'fit-content',
                      }}>
                      <div
                        id='cancelIcon'
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          zIndex: 1,
                          color: 'red',
                          cursor: 'pointer',
                          backgroundColor: 'white',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <HighlightOffIcon onClick={handleRemovePCFile} />
                      </div>
                      {fileExtPCName === 'pdf' ? (
                        <iframe
                          src={previewPCFile}
                          frameBorder='0'
                          scrolling='auto'
                          height='150px'
                          width='150px'
                        />
                      ) : (
                        <DescriptionIcon
                          style={{
                            color: 'blue',
                            cursor: 'pointer',
                            display: 'block',
                            fontSize: '137px',
                            margin: 'auto',
                          }}
                          onClick={() => window.open(previewPCFile)}
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        position: 'relative',
                        width: 'fit-content',
                      }}>
                      <div
                        id='cancelIcon'
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          zIndex: 1,
                          color: 'red',
                          cursor: 'pointer',
                          backgroundColor: 'white',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <HighlightOffIcon onClick={handleRemovePCFile} />
                      </div>
                      <img
                        src={previewPCFile}
                        style={{ height: '140px', width: '150px' }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                !pcFile && (
                  <Box
                    height={180}
                    width={180}
                    my={4}
                    display='flex'
                    alignItems='center'
                    gap={4}
                    p={2}
                    style={{
                      width: '150px',
                      height: '70px',
                      border: '1px solid red',
                    }}
                    className={clsx(
                      classes.productImageUpload,
                      'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
                    )}>
                    <Typography className='text-sm font-700'>
                      <span className='mr-4 text-xs text-red-500'>
                        Note *(JPG, JPEG, PNG, PDF, GIF, DOC, DOCX)
                      </span>
                    </Typography>
                  </Box>
                )
              )}
            </div>
          )}
        />
        <Controller
          name='dl_image'
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className='flex w-full flex-row items-center justify-center ml-16'>
              <div className='flex-col'>
                <Typography className='text-center'>DL File</Typography>
                <label
                  htmlFor='dl_image-button-file'
                  className={clsx(
                    classes.productImageUpload,
                    'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
                  )}>
                  <input
                    accept='image/x-png,image/gif,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    className='hidden'
                    id='dl_image-button-file'
                    type='file'
                    onChange={async (e) => {
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (reader.readyState === 2) {
                          setPreviewDLFile(reader.result);
                        }
                      };
                      reader.readAsDataURL(e.target.files[0]);

                      const file = e.target.files[0];

                      if (file) {
                        const fileExtension = file.name
                          .split('.')
                          .pop()
                          .toLowerCase();
                        setFileExtDLName(fileExtension);
                        onChange(file);
                      }

                      // Force reset the input value to allow re-uploading the same file
                      e.target.value = '';
                    }}
                  />
                  <Icon fontSize='large' color='action'>
                    cloud_upload
                  </Icon>
                </label>
              </div>
              {!previewDLFile && dlFile && (
                <div
                  style={{
                    display: 'flex',
                    position: 'relative',
                    width: 'fit-content',
                  }}>
                  <div
                    id='cancelIcon'
                    style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      zIndex: 1,
                      color: 'red',
                      cursor: 'pointer',
                      backgroundColor: 'white',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <HighlightOffIcon onClick={handleRemoveDLFile} />
                  </div>
                  <div
                    style={{
                      width: 'auto',
                      height: '150px',
                      overflow: 'hidden',
                      display: 'flex',
                    }}>
                    {typeof dlFile === 'string' &&
                    ['pdf', 'doc', 'docx'].includes(
                      dlFile.split('.').pop().toLowerCase()
                    ) ? (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                        }}>
                        {dlFile.toLowerCase().includes('pdf') ? (
                          <PictureAsPdf
                            style={{
                              color: 'red',
                              cursor: 'pointer',
                              display: 'block',
                              fontSize: '137px',
                              margin: 'auto',
                            }}
                            onClick={() => window.open(`${BASE_URL}${dlFile}`)}
                          />
                        ) : (
                          <DescriptionIcon
                            style={{
                              color: 'blue',
                              cursor: 'pointer',
                              display: 'block',
                              fontSize: '137px',
                              margin: 'auto',
                            }}
                            onClick={() => window.open(`${BASE_URL}${dlFile}`)}
                          />
                        )}
                      </div>
                    ) : (
                      <img
                        src={`${BASE_URL}${dlFile}`}
                        style={{ height: '100px' }}
                      />
                    )}
                  </div>
                </div>
              )}

              {previewDLFile ? (
                <div
                  style={{
                    width: 'auto',
                    height: '150px',
                    overflow: 'hidden',
                  }}>
                  {fileExtDLName &&
                  ['pdf', 'doc', 'docx'].includes(fileExtDLName) ? (
                    <div
                      style={{
                        display: 'flex',
                        position: 'relative',
                        width: 'fit-content',
                      }}>
                      <div
                        id='cancelIcon'
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          zIndex: 1,
                          color: 'red',
                          cursor: 'pointer',
                          backgroundColor: 'white',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <HighlightOffIcon onClick={handleRemoveDLFile} />
                      </div>
                      {fileExtDLName === 'pdf' ? (
                        <iframe
                          src={previewDLFile}
                          frameBorder='0'
                          scrolling='auto'
                          height='150px'
                          width='150px'
                        />
                      ) : (
                        <DescriptionIcon
                          style={{
                            color: 'blue',
                            cursor: 'pointer',
                            display: 'block',
                            fontSize: '137px',
                            margin: 'auto',
                          }}
                          onClick={() => window.open(previewDLFile)}
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        position: 'relative',
                        width: 'fit-content',
                      }}>
                      <div
                        id='cancelIcon'
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          zIndex: 1,
                          color: 'red',
                          cursor: 'pointer',
                          backgroundColor: 'white',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <HighlightOffIcon onClick={handleRemoveDLFile} />
                      </div>
                      <img
                        src={previewDLFile}
                        style={{ height: '140px', width: '150px' }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                !dlFile && (
                  <Box
                    height={180}
                    width={180}
                    my={4}
                    display='flex'
                    alignItems='center'
                    gap={4}
                    p={2}
                    style={{
                      width: '150px',
                      height: '70px',
                      border: '1px solid red',
                    }}
                    className={clsx(
                      classes.productImageUpload,
                      'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
                    )}>
                    <Typography className='text-sm font-700'>
                      <span className='mr-4 text-xs text-red-500'>
                        Note *(JPG, JPEG, PNG, PDF, GIF, DOC, DOCX)
                      </span>
                    </Typography>
                  </Box>
                )
              )}
            </div>
          )}
        />
      </div>

      <div className='flex justify-start -mx-16 flex-col md:flex-row'>
        <Controller
          name='doc1_image'
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className='flex w-full flex-row items-center justify-center ml-16'>
              <div className='flex-col'>
                <Typography className='text-center'>Document 1</Typography>
                <label
                  htmlFor='doc1_image-button-file'
                  className={clsx(
                    classes.productImageUpload,
                    'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
                  )}>
                  <input
                    accept='image/x-png,image/gif,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    className='hidden'
                    id='doc1_image-button-file'
                    type='file'
                    onChange={async (e) => {
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (reader.readyState === 2) {
                          setPreviewDoc1Image(reader.result);
                        }
                      };
                      reader.readAsDataURL(e.target.files[0]);

                      const file = e.target.files[0];

                      if (file) {
                        const fileExtension = file.name
                          .split('.')
                          .pop()
                          .toLowerCase();
                        setFileExtDoc1Name(fileExtension);
                        onChange(file);
                      }

                      // Force reset the input value to allow re-uploading the same file
                      e.target.value = '';
                    }}
                  />
                  <Icon fontSize='large' color='action'>
                    cloud_upload
                  </Icon>
                </label>
              </div>
              {!previewDoc1Image && doc1File && (
                <div
                  style={{
                    display: 'flex',
                    position: 'relative',
                    width: 'fit-content',
                  }}>
                  <div
                    id='cancelIcon'
                    style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      zIndex: 1,
                      color: 'red',
                      cursor: 'pointer',
                      backgroundColor: 'white',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <HighlightOffIcon onClick={handleRemoveDOC1File} />
                  </div>
                  <div
                    style={{
                      width: 'auto',
                      height: '150px',
                      overflow: 'hidden',
                      display: 'flex',
                    }}>
                    {typeof doc1File === 'string' &&
                    ['pdf', 'doc', 'docx'].includes(
                      doc1File.split('.').pop().toLowerCase()
                    ) ? (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                        }}>
                        {doc1File.toLowerCase().includes('pdf') ? (
                          <PictureAsPdf
                            style={{
                              color: 'red',
                              cursor: 'pointer',
                              display: 'block',
                              fontSize: '137px',
                              margin: 'auto',
                            }}
                            onClick={() =>
                              window.open(`${BASE_URL}${doc1File}`)
                            }
                          />
                        ) : (
                          <DescriptionIcon
                            style={{
                              color: 'blue',
                              cursor: 'pointer',
                              display: 'block',
                              fontSize: '137px',
                              margin: 'auto',
                            }}
                            onClick={() =>
                              window.open(`${BASE_URL}${doc1File}`)
                            }
                          />
                        )}
                      </div>
                    ) : (
                      <img
                        src={`${BASE_URL}${doc1File}`}
                        style={{ height: '100px' }}
                      />
                    )}
                  </div>
                </div>
              )}

              {previewDoc1Image ? (
                <div
                  style={{
                    width: 'auto',
                    height: '150px',
                    overflow: 'hidden',
                  }}>
                  {fileExtDoc1Name &&
                  ['pdf', 'doc', 'docx'].includes(fileExtDoc1Name) ? (
                    <div
                      style={{
                        display: 'flex',
                        position: 'relative',
                        width: 'fit-content',
                      }}>
                      <div
                        id='cancelIcon'
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          zIndex: 1,
                          color: 'red',
                          cursor: 'pointer',
                          backgroundColor: 'white',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <HighlightOffIcon onClick={handleRemoveDOC1File} />
                      </div>
                      {fileExtDoc1Name === 'pdf' ? (
                        <iframe
                          src={previewDoc1Image}
                          frameBorder='0'
                          scrolling='auto'
                          height='150px'
                          width='150px'
                        />
                      ) : (
                        <DescriptionIcon
                          style={{
                            color: 'blue',
                            cursor: 'pointer',
                            display: 'block',
                            fontSize: '137px',
                            margin: 'auto',
                          }}
                          onClick={() => window.open(previewDoc1Image)}
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        position: 'relative',
                        width: 'fit-content',
                      }}>
                      <div
                        id='cancelIcon'
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          zIndex: 1,
                          color: 'red',
                          cursor: 'pointer',
                          backgroundColor: 'white',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <HighlightOffIcon onClick={handleRemoveDOC1File} />
                      </div>
                      <img
                        src={previewDoc1Image}
                        style={{ height: '140px', width: '150px' }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                !doc1File && (
                  <Box
                    height={180}
                    width={180}
                    my={4}
                    display='flex'
                    alignItems='center'
                    gap={4}
                    p={2}
                    style={{
                      width: '150px',
                      height: '70px',
                      border: '1px solid red',
                    }}
                    className={clsx(
                      classes.productImageUpload,
                      'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
                    )}>
                    <Typography className='text-sm font-700'>
                      <span className='mr-4 text-xs text-red-500'>
                        Note *(JPG, JPEG, PNG, PDF, GIF, DOC, DOCX)
                      </span>
                    </Typography>
                  </Box>
                )
              )}
            </div>
          )}
        />

        <Controller
          name='doc2_image'
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className='flex w-full flex-row items-center justify-center ml-16'>
              <div className='flex-col'>
                <Typography className='text-center'>Document 2</Typography>
                <label
                  htmlFor='doc2_image-button-file'
                  className={clsx(
                    classes.productImageUpload,
                    'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
                  )}>
                  <input
                    accept='image/x-png,image/gif,image/jpeg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    className='hidden'
                    id='doc2_image-button-file'
                    type='file'
                    onChange={async (e) => {
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (reader.readyState === 2) {
                          setPreviewDoc2File(reader.result);
                        }
                      };
                      reader.readAsDataURL(e.target.files[0]);

                      const file = e.target.files[0];

                      if (file) {
                        const fileExtension = file.name
                          .split('.')
                          .pop()
                          .toLowerCase();
                        setFileExtDoc2Name(fileExtension);
                        onChange(file);
                      }

                      // Force reset the input value to allow re-uploading the same file
                      e.target.value = '';
                    }}
                  />
                  <Icon fontSize='large' color='action'>
                    cloud_upload
                  </Icon>
                </label>
              </div>
              {!previewDoc2File && doc2File && (
                <div
                  style={{
                    display: 'flex',
                    position: 'relative',
                    width: 'fit-content',
                  }}>
                  <div
                    id='cancelIcon'
                    style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      zIndex: 1,
                      color: 'red',
                      cursor: 'pointer',
                      backgroundColor: 'white',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <HighlightOffIcon onClick={handleRemoveDOC2File} />
                  </div>
                  <div
                    style={{
                      width: 'auto',
                      height: '150px',
                      overflow: 'hidden',
                      display: 'flex',
                    }}>
                    {typeof doc2File === 'string' &&
                    ['pdf', 'doc', 'docx'].includes(
                      doc2File.split('.').pop().toLowerCase()
                    ) ? (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                        }}>
                        {doc2File.toLowerCase().includes('pdf') ? (
                          <PictureAsPdf
                            style={{
                              color: 'red',
                              cursor: 'pointer',
                              display: 'block',
                              fontSize: '137px',
                              margin: 'auto',
                            }}
                            onClick={() =>
                              window.open(`${BASE_URL}${doc2File}`)
                            }
                          />
                        ) : (
                          <DescriptionIcon
                            style={{
                              color: 'blue',
                              cursor: 'pointer',
                              display: 'block',
                              fontSize: '137px',
                              margin: 'auto',
                            }}
                            onClick={() =>
                              window.open(`${BASE_URL}${doc2File}`)
                            }
                          />
                        )}
                      </div>
                    ) : (
                      <img
                        src={`${BASE_URL}${doc2File}`}
                        style={{ height: '100px' }}
                      />
                    )}
                  </div>
                </div>
              )}

              {previewDoc2File ? (
                <div
                  style={{
                    width: 'auto',
                    height: '150px',
                    overflow: 'hidden',
                  }}>
                  {fileExtDoc2Name &&
                  ['pdf', 'doc', 'docx'].includes(fileExtDoc2Name) ? (
                    <div
                      style={{
                        display: 'flex',
                        position: 'relative',
                        width: 'fit-content',
                      }}>
                      <div
                        id='cancelIcon'
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          zIndex: 1,
                          color: 'red',
                          cursor: 'pointer',
                          backgroundColor: 'white',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <HighlightOffIcon onClick={handleRemoveDOC2File} />
                      </div>
                      {fileExtDoc2Name === 'pdf' ? (
                        <iframe
                          src={previewDoc2File}
                          frameBorder='0'
                          scrolling='auto'
                          height='150px'
                          width='150px'
                        />
                      ) : (
                        <DescriptionIcon
                          style={{
                            color: 'blue',
                            cursor: 'pointer',
                            display: 'block',
                            fontSize: '137px',
                            margin: 'auto',
                          }}
                          onClick={() => window.open(previewDoc2File)}
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        position: 'relative',
                        width: 'fit-content',
                      }}>
                      <div
                        id='cancelIcon'
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          zIndex: 1,
                          color: 'red',
                          cursor: 'pointer',
                          backgroundColor: 'white',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <HighlightOffIcon onClick={handleRemoveDOC2File} />
                      </div>
                      <img
                        src={previewDoc2File}
                        style={{ height: '140px', width: '150px' }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                !doc2File && (
                  <Box
                    height={180}
                    width={180}
                    my={4}
                    display='flex'
                    alignItems='center'
                    gap={4}
                    p={2}
                    style={{
                      width: '150px',
                      height: '70px',
                      border: '1px solid red',
                    }}
                    className={clsx(
                      classes.productImageUpload,
                      'flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg'
                    )}>
                    <Typography className='text-sm font-700'>
                      <span className='mr-4 text-xs text-red-500'>
                        Note *(JPG, JPEG, PNG, PDF, GIF, DOC, DOCX)
                      </span>
                    </Typography>
                  </Box>
                )
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default QualificationForm;
