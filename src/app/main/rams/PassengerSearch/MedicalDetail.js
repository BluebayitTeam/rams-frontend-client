import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import React, { memo } from 'react';
import { useHistory } from 'react-router';

function MedicalDetails({ classes, data, pid }) {

    const router = useHistory()

    const gotoEditpage = () => {
        router.push(`/apps/medical-management/medical/${pid}/fromSearch`)
    }

    console.log("MedicalDetails rendered")
    return (
        <>
            <div className={`my-0 rounded-4 mx-0 md:mx-40 mt-60 ${classes.blockContainer}`}>
                <div className='blockContentName'>Medical</div>

                <div className='blockContentHolder'>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Medical Serial No:</i>
                            <b className='value text-xs md:text-sm'>{data?.medical_serial_no || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Medical Result:</i>
                            <b className='value text-xs md:text-sm'>{data?.medical_result || ""}</b>
                        </div>
                    </div>

                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Medical Card:</i>
                            <b className='value text-xs md:text-sm'>{data?.medical_card || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Medical Center:</i>
                            <b className='value text-xs md:text-sm'>{data?.medical_center?.name || ""}</b>
                        </div>
                    </div>

                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Medical Exam Date:</i>
                            <b className='value text-xs md:text-sm'>{data?.medical_exam_date ? moment(new Date(data.medical_exam_date)).format("DD/MM/YYYY") : ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Medical Issue Date:</i>
                            <b className='value text-xs md:text-sm'>{data?.medical_issue_date ? moment(new Date(data.medical_issue_date)).format("DD/MM/YYYY") : ""}</b>
                        </div>
                    </div>

                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Medical Expiry Date:</i>
                            <b className='value text-xs md:text-sm'>{data?.medical_expiry_date ? moment(new Date(data.medical_expiry_date)).format("DD/MM/YYYY") : ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>medical Report Date:</i>
                            <b className='value text-xs md:text-sm'>{data?.medical_report_date ? moment(new Date(data.medical_report_date)).format("DD/MM/YYYY") : ""}</b>
                        </div>
                    </div>

                    <div className='container flex-col md:flex-row'>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Notes:</i>
                            <b className='value text-xs md:text-sm'>{data?.notes || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Last Update By:</i>
                            <b className='value text-xs md:text-sm'>{`${data?.updated_by?.username || ""} [DT: ${data.updated_at ? moment(new Date(data.updated_at)).format("DD/MM/YYYY") : ""}]`}</b>
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

export default memo(MedicalDetails)
