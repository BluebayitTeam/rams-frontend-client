import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router';

function Embassy({ classes, data, setData, pid, modalAction }) {

    const router = useHistory()

    const gotoEditpage = () => {
        setData({ titleName: data.titleName })
        router.push(`apps/embassy-management/embassy/${pid}/fromSearch`)
        modalAction(false)
    }

    return (
        <>
            <div className={`my-0 rounded-4 mx-0 md:mx-40 mt-60 ${classes.blockContainer}`}>
                <div className='blockContentName'>{data.titleName}</div>

                <div className='blockContentHolder'>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>Submit Date:</b>
                            <i className='value text-xs md:text-sm'>{data?.submit_date ? moment(new Date(data.submit_date)).format("DD/MM/YYYY") : ""}</i>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>Profession English:</b>
                            <i className='value text-xs md:text-sm'>{data?.profession_english || ""}</i>
                        </div>
                    </div>

                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>Profession Arabic:</b>
                            <i className='value text-xs md:text-sm'>{data?.profession_arabic || ""}</i>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>Salary:</b>
                            <i className='value text-xs md:text-sm'>{data?.salary || ""}</i>
                        </div>
                    </div>

                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>Stamping Status:</b>
                            <i className='value text-xs md:text-sm'>{data?.stamping_status || ""}</i>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>Stamping Date:</b>
                            <i className='value text-xs md:text-sm'>{data?.stamping_date ? moment(new Date(data.stamping_date)).format("DD/MM/YYYY") : ""}</i>
                        </div>
                    </div>

                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>Visa Expiry Date:</b>
                            <i className='value text-xs md:text-sm'>{data?.visa_expiry_date ? moment(new Date(data.visa_expiry_date)).format("DD/MM/YYYY") : ""}</i>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>Delivery Date:</b>
                            <i className='value text-xs md:text-sm'>{data?.delivery_date ? moment(new Date(data.delivery_date)).format("DD/MM/YYYY") : ""}</i>
                        </div>
                    </div>

                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>Visa Number:</b>
                            <i className='value text-xs md:text-sm'>{data?.visa_number_readonly || ""}</i>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>Sponsor ID No:</b>
                            <i className='value text-xs md:text-sm'>{data?.sponsor_id_no_readonly || ""}</i>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>Sponsor Name English:</b>
                            <i className='value text-xs md:text-sm'>{data?.sponsor_name_english_readonly || ""}</i>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>Sponsor Name Arabic:</b>
                            <i className='value text-xs md:text-sm'>{data?.sponsor_name_arabic_readonly || ""}</i>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>Mofa No:</b>
                            <i className='value text-xs md:text-sm'>{data?.mofa_no_readonly || ""}</i>
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

export default Embassy