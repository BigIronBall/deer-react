import { useState } from 'react';
// import { exportAllDeclaration } from '@babel/types';

const regRules = {
  username: /^[a-zA-a]+[0-9]+$/,
  password: /^[\w_-]+$/,
  email: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  mobile: /^1(3|5|7|8)(\d){9}$/,
  vcode: /^(\d){4}$/
};

function validateRule(rule, ruleValue, value, alias = '') {
  let msg = '';
  value = (value + '').trim();
  switch (rule) {
    case 'maxLength':
      if (value.length > ruleValue)
        msg = `${alias}长度不能大于${ruleValue}个字符`;
      break;
    case 'minLength':
      if (value.length < ruleValue)
        msg = `${alias}长度不能小于${ruleValue}个字符`;
      break;
    default:
      // required
      if (ruleValue && !value.trim().length) msg = `请输入${alias}`;
      break;
  }
  return msg;
}

function formFactroy(obj) {
  Object.keys(obj).forEach(key => {
    obj[key] = {
      value: obj[key],
      meta: {
        touched: false,
        dirty: false
      }
    };
  });
  return obj;
}

function initRules(rules) {
  const obj = {};
  rules.forEach(rule => {
    obj[rule.name] = [];
  });
  return obj;
}

// 输入变更，每次都要验证
function handleChange(
  target,
  state,
  setState,
  rules,
  validation,
  setValidation
) {
  if (!target.name) throw new Error('target.name is not defined');
  if (!(target.name in state))
    throw new Error("state has no name like target's name");

  const fieldName = target.name;
  state[fieldName]['value'] = target.value;
  state[fieldName]['meta'].dirty = true;
  setState(state);

  const newValidation = getNewValidation(
    fieldName,
    state,
    rules,
    validation.errors,
    target.value
  );
  setValidation(newValidation);
}

// 验证单个规则
function validateSingleRule(rule, value) {
  let arr = [];

  Object.keys(rule.rules).forEach(key => {
    if (arr.length) return [rule.name, arr];
    const msg = validateRule(key, rule.rules[key], value, rule.alias);
    if (msg.length) arr.push(msg);
  });

  if (rule.type && !regRules[rule.type]) {
    throw new Error(`没有 ${rule.type} 这个正则校验类型`);
  }

  if (rule.type && !arr.length) {
    const validResult = regRules[rule.type].test(value);
    if (!validResult) arr.push(`${rule.alias}不是正确的值`);
  }
  return [rule.name, arr];
}

function getNewValidation(fieldName, state, rules, errors, value) {
  const validResult = validateSingleRule(
    rules.find(rule => rule.name === fieldName),
    value
  );

  const newValidation = { errors: { ...errors } };
  newValidation.errors[fieldName] = validResult[1];
  newValidation.valid = Object.keys(newValidation.errors).every(
    key => newValidation.errors[key].length === 0
  );

  // 必填校验
  if (newValidation.valid) {
    let notValid = rules.some(
      rule =>
        rule.rules.required && !state[rule.name].value.toString().trim().length
    );
    if (notValid) newValidation.valid = false;
  }
  return newValidation;
}

function formDataFactory(state, setState, rules, validation, setValidation) {
  return Object.keys(state).reduce((obj, key) => {
    obj[key] = {
      meta: state[key].meta,
      input: {
        value: state[key].value,
        onChange: e => {
          handleChange(
            e.target,
            state,
            setState,
            rules,
            validation,
            setValidation
          );
        },
        onClear: target => {
          target.value = '';
          handleChange(
            target,
            state,
            setState,
            rules,
            validation,
            setValidation
          );
        }
      }
    };
    return obj;
  }, {});
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

  const initErrors = initRules(rules);

  let _form = formFactroy(initFormData);

  let [formState, setFormData] = useState(_form);

  let [validation, setValidation] = useState({
    valid: false,
    errors: initErrors
  });

  const form = formDataFactory(
    formState,
    setFormData,
    rules,
    validation,
    setValidation
  );

  const validate = () => {
    console.warn('validate');
    const errors = {};
    rules.forEach(rule => {
      let validResult = validateSingleRule(rule, formState[rule.name].value);
      errors[validResult[0]] = validResult[1];
    });

    const newValidation = { errors };

    newValidation.valid = Object.keys(newValidation.errors).every(
      key => newValidation.errors[key].length === 0
    );

    // 验证必填项是否已经填写
    if (newValidation.valid) {
      let notValid = rules.some(
        rule =>
          rule.rules.required &&
          !formState[rule.name].value.toString().trim().length
      );
      if (notValid) newValidation.valid = false;
      // newValidation.valid = notValid ? false : true;
    }

    setValidation(newValidation);
    return newValidation.valid;
  };

  const flatErrors = () => {
    return Object.keys(validation.errors).reduce((a, b) => [
      ...validation.errors[a],
      ...validation.errors[b]
    ]);
  };

  const values = {};
  Object.keys(formState).forEach(key => {
    values[key] = formState[key].value;
  });

  return [form, validation, validate, flatErrors, values];
}

export default useFormValidate;
