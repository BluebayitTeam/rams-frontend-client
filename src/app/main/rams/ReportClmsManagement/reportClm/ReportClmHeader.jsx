import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateReportClmMutation } from '../ReportClmsApi';

/**
 * The reportClm header.
 */
function ReportClmHeader() {
  const routeParams = useParams();
  const { reportClmId } = routeParams;

  console.log('reportClmId', reportClmId);

  const [saveReportClm] = useUpdateReportClmMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();

  function handleUpdateReportClm() {
    const filteredData = Object.values(getValues()?.reportClms).map((item) => {
      return {
        serial: item.isChecked ? item.serial.toString() : null,
        isChecked: item.isChecked,
        id: item.key,
      };
    });

    saveReportClm({ reportClms: filteredData, type: reportClmId }).then(
      (data) => {
        if (reportClmId === 'Clients') {
          navigate(`/apps/client/clients`);
        }

        if (reportClmId === 'agent') {
          navigate(`/apps/agent/agents`);
        }

        if (reportClmId === 'employee') {
          navigate(`/apps/employee/employees`);
        }

        if (reportClmId === 'Departments') {
          navigate(`/apps/department/departments`);
        }

        if (reportClmId === 'recruiting') {
          navigate(`/apps/passenger/passengers/recruiting`);
        }

        if (reportClmId === 'processing') {
          navigate(`/apps/passenger/passengers/processing`);
        }

        if (reportClmId === 'female') {
          navigate(`/apps/passenger/passengers/female`);
        }

        if (reportClmId === 'hajj') {
          navigate(`/apps/passenger/passengers/hajj`);
        }

        if (reportClmId === 'umrah') {
          navigate(`/apps/passenger/passengers/umrah`);
        }

        if (reportClmId === 'travel') {
          navigate(`/apps/passenger/passengers/travel`);
        }

        if (reportClmId === 'student') {
          navigate(`/apps/passenger/passengers/student`);
        }

        if (reportClmId === 'demand') {
          navigate(`/apps/demand/demands`);
        }

        if (reportClmId === 'visa_entry') {
          navigate(`/apps/visaEntry/visaEntrys`);
        }

        if (reportClmId === 'calling_entry') {
          navigate(`/apps/callingEntry/callingEntrys`);
        }

        if (reportClmId === 'evisa_entry') {
          navigate(`/apps/eVisaEntry/eVisaEntrys`);
        }

        if (reportClmId === 'complain') {
          navigate(`/apps/complain/complains`);
        }

        if (reportClmId === 'female_cv') {
          navigate(`/apps/cvFemale/cvFemales`);
        }

        if (reportClmId === 'male_cv') {
          navigate(`/apps/cvMale/cvMales`);
        }

        if (reportClmId === 'cv_bank') {
          navigate(`/apps/cvBank/cvBanks`);
        }
        if (reportClmId === 'ticket_sales') {
          navigate(`/apps/ticketSale/ticketSales`);
        }
      }
    );
  }

  function handleCancel() {
    if (reportClmId === 'Clients') {
      navigate(`/apps/client/clients`);
    }

    if (reportClmId === 'agent') {
      navigate(`/apps/agent/agents`);
    }

    if (reportClmId === 'employee') {
      navigate(`/apps/employee/employees`);
    }

    if (reportClmId === 'Departments') {
      navigate(`/apps/department/departments`);
    }

    if (reportClmId === 'recruiting') {
      navigate(`/apps/passenger/passengers/recruiting`);
    }

    if (reportClmId === 'processing') {
      navigate(`/apps/passenger/passengers/processing`);
    }

    if (reportClmId === 'female') {
      navigate(`/apps/passenger/passengers/female`);
    }

    if (reportClmId === 'hajj') {
      navigate(`/apps/passenger/passengers/hajj`);
    }

    if (reportClmId === 'umrah') {
      navigate(`/apps/passenger/passengers/umrah`);
    }

    if (reportClmId === 'travel') {
      navigate(`/apps/passenger/passengers/travel`);
    }

    if (reportClmId === 'student') {
      navigate(`/apps/passenger/passengers/student`);
    }

    if (reportClmId === 'demand') {
      navigate(`/apps/demand/demands`);
    }

    if (reportClmId === 'visa_entry') {
      navigate(`/apps/visaEntry/visaEntrys`);
    }

    if (reportClmId === 'calling_entry') {
      navigate(`/apps/callingEntry/callingEntrys`);
    }

    if (reportClmId === 'evisa_entry') {
      navigate(`/apps/eVisaEntry/eVisaEntrys`);
    }

    if (reportClmId === 'complain') {
      navigate(`/apps/complain/complains`);
    }

    if (reportClmId === 'female_cv') {
      navigate(`/apps/cvFemale/cvFemales`);
    }

    if (reportClmId === 'male_cv') {
      navigate(`/apps/cvMale/cvMales`);
    }

    if (reportClmId === 'cv_bank') {
      navigate(`/apps/cvBank/cvBanks`);
    }
    if (reportClmId === 'ticket_sales') {
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
              {reportClmId.replace(/_/g, ' ')} Table ReportClm Serial
            </Typography>
            <Typography variant='caption' className='font-medium'>
              ReportClm Detail for {reportClmId} Table
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
          onClick={handleUpdateReportClm}>
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

export default ReportClmHeader;
