import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import React, { memo } from 'react';
import { useHistory } from 'react-router';

function OfficeWorkDetail({ classes, data, pid }) {

    const router = useHistory()

    const gotoEditpage = () => {
        router.push(`/apps/officeWork-management/officeWork/${pid}/fromSearch`)
    }

    console.log("OfficeWorkDetail rendered")
    return (
        <>
            <div className={`my-0 rounded-4 mx-0 md:mx-40 mt-60 ${classes.blockContainer}`}>
                <div className='blockContentName'>Office Work</div>

                <div className='blockContentHolder'>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Police Clearance Status:</i>
                            <b className='value text-xs md:text-sm'>{data?.police_clearance_status || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Driving License Status:</i>
                            <b className='value text-xs md:text-sm'>{data?.driving_license_status || ""}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Finger Status:</i>
                            <b className='value text-xs md:text-sm'>{data?.finger_status || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Finger Date:</i>
                            <b className='value text-xs md:text-sm'>{data?.finger_date ? moment(new Date(data.finger_date)).format("DD/MM/YYYY") : ""}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Last Update By:</i>
                            <b className='value text-xs md:text-sm'>{`${data?.updated_by?.username || ""} [DT: ${data.updated_at ? moment(new Date(data.updated_at)).format("DD/MM/YYYY") : ""}]`}</b>
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

export default memo(OfficeWorkDetail)