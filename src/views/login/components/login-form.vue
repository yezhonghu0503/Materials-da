<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-sub-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" title="账号密码">
        <a-form
          ref="loginForm"
          :model="userInfo"
          class="login-form"
          layout="vertical"
          @submit="handleSubmit"
        >
          <a-form-item
            field="username"
            :rules="[
              { required: true, message: $t('login.form.userName.errMsg') },
            ]"
            :validate-trigger="['change', 'blur']"
            hide-label
          >
            <a-input
              v-model="userInfo.username"
              :placeholder="$t('login.form.userName.placeholder')"
              @keyup.enter="handleSubmit"
            >
              <template #prefix>
                <icon-user />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            field="password"
            :rules="[
              { required: true, message: $t('login.form.password.errMsg') },
            ]"
            :validate-trigger="['change', 'blur']"
            hide-label
          >
            <a-input-password
              v-model="userInfo.password"
              :placeholder="$t('login.form.password.placeholder')"
              allow-clear
              @keyup.enter="handleSubmit"
            >
              <template #prefix>
                <icon-lock />
              </template>
            </a-input-password>
          </a-form-item>
          <a-space :size="16" direction="vertical">
            <div class="login-form-password-actions">
              <!--  <a-checkbox checked="rememberPassword" @change="setRememberPassword">
              {{ $t('login.form.rememberPassword') }}
            </a-checkbox> -->
              <a-link>{{ $t('login.form.forgetPassword') }}</a-link>
            </div>
            <a-button type="primary" html-type="submit" long :loading="loading">
              {{ $t('login.form.login') }}
            </a-button>
            <!-- <a-button type="text" long class="login-form-register-btn">
              {{ $t('login.form.register') }}
            </a-button> -->
          </a-space>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" title="微信登录">
        <div class="qrcode"></div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import { useI18n } from 'vue-i18n';
// import { useUserStore } from '@/store';
import { useUserStore } from '@/store';
import useLoading from '@/hooks/loading';
import { LoginData } from '@/api/user';

export default defineComponent({
  setup() {
    const router = useRouter();
    const { t } = useI18n();
    const errorMessage = ref('');
    const { loading, setLoading } = useLoading();
    const userStore = useUserStore();
    const userInfo = reactive({
      username: '',
      password: '',
    });
    const handleSubmit: any = async ({
      errors,
      values,
    }: {
      errors: Record<string, ValidatedError> | undefined;
      values: LoginData;
    }) => {
      console.log(userInfo);
      if (!errors) {
        setLoading(true);
        try {
          // console.log(values);
          await userStore.login(userInfo);
          // console.log(res);
          console.log('ass');
          const { redirect, ...othersQuery } = router.currentRoute.value.query;
          router.push({
            name: (redirect as string) || 'workplace',
            query: {
              ...othersQuery,
            },
          });
          Message.success(t('login.form.login.success'));
        } catch (err) {
          console.log(err);
          errorMessage.value = (err as Error).message;
        } finally {
          setLoading(false);
        }
      }
    };
    // 演示地址自动登录
    onMounted(() => {
      // setTimeout(() => {
      //   handleSubmit({ errors: undefined, values: userInfo });
      // }, 3000);
    });
    const setRememberPassword = () => {
      //
    };
    return {
      loading,
      userInfo,
      errorMessage,
      handleSubmit,
      setRememberPassword,
    };
  },
});
</script>

<style lang="less" scoped>
.login-form {
  &-wrapper {
    width: 320px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-register-btn {
    color: var(--color-text-3) !important;
  }
  .qrcode {
    width: 150px;
    height: 150px;
    background: blue;
  }
}
</style>
