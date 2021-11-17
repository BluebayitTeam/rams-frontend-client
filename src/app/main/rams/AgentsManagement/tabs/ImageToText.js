import { Button } from '@material-ui/core';
import React from 'react';
import Tesseract from "tesseract.js";


function ImageToText() {

    const [isLoading, setIsLoading] = React.useState(false);
    const [image, setImage] = React.useState('');
    const [text, setText] = React.useState('');
    const [progress, setProgress] = React.useState(0);

    const handleSubmit = () => {
        setIsLoading(true);
        Tesseract.recognize(image, 'eng', {
            logger: (m) => {
                // console.log(m);
                if (m.status === 'recognizing text') {
                    setProgress(parseInt(m.progress * 100));
                }
            },
        })
            .catch((err) => {
                console.error(err);
            })
            .then((result) => {
                console.log(result.data);
                setText(result.data.text);
                setIsLoading(false);
            });
    };

    return (
        <div className="container" style={{ height: 'fit-content', maxWidth: '450px' }}>
            <div>
                <div style={{ marginBottom: "48px", marginRight: "auto", marginLeft: "auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    {!isLoading && (
                        <h1 className="text-center py-5 mc-5">Image To Text</h1>
                    )}
                    {isLoading && (
                        <>
                            <progress style={{
                                transition: "all .1s linear",
                                width: "100%",
                                padding: "0.375rem 0.75rem",
                                paddingTop: "4px",
                                paddingBottom: "3.28px",
                                border: "1px solid #bdbdbd",
                                borderRadius: "0.25rem",
                                height: "15px"
                            }}
                                value={progress} max="100">
                                {progress}%{' '}
                            </progress>{' '}
                            <p style={{ textAlign: "center" }}>Converting:- {progress} %</p>
                        </>
                    )}
                    {!isLoading && !text && (
                        <>
                            <input
                                type="file"
                                onChange={(e) =>
                                    setImage(URL.createObjectURL(e.target.files[0]))
                                }
                                style={{
                                    marginTop: "48px",
                                    marginBottom: "32px",
                                    cursor: "pointer",
                                    overflow: "hidden",
                                    transition: "all .1s linear",
                                    border: "1px solid #cdcbcb",
                                    borderRadius: "5px",
                                    lineHeight: "25px"
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                disabled={!image}
                            >CONVERT</Button>
                        </>
                    )}
                    {!isLoading && text && (
                        <>
                            <textarea
                                className="form-control w-100 mt-5"
                                style={{ width: "100%", background: "inherit", marginTop: "16px" }}
                                rows="30"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

}

export default ImageToText
