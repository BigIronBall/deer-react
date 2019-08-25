import React from 'react';
import { withRouter } from 'react-router-dom';
import AppHead from 'components/AppHead';
import CyInput from 'components/CYInput';
import CYButton from 'components/CYButton';
import CyPassword from 'components/CyPassword';
import useValidate from '@/utils/hooks/useFormValidate';
import toast from 'components/CyToast';
import CDButton from 'components/CyCountDownButton';

import 'styles/pages/auth.scss';

const Reset = ({ history }) => {
  const initialState = {
    username: '',
    vcode: '',
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
      name: 'vcode',
      alias: '验证码',
      type: 'vcode',
      rules: {
        required: true,
        minLength: 4
      },
      errMsg: '验证码必须为4位数字'
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

  let [formData, validation, validate, flatErrors] = useValidate(
    initialState,
    validations
  );

  const handleClick = e => {
    e.preventDefault();
    const validResult = validate();
    console.log(validation);
    if (!validResult) {
      const errors = flatErrors();
      if (errors.length) {
        toast(errors[0]);
        return;
      }
    }

    // history.replace('/registe');
  };

  function SendVCodeSms() {
    if (
      !formData.username.input.value.length ||
      validation.errors.username.length > 0
    ) {
      toast('请先填写手机号码');
      return false;
    }
    // 在这里发送短信
    console.log('我已经发送短信了');
  }

  return (
    <div>
      <AppHead showBack={true} />
      <div className="container">
        <h1 className="cy-form-name">重置登录密码</h1>
        <form>
          <CyInput
            name="username"
            type="tel"
            value={formData.username.value}
            placeholder="请输入手机号"
            maxLength="11"
            className={validation.errors.username.length ? 'error' : ''}
            {...formData.username.input}
          />
          <CyInput
            name="vcode"
            value={formData.vcode.value}
            placeholder="请输入验证码"
            maxLength="4"
            type="tel"
            className={validation.errors.vcode.length ? 'error' : ''}
            append={
              <CDButton
                className="cy-btn-countdown f12"
                onClick={SendVCodeSms}
                cdText="已发送"
                doneText="重新获取"
                loadingText="发送中"
                $key="cd_btn_sms_send"
                stopless={60}
              >
                获取验证码
              </CDButton>
            }
            {...formData.vcode.input}
          />

          <CyPassword
            name="password"
            value={formData.password.value}
            placeholder="请输入密码"
            maxLength="20"
            className={validation.errors.password.length ? 'error' : ''}
            {...formData.password.input}
          />
          <CYButton
            className="mr-t-24"
            type="primary"
            size="large"
            disabled={!validation.valid}
            onClick={handleClick}
          >
            确认
          </CYButton>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Reset);
