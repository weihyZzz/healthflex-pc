/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-undef */
import {
  Button, Col, Drawer, Row, Space, Tabs,
} from 'antd';
import { useState } from 'react';
import { EditableProTable } from '@ant-design/pro-components';
import { ChromeOutlined, RedoOutlined } from '@ant-design/icons';
import { IOrderTime } from '@/utils/types';
import _ from 'lodash';
import style from './index.module.less';
import {
  DAYS, IDay, getColumns, getMaxKey, isWorkDay,
} from './constants';
import { useOrderTime } from './hooks';

interface IProps {
  id: string;
  onClose: (isReload?: boolean) => void;
}
/**
*
*/
const OrderTime = (
  {
    onClose,
    id,
  }: IProps,
) => {
  const [currentDay, setCurrentDay] = useState<IDay>(DAYS[0]);
  console.log('OrderTime');
  const onTabChangeHandler = (key: string) => {
    const current = DAYS.find((item) => item.key === key) as IDay;
    // console.log('currentDay', currentDay);
    setCurrentDay(current);
  };
  const {
    orderTime,
    loading,
    onDeleteHandler,
    onSaveHandler,
    allWeekSyncHandler,
    allWorkDaySyncHandler,
  } = useOrderTime(id, currentDay.key);
  return (
    <Drawer
      title="编辑预约时间"
      width={720}
      open
      onClose={() => onClose()}
      forceRender
    >
      <Tabs
        type="card"
        items={DAYS}
        onChange={onTabChangeHandler}
      />
      <EditableProTable<IOrderTime>
        headerTitle={(
          <Space>
            选择
            <span className={style.name}>
              {currentDay.label}
            </span>
            的课程预约时间
          </Space>
        )}
        value={orderTime}
        editable={{
          onSave: async (rowKey, d) => {
            let newData = [];
            if (orderTime.findIndex((item) => item.key === rowKey) > -1) {
              newData = orderTime?.map((item) => (item.key === rowKey ? _.omit(d, 'index') : { ...item }));
            }
            newData = [...orderTime, _.omit(d, 'index')];
            // console.log('newData', newData);
            onSaveHandler(newData);
          },
        }}
        loading={loading}
        rowKey="key"
        recordCreatorProps={{
          record: () => ({
            key: getMaxKey(orderTime) + 1,
            startTime: '12:00:00',
            endTime: '12:30:00',
          }),
        }}
        columns={getColumns(onDeleteHandler)}
      />
      <Row gutter={20} className={style.buttons}>
        <Col span={12}>
          <Button
            icon={<RedoOutlined />}
            style={{ width: '100%' }}
            type="primary"
            disabled={!isWorkDay(currentDay.key)}
            onClick={allWorkDaySyncHandler}
          >
            全工作日同步
          </Button>
        </Col>
        <Col span={12}>
          <Button
            icon={<ChromeOutlined />}
            style={{ width: '100%' }}
            type="primary"
            danger
            onClick={allWeekSyncHandler}
          >
            全周同步
          </Button>
        </Col>
      </Row>
    </Drawer>
  );
};

export default OrderTime;
