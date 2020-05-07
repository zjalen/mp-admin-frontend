import router from '../router';
import store from '../store';

router.beforeEach((to, from, next) => {
  if (to.params.mp_sign) {
    if (to.params.mp_sign !== store.getters.mp_sign) {
      store.dispatch('actionSetMpSign', to.params.mp_sign)
    }
  }else {
    store.dispatch('actionSetMpSign', null)
  }
  next()
})

