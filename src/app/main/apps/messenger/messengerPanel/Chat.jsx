import { lighten, styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useEffect, useMemo, useRef, useState } from 'react';
import InputBase from '@mui/material/InputBase';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useSelector } from 'react-redux';
import { selectSelectedContactId } from './store/selectedContactIdSlice';
import { PictureAsPdf } from '@mui/icons-material';

import {
  useGetMessengerChatQuery,
  useGetMessengerContactsQuery,
  useGetMessengerUserProfileQuery,
  useSendMessengerMessageMutation,
} from '../MessengerApi';
import { Avatar } from '@mui/material';
import { BASE_URL } from 'src/app/constant/constants';
import { AttachFile } from '@mui/icons-material';
import DescriptionIcon from '@mui/icons-material/Description';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import GridOnIcon from '@mui/icons-material/GridOn';
import FolderZipIcon from '@mui/icons-material/FolderZip';

const StyledMessageRow = styled('div')(({ theme }) => ({
  '&.contact': {
    '& .bubble': {
      backgroundColor: lighten(theme.palette.secondary.main, 0.1),
      color: theme.palette.secondary.contrastText,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      '& .time': {
        marginLeft: 12,
      },
    },
    '&.first-of-group': {
      '& .bubble': {
        borderTopLeftRadius: 5, // Only left side
      },
    },
    '&.last-of-group': {
      '& .bubble': {
        borderBottomLeftRadius: 5, // Only left side
      },
    },
  },
  '&.me': {
    paddingLeft: 40,
    '& .bubble': {
      marginLeft: 'auto',
      backgroundColor: lighten(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.contrastText,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      '& .time': {
        justifyContent: 'flex-end',
        right: 0,
        marginRight: 12,
      },
    },
    '&.first-of-group': {
      '& .bubble': {
        borderTopRightRadius: 5,
      },
    },
    '&.last-of-group': {
      '& .bubble': {
        borderBottomRightRadius: 5, // Only right side
      },
    },
  },
  // Padding and margin for message groups
  '&.contact + .me, &.me + .contact': {
    paddingTop: 20,
    marginTop: 20,
  },
}));

function Chat(props) {
  const { className } = props;
  const selectedContactId = useSelector(selectSelectedContactId);
  const userId = localStorage.getItem('user_id');

  const { data: chat, refetch } = useGetMessengerChatQuery(selectedContactId);
  const { data: user } = useGetMessengerUserProfileQuery();
  const { data: contacts } = useGetMessengerContactsQuery(userId);

  const [sendMessage] = useSendMessengerMessageMutation();
  const [messageText, setMessageText] = useState('');
  const chatScroll = useRef(null);
  const [fileState, setFileState] = useState();
  const [file, setFile] = useState();
  const [open, setOpen] = useState(false);
  const fileInputdoc1Ref = useRef(null);
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  function scrollToBottom() {
    if (!chatScroll.current) {
      return;
    }

    chatScroll.current.scrollTo({
      top: chatScroll.current.scrollHeight,
      behavior: 'instant',
    });
  }

  // const showFile = (fileUrl) => {
  //   setFile(fileUrl);
  //   const extStr = getExtenstion(fileUrl);
  //   const ticketImgExtensionArr = ['.jpg', '.jpeg', '.png'];

  //   const isImage = ticketImgExtensionArr.find((url) => url === extStr);

  //   if (isImage) {
  //     setOpen(true);
  //   } else {
  //     window.open(fileUrl);
  //   }
  // };

  const handleOnChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileState(file);

      const fileExtension = file.name.split('.').pop().toLowerCase();
      const imageExtensions = [
        'jpg',
        'jpeg',
        'png',
        'gif',
        'bmp',
        'svg',
        'webp',
        'tiff',
        'ico',
        'heic',
        'heif',
        'jfif',
      ];
      const pdfExtensions = ['pdf'];
      const docExtensions = ['docx'];
      const exlsExtensions = ['xls', 'xlsx'];
      const zipExtensions = ['zip'];

      if (imageExtensions.includes(fileExtension)) {
        setFilePreview(URL.createObjectURL(file));
      } else if (pdfExtensions.includes(fileExtension)) {
        setFilePreview('pdf');
      } else if (docExtensions.includes(fileExtension)) {
        setFilePreview('docx');
      } else if (exlsExtensions.includes(fileExtension)) {
        setFilePreview('xls', 'xlsx');
      } else if (zipExtensions.includes(fileExtension)) {
        setFilePreview('zip');
      } else {
        setFilePreview('unsupported');
      }
    }
  };

  const handleRemoveDOC1File = () => {
    setFileState(null);
    setFilePreview(null);

    if (fileInputdoc1Ref.current) {
      fileInputdoc1Ref.current.value = '';
    }
  };

  useEffect(() => {
    if (!selectedContactId) return;

    const interval = setInterval(() => {
      refetch();
    }, 5000); // Call every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [selectedContactId, refetch]);

  return (
    <Paper
      className={clsx('flex flex-col relative pb-64 shadow', className)}
      sx={{ background: (theme) => theme.palette.background.default }}>
      <div
        ref={chatScroll}
        className='flex flex-1 flex-col overflow-y-auto overscroll-contain'>
        <div className='flex flex-col pt-16'>
          {chat?.messages?.length > 0 ? (
            chat.messages.map((item, i) => {
              const isFirstMessageOfGroup =
                i === 0 || chat[i - 1]?.contactId !== item.contactId;

              const isLastMessageOfGroup =
                i === chat.messages.length - 1 ||
                chat[i + 1]?.contactId !== item.contactId;

              const shouldShowContactAvatar =
                item.contactId === selectedContactId &&
                (i === chat.messages.length - 1 ||
                  chat[i + 1]?.contactId !== selectedContactId);
              console.log(
                'check_user',
                item.sender.id === userId,
                item.sender.id,
                userId
              );
              return (
                <StyledMessageRow
                  key={i}
                  //  grow-0 shrink-0 items-start justify-end
                  className={clsx(
                    'flex flex-col relative px-20 pb-4',
                    item.contactId === user?.id ? 'me' : 'contact',
                    { 'first-of-group': isFirstMessageOfGroup },
                    { 'last-of-group': isLastMessageOfGroup },
                    i + 1 === chat.messages.length && 'pb-72'
                  )}>
                  {Number(item.sender.id) === Number(userId) ? (
                    <div className='flex justify-end'>
                      {/* Message Bubble */}
                      <div className='bubble flex relative items-center justify-center p-12 max-w-full'>
                        <div className='leading-tight whitespace-pre-wrap break-words max-w-[150px]  '>
                          {item.message}
                        </div>

                        {/* File Attachment */}
                        {item.file && (
                          <div
                            style={{
                              width: 'auto',
                              height: 'auto',
                              overflow: 'hidden',
                              display: 'flex',
                            }}>
                            {typeof item.file === 'string' ? (
                              [
                                'pdf',
                                'doc',
                                'docx',
                                'xls',
                                'xlsx',
                                'zip',
                              ].includes(
                                item.file.split('.').pop().toLowerCase()
                              ) ? (
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 'auto',
                                    height: '50px',
                                  }}>
                                  {item.file.endsWith('.pdf') ? (
                                    <PictureAsPdf
                                      style={{
                                        color: 'red',
                                        cursor: 'pointer',
                                        fontSize: '47px',
                                        margin: 'auto',
                                      }}
                                      onClick={() =>
                                        window.open(`${BASE_URL}${item.file}`)
                                      }
                                    />
                                  ) : ['xls', 'xlsx'].includes(
                                      item.file.split('.').pop().toLowerCase()
                                    ) ? (
                                    <GridOnIcon
                                      style={{
                                        color: 'green',
                                        cursor: 'pointer',
                                        fontSize: '47px',
                                        margin: 'auto',
                                      }}
                                      onClick={() =>
                                        window.open(`${BASE_URL}${item.file}`)
                                      }
                                    />
                                  ) : item.file.endsWith('.zip') ? (
                                    <FolderZipIcon
                                      style={{
                                        color: 'yellow',
                                        cursor: 'pointer',
                                        fontSize: '47px',
                                        margin: 'auto',
                                      }}
                                      onClick={() =>
                                        window.open(`${BASE_URL}${item.file}`)
                                      }
                                    />
                                  ) : (
                                    <DescriptionIcon
                                      style={{
                                        color: 'blue',
                                        cursor: 'pointer',
                                        fontSize: '47px',
                                        margin: 'auto',
                                      }}
                                      onClick={() =>
                                        window.open(`${BASE_URL}${item.file}`)
                                      }
                                    />
                                  )}
                                </div>
                              ) : (
                                <img
                                  src={`${BASE_URL}${item.file}`}
                                  style={{ height: '100px' }}
                                  alt='file'
                                />
                              )
                            ) : null}
                          </div>
                        )}

                        {/* Timestamp */}
                        <Typography
                          className='time absolute hidden w-full text-11 mt-8 -mb-24 ltr:left-0 rtl:right-0 bottom-0 whitespace-nowrap'
                          color='text.secondary'>
                          {formatDistanceToNow(new Date(item?.created_at), {
                            addSuffix: true,
                          })}
                        </Typography>
                      </div>
                      {/* Avatar Section */}
                      <div className='leading-tight whitespace-pre-wrap'>
                        <Avatar src={`${BASE_URL}${item.sender_image || ''}`} />
                      </div>
                    </div>
                  ) : (
                    <div className='flex justify-start'>
                      {/* Avatar Section */}
                      <Avatar src={`${BASE_URL}${item.sender_image || ''}`} />
                      {/* Message Bubble */}
                      <div className='bubble flex relative items-center justify-center p-12 max-w-full'>
                        {/* Message Content */}
                        <div className='leading-tight whitespace-pre-wrap break-words max-w-[150px]'>
                          {item.message}
                        </div>

                        {/* File Attachment */}
                        {item.file && (
                          <div
                            style={{
                              width: 'auto',
                              height: 'auto',
                              overflow: 'hidden',
                              display: 'flex',
                            }}>
                            {typeof item.file === 'string' ? (
                              // Check for file type
                              [
                                'pdf',
                                'doc',
                                'docx',
                                'xls',
                                'xlsx',
                                'zip',
                              ].includes(
                                item.file.split('.').pop().toLowerCase()
                              ) ? (
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 'auto',
                                    height: '50px',
                                  }}>
                                  {item.file.endsWith('.pdf') ? (
                                    <PictureAsPdf
                                      style={{
                                        color: 'red',
                                        cursor: 'pointer',
                                        fontSize: '47px',
                                        margin: 'auto',
                                      }}
                                      onClick={() =>
                                        window.open(`${BASE_URL}${item.file}`)
                                      }
                                    />
                                  ) : ['xls', 'xlsx'].includes(
                                      item.file.split('.').pop().toLowerCase()
                                    ) ? (
                                    <GridOnIcon
                                      style={{
                                        color: 'green',
                                        cursor: 'pointer',
                                        fontSize: '47px',
                                        margin: 'auto',
                                      }}
                                      onClick={() =>
                                        window.open(`${BASE_URL}${item.file}`)
                                      }
                                    />
                                  ) : item.file.endsWith('.zip') ? (
                                    <FolderZipIcon
                                      style={{
                                        color: 'yellow',
                                        cursor: 'pointer',
                                        fontSize: '47px',
                                        margin: 'auto',
                                      }}
                                      onClick={() =>
                                        window.open(`${BASE_URL}${item.file}`)
                                      }
                                    />
                                  ) : (
                                    <DescriptionIcon
                                      style={{
                                        color: 'blue',
                                        cursor: 'pointer',
                                        fontSize: '47px',
                                        margin: 'auto',
                                      }}
                                      onClick={() =>
                                        window.open(`${BASE_URL}${item.file}`)
                                      }
                                    />
                                  )}
                                </div>
                              ) : (
                                <img
                                  src={`${BASE_URL}${item.file}`}
                                  style={{ height: '100px' }}
                                  alt='file'
                                />
                              )
                            ) : null}
                          </div>
                        )}

                        {/* Timestamp */}
                        <Typography
                          className='time absolute hidden w-full text-11 mt-8 -mb-24 ltr:left-0 rtl:right-0 bottom-0 whitespace-nowrap'
                          color='text.secondary'>
                          {formatDistanceToNow(new Date(item?.created_at), {
                            addSuffix: true,
                          })}
                        </Typography>
                      </div>
                    </div>
                  )}
                </StyledMessageRow>
              );
            })
          ) : (
            <div className='flex flex-col flex-1'>
              <div className='flex flex-col flex-1 items-center justify-center'>
                <FuseSvgIcon size={128} color='disabled'>
                  heroicons-outline:chat
                </FuseSvgIcon>
              </div>
              <Typography
                className='px-16 pb-24 text-center'
                color='text.secondary'>
                Start a conversation by typing your message below.
              </Typography>
            </div>
          )}
        </div>
      </div>

      {/* Message Input Section */}
      {chat && (
        <div>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              if (messageText === '' && !fileState) return;

              sendMessage({
                message: messageText,
                contactId: selectedContactId,
                file: fileState,
              })
                .then((response) => console.log('Message sent:', response))
                .catch((error) =>
                  console.error('Error sending message:', error)
                );

              setMessageText('');
              setFileState(null);
              setFilePreview(null);
            }}
            className='pb-16 px-8 absolute bottom-0 left-0 right-0'>
            <Paper className='rounded-24 flex items-center relative shadow'>
              <div>
                <label htmlFor='file'>
                  <input
                    type='file'
                    id='file'
                    ref={fileInputdoc1Ref}
                    style={{ display: 'none' }}
                    name='file'
                    onChange={(event) => handleOnChange(event)}
                    multiple
                  />
                  <AttachFile />
                </label>
              </div>
              <InputBase
                id='message-input'
                className='flex flex-1 grow shrink-0 mx-16 ltr:mr-48 rtl:ml-48 my-8'
                placeholder='Type your message'
                onChange={(e) => setMessageText(e.target.value)}
                value={messageText}
              />
              <IconButton
                className='absolute ltr:right-0 rtl:left-0 top-0'
                type='submit'
                size='large'>
                <FuseSvgIcon className='rotate-90' color='action'>
                  heroicons-outline:paper-airplane
                </FuseSvgIcon>
              </IconButton>
            </Paper>
          </form>

          {filePreview && (
            <div className='file-preview' style={{ position: 'relative' }}>
              {filePreview === 'pdf' ? (
                <>
                  {/* Cancel Icon */}
                  <div
                    id='cancelIcon'
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      left: '53px',
                      zIndex: 1,
                      color: 'red',
                      cursor: 'pointer',
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    }}
                    onClick={handleRemoveDOC1File}>
                    <HighlightOffIcon style={{ fontSize: '20px' }} />
                  </div>
                  {/* PDF Icon */}
                  <PictureAsPdf
                    style={{
                      color: 'red',
                      cursor: 'pointer',
                      display: 'block',
                      fontSize: '82px',
                      padding: '16px',
                    }}
                  />
                </>
              ) : filePreview === 'docx' ? (
                <>
                  {/* Cancel Icon */}
                  <div
                    id='cancelIcon'
                    style={{
                      position: 'absolute',
                      top: '5px',
                      left: '55px',
                      zIndex: 1,
                      color: 'red',
                      cursor: 'pointer',
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    }}
                    onClick={handleRemoveDOC1File}>
                    <HighlightOffIcon style={{ fontSize: '20px' }} />
                  </div>
                  {/* DOCX Icon */}
                  <DescriptionIcon
                    style={{
                      color: 'blue',
                      cursor: 'pointer',
                      display: 'block',
                      fontSize: '82px',
                      padding: '16px',
                    }}
                  />
                </>
              ) : filePreview === 'xls' || filePreview === 'xlsx' ? (
                <>
                  {/* Cancel Icon */}
                  <div
                    id='cancelIcon'
                    style={{
                      position: 'absolute',
                      top: '3px',
                      left: '55px',
                      zIndex: 1,
                      color: 'red',
                      cursor: 'pointer',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    }}
                    onClick={handleRemoveDOC1File}>
                    <HighlightOffIcon style={{ fontSize: '20px' }} />
                  </div>
                  {/* XLS Icon */}
                  <GridOnIcon
                    style={{
                      color: 'green',
                      cursor: 'pointer',
                      display: 'block',
                      fontSize: '82px',
                      padding: '16px',
                    }}
                  />
                </>
              ) : filePreview === 'zip' ? (
                <>
                  {/* Cancel Icon */}
                  <div
                    id='cancelIcon'
                    style={{
                      position: 'absolute',
                      top: '3px',
                      left: '55px',
                      zIndex: 1,
                      color: 'red',
                      cursor: 'pointer',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    }}
                    onClick={handleRemoveDOC1File}>
                    <HighlightOffIcon style={{ fontSize: '20px' }} />
                  </div>
                  {/* zip Icon */}
                  <FolderZipIcon
                    style={{
                      color: 'yellow',
                      cursor: 'pointer',
                      display: 'block',
                      fontSize: '82px',
                      padding: '16px',
                    }}
                  />
                </>
              ) : (
                <>
                  {/* Cancel Icon */}
                  <div
                    id='cancelIcon'
                    style={{
                      position: 'absolute',
                      top: '3px',
                      left: '85px',
                      zIndex: 1,
                      color: 'red',
                      cursor: 'pointer',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    }}
                    onClick={handleRemoveDOC1File}>
                    <HighlightOffIcon style={{ fontSize: '20px' }} />
                  </div>
                  <img
                    src={filePreview}
                    alt='File preview'
                    style={{ maxWidth: '40%', padding: '20px' }}
                  />
                </>
              )}
            </div>
          )}
        </div>
      )}
    </Paper>
  );
}

export default Chat;
