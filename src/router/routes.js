// import React from 'react'

import Login from 'pages/auth/Login';
import Index from 'pages/Index';
import App from '../App.js';
import Config from 'pages/config';
import NotMatch from 'pages/404';

import AboutUs from 'pages/config/AboutUs';
import AccountManager from 'pages/config/AccountManager';
import ClearCache from 'pages/config/ClearCache';
import Update from 'pages/config/Update';
import ContactUs from 'pages/config/ContactUs';

const configs = [
  {
    path: '/',
    component: App
  },
  {
    path: '/home',
    component: Index
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/config',
    component: Config
  },
  {
    path: '/accountManager',
    component: AccountManager
  },
  {
    path: '/aboutUs',
    component: AboutUs
  },
  {
    path: '/clearCache',
    component: ClearCache
  },
  {
    path: '/update',
    component: Update
  },
  {
    path: '/contactUs',
    component: ContactUs
  },
  {
    component: NotMatch
  }
];

// const Routes = () => {
//   return configs.map(x => <Route path={x.path} component={x.component} />)
// }

export default configs;
