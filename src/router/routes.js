// import React from 'react'

import Login from 'pages/auth/Login';
import ValidateLogin from 'pages/auth/ValidateLogin';
import Index from 'pages/Index';
import App from '../App.js';
import Config from 'pages/config';
import NotMatch from 'pages/404';

import AboutUs from 'pages/config/AboutUs';
import AccountManager from 'pages/config/AccountManager';
import ClearCache from 'pages/config/ClearCache';
import Update from 'pages/config/Update';
import ContactUs from 'pages/config/ContactUs';
import Reset from 'pages/auth/Reset.js';
import Registe from 'pages/auth/Registe.js';
import Messages from 'pages/Messages';
import Shop from 'pages/shop';
import Edit from 'pages/edit';
// import edit from '../pages/edit.js';
// import Home from 'pages/home';

const configs = [
  {
    path: '/',
    component: App,
    exact: true,
    requiresAuth: true
  },
  {
    path: '/shop',
    component: Shop,
    requiresAuth: true
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
    path: '/validateLogin',
    component: ValidateLogin,
    requiresAuth: false
  },
  {
    path: '/reset',
    component: Reset,
    requiresAuth: false
  },
  {
    path: '/Registe',
    component: Registe,
    requiresAuth: false
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
    path: '/messages',
    component: Messages
  },
  // {
  //   path: 'member',
  //   component: Member
  // },
  {
    path: '/edit',
    component: Edit
  },
  {
    component: NotMatch
  }
];

export default configs;
