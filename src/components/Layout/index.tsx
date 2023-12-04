/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
import { useUserContext } from '@/hooks/userHooks';
import { MenuDataItem, PageContainer, ProLayout } from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import { AUTH_TOKEN } from '@/utils/constants';
import { ROUTE_KEY, routes } from '@/routes/menus';
import { Space, Tooltip } from 'antd';
import { LoginOutlined, ShopOutlined } from '@ant-design/icons';
import { useGoTo } from '@/hooks';
import styles from './index.module.less';
import OrgSelect from '../OrgSelect';
/**
*
*/
const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => <Link to={item.path || '/'}>{dom}</Link>;

const Layout = ({}) => {
  const outlet = useOutlet();
  const { store } = useUserContext();
  const { go } = useGoTo();
  const nav = useNavigate();
  const logoutHandler = () => {
    sessionStorage.setItem(AUTH_TOKEN, '');
    localStorage.setItem(AUTH_TOKEN, '');
    nav('/login');
  };
  const goToOrg = () => {
    go(ROUTE_KEY.ORG);
  };
  return (
    <ProLayout
      className={styles.container}
      siderWidth={150}
      layout="mix"
      avatarProps={{
        src: store.avatar || null,
        title: store.name,
        size: 'small',
        onClick: () => go(ROUTE_KEY.MY),
      }}
      links={[
        <Space size={20} onClick={logoutHandler}>
          <LoginOutlined />
          退出
        </Space>,
      ]}
      title={false}
      logo={(
        <img
          style={{
            width: '80px', height: '70px', paddingBottom: '10px', paddingTop: '10px',
          }}
          className="logoImg"
          src="https://healthflex.oss-cn-beijing.aliyuncs.com/images/logo_width.png"
          alt="healthflex"
        />
)}
      route={{
        path: '/',
        routes,
      }}
      onMenuHeaderClick={() => nav('/')}
      actionsRender={() => [
        <OrgSelect />,
        <Tooltip title="门店管理">
          <ShopOutlined onClick={goToOrg} />
        </Tooltip>,
      ]}
      menuItemRender={menuItemRender}
    >
      {outlet}

    </ProLayout>
  );
};

export default Layout;
