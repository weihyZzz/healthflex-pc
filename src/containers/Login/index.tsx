import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { message, Tabs } from 'antd';

import { useMutation } from '@apollo/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTitle } from '@/hooks';
import styles from './index.module.less';
import { LOGIN, SEND_CODE_MSG } from '../../graphql/auth';
import { AUTH_TOKEN } from '../../utils/constants';

interface Ivalue {
  tel: string;
  code: string;
  autoLogin: boolean;
}

export default () => {
  // 执行发送短信验证码的函数
  const [run] = useMutation(SEND_CODE_MSG);
  const [login] = useMutation(LOGIN);
  const nav = useNavigate();
  const [params] = useSearchParams();
  useTitle('登录');
  const loginHandler = async (values: Ivalue) => {
    console.log('values:', values);
    const res = await login({
      variables: values,
    });
    if (res.data.login.code === 200) {
      if (values.autoLogin) {
        sessionStorage.setItem(AUTH_TOKEN, '');
        localStorage.setItem(AUTH_TOKEN, res.data.login.data);
      } else {
        localStorage.setItem(AUTH_TOKEN, '');
        sessionStorage.setItem(AUTH_TOKEN, res.data.login.data);
      }
      message.success(res.data.login.message);
      nav(params.get('orgUrl') || '/');
      return;
    }
    message.error(res.data.login.message);
  };
  return (
    <div className={styles.container}>
      <LoginFormPage
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo="https://healthflex.oss-cn-beijing.aliyuncs.com/images/logo.jpg"
        onFinish={loginHandler}
      >
        <Tabs
          centered
          items={[{
            key: 'phone',
            label: '手机号登录',
          }]}
        >
          <Tabs.TabPane key="phone" tab="手机号登录" />
        </Tabs>
        <>
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <MobileOutlined className="prefixIcon" />,
            }}
            name="tel"
            placeholder="手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className="prefixIcon" />,
            }}
            captchaProps={{
              size: 'large',
            }}
            placeholder="请输入验证码"
            captchaTextRender={(timing, count) => {
              if (timing) {
                return `${count} ${'获取验证码'}`;
              }
              return '获取验证码';
            }}
            phoneName="tel"
            name="code"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
            onGetCaptcha={async (tel: string) => {
              console.log('phone', tel);
              const res = await run({
                variables: {
                  tel,
                },
              });
              if (res.data.sendCodeMsg.code === 200) {
                message.success(res.data.sendCodeMsg.message);
              } else {
                message.error(res.data.sendCodeMsg.message);
              }
            }}
          />
        </>
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
        </div>
      </LoginFormPage>
    </div>
  );
};
