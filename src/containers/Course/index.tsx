/* eslint-disable react/no-unstable-nested-components */
import { ICourse } from '@/utils/types';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { useCourses } from '@/services/course';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { COLUMNS } from './constants';
import EditCourse from './components/EditCourse';

/**
* 当前门店下开设的课程
*/
const Course = () => {
  const actionRef = useRef<ActionType>();
  const { refetch } = useCourses();
  const [showInfo, setShowInfo] = useState(false);
  const onClickAddHandler = () => {
    setShowInfo(true);
  };
  const closeAndRefetchHandler = () => {
    setShowInfo(false);
    actionRef.current?.reload();
  };
  return (
    <PageContainer header={{ title: '当前门店下开设的课程' }}>
      <ProTable<ICourse>
        actionRef={actionRef}
        columns={COLUMNS}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        request={refetch}
        toolBarRender={() => [
          <Button key="add" onClick={onClickAddHandler} type="primary">
            新建
          </Button>,
        ]}
      />
      <EditCourse open={showInfo} onClose={() => closeAndRefetchHandler()} />
    </PageContainer>
  );
};

export default Course;
