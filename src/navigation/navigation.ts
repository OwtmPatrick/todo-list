import type { Route } from '../types';
import { Routes } from './Routes';

export const navigation: Route[] = [
  { title: 'Privacy Policy', href: Routes.PRIVACY_POLICY },
  { title: 'Terms & Conditions', href: Routes.TERMS_CONDITIONS },
  { title: 'Cookie Policy', href: Routes.COOKIE_POLICY }
];
