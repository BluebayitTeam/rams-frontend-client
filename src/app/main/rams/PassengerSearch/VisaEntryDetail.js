import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router';

function VisaEntryDetail({ classes, data }) {

    const router = useHistory()

    const gotoEditpage = () => {
        router.push(`/apps/visaEntry-management/visaEntrys/${data.id}/fromSearch`)
    }

    console.log("VisaEntryDetail rendered")
    return (

        <>
            <div className={`my-0 rounded-4 mx-0 md:mx-40 mt-60 ${classes.blockContainer}`}>
                <div className='blockContentName'>Visa Entry</div>

                <div className='blockContentHolder'>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Visa Number:</i>
                            <b className='value text-xs md:text-sm'>{data?.visa_number || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Visa Issue Date:</i>
                            <b className='value text-xs md:text-sm'>{data?.visa_issue_date ? moment(new Date(data.visa_issue_date)).format("DD/MM/YYYY") : ""}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Profession English:</i>
                            <b className='value text-xs md:text-sm'>{data?.profession_english || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Profession Arabic:</i>
                            <b className='value text-xs md:text-sm'>{data?.profession_arabic || ""}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Group No:</i>
                            <b className='value text-xs md:text-sm'>{data?.group_no || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Quantity:</i>
                            <b className='value text-xs md:text-sm'>{data?.quantity || ""}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Sponsor ID No:</i>
                            <b className='value text-xs md:text-sm'>{data?.sponsor_id_no || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Sponsor Date Of Birth:</i>
                            <b className='value text-xs md:text-sm'>{data?.sponsor_dob ? moment(new Date(data.sponsor_dob)).format("DD/MM/YYYY") : ""}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Sponsor Name English:</i>
                            <b className='value text-xs md:text-sm'>{data?.sponsor_name_english || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Sponsor Name Arabic:</i>
                            <b className='value text-xs md:text-sm'>{data?.sponsor_name_arabic || ""}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Sponsor Mobile:</i>
                            <b className='value text-xs md:text-sm'>{data?.sponsor_mobile || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Sponsor Address:</i>
                            <b className='value text-xs md:text-sm'>{data?.sponsor_address || ""}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Demand:</i>
                            <b className='value text-xs md:text-sm'>{data?.demand?.company_name || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Visa Agent:</i>
                            <b className='value text-xs md:text-sm'>{`${data?.visa_agent?.first_name || ""} ${data?.visa_agent?.last_name || ""}`}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Notes:</i>
                            <b className='value text-xs md:text-sm'>{data?.notes || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16 h-fit'>
                            <i className='label text-xs md:text-sm'>Country:</i>
                            <b className='value text-xs md:text-sm'>{data?.country?.name || ""}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Last Update By:</i>
                            <b className='value text-xs md:text-sm'>{`${data?.updated_by?.username || ""} [DT: ${data.updated_at ? moment(new Date(data.updated_at)).format("DD/MM/YYYY") : ""}]`}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16 h-fit'>
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

export default VisaEntryDetail
