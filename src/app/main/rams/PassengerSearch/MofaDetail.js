
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import React, { memo } from 'react';
import { useHistory } from 'react-router';

function MofaDetail({ classes, data, pid }) {

    const router = useHistory()

    const gotoEditpage = () => {
        router.push(`/apps/mofa-management/mofa/${pid}/fromSearch`)
    }

    console.log("MofaDetail rendered")
    return (
        <>
            <div className={`my-0 rounded-4 mx-0 md:mx-40 mt-60 ${classes.blockContainer}`}>
                <div className='blockContentName'>Mofa</div>

                <div className='blockContentHolder'>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Mofa Status:</i>
                            <b className='value text-xs md:text-sm'>{data?.mofa_status || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Mofa No:</i>
                            <b className='value text-xs md:text-sm'>{data?.mofa_no || ""}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Mofa Date:</i>
                            <b className='value text-xs md:text-sm'>{data?.mofa_date ? moment(new Date(data.mofa_date)).format("DD/MM/YYYY") : ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Re Mofa Charge:</i>
                            <b className='value text-xs md:text-sm'>{data?.re_mofa_charge || ""}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Re Mofa Status:</i>
                            <b className='value text-xs md:text-sm'>{data?.re_mofa_status || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>why Re Mofa:</i>
                            <b className='value text-xs md:text-sm'>{data?.why_re_mofa || ""}</b>
                        </div>
                    </div>

                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Mofa Agency:</i>
                            <b className='value text-xs md:text-sm'>{data?.mofa_agency?.name || ""}</b>
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

export default memo(MofaDetail)