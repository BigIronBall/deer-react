import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppHead from 'components/AppHead';

import CyInput from 'components/CyInput';
import CyPassword from 'components/CyPassword';
import CyButton from 'components/CyButton';

export default () => {
  let _form = {
    username: '',
    password: ''
  };

  let [form, setForm] = useState(_form);

  const handleClick = e => {
    console.warn('e outside', form);
    // alert('cc');
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <AppHead subTitle="验证码登录" link="/validateLogin" />
      <h1 className="cy-form-name">密码登录</h1>
      <form>
        <CyInput
          name="username"
          value={form.username}
          placeholder="请输入账号"
          maxLength="20"
          onChange={handleChange}
        />
        <CyPassword
          name="password"
          value={form.password}
          placeholder="请输入密码"
          maxLength="20"
          onChange={handleChange}
        />

        <CyButton type="primary" size="large" onClick={handleClick}>
          登录
        </CyButton>
      </form>
      <Link to="/reset">忘记密码</Link>
      <Link to="/registe">还没账号？快去注册</Link>
    </div>
  );
};
