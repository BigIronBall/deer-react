import { useState } from 'react';

const regRules = {
  username: /^[a-zA-a]+[0-9]+$/,
  password: /^[\w_-]+$/,
  email: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  mobile: /^1(3|5|7|8)(\d){9}$/
};

function validateRule(rule, ruleValue, value, alias = '') {
  let msg = '';
  value = (value + '').trim();
  switch (rule) {
    case 'maxLength':
      if (value.length > ruleValue) msg = `长度不能大于`;
      break;
    case 'minLength':
      if (value.length < ruleValue) msg = `长度不能大于`;
      break;
    default:
      // required
      if (ruleValue && !value.trim().length) msg = '不能为空';
      break;
  }
  return msg ? `${alias}${msg}` : '';
}

function wrap(obj) {
  Object.keys(obj).forEach(key => {
    obj[key] = {
      value: obj[key]
      // onChange: handleChange()
    };
  });
  return obj;
}

function useFormValidate(initFormData, rules) {
  if (
    !initFormData ||
    typeof initFormData !== 'object' ||
    !Object.keys(initFormData).length
  ) {
    throw Error('表单初始化参数错误');
  }
  if (!Array.isArray(rules) || !rules.length) {
    throw Error('表单验证参数错误');
  }

  let [formData, setFormData] = useState(initFormData);

  let [validation, setValidation] = useState({ errors: {} });

  const handleChange = e => {
    formData[e.target.name]['value'] = e.target.value;
    // setFormData({ ...formData, [e.target.name]['value']: e.target.value });
    setFormData(formData);

    // const rule = rules.find(x => x.name === e.target.name);
    // setValidation({
    //   ...validation,
    //   ...validateSingleRule(rule, e.target.value)
    // });
  };

  function initErrors(state, setState) {}

  // 验证单个规则
  function validateSingleRule(rule, value) {
    //validateRule(rule,)
    // rules.map(x=>)

    let arr = [];

    Object.keys(rule.rules).forEach(key => {
      const msg = validateRule(key, rule.rules[key], value);
      if (msg.length) arr.push(`${rule.alias}${msg}`);
    });

    // rule.rules.forEach(_rule=>{
    //   validateRule(_rule,)
    // })
    let newState = { errors: { [rule.name]: arr } };

    return newState;
  }

  // const handleClick = e => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const formData = {};
  // let validation = { errors: {} };
  let valid = false;

  rules.forEach(rule => {
    // const value = initFormData[rule.name];

    // validation.errors[rule.name] = [];
    if (Object.keys(rule.rules).length) {
      let newState = { ...validation };
      newState.errors[rule.name] = [];
      setValidation(newState);

      // setValidation(...validation, { errors: { [rule.name]: [] } });
      // const ruleKeys = Object.keys[rule.rules];
      // ruleKeys.forEach(key => {
      //   const ruleValue = rule[key];
      //   // const errors = validation.errors[rule.name];
      //   const ruleMsg = validateRule(key, ruleValue, value, rule.alias);
      //   if (ruleMsg) validation.errors[rule.name].push(ruleMsg);
      // });
    }

    // 其他规则校验过了再校验正则规则
    // if (rule.type && validation.errors[rule.name].length === 0) {
    //   const validResult = regRules[rule.rules.type].test(value);
    //   if (!validResult)
    //     validation.errors[rule.name].push(`${rule.alias}不是正确的值`);
    // }
  });

  console.log('validateion', validation);

  valid = Object.keys(validation.errors).every(x => x.length === 0);

  const _formData = wrap(formData);
  Object.keys(_formData).forEach(key => {
    _formData[key].input = {
      onChange: handleChange
    };
  });

  return [_formData, validation, valid];
}

export default useFormValidate;
