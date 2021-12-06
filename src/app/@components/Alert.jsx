

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Alert() {

    const [alersible, setAlersible] = useState(false)

    const alert = useSelector(({ alert }) => alert)

    useEffect(() => {
        if (alersible) {
            setTimeout(() => {
                setAlersible(false)
            }, 3000);
        }
    }, [alersible])

    useEffect(() => {
        if (alert.alertValue) {
            setAlersible(true)
        }
    }, [alert.alertChanged])

    return (
        <div
            style={{
                position: 'absolute',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '120px',
                marginLeft: 'auto',
                marginRight: 'auto',
            }}
        >
            <div
                style={{
                    width: "fitContent",
                    zIndex: 100,
                }}
            >
                <motion.div>
                    <pre
                        className={` ${alert.alertType === "success" ? "bg-green-A200" : alert.alertType === "warning" ? "bg-yellow-A100" : alert.alertType === "error" ? "bg-red-300" : ""} shadow-xl lg:ml-288 lg:mr-8`}
                        style={{
                            padding: alersible ? "5px" : "0px",
                            borderRadius: "5px",
                            opacity: alersible ? 1 : 0,
                            transitionProperty: "all",
                            transitionDuration: "0.5s",
                            transitionTimingFunction: "cubic-bezier(0.27, 0.24, 0, 1.03)",
                            transitionDelay: "0s",
                        }}
                    >{alersible ? alert.alertValue : ""}</pre>
                </motion.div>
            </div>
        </div >
    )
}

export default Alert
