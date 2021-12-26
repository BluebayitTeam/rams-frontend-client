import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router';

function CallingEmbAttestationDetail({ classes, data, pid }) {

    const router = useHistory()

    const gotoEditpage = () => {
        router.push(`/apps/callingEmbAttestation-management/callingEmbAttestation/${pid}/fromSearch`)
    }

    return (
        <>
            <div className={`my-0 rounded-4 mx-0 md:mx-40 mt-60 ${classes.blockContainer}`}>
                <div className='blockContentName'>Calling Emb Attestation</div>

                <div className='blockContentHolder'>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Ministry Attestation:</i>
                            <b className='value text-xs md:text-sm'>{data?.ministry_attestation || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Bio Submitted Date:</i>
                            <b className='value text-xs md:text-sm'>{data?.bio_submitted_date ? moment(new Date(data.bio_submitted_date)).format("DD/MM/YYYY") : ""}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Calling Date:</i>
                            <b className='value text-xs md:text-sm'>{data?.calling_date ? moment(new Date(data.calling_date)).format("DD/MM/YYYY") : ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Emb Attestation Status:</i>
                            <b className='value text-xs md:text-sm'>{data?.emb_attestation_status || ""}</b>
                        </div>
                    </div>


                    <div className='container flex-col md:flex-row'>
                        <div className='leftRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Bio Submitted Status:</i>
                            <b className='value text-xs md:text-sm'>{data?.bio_submitted_status || ""}</b>
                        </div>
                        <div className='border hidden md:block'></div>
                        <div className='rightRow w-full md:w-1/2 pl-2 md:pl-16 pr-2 md:pr-16'>
                            <i className='label text-xs md:text-sm'>Calling Status:</i>
                            <b className='value text-xs md:text-sm'>{data?.calling_status || ""}</b>
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

export default CallingEmbAttestationDetail
