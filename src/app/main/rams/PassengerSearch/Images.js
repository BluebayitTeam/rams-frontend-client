import { makeStyles, Modal } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { BASE_URL } from 'app/constant/constants';
import React, { memo, useState } from 'react';

const useStyles = makeStyles(theme => (
    {
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
                minWidth: '500px',
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
                    flexGrow: 1
                }
            }
        }
    }
)
)

function Images({ images, classes }) {

    const classesComponentScope = useStyles();

    const [openModal, setOpenModal] = useState(false)
    const [imgUrl, setImgUrl] = useState('')

    const showImage = (url) => {
        setOpenModal(true)
        setImgUrl(url)
    }

    console.log("Images rendered")
    return (
        <>
            <Modal open={openModal} className={classesComponentScope.modal} onClose={() => {
                setOpenModal(false)
                setImgUrl('')
            }}>
                <div className='imgContainer'>
                    <CloseIcon className='closeIcon' fontSize='large' onClick={() => {
                        setOpenModal(false)
                        setImgUrl('')
                    }} />
                    <img src={imgUrl || null} />
                </div>
            </Modal>

            <div className={`my-0 rounded-4 mx-0 md:mx-40 mt-60 py-14 ${classes.allImgContainer}`}>
                {images.sort((a, b) => a.order - b.order).map((img) => (
                    <div className='imgContainer w-full md:w-1/4' key={img.order}>
                        <div className='imgTitle'>
                            <h5>{img.title}</h5>
                        </div>
                        <div
                            className={`imgHolder rounded-4 ${img.url ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                            onClick={() => img.url && showImage(`${BASE_URL}${img.url}`)}>
                            <img src={`${BASE_URL}${img.url}`} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default memo(Images)
