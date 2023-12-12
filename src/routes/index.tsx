/* eslint-disable @typescript-eslint/quotes */
import Page404 from '@/containers/Page404';
import My from '@/containers/My';
import Org from '@/containers/Org';
import NoOrg from '@/containers/NoOrg';
import Course from '@/containers/Course';
import Student from '@/containers/Student';
import Home from '../containers/Home';
import { ROUTE_KEY } from './menus';

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.PAGE_404]: Page404,
  [ROUTE_KEY.ORG]: Org,
  [ROUTE_KEY.NO_ORG]: NoOrg,
  [ROUTE_KEY.COURSE]: Course,
  [ROUTE_KEY.STUDENT]: Student,
};
