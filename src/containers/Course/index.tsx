import { ICourse } from '@/utils/types';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { useCourses } from '@/services/course';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { getColumns } from './constants';
import EditCourse from './components/EditCourse';

/**
* 当前门店下开设的课程
*/
const Course = () => {
  const actionRef = useRef<ActionType>();
  const [curId, setCurId] = useState('');
  const { refetch } = useCourses();
  const [showInfo, setShowInfo] = useState(false);
  const onClickAddHandler = (id?: string) => {
    if (id) {
      setCurId(id);
    } else {
      setCurId('');
    }
    setShowInfo(true);
  };

  const closeAndRefetchHandler = () => {
    setShowInfo(false);
    actionRef.current?.reload();
  };
  return (
    <PageContainer header={{ title: '当前门店下开设的课程' }}>
      <ProTable<ICourse>
        rowKey="id"
        actionRef={actionRef}
        columns={getColumns({
          onEditHandler: onClickAddHandler,
        })}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        toolBarRender={() => [
          <Button key="add" onClick={() => onClickAddHandler()} type="primary" icon={<PlusOutlined />}>
            新建
          </Button>,
        ]}
        request={refetch}
      />
      <EditCourse id={curId} open={showInfo} onClose={() => closeAndRefetchHandler()} />
    </PageContainer>
  );
};

export default Course;
