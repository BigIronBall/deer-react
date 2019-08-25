import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppHead from 'components/AppHead';
import CyInput from 'components/CYInput';
import CyPassword from 'components/CyPassword';
import CYButton from 'components/CYButton';
import useValidate from '@/utils/hooks/useFormValidate';
import { LOGIN } from '@/utils/api';
import useFetch from '@/utils/hooks/useLoadingFetch';
import toast from 'components/CyToast';

const Login = ({ history }) => {
  const [loading, fetchLogin] = useFetch();

  const initialState = {
    username: '',
    password: ''
  };

  const validations = [
    {
      name: 'username',
      alias: '用户名',
      type: 'mobile',
      rules: {
        required: true,
        minLength: 6
      }
    },
    {
      name: 'password',
      alias: '密码',
      type: 'password',
      rules: {
        required: true,
        minLength: 6
      },
      errMsg: '密码必须为'
    }
  ];

  let [formData, validation, validate, flatErrors, values] = useValidate(
    initialState,
    validations
  );

  const handleClick = async e => {
    e.preventDefault();
    const validResult = validate();
    if (!validResult) {
      const errors = flatErrors();
      if (errors.length) {
        // alert(errors[0]);
        toast(errors[0]);
        return;
      }
    }

    const [err, result] = await fetchLogin(LOGIN, values, 'POST');

    if (err) {
      debugger;
      return;
    }

    if (result && result.token) {
      localStorage.setItem('token', result.token);
      toast('登录成功');
      // console.info('http request result', result);
      if (!result.shop) {
        history.replace('/shop');
      } else {
        history.push('/');
      }
    } else toast(result.msg);
  };

  return (
    <div className="container">
      <AppHead rightText="验证码登录" link="/validateLogin" />
      <h1 className="cy-form-name">密码登录</h1>
      <form>
        <CyInput
          name="username"
          type="tel"
          // value={formData.username.value}
          placeholder="请输入手机号"
          maxLength="11"
          className={validation.errors.username.length ? 'error' : ''}
          {...formData.username.input}
        />
        <CyPassword
          name="password"
          // value={formData.password.value}
          placeholder="请输入密码"
          maxLength="20"
          className={validation.errors.password.length ? 'error' : ''}
          {...formData.password.input}
        />

        <CYButton
          type="primary"
          size="large"
          disabled={!validation.valid}
          onClick={handleClick}
          loading={loading}
          loadingText="正在登陆"
        >
          登录
        </CYButton>
      </form>
      <Link to="/reset" className="tr f12 blk c999">
        忘记密码
      </Link>
      <Link to="/registe" className="center f14 blk cy-primary">
        还没账号？快去注册
      </Link>
    </div>
  );
};

export default withRouter(Login);
