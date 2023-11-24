/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
import { useUserContext } from '@/hooks/userHooks';
import { MenuDataItem, PageContainer, ProLayout } from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import { AUTH_TOKEN } from '@/utils/constants';
import { routes } from '@/routes/menus';
import styles from './index.module.less';
/**
*
*/
const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => <Link to={item.path || '/'}>{dom}</Link>;

const Layout = ({}) => {
  const outlet = useOutlet();
  const { store } = useUserContext();
  const nav = useNavigate();
  const logout = () => {
    sessionStorage.setItem(AUTH_TOKEN, '');
    localStorage.setItem(AUTH_TOKEN, '');
    nav('/login');
  };
  return (
    <ProLayout
      className={styles.container}
      siderWidth={130}
      layout="mix"
      avatarProps={{
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjgoz8ebq-C4kWTTa9La1rZT_JSt5s8DmAFcz5wOgVmRRbQYT48dhtLq_YorQp8uktirM&usqp=CAU',
        title: store.tel,
        size: 'small',
        onClick: logout,
      }}
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
      title={false}
      route={{
        path: '/',
        routes,
      }}
      onMenuHeaderClick={() => nav('/')}
      menuItemRender={menuItemRender}
    >
      <PageContainer>
        {outlet}
      </PageContainer>
    </ProLayout>
  );
};

export default Layout;
