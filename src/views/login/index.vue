<template>
  <a-row class="login">
    <a-col :span="12" class="aside">
      <div style="margin-top: 30%">
        <logo />
        <h2>好用的网站构建工具</h2>
      </div>
    </a-col>
    <a-col :span="12">
      <div class="login-from">
        <div class="login-card">
          <div class="content">
            <input id="email" placeholder="邮箱" required autofocus />
            <input id="password" placeholder="验证码" required />

            <button @click="login" class="btn btn-primary">登录</button>
          </div>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { message } from 'ant-design-vue'

import Logo from '@/components/logo/index.vue'

export default defineComponent({
  components: {
    Logo,
  },
  setup() {
    const store = useStore()

    const router = useRouter()
    const login = () => {
      store.dispatch('login').then(() => {
        message.success('登录成功')
        router.push({
          path: '/',
        })
      })
    }
    return {
      login,
    }
  },
})
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  .aside {
    height: 100vh;
    background-color: #1a1919;
    background-image: url('../../assets/img/login.png');
    background-size: cover;
    background-repeat: no-repeat;

    display: flex;
    justify-content: center;
    text-align: center;
    h2 {
      color: #ccc;
      font-size: 29px;
      margin-top: 30px;
    }
  }
}

@primary: #1890ff;
@grey-darker: hsl(0, 0%, 21%);
@grey-dark: hsl(0, 0%, 29%);
@grey: hsl(0, 0%, 48%);
@grey-light: hsl(0, 0%, 71%);
@grey-lighter: hsl(0, 0%, 86%);

.login-from {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f7f7f7;

  .login-card {
    background: #fff;
    width: 24rem;
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.11);

    .content {
      padding: 3rem 2.5rem 5rem;
    }

    #email,
    #password {
      display: block;
      width: 100%;
      font-size: 1rem;
      margin-bottom: 1.75rem;
      padding: 0.25rem 0;
      border: none;
      border-bottom: 1px solid @grey-lighter;
      transition: all 0.5s;

      &:hover {
        border-color: @grey;
      }

      &:active,
      &:focus {
        border-color: @primary;
      }
    }

    a {
      font-size: 0.8rem;
    }

    button {
      cursor: pointer;
      font-size: 1.2rem;
      color: @primary;
      border-radius: 4rem;
      display: block;
      width: 100%;
      background: transparent;
      border: 2px solid @primary;
      padding: 0.9rem 0 1.1rem;
      transition: color 0.5s, border-color 0.5s;

      &:hover,
      &:focus {
        color: darken(@primary, 10%);
        border-color: darken(@primary, 10%);
      }

      &:active {
        transform: translateY(1px);
      }
    }
  }
}

label {
  cursor: pointer;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
</style>
