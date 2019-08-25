import React from 'react';
import { withRouter } from 'react-router-dom';
import AppHead from 'components/AppHead';
import CyGroup from 'components/CyGroup';
import CyTextField from 'components/CYTextField';
import CyETextEdit from 'components/CYTextEdit';
import CYButton from 'components/CYButton';
import useValidate from '@/utils/hooks/useFormValidate';
import ShopInfoStore from '@/store/shopInfo';
import toast from 'components/CyToast';
import { REGIST_SHOP } from '@/utils/api';
import useFetch from '@/utils/hooks/useLoadingFetch';

const validations = [
  {
    name: 'shopName',
    alias: '店铺名称',
    // type: 'normal',
    rules: {
      required: true,
      minLength: 4
    }
  },
  {
    name: 'business',
    alias: '主营范围',
    type: 'password',
    rules: {
      required: true
    }
  },
  {
    name: 'address',
    alias: '店铺地址',
    // type: 'text',
    rules: {
      required: true
    }
  },
  {
    name: 'owner',
    alias: '店主姓名',
    // type: 'text',
    rules: {
      required: true
    }
  },
  {
    name: 'tel',
    alias: '联系电话',
    type: 'mobile',
    rules: {
      required: true
    }
  }
];

const Shop = ({ location, history }) => {
  const [loading, fetch] = useFetch();

  const initFormData = JSON.parse(JSON.stringify(ShopInfoStore.data));

  let [formData, validation, validate, flatErrors, values] = useValidate(
    initFormData,
    validations
  );

  // 提交
  const handleClick = async e => {
    e.preventDefault();
    const validResult = validate();
    if (!validResult) {
      const errors = flatErrors();
      if (errors.length) {
        toast(errors[0]);
        return;
      }
    }

    const [err, result] = await fetch(REGIST_SHOP, values, 'POST');

    if (err) {
      debugger;
      return;
    }

    if (result && result.token) {
      localStorage.setItem('token', result.token);
      toast('登录成功');
      if (!result.shop) {
        history.replace('/shop');
      } else {
        history.push('/');
      }
    } else toast(result.msg);
  };

  // 营业范围跳转
  function onBusinessClick() {
    history.push({
      pathname: '/edit',
      state: {
        max: 30,
        label: '主营范围',
        name: 'business',
        value: values.business,
        storeName: 'ShopInfoStore'
      }
    });

    ShopInfoStore.update(values);
  }

  // 地址跳转
  function onAddressClick() {
    history.push({
      pathname: '/edit',
      state: {
        max: 100,
        label: '店铺地址',
        name: 'address',
        value: values.address,
        storeName: 'ShopInfoStore'
      }
    });

    ShopInfoStore.update(values);
  }

  return (
    <>
      <AppHead title="店铺审核资料" showBack={true} />
      <div className="container">
        <CyGroup title="店铺资料">
          <CyTextField
            label="店铺名称"
            placeholder="填写店铺名称"
            name="shopName"
            maxLength="30"
            {...formData.shopName.input}
          />
          <CyETextEdit
            label="主营范围"
            max={30}
            value={values.business}
            name="business"
            onClick={onBusinessClick}
          />
          <CyETextEdit
            label="店铺地址"
            max={100}
            value={values.address}
            name="address"
            onClick={onAddressClick}
          />
        </CyGroup>
        <CyGroup title="店主信息">
          <CyTextField
            label="店主姓名"
            name="owner"
            placeholder="填写店主姓名"
            type="text"
            {...formData.owner.input}
          />
          <CyTextField
            label="联系电话"
            name="tel"
            placeholder="填写店主联系电话"
            type="tel"
            maxLength="11"
            className={validation.errors.tel.length ? 'error' : ''}
            {...formData.tel.input}
          />
        </CyGroup>

        <CYButton
          type="primary"
          size="large"
          disabled={!validation.valid}
          onClick={handleClick}
          loading={loading}
          loadingText="正在提交"
        >
          提交
        </CYButton>
      </div>
    </>
  );
};

export default withRouter(Shop);
