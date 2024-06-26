import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import moment from 'moment';
import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { unstable_batchedUpdates } from 'react-dom';

import {
  BASE_URL,
  GET_PAYMENT_VOUCHER_BY_INVOICE_NO,
  GET_PAYMENT_VOUCHER_ID_NAME_BY,
  GET_RECEIPT_VOUCHER_ID_NAME_BY,
  GET_SITESETTINGS,
} from 'src/app/constant/constants';
import { makeStyles } from '@mui/styles';
import getTotalAmount from 'src/app/@helpers/getTotalAmount';
import { useReactToPrint } from 'react-to-print';
import { ToWords } from 'to-words';

const useStyles = makeStyles(() => ({
  printableContainer: {
    padding: '30px',
    '& .companyLogo': {
      display: 'flex',
      justifyContent: 'center',
      height: '50px',
      overflow: 'hidden',
      '& > img': {
        height: '100%',
        width: 'fit-content',
      },
    },
    '& .companyName': {
      marginTop: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      fontWeight: 'bold',
    },
    '& .address': {
      padding: '1px 0px',
      display: 'flex',
      justifyContent: 'center',
    },
    '& .moEmailWeb': {
      padding: '1px 0px',
      display: 'flex',
      justifyContent: 'center',
      '& > div': {
        margin: '0px 5px',
        '& > span': {
          paddingLeft: '5px',
        },
      },
    },
    '& .title': {
      textAlign: 'center',
      marginTop: '10px',
      fontWeight: 500,
    },
    '& .voucerAndDate': {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      padding: '5px 20px',
      fontWeight: 500,
    },
    '& table, th, td': {
      border: '1px solid darkgray',
    },
    '& table': {
      with: '100%',
      '& thead': {
        background: 'lightgrey',
      },
      '& tr': {
        height: '25px',
      },
      '& th.left, td.left': {
        width: '100%',
        textAlign: 'left',
        paddingLeft: '5px',
        fontSize: '14px',
        fontWeight: 500,
      },
      '& th.right, td.right': {
        padding: '0px 5px',
        textAlign: 'right',
        width: 'fit-content',
        whiteSpace: 'nowrap',
      },
    },
    '& .allSignatureContainer': {
      height: '120px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      '& .signatureContainer': {
        height: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& div': {
          borderTop: '1px dashed',
          width: '100px',
        },
        '& h5': {
          width: 'fit-content',
          whiteSpace: 'nowrap',
        },
      },
    },
  },
}));

