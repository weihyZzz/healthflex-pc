import { TBaseCourse, TCourseQuery } from '@/utils/types';
import { useMutation, useQuery } from '@apollo/client';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { message } from 'antd';
import { COMMIT_COURSE, GET_COURSES } from '../graphql/course';

export const useCourses = (
  pageNum = 1,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const { loading, data, refetch } = useQuery<TCourseQuery>(GET_COURSES, {
    skip: true,
    variables: {
      page: {
        pageNum,
        pageSize,
      },
    },
  });
  const refetchHandler = async (params: {
    pageSize?: number;
    current?: number;
    name?: string;
  }) => {
    const { data: res, errors } = await refetch({
      page: {
        pageNum: params.current || 1,
        pageSize: params.pageSize || DEFAULT_PAGE_SIZE,
      },
      name: params.name,
    });
    if (errors) {
      return {
        success: false,
      };
    }
    return {
      total: res?.getCourses.page.total,
      data: res?.getCourses.data,
      success: true,
    };
  };
  return {
    loading,
    refetch: refetchHandler,
    page: data?.getCourses.page,
    data: data?.getCourses.data,
  };
};
export const useEditInfo = ():[handleEdit: Function, loading: boolean] => {
  const [edit, { loading }] = useMutation(COMMIT_COURSE);
  const handleEdit = async (id: number, params: TBaseCourse, callback: Function) => {
    const res = await edit({
      variables: {
        id,
        params,
      },
    });
    if (res.data.commitCourseInfo.code === 200) {
      message.success(res.data.commitCourseInfo.message);
      callback();
      return;
    }
    message.error(res.data.commitCourseInfo.message);
  };
  return [handleEdit, loading];
};
