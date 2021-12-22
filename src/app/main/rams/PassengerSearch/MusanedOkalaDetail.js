import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router';

function MusanedOkalaDetail({ classes, data, pid }) {

    const router = useHistory()

    const gotoEditpage = () => {
        router.push(`/apps/musanedOkala-management/musanedOkala/${pid}/fromSearch`)
    }

    return (
        <>
            <div className={`my-0 rounded-4 mx-0 md:mx-40 mt-60 ${classes.blockContainer}`}>
                <div className='blockContentName'>Musaned Okala</div>

                <div className='blockContentHolder'>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Musaned Status:</i>
                            <b className='value text-xs md:text-sm'>{data?.musaned_status || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Okala Status:</i>
                            <b className='value text-xs md:text-sm'>{data?.okala_status || ""}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Musaned Date:</i>
                            <b className='value text-xs md:text-sm'>{data?.musaned_date ? moment(new Date(data.musaned_date)).format("DD/MM/YYYY") : ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Okala Date:</i>
                            <b className='value text-xs md:text-sm'>{data?.okala_date ? moment(new Date(data.okala_date)).format("DD/MM/YYYY") : ""}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Musaned Given By:</i>
                            {/* id_to_object */}
                            <b className='value text-xs md:text-sm'>{data?.musaned_given_by || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Okala Given By:</i>
                            {/* id_to_object */}
                            <b className='value text-xs md:text-sm'>{data?.okala_given_by || ""}</b>
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

export default MusanedOkalaDetail
