import {
    LockOutlined,
    MobileOutlined,
  } from '@ant-design/icons';
  import {
    LoginFormPage,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
  } from '@ant-design/pro-components';
  import {
    message, Tabs,
  } from 'antd';
  
  import styles from './index.module.less';
import { useMutation } from '@apollo/client';
import { SEND_CODE_MSG } from '../../graphql/auth';
  
  export default () => {
    // 执行发送短信验证码的函数
    const [run] = useMutation(SEND_CODE_MSG)
    return <div className={styles.container}>
    <LoginFormPage
      backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
      logo="https://healthflex.oss-cn-beijing.aliyuncs.com/images/logo.jpg"
    >
      <Tabs centered>
        <Tabs.TabPane key="phone" tab="手机号登录" />
      </Tabs>
      <>
        <ProFormText
          fieldProps={{
            size: 'large',
            prefix: <MobileOutlined className="prefixIcon" />,
          }}
          name="phone"
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
          phoneName="phone"
          name="captcha"
          rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
          ]}
          onGetCaptcha={async (tel: string) => {
          console.log('phone', tel);
            run({
              variables: {
                tel,
              }
            })
            message.success(`获取验证码成功！`);
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
  }
  