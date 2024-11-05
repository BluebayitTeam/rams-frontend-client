import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateColumnMutation } from '../ColumnsApi';
import { UpdatedSuccessfully } from 'src/app/@customHooks/notificationAlert';

/**
 * The column header.
 */
function ColumnHeader() {
  const routeParams = useParams();
  const { columnId } = routeParams;

  console.log('columnId', columnId);

  const [saveColumn] = useUpdateColumnMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();

  function handleUpdateColumn() {
    const filteredData = Object.values(getValues()?.columns).map((item) => {
      return {
        serial: item.isChecked ? item.serial.toString() : null,
        isChecked: item.isChecked,
        id: item.key,
      };
    });

    saveColumn({ columns: filteredData, type: columnId }).then((data) => {
      if (columnId === 'Clients') {
        navigate(`/apps/client/clients`);
      }
      if (columnId === 'sub_agent') {
        navigate(`/apps/subAgent/subAgents`);
      }

      if (columnId === 'agent') {
        navigate(`/apps/agent/agents`);
      }

      if (columnId === 'employee') {
        navigate(`/apps/employee/employees`);
      }

      if (columnId === 'Departments') {
        navigate(`/apps/department/departments`);
      }

      if (columnId === 'recruiting') {
        navigate(`/apps/passenger/passengers/recruiting`);
      }

      if (columnId === 'processing') {
        navigate(`/apps/passenger/passengers/processing`);
      }

      if (columnId === 'female') {
        navigate(`/apps/passenger/passengers/female`);
      }

      if (columnId === 'hajj') {
        navigate(`/apps/passenger/passengers/hajj`);
      }

      if (columnId === 'umrah') {
        navigate(`/apps/passenger/passengers/umrah`);
      }

      if (columnId === 'travel') {
        navigate(`/apps/passenger/passengers/travel`);
      }

      if (columnId === 'student') {
        navigate(`/apps/passenger/passengers/student`);
      }

      if (columnId === 'demand') {
        navigate(`/apps/demand/demands`);
      }

      if (columnId === 'visa_entry') {
        navigate(`/apps/visaEntry/visaEntrys`);
      }

      if (columnId === 'calling_entry') {
        navigate(`/apps/callingEntry/callingEntrys`);
      }

      if (columnId === 'evisa_entry') {
        navigate(`/apps/eVisaEntry/eVisaEntrys`);
      }

      if (columnId === 'complain') {
        navigate(`/apps/complain/complains`);
      }

      if (columnId === 'female_cv') {
        navigate(`/apps/cvFemale/cvFemales`);
      }

      if (columnId === 'male_cv') {
        navigate(`/apps/cvMale/cvMales`);
      }

      if (columnId === 'cv_bank') {
        navigate(`/apps/cvBank/cvBanks`);
      }
      if (columnId === 'ticket_sales') {
        navigate(`/apps/ticketSale/ticketSales`);
      }
      UpdatedSuccessfully();
    });
  }

  function handleCancel() {
    if (columnId === 'Clients') {
      navigate(`/apps/client/clients`);
    }
    if (columnId === 'sub_agent') {
      navigate(`/apps/subAgent/subAgents`);
    }

    if (columnId === 'agent') {
      navigate(`/apps/agent/agents`);
    }

    if (columnId === 'employee') {
      navigate(`/apps/employee/employees`);
    }

    if (columnId === 'Departments') {
      navigate(`/apps/department/departments`);
    }

    if (columnId === 'recruiting') {
      navigate(`/apps/passenger/passengers/recruiting`);
    }

    if (columnId === 'processing') {
      navigate(`/apps/passenger/passengers/processing`);
    }

    if (columnId === 'female') {
      navigate(`/apps/passenger/passengers/female`);
    }

    if (columnId === 'hajj') {
      navigate(`/apps/passenger/passengers/hajj`);
    }

    if (columnId === 'umrah') {
      navigate(`/apps/passenger/passengers/umrah`);
    }

    if (columnId === 'travel') {
      navigate(`/apps/passenger/passengers/travel`);
    }

    if (columnId === 'student') {
      navigate(`/apps/passenger/passengers/student`);
    }

    if (columnId === 'demand') {
      navigate(`/apps/demand/demands`);
    }

    if (columnId === 'visa_entry') {
      navigate(`/apps/visaEntry/visaEntrys`);
    }

    if (columnId === 'calling_entry') {
      navigate(`/apps/callingEntry/callingEntrys`);
    }

    if (columnId === 'evisa_entry') {
      navigate(`/apps/eVisaEntry/eVisaEntrys`);
    }

    if (columnId === 'complain') {
      navigate(`/apps/complain/complains`);
    }

    if (columnId === 'female_cv') {
      navigate(`/apps/cvFemale/cvFemales`);
    }

    if (columnId === 'male_cv') {
      navigate(`/apps/cvMale/cvMales`);
    }

    if (columnId === 'cv_bank') {
      navigate(`/apps/cvBank/cvBanks`);
    }
    if (columnId === 'ticket_sales') {
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
              {columnId.replace(/_/g, ' ')} Table Column Serial
            </Typography>
            <Typography variant='caption' className='font-medium'>
              Column Detail for {columnId} Table
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
          onClick={handleUpdateColumn}>
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

export default ColumnHeader;
