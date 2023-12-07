/* eslint-disable @typescript-eslint/no-unused-vars */
import { HomeOutlined, PicRightOutlined, ShoppingOutlined } from '@ant-design/icons';

interface IRoute {
  path: string;
  name: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}

export const ROUTE_KEY = {
  HOME: 'home',
  MY: 'my',
  ORG: 'org',
  NO_ORG: 'noOrg',
  PAGE_404: '404',
  COURSE: 'course',
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: '/',
    name: '首页',
    icon: <HomeOutlined />,
  },
  [ROUTE_KEY.ORG]: {
    path: 'org',
    name: '门店管理',
    hideInMenu: true,
    icon: <ShoppingOutlined />,
  },
  [ROUTE_KEY.MY]: {
    path: 'my',
    name: '个人信息',
    hideInMenu: true,
    icon: <HomeOutlined />,
  },
  [ROUTE_KEY.NO_ORG]: {
    path: 'noOrg',
    name: '选择门店提示',
    hideInMenu: true,
  },
  [ROUTE_KEY.COURSE]: {
    path: 'course',
    name: '课程管理',
    icon: <PicRightOutlined />,
  },
  [ROUTE_KEY.PAGE_404]:
  {
    path: '*',
    hideInMenu: true,
    name: '404',
  },
};

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({ ...ROUTE_CONFIG[key], key }));
export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
