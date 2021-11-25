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
        <div style={{ height: 'fit-content', width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            {isLoading && (
                <>
                    <progress style={{
                        transition: "all .1s linear",
                        width: "100%",
                        maxWidth: "500px",
                        padding: "0.375rem 0.75rem",
                        border: "1px solid #bdbdbd",
                        borderRadius: "0.25rem",
                        height: "15px"
                    }}
                        value={progress} max="100">
                        {progress}%{' '}
                    </progress>{' '}
                    <p style={{ textAlign: "center", width: "fit-content" }}>Converting:- {progress} %</p>
                </>
            )}
            {/* {!isLoading && text && (
                        <>
                            <textarea
                                className="form-control w-100 mt-5"
                                style={{ width: "100%", background: "inherit", marginTop: "16px" }}
                                rows="30"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                        </>
                    )} */}
        </div>
    );

}

export default ImageToText
