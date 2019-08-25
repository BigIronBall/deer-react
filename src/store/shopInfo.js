import { createStore } from 'iostore';

export default createStore({
  namespace: 'ShopInfoStore',
  data: {
    shopName: '',
    business: '',
    address: '',
    owner: '',
    tel: ''
  },
  update(data) {
    this.data = { ...this.data, ...data };
  }
});
