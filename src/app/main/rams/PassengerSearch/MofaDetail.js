
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router';

function MofaDetail({ classes, data, setData, pid, modalAction }) {

    const router = useHistory()

    const gotoEditpage = () => {
        setData({ titleName: data.titleName })
        router.push(`apps/mofa-management/mofa/${pid}/fromSearch`)
        modalAction(false)
    }

    return (
        <>
            <div className={`my-0 rounded-4 mx-0 md:mx-40 mt-60 ${classes.blockContainer}`}>
                <div className='blockContentName'>{data.titleName}</div>

                <div className='blockContentHolder'>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>Mofa Status:</b>
                            <i className='value text-xs md:text-sm'>{data?.mofa_status || ""}</i>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>Mofa No:</b>
                            <i className='value text-xs md:text-sm'>{data?.mofa_no || ""}</i>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>Mofa Date:</b>
                            <i className='value text-xs md:text-sm'>{data?.mofa_date ? moment(new Date(data.mofa_date)).format("DD/MM/YYYY") : ""}</i>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>Re Mofa Charge:</b>
                            <i className='value text-xs md:text-sm'>{data?.re_mofa_charge || ""}</i>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>Re Mofa Status:</b>
                            <i className='value text-xs md:text-sm'>{data?.re_mofa_status || ""}</i>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>why Re Mofa:</b>
                            <i className='value text-xs md:text-sm'>{data?.why_re_mofa || ""}</i>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <b className='label text-xs md:text-sm'>Mofa Agency:</b>
                            <i className='value text-xs md:text-sm'>{data?.mofa_agency || ""}</i>
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

export default MofaDetail