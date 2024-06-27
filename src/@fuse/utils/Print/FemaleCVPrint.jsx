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
  GET_FEMALECV_BY_ID_FOR_PRINT,
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
	textField: {
		'& > div': {
			height: '35px'
		}
	},
	container: {
		padding: '0px 25px',
		minWidth: '1000px',
		'& *': {
			boxSizing: 'border-box'
		},
		'& .row': {
			marginRight: '-15px',
			marginLeft: '-15px'
		},
		'& .western': {
			marginBottom: '5px'
		},
		'& .borderedTable': {
			'& table, th, td': {
				border: '1px solid white'
			},
			'& table': {
				color: 'black',
				background: 'transparent',
				borderSpacing: 0,
				borderCollapse: 'collapse',
				'& td, th': {
					padding: '0px'
				}
			}
		}
	}
}));
const FemaleCVPrint = forwardRef(({  }, ref) => {
  const classes = useStyles();
  const toWords = new ToWords();

  const [generalData, setGeneralData] = useState({});
  const [data, setData] = useState({});

  console.log("dasdadsadta", data)

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


  const getCvData = async (id) => {
    try {
      const response = await axios.get(
        `${GET_FEMALECV_BY_ID_FOR_PRINT}${id}`,
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
      getCvData(n.id)
        .then((res) => {
          unstable_batchedUpdates(() => {
            setData(
              res ||{} 
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
	  
  	<>

		</>
  );
});

export default memo(FemaleCVPrint);
