import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layout';
import { Home } from '../pages/Home';
import { PrivacyPolicy } from '../pages/PrivacyPolicy';
import { TermsConditions } from '../pages/TermsConditions';
import { CookiePolicy } from '../pages/CookiePolicy';

import { Routes } from './Routes';

export const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: Routes.HOME,
          element: <Home />
        },
        {
          path: Routes.PRIVACY_POLICY,
          element: <PrivacyPolicy />
        },
        {
          path: Routes.TERMS_CONDITIONS,
          element: <TermsConditions />
        },
        {
          path: Routes.COOKIE_POLICY,
          element: <CookiePolicy />
        }
      ]
    }
  ],
  { basename: '/web3-wallet-connect' }
);