const PrintVoucher = forwardRef(({ title, type }, ref) => {
  const classes = useStyles();
  const toWords = new ToWords();

  const [generalData, setGeneralData] = useState({});
  const [data, setData] = useState({});
  const [dataItems, setDataItems] = useState([]);
  const [totalDbAmount, setTotalDbAmount] = useState('0.00');
  const [totalCDAmount, setTotalCDAmount] = useState('0.00');
  const [amountInWord, setAmountInWord] = useState('ZERO TK ONLY');

  // Get general setting data
  useEffect(() => {
    fetch(`${GET_SITESETTINGS}`)
      .then((response) => response.json())
      .then((data) => setGeneralData(data.general_settings[0] || {}))
      .catch(() => setGeneralData({}));
  }, []);

  // Print DOM ref
  const componentRef = useRef();

  // Printer action
  const printAction = useReactToPrint({
    content: () => componentRef.current,
  });


  const getVoucerData = async (invoice_no) => {
    try {
      const response = await axios.get(
        `${type === 'payment' ? GET_PAYMENT_VOUCHER_BY_INVOICE_NO : GET_RECEIPT_VOUCHER_ID_NAME_BY}${invoice_no}`,
        {
          headers: {
            Authorization: `${localStorage.getItem('jwt_access_token')}`,
          },
        }
      );
      return response?.data || {};
    } catch (er) {
      throw er;
    }
  };

  useImperativeHandle(ref, () => ({
    doPrint(n) {
      getVoucerData(n.invoice_no)
        .then((res) => {
          unstable_batchedUpdates(() => {
            setDataItems(res?.items || []);
            setData(
              {
                ...res,
                date: type === 'payment' ? res.payment_date : res.receipt_date,
              } || {}
            );
            const totalDbAmnt = getTotalAmount(
              res?.items || [],
              'debit_amount'
            );
            setTotalDbAmount(totalDbAmnt.toFixed(2));
            const totalCDAmnt = getTotalAmount(
              res?.items || [],
              'credit_amount'
            );
            setTotalCDAmount(totalCDAmnt.toFixed(2));
            setAmountInWord(
              toWords
                .convert(
                  type === 'payment' ? Number(totalCDAmnt) : Number(totalDbAmnt)
                )
                .toUpperCase()
                .concat(' TK ONLY')
            );
          });
          printAction();
          unstable_batchedUpdates(() => {
            setData({});
            setDataItems([]);
            setTotalCDAmount('0.00');
            setTotalDbAmount('0.00');
            setAmountInWord('ZERO TK ONLY');
          });
        })
        .catch(() => {
          unstable_batchedUpdates(() => {
            setData({});
            setDataItems([]);
            setTotalCDAmount('0.00');
            setTotalDbAmount('0.00');
            setAmountInWord('ZERO TK ONLY');
          });
        });
    },
  }));

  return (
    <div
      ref={componentRef}
      className={`${classes.printableContainer} hidden print:block`}>
      <div
        className='companyLogo'
        style={{ height: !generalData?.logo && 'fit-content' }}>
        <img
          style={{ width: generalData?.logo && 'auto' }}
          src={BASE_URL ? `${BASE_URL}${generalData?.logo}` : null}
        />
      </div>
      <div className='companyName'>
        <h1>{generalData.site_name}</h1>
      </div>
      <div className='address'>
        <LocationOnIcon fontSize='small' />
        <span>{generalData.address}</span>
      </div>
      <div className='moEmailWeb'>
        <div>
          <PhoneEnabledIcon fontSize='small' />
          <span>{generalData.phone}</span>
        </div>
        <div>
          <EmailIcon fontSize='small' />
          <span>{generalData.email}</span>
        </div>
        <div>
          <LanguageIcon fontSize='small' />
          <span>{generalData.site_address}</span>
        </div>
      </div>
      <div className='title'>
        <h3>
          <u>{title}</u>
        </h3>
      </div>
      <div className='voucerAndDate'>
        <h4>VOUCER NO: {data.invoice_no}</h4>
        <h4>
          DATE:{' '}
          {data.date ? moment(new Date(data.date)).format('DD/MM/YYYY') : ''}
        </h4>
      </div>
      <table>
        <thead>
          <tr>
            <th className='left' style={{ fontWeight: 600 }}>
              Accounts Head
            </th>
            <th className='right'>Debit (in BDT)</th>
            <th className='right'>Credit (in BDT)</th>
          </tr>
        </thead>
        <tbody>
          {dataItems.map((itm) => (
            <tr key={itm.ledger.name}>
              <td className='left'>{itm.ledger.name}</td>
              <td className='right'>{itm.debit_amount}</td>
              <td className='right'>{itm.credit_amount}</td>
            </tr>
          ))}
          <tr>
            <td className='left' style={{ textAlign: 'center' }}>
              Total
            </td>
            <td className='right font-semibold'>{totalDbAmount}</td>
            <td className='right font-semibold'>{totalCDAmount}</td>
          </tr>
          <tr>
            <td className='left' colSpan='3' style={{ fontWeight: 600 }}>
              Amount in word (in BDT): {amountInWord}
            </td>
          </tr>
          <tr>
            <td className='left' colSpan='3' style={{ fontWeight: 600 }}>
              Narration: {data.details}
            </td>
          </tr>
        </tbody>
      </table>
      <div className='allSignatureContainer'>
        <div className='signatureContainer'>
          <div></div>
          <h5>Received By</h5>
        </div>
        <div className='signatureContainer'>
          <div></div>
          <h5>Accountant</h5>
        </div>
        <div className='signatureContainer'>
          <div></div>
          <h5>Checked By</h5>
        </div>
        <div className='signatureContainer'>
          <div></div>
          <h5>Managing Director</h5>
        </div>
      </div>
    </div>
  );
});

export default memo(PrintVoucher);
