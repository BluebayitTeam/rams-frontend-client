import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdatePassengerSummaryUpdateClmMutation } from '../PassengerSummaryUpdateClmsApi';
import {
  Updated,
  UpdatedSuccessfully,
} from 'src/app/@customHooks/notificationAlert';
import { useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';

/**
 * The passengerSummaryUpdateClm header.
 */
function PassengerSummaryUpdateClmHeader() {
  const routeParams = useParams();
  const { passengerSummaryUpdateClmId } = routeParams;

  console.log('passengerSummaryUpdateClmId', passengerSummaryUpdateClmId);

  const [savePassengerSummaryUpdateClm] = useUpdatePassengerSummaryUpdateClmMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();
  const [loading, setLoading] = useState(false);

  function handleUpdatePassengerSummaryUpdateClm() {
    const filteredData = Object.values(getValues()?.passengerSummaryUpdateClms).map((item) => {
      return {
        serial: item.isChecked ? item.serial?.toString() : null,
        isChecked: item.isChecked,
        column_name: item.column_name,
        id: item.key,
      };
    });

    savePassengerSummaryUpdateClm({ passengerSummaryUpdateClms: filteredData, type: passengerSummaryUpdateClmId }).then(
      (data) => {
        if (passengerSummaryUpdateClmId === 'passenger') {
          navigate(`/apps/passengerReport/passengerReports`);
        }

        if (passengerSummaryUpdateClmId === 'medical') {
          navigate(`/apps/medicalReport/medicalReports`);
        }

        if (passengerSummaryUpdateClmId === 'embassy') {
          navigate(`/apps/embassyReport/embassyReports`);
        }

        if (passengerSummaryUpdateClmId === 'training') {
          navigate(`/apps/trainingReport/trainingReports`);
        }

        if (passengerSummaryUpdateClmId === 'flight') {
          navigate(`/apps/flightReport/flightReports`);
        }

        if (passengerSummaryUpdateClmId === 'mofa') {
          navigate(`/apps/mofaReport/mofaReports`);
        }

        if (passengerSummaryUpdateClmId === 'manpower') {
          navigate(`/apps/manPowerReport/manPowerReports`);
        }

        if (passengerSummaryUpdateClmId === 'passenger_summary') {
          navigate(`/apps/passengerSumaryReport/passengerSumaryReports`);
        }

        if (passengerSummaryUpdateClmId === 'umrah') {
          navigate(`/apps/passenger/passengers/umrah`);
        }

        if (passengerSummaryUpdateClmId === 'travel') {
          navigate(`/apps/passenger/passengers/travel`);
        }

        if (passengerSummaryUpdateClmId === 'student') {
          navigate(`/apps/passenger/passengers/student`);
        }

        if (passengerSummaryUpdateClmId === 'demand') {
          navigate(`/apps/demand/demands`);
        }

        if (passengerSummaryUpdateClmId === 'visa_entry') {
          navigate(`/apps/visaEntry/visaEntrys`);
        }

        if (passengerSummaryUpdateClmId === 'calling_entry') {
          navigate(`/apps/callingEntry/callingEntrys`);
        }

        if (passengerSummaryUpdateClmId === 'evisa_entry') {
          navigate(`/apps/eVisaEntry/eVisaEntrys`);
        }

        if (passengerSummaryUpdateClmId === 'complain') {
          navigate(`/apps/complain/complains`);
        }

        if (passengerSummaryUpdateClmId === 'female_cv') {
          navigate(`/apps/cvFemale/cvFemales`);
        }

        if (passengerSummaryUpdateClmId === 'male_cv') {
          navigate(`/apps/cvMale/cvMales`);
        }

        if (passengerSummaryUpdateClmId === 'cv_bank') {
          navigate(`/apps/cvBank/cvBanks`);
        }
        if (passengerSummaryUpdateClmId === 'ticket_sales') {
          navigate(`/apps/ticketSale/ticketSales`);
        }
        setLoading(false); // Set loading to false after update completes

        UpdatedSuccessfully();
      }
    );
  }

  function handleCancel() {
    if (passengerSummaryUpdateClmId === 'passenger') {
      navigate(`/apps/passengerReport/passengerReports`);
    }

    if (passengerSummaryUpdateClmId === 'medical') {
      navigate(`/apps/medicalReport/medicalReports`);
    }

    if (passengerSummaryUpdateClmId === 'embassy') {
      navigate(`/apps/embassyReport/embassyReports`);
    }
    if (passengerSummaryUpdateClmId === 'mofa') {
      navigate(`/apps/mofaReport/mofaReports`);
    }

    if (passengerSummaryUpdateClmId === 'training') {
      navigate(`/apps/trainingReport/trainingReports`);
    }
    if (passengerSummaryUpdateClmId === 'manpower') {
      navigate(`/apps/manPowerReport/manPowerReports`);
    }

    if (passengerSummaryUpdateClmId === 'flight') {
      navigate(`/apps/flightReport/flightReports`);
    }
    if (passengerSummaryUpdateClmId === 'passenger_summary') {
      navigate(`/apps/passengerSumaryReport/passengerSumaryReports`);
    }

    if (passengerSummaryUpdateClmId === 'umrah') {
      navigate(`/apps/passenger/passengers/umrah`);
    }

    if (passengerSummaryUpdateClmId === 'travel') {
      navigate(`/apps/passenger/passengers/travel`);
    }

    if (passengerSummaryUpdateClmId === 'student') {
      navigate(`/apps/passenger/passengers/student`);
    }

    if (passengerSummaryUpdateClmId === 'demand') {
      navigate(`/apps/demand/demands`);
    }

    if (passengerSummaryUpdateClmId === 'visa_entry') {
      navigate(`/apps/visaEntry/visaEntrys`);
    }

    if (passengerSummaryUpdateClmId === 'calling_entry') {
      navigate(`/apps/callingEntry/callingEntrys`);
    }

    if (passengerSummaryUpdateClmId === 'evisa_entry') {
      navigate(`/apps/eVisaEntry/eVisaEntrys`);
    }

    if (passengerSummaryUpdateClmId === 'complain') {
      navigate(`/apps/complain/complains`);
    }

    if (passengerSummaryUpdateClmId === 'female_cv') {
      navigate(`/apps/cvFemale/cvFemales`);
    }

    if (passengerSummaryUpdateClmId === 'male_cv') {
      navigate(`/apps/cvMale/cvMales`);
    }

    if (passengerSummaryUpdateClmId === 'cv_bank') {
      navigate(`/apps/cvBank/cvBanks`);
    }
    if (passengerSummaryUpdateClmId === 'ticket_sales') {
      navigate(`/apps/ticketSale/ticketSales`);
    }
  }

  return (
    <div className='flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32'>
      <div className='flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0'>
        <div className='flex items-center max-w-full'>
          <motion.div
            className='flex flex-col min-w-0 mx-8 sm:mx-16'
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}>
            <Typography className='text-16 sm:text-20 truncate font-semibold capitalize '>
              {passengerSummaryUpdateClmId.replace(/_/g, ' ')} Table PassengerSummaryUpdateClm Serial
            </Typography>
            <Typography variant='caption' className='font-medium'>
              PassengerSummaryUpdateClm Detail for {passengerSummaryUpdateClmId} Table
            </Typography>
          </motion.div>
        </div>
      </div>

      <motion.div
        className='flex'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}>
        <Button
          className='whitespace-nowrap mx-4 text-white bg-[#4dc08e]-500 hover:bg-[#4dc08e]-800 active:bg-[#4dc08e]-700 focus:outline-none focus:ring focus:ring-[#4dc08e]-300'
          color='secondary'
          variant='contained'
          onClick={handleUpdatePassengerSummaryUpdateClm}>
          Update
        </Button>

        <Button
          className='whitespace-nowrap mx-4 text-white bg-orange-500 hover:bg-orange-800 active:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-300'
          variant='contained'
          onClick={handleCancel}>
          Cancel
        </Button>
      </motion.div>
    </div>
  );
}

export default PassengerSummaryUpdateClmHeader;
