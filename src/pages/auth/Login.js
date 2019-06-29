import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppHead from 'components/AppHead';

import CyInput from 'components/CyInput';
import CyPassword from 'components/CyPassword';
import CyButton from 'components/CyButton';

import useValidate from '@/utils/hooks/formValidateHooks';

export default () => {
  const initialState = {
    username: '',
    password: ''
  };

  const validations = [
    {
      name: 'username',
      alias: '用户名',
      type: 'string',
      rules: {
        required: true,
        minLength: 6,
        type: 'mobile'
      }
    },
    {
      name: 'password',
      alias: '密码',
      type: 'string',
      rules: {
        required: true,
        minLength: 6,
        type: 'password'
      },
      errMsg: '密码必须为'
    }
    // {
    //   name: '用户名',
    //   type: 'required',
    //   stateMap: 'username'
    // },
    // {
    //   name: '密码',
    //   type: 'required',
    //   stateMap: 'password'
    // }
  ];

  // let [formData, setFormData] = useState(initialState);

  let [formData, validation, valid] = useValidate(initialState, validations);

  const handleClick = e => {
    e.preventDefault();
    console.warn('submit', formData, validation, valid);
    // alert('cc');
  };

  // useEffect(() => {
  //   // console.log(validation, formData, valid);
  //   return () => {};
  // }, [_formData, valid, validation]);

  // const handleChange = e => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  return (
    <div className="container">
      <AppHead subTitle="验证码登录" link="/validateLogin" />
      <h1 className="cy-form-name">密码登录</h1>
      <form>
        <CyInput
          name="username"
          type="tel"
          value={formData.username.value}
          placeholder="请输入手机号"
          maxLength="11"
          className={validation.errors.username.length ? 'error' : ''}
          {...formData.username.input}
          // onChange={handleChange}
        />
        <CyPassword
          name="password"
          value={formData.password.value}
          placeholder="请输入密码"
          maxLength="20"
          className={validation.errors.username.length ? 'error' : ''}
          {...formData.password.input}
          // onChange={handleChange}
        />

        <CyButton type="primary" size="large" onClick={handleClick}>
          登录
        </CyButton>
      </form>
      <Link to="/reset" className="tr f12 blk c999">
        忘记密码
      </Link>
      <Link to="/registe" className="center f14 blk c-primary">
        还没账号？快去注册
      </Link>
    </div>
  );
};
