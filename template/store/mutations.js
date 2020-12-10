const mutations = {
  // 是否展示会员等级提升的弹窗
  SET_SHOW_UPGRADE(state, status) {
    state.show_upgrade = status
  },
  // 每日变化多次也只计一次的积分变化
  SET_VIP_INTEGRAL_DISPATCH(state, status) {
    state.vip_integral_dispatch = status
  },
  // 积分
  SET_VIP_INTEGRAL(state, status) {
    state.vip_integral = status
  },
  // 登录
  SET_INDEX(state, status) {
  	state.index = status
  },
  IS_LOGINMODAL(state,status){
  	state.loginModal = status
  },
  IS_LOGIN(state,status){
  	state.login = status
  },
  SET_OPENID(state,status){
  	state.openId = status
  },
  GET_AUTHORNAME(state,status){
  		  state.authorName = status
  },
  SET_DATACODE(state, status) {
  	state.dataCode = status
  }
}

export default mutations
