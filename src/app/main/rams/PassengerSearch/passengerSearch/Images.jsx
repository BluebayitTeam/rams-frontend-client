import { Modal } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BASE_URL } from 'src/app/constant/constants';
import CloseIcon from '@mui/icons-material/Close';
const useStyles = makeStyles((theme) => ({
  modal: {
    margin: 'auto',
    background: 'white',
    width: 'fit-content',
    height: 'fit-content',
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
    '& .imgContainer': {
      background: theme.palette.background.default,
      maxWidth: '100%',
      maxHeight: '100vh',

      display: 'flex',
      position: 'relative',
      '& .closeIcon': {
        color: 'red',
        position: 'absolute',
        right: '5px',
        top: '5px',
        padding: '5px',
        cursor: 'pointer',
      },
      '& img': {
        flexGrow: 1,
      },
    },
  },
}));

function Images({ images, classes }) {
  const classesComponentScope = useStyles();

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [imgUrl, setImgUrl] = useState('');

  const showImage = (url) => {
    setOpenModal(true);
    setImgUrl(url);
  };

  return (
    <>
      <Modal
        open={openModal}
        className={classesComponentScope.modal}
        onClose={() => {
          setOpenModal(false);
          setImgUrl('');
        }}>
        <div className='imgContainer'>
          <CloseIcon
            className='closeIcon'
            fontSize='large'
            onClick={() => {
              setOpenModal(false);
              setImgUrl('');
            }}
          />
          <img src={imgUrl || null} />
        </div>
      </Modal>

      <div
        className={`my-0 rounded-4 mx-0 md:mx-40 mt-60 py-14 ${classes.allImgContainer}`}>
        {images
          .sort((a, b) => a.order - b.order)
          .map((img) => (
            <div className='imgContainer w-full md:w-1/4' key={img.order}>
              <div className='imgTitle'>
                <h5
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate.push(`${img.editurl}${img.pid}/fromSearch`);
                  }}>
                  {img.title}
                </h5>
              </div>
              <div
                style={{ cursor: 'pointer' }}
                className={`imgHolder rounded-4 ${img.url ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                onClick={() => img.url && showImage(`${BASE_URL}${img.url}`)}>
                {img.url ? (
                  <img src={`${BASE_URL}${img.url}`} />
                ) : (
                  <img src='/build/assets/images/logos/noImageFound.jpeg' />
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
export default Images;
