import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router';

function Embassy({ classes, data, pid }) {

    const router = useHistory()

    const gotoEditpage = () => {
        router.push(`/apps/embassy-management/embassy/${pid}/fromSearch`)
    }

    console.log("Embassy rendered")
    return (
        <>
            <div className={`my-0 rounded-4 mx-0 md:mx-40 mt-60 ${classes.blockContainer}`}>
                <div className='blockContentName'>Embassy</div>

                <div className='blockContentHolder'>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Submit Date:</i>
                            <b className='value text-xs md:text-sm'>{data?.submit_date ? moment(new Date(data.submit_date)).format("DD/MM/YYYY") : ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Profession English:</i>
                            <b className='value text-xs md:text-sm'>{data?.profession_english || ""}</b>
                        </div>
                    </div>

                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Profession Arabic:</i>
                            <b className='value text-xs md:text-sm'>{data?.profession_arabic || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Salary:</i>
                            <b className='value text-xs md:text-sm'>{data?.salary || ""}</b>
                        </div>
                    </div>

                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Stamping Status:</i>
                            <b className='value text-xs md:text-sm'>{data?.stamping_status || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Stamping Date:</i>
                            <b className='value text-xs md:text-sm'>{data?.stamping_date ? moment(new Date(data.stamping_date)).format("DD/MM/YYYY") : ""}</b>
                        </div>
                    </div>

                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Visa Expiry Date:</i>
                            <b className='value text-xs md:text-sm'>{data?.visa_expiry_date ? moment(new Date(data.visa_expiry_date)).format("DD/MM/YYYY") : ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Delivery Date:</i>
                            <b className='value text-xs md:text-sm'>{data?.delivery_date ? moment(new Date(data.delivery_date)).format("DD/MM/YYYY") : ""}</b>
                        </div>
                    </div>

                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Visa Number:</i>
                            <b className='value text-xs md:text-sm'>{data?.visa_number_readonly || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Sponsor ID No:</i>
                            <b className='value text-xs md:text-sm'>{data?.sponsor_id_no_readonly || ""}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Sponsor Name English:</i>
                            <b className='value text-xs md:text-sm'>{data?.sponsor_name_english_readonly || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Sponsor Name Arabic:</i>
                            <b className='value text-xs md:text-sm'>{data?.sponsor_name_arabic_readonly || ""}</b>
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