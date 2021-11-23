import React, { useEffect } from 'react';
import Tesseract from "tesseract.js";

function ImageToText({ text, setText, childSubmitFunc }) {

    const [isLoading, setIsLoading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);

    const handleSubmit = (imageObj) => {
        setIsLoading(true);
        setProgress(0)
        Tesseract.recognize(imageObj, 'eng', {
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
                setText(result.data.text);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        childSubmitFunc.current = handleSubmit
    }, [])

    return (
        <div className="container" style={{ height: 'fit-content', maxWidth: '450px' }}>
            <div>
                <div style={{ marginBottom: "48px", marginRight: "auto", marginLeft: "auto", marginTop: "100px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
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
