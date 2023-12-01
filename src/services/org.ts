import { COMMIT_ORG, GET_ORG, GET_ORGS } from '@/graphql/org';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { TBaseOrganization, TOrgQuery, TOrgsQuery } from '@/utils/types';
import { useMutation, useQuery } from '@apollo/client';
import { message } from 'antd';

export const useOrganizations = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
  const { loading, data, refetch } = useQuery<TOrgsQuery>(GET_ORGS, {
    variables: {
      page: {
        pageNum,
        pageSize,
      },
    },
  });
  return {
    loading,
    refetch,
    page: data?.getOrganizations.page,
    data: data?.getOrganizations.data,
  };
};
export const useOrganization = (id: string) => {
  const { loading, data } = useQuery<TOrgQuery>(GET_ORG, {
    variables: {
      id,
    },
  });
  return {
    loading,
    data: data?.getOrganizationInfo.data,
  };
};
export const useEditInfo = ():[handleEdit: Function, loading: boolean] => {
  const [edit, { loading }] = useMutation(COMMIT_ORG);
  const handleEdit = async (id: number, params: TBaseOrganization) => {
    const res = await edit({
      variables: {
        id,
        params,
      },
    });
    message.info(res.data.commitOrganization.message);
  };
  return [handleEdit, loading];
};
