import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateMakeListColumnMutation } from '../MakeListColumnApi';

/**
 * The makeListColumn header.
 */
function MakeListColumnHeader() {
  const routeParams = useParams();
  const { makeListColumnId } = routeParams;

  console.log('makeListColumnId', makeListColumnId);

  const [saveMakeListColumn] = useUpdateMakeListColumnMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();

  function handleUpdateMakeListColumn() {
    const filteredData = Object.values(getValues()?.makeListColumns).map(
      (item) => {
        return {
          serial: item.isChecked ? item.serial.toString() : null,
          isChecked: item.isChecked,
          id: item.key,
        };
      }
    );

    saveMakeListColumn({
      makeListColumns: filteredData,
      type: makeListColumnId,
    }).then((data) => {
      if (makeListColumnId === 'Clients') {
        navigate(`/apps/client/clients`);
      }

      if (makeListColumnId === 'agent') {
        navigate(`/apps/agent/agents`);
      }

      if (makeListColumnId === 'employee') {
        navigate(`/apps/employee/employees`);
      }

      if (makeListColumnId === 'Departments') {
        navigate(`/apps/department/departments`);
      }

      if (makeListColumnId === 'recruiting') {
        navigate(`/apps/passenger/passengers/recruiting`);
      }

      if (makeListColumnId === 'processing') {
        navigate(`/apps/passenger/passengers/processing`);
      }

      if (makeListColumnId === 'female') {
        navigate(`/apps/passenger/passengers/female`);
      }

      if (makeListColumnId === 'hajj') {
        navigate(`/apps/passenger/passengers/hajj`);
      }

      if (makeListColumnId === 'umrah') {
        navigate(`/apps/passenger/passengers/umrah`);
      }

      if (makeListColumnId === 'travel') {
        navigate(`/apps/passenger/passengers/travel`);
      }

      if (makeListColumnId === 'student') {
        navigate(`/apps/passenger/passengers/student`);
      }

      if (makeListColumnId === 'demand') {
        navigate(`/apps/demand/demands`);
      }

      if (makeListColumnId === 'visa_entry') {
        navigate(`/apps/visaEntry/visaEntrys`);
      }

      if (makeListColumnId === 'calling_entry') {
        navigate(`/apps/callingEntry/callingEntrys`);
      }

      if (makeListColumnId === 'evisa_entry') {
        navigate(`/apps/eVisaEntry/eVisaEntrys`);
      }

      if (makeListColumnId === 'complain') {
        navigate(`/apps/complain/complains`);
      }

      if (makeListColumnId === 'female_cv') {
        navigate(`/apps/cvFemale/cvFemales`);
      }

      if (makeListColumnId === 'male_cv') {
        navigate(`/apps/cvMale/cvMales`);
      }

      if (makeListColumnId === 'cv_bank') {
        navigate(`/apps/cvBank/cvBanks`);
      }
    });
  }

  function handleCancel() {
    if (makeListColumnId === 'Clients') {
      navigate(`/apps/client/clients`);
    }

    if (makeListColumnId === 'agent') {
      navigate(`/apps/agent/agents`);
    }

    if (makeListColumnId === 'employee') {
      navigate(`/apps/employee/employees`);
    }

    if (makeListColumnId === 'Departments') {
      navigate(`/apps/department/departments`);
    }

    if (makeListColumnId === 'recruiting') {
      navigate(`/apps/passenger/passengers/recruiting`);
    }

    if (makeListColumnId === 'processing') {
      navigate(`/apps/passenger/passengers/processing`);
    }

    if (makeListColumnId === 'female') {
      navigate(`/apps/passenger/passengers/female`);
    }

    if (makeListColumnId === 'hajj') {
      navigate(`/apps/passenger/passengers/hajj`);
    }

    if (makeListColumnId === 'umrah') {
      navigate(`/apps/passenger/passengers/umrah`);
    }

    if (makeListColumnId === 'travel') {
      navigate(`/apps/passenger/passengers/travel`);
    }

    if (makeListColumnId === 'student') {
      navigate(`/apps/passenger/passengers/student`);
    }

    if (makeListColumnId === 'demand') {
      navigate(`/apps/demand/demands`);
    }

    if (makeListColumnId === 'visa_entry') {
      navigate(`/apps/visaEntry/visaEntrys`);
    }

    if (makeListColumnId === 'calling_entry') {
      navigate(`/apps/callingEntry/callingEntrys`);
    }

    if (makeListColumnId === 'evisa_entry') {
      navigate(`/apps/eVisaEntry/eVisaEntrys`);
    }

    if (makeListColumnId === 'complain') {
      navigate(`/apps/complain/complains`);
    }

    if (makeListColumnId === 'female_cv') {
      navigate(`/apps/cvFemale/cvFemales`);
    }

    if (makeListColumnId === 'male_cv') {
      navigate(`/apps/cvMale/cvMales`);
    }

    if (makeListColumnId === 'cv_bank') {
      navigate(`/apps/cvBank/cvBanks`);
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
            <Typography variant='caption' className='font-medium'>
              MakeAListClms{' '}
            </Typography>
            <Typography variant='caption' className='font-medium'>
              Test{' '}
            </Typography>
            <Typography variant='caption' className='font-medium'>
              MakeListColumn Detail
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
          onClick={handleUpdateMakeListColumn}>
          Save
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

export default MakeListColumnHeader;
