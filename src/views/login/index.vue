<template>
  <div class="login">
    <a-card hoverable style="width: 500px">
      <template #cover>
        <a-form
          :model="formState"
          name="normal_login"
          class="login-form"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
          style="padding: 10px"
        >
          <a-form-item
            label="Username"
            name="userName"
            :rules="[
              { required: true, message: 'Please input your username!' },
            ]"
          >
            <a-input v-model:value="formState.userName">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            label="Password"
            name="passWord"
            :rules="[
              { required: true, message: 'Please input your password!' },
            ]"
          >
            <a-input-password v-model:value="formState.passWord">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-button
              :disabled="disabled"
              type="primary"
              html-type="submit"
              class="login-form-button"
            >
              Log in
            </a-button>
          </a-form-item>
        </a-form>
      </template>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
// import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

import { message } from 'ant-design-vue'

interface FormState {
  userName: string
  passWord: string
}

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const store = useStore()

    // const router = useRouter()
    const login = (user: any) => {
      store.dispatch('login', user).then(() => {
        message.success('登录成功')
        // router.push({
        //   path: '/',
        // })
      })
    }

    const formState = reactive<FormState>({
      userName: 'admin',
      passWord: '123',
    })
    const onFinish = (values: any) => {
      console.log('Success:', values)
      login(values)
    }
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }
    const disabled = computed(() => {
      return !(formState.userName && formState.passWord)
    })
    return {
      formState,
      onFinish,
      onFinishFailed,
      disabled,
    }
  },
})
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#components-form-demo-normal-login .login-form-forgot {
  margin-bottom: 24px;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
