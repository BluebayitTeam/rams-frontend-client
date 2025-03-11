import { Helmet } from 'react-helmet-async';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { selectCurrentLanguageDirection } from 'app/store/i18nSlice';
import themeLayouts from 'app/theme-layouts/themeLayouts';
import { selectMainTheme } from '@fuse/core/FuseSettings/store/fuseSettingsSlice';
import MockAdapterProvider from '@mock-api/MockAdapterProvider';
import withAppProviders from './withAppProviders';
import { AuthRouteProvider } from './auth/AuthRouteProvider';
import { useEffect, useState } from 'react';
import { BASE_URL, GET_SITESETTINGS } from './constant/constants';

const emotionCacheOptions = {
  rtl: {
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
    insertionPoint: document.getElementById('emotion-insertion-point'),
  },
  ltr: {
    key: 'muiltr',
    stylisPlugins: [],
    insertionPoint: document.getElementById('emotion-insertion-point'),
  },
};

function App() {
  const langDirection = useSelector(selectCurrentLanguageDirection);
  const mainTheme = useSelector(selectMainTheme);

  const [generalData, setGeneralData] = useState({});
  const [data, setData] = useState({});
  console.log('FaviconURL', `${BASE_URL}${generalData?.favicon}`);

  // Get general setting data
  // useEffect(() => {
  //   fetch(`${GET_SITESETTINGS}`)
  //     .then((response) => response.json())
  //     .then((data) => setGeneralData(data.general_settings[0] || {}))
  //     .catch(() => setGeneralData({}));
  // }, []);

  useEffect(() => {
    fetch(`${GET_SITESETTINGS}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('checkData', data); // ✅ Debugging API response
        setGeneralData(data?.general_settings[0] || {});
      })
      .catch((error) => console.error('Error fetching site settings:', error));
  }, []);

  useEffect(() => {
    if (generalData?.favicon) {
      const favicon = document.getElementById('favicon');
      if (favicon) {
        const newFaviconUrl = `${BASE_URL}${generalData.favicon}?v=${new Date().getTime()}`;
        favicon.href = newFaviconUrl;
        console.log('Updated Favicon URL:', newFaviconUrl);
      } else {
        console.error('Favicon element not found in index.html!');
      }
    }
  }, [generalData?.favicon]);

  const faviconUrl = `${BASE_URL}${generalData?.favicon}?v=${new Date().getTime()}`;

  return (
    <MockAdapterProvider>
      <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
        <FuseTheme theme={mainTheme} direction={langDirection}>
          <AuthRouteProvider>
            <Helmet>
              <title>{generalData?.title || 'RAMS'}</title>
              <meta name='description' content='This is my dynamic React app' />
              {generalData?.favicon && (
                <link
                  rel='icon'
                  type='image/png'
                  href={faviconUrl || 'comming soon'}
                />
              )}
            </Helmet>

            <SnackbarProvider
              maxSnack={5}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              classes={{
                containerRoot:
                  'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99',
              }}>
              <FuseLayout layouts={themeLayouts} />
            </SnackbarProvider>
          </AuthRouteProvider>
        </FuseTheme>
      </CacheProvider>
    </MockAdapterProvider>
  );
}

export default withAppProviders(App);
