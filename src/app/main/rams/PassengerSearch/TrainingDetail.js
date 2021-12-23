import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router';

function TrainingDetail({ classes, data, pid }) {

    const router = useHistory()

    const gotoEditpage = () => {
        router.push(`/apps/training-management/training/${pid}/fromSearch`)
    }

    console.log("TrainingDetail rendered")
    return (
        <>
            <div className={`my-0 rounded-4 mx-0 md:mx-40 mt-60 ${classes.blockContainer}`}>
                <div className='blockContentName'>Training</div>

                <div className='blockContentHolder'>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Admission Date:</i>
                            <b className='value text-xs md:text-sm'>{data?.admission_date || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Serial No:</i>
                            <b className='value text-xs md:text-sm'>{data?.serial_no || ""}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Certificate No:</i>
                            <b className='value text-xs md:text-sm'>{data?.certificate_no || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Certificate Date:</i>
                            <b className='value text-xs md:text-sm'>{data?.certificate_date ? moment(new Date(data.certificate_date)).format("DD/MM/YYYY") : ""}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Training Card Status:</i>
                            <b className='value text-xs md:text-sm'>{data?.training_card_status || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Batch Number:</i>
                            <b className='value text-xs md:text-sm'>{data?.batch_number || ""}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Recruiting Agency:</i>
                            {/* id_to_object */}
                            <b className='value text-xs md:text-sm'>{data?.recruiting_agency || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                        </div>
                    </div>

                </div>

                <div className='blockContentAction' onClick={() => gotoEditpage()}>
                    <EditIcon />
                </div>
            </div>
        </>
    )
}

export default TrainingDetail