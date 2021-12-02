

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Alert() {

    const [alersible, setAlersible] = useState(false)

    const alert = useSelector(({ alert }) => alert)

    useEffect(() => {
        if (alert.alertValue) {
            setAlersible(true)
        }
    }, [alert.alertChanged])

    return alersible ? (
        <div
            className={`flex fixed left-1/2 right-1/2 w-min z-999 rounded-sm py-4 px-8 ${alert.alertType === "success" ? "bg-green-A200" : alert.alertType === "warning" ? "bg-yellow-A100" : alert.alertType === "error" ? "bg-red-300" : ""} shadow-xl`}
            style={{
                top: "118px",
                whiteSpace: "pre",
            }}
        >
            <motion.div>
                <h5>{alert.alertValue}</h5>
            </motion.div>
        </div>
    ) : null
}

export default Alert
