import { useQuery } from '@apollo/client';
import { GET_USER } from '@/graphql/user';
import { connectFactory, useAppContext } from '@/utils/contextFactory';
import { IUser } from '@/utils/types';
import { useLocation, useNavigate } from 'react-router-dom';

const KEY = 'userInfo';
const DEFAULT_VALUE = {

};
export const useUserContext = () => useAppContext(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

export const useGetUser = () => {
  const { setStore } = useUserContext();
  const nav = useNavigate();
  const location = useLocation();
  const { loading } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
    onCompleted: (data) => {
      if (data.getUserInfo) {
        const { id, name, tel } = data.getUserInfo;
        setStore({
          id, name, tel,
        });
        // 如果当前在登陆页，且已经登录，则跳转到首页
        if (location.pathname === '/login') {
          nav('/');
        }
        return;
      }
      // 当前不在登录页面，且没有登录，则直接跳转到登录
      if (location.pathname !== '/login') {
        nav(`/login?orgUrl=${location.pathname}`);
      }
    },
    onError: () => {
      // 不在登录页 且登录异常，跳转到登录页
      if (location.pathname !== '/login') {
        nav(`/login?orgUrl=${location.pathname}`);
      }
    },
  });
  return { loading };
};
