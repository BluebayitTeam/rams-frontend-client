import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useCreateDocmentSendMutation } from '../DocmentSendsApi';

/**
 * The docmentSend header.
 */
function DocmentSendHeader({ handleReset }) {
    const routeParams = useParams();
    const { docmentSendId } = routeParams;
    const [saveDocumentSend] = useCreateDocmentSendMutation();
    const methods = useFormContext();
    const { formState, watch, getValues, reset } = methods;
    const { isValid, dirtyFields } = formState;
    const theme = useTheme();
    const navigate = useNavigate();
    const { name, images, featuredImageId, checkbox, passenger, email } = watch();
    const handleDelete = localStorage.getItem('deleteDocmentSend');
    const handleUpdate = localStorage.getItem('updateDocmentSend');
    const [openSuccessStatusAlert, setOpenSuccessStatusAlert] = useState(false);
    const [showSendButton, setShowSendButton] = useState(false);

    useEffect(() => {
        // Update the showSendButton state based on the checkbox, passenger, and email values
        setShowSendButton(checkbox && passenger && email);
    }, [checkbox, passenger, email]);

    function handleSaveDocumentSend() {
        saveDocumentSend(getValues());
        handleReset({});
        handleReset({ email: '' });
        setOpenSuccessStatusAlert(true);
        setTimeout(() => setOpenSuccessStatusAlert(false), 2000);
        console.log('xjggdasj', getValues());
    }

    // function handleCancel() {
    //     handleReset();
    //     navigate(/apps/docmentSend/docmentSends/new);
    // }

    return (
        <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
            <div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
                <div className="flex items-center max-w-full">
                    <motion.div
                        className="flex flex-col min-w-0 mx-8 sm:mx-16"
                        initial={{ x: -20 }}
                        animate={{ x: 0, transition: { delay: 0.3 } }}
                    >
                        <Typography className="text-16 sm:text-20 truncate font-semibold">Document Send</Typography>
                    </motion.div>
                </div>
            </div>

            <motion.div
                className="flex"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
            >
                {showSendButton && (
                    <Button
                        className="whitespace-nowrap mx-4"
                        variant="contained"
                        color="secondary"
                        onClick={handleSaveDocumentSend}
                    >
                        Send
                    </Button>
                )}

                {/* Dialog For Success Alert */}

                <Dialog
                    open={openSuccessStatusAlert}
                    onClose={() => setOpenSuccessStatusAlert(false)}
                    style={{ borderRadius: '15px' }}
                >
                    <DialogTitle
                        style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', color: 'blue' }}
                    >
                        {' '}
                        <img
                            className="h-full block rounded"
                            style={{ borderRadius: '30px' }}
                            width="300px"
                            height="300px"
                            src="/assets/images/userImg/success.gif"
                            alt="test"
                        />
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ fontSize: '18px' }}>
                            Successfully Email this Document in This Email.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions />
                </Dialog>
            </motion.div>
        </div>
    );
}

export default DocmentSendHeader;
