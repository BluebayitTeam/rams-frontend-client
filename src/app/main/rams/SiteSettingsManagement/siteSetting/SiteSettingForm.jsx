import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import CustomTextField from 'src/app/@components/CustomTextField';
import FileUpload from 'src/app/@components/FileUploader';
import { BASE_URL } from 'src/app/constant/constants';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import CustomPhoneWithCountryCode from 'src/app/@components/CustomPhoneWithCountryCode';

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: 'none',
  },
  productImageUpload: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
}));

function SiteSettingForm(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState, watch, setValue } = methods;
  const classes = useStyles(props);
  const { errors } = formState;
  const [logo, setLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const getCountryCode1 = watch('country_code1');

  useEffect(() => {
    const logo = watch('logo');

    if (logo && !logo.name) {
      setLogo(`${BASE_URL}/${logo}`);
    }

    const favicon = watch('favicon');

    if (favicon && !favicon.name) {
      setFavicon(`${BASE_URL}/${favicon}`);
    }
  }, [watch('logo'), watch('favicon')]);
  return (
    <div>
      <CustomTextField name='title' label='Title' required />
      <CustomTextField name='site_name' label='Site Name' required />
      <CustomTextField name='site_address' label='Site Address' required />
      <CustomTextField name='owner_name' label='Owner Name' />{' '}
      <CustomTextField name='phone' label='Phone Number' />
      <CustomTextField name='agency_name_bangla' label='Agency Name Bangla' />
      <CustomTextField name='agency_name_arabic' label='Agency Name Arabic' />
      <CustomTextField name='rl_no' label='RL No' />
      <CustomTextField name='rl_no_arabic' label='RL No Arabic' />
      <CustomTextField name='email' label='Email' />
      <CustomTextField name='address' label='Address' />
      <CustomTextField name='facebook_url' label='Facebook URL' />
      <CustomTextField name='twitter_url' label='Twitter URL' />
      <CustomTextField name='instagram_url' label='Instagram URL' />
      <div className='text-center'>
        <div>
          <FileUpload
            name='logo'
            label='Logo'
            control={control}
            setValue={setValue}
            setFile={setLogo}
            file={logo}
            BASE_URL={BASE_URL}
            classes={classes}
          />
        </div>
      </div>
      <div className='text-center'>
        <div>
          <FileUpload
            name='favicon'
            label='Favicon'
            control={control}
            setValue={setValue}
            setFile={setFavicon}
            file={favicon}
            BASE_URL={BASE_URL}
            classes={classes}
          />
        </div>
      </div>
    </div>
  );
}

export default SiteSettingForm;
