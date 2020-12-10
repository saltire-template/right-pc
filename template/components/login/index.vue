<template>
  <Modal class-name="modal-login-box" :styles="{top: '25%'}" v-model="$store.state.loginModal" @on-cancel="cancel"
    width="294" :footer-hide="true" :closable="false">
    <div v-if="type =='wechat'">
      <ForWeChart v-on:loginType="getType" v-on:openid='getOpenId'></ForWeChart>
    </div>
    <div v-if="type =='account'">
      <ForNumber v-on:loginType="getType"></ForNumber>
    </div>
    <div v-if="type =='register'">
      <register v-on:loginType="getType"></register>
    </div>
    <div v-if="type =='forget'">
      <forget v-on:loginType="getType"></forget>
    </div>
    <div v-if="type =='reset'">
      <resetPassword v-on:loginType="getType"></resetPassword>
    </div>
  </Modal>
</template>

<script>
  import ForWeChart from './loginForWeChart'
  import ForNumber from './loginForNumber'
  import register from './register'
  import forget from './forget'
  import resetPassword from './success'

  export default {
    name: 'Login',
    components: {
      ForWeChart,
      ForNumber,
      register,
      forget,
      resetPassword
    },
    data() {
      return {
        type: '',
        openId: ''
      }
    },
    computed: {
      status: function() {
        return this.$store.state.loginModal
      }
    },
    watch: {
      status(nval, oval) {
        if (nval) {
          this.type = 'wechat';
        }
      }
    },
    methods: {
      getType(val) {
        this.type = val
      },
      // 初始化
      InitForm() {
        this.type = ""
      },
      cancel() {
        var _this = this;
        _this.$store.commit('IS_LOGINMODAL', false);
        let time = setTimeout(function() {
          _this.InitForm()
        }, 300)

      },
      getOpenId(val) {
        this.openId = val
      },

      async getAuthorStatus() {
        let obj = {
          ticket: this.$utils.getCookie('ticket')
        }
        let res = await this.https.post('/home/account/status', obj)
        if (res.code == '0014') {
          this.$store.commit('IS_LOGIN', false);
        } else if (res.code == '0000') {
          this.$store.commit('IS_LOGIN', true);
          this.$store.commit('SET_TICKET', res.data.ticket);
          this.loginOnline()
        }
      },
      // 本项目登录
      async loginOnline(val) {
        let obj = {
          ticket: val
        }
        let res = await this.https.post('/account/login', obj);
        if (res.code == '0000') {
          this.$store.commit('IS_LOGIN', true);
          this.$store.commit('GET_AUTHORNAME', res.data.authorName);
        } else {
          this.$utils.clearCookie('ticket')
          this.$store.commit('IS_LOGIN', false);
        }
      },
      async AccontStatus() {
        let res = await this.https.get('/home/account/status', {})
        if (res.code == '0014') {
          if (this.$utils.getCookie('ticket')) {
            this.$store.commit('SET_TICKET', this.$utils.getCookie('ticket'));
            this.loginOnline(this.$utils.getCookie('ticket'))
          } else {
            this.$store.commit('IS_LOGIN', false);
          }
          // this.getAuthorStatus()
        } else if (res.code == '0000') {
          this.$utils.setCookie('ticket', res.data.ticket, 1)
          this.$store.commit('IS_LOGIN', true);
          this.$store.commit('GET_AUTHORNAME', res.data.authorName);
        }
      }
    },
    mounted() {
		
    },
    created() {
      this.InitForm();
      // 登录状态
      this.AccontStatus()

    },
    destroyed() {

    }
  }
</script>
<style>
  /*  登录 */
  .modal-login-box .ivu-modal-content {
    padding: 6px !important;
    position: relative;
  }

  .modal-login-box .ivu-modal-content .ivu-modal-body {
    padding: 0 !important;
    position: relative;
  }
</style>
<style lang="less" scoped>

</style>
