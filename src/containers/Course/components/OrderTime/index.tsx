/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-undef */
import {
  Button, Col, Drawer, Row, Space, Tabs,
} from 'antd';
import { useMemo, useState } from 'react';
import { EditableProTable } from '@ant-design/pro-components';
import { ChromeOutlined, RedoOutlined } from '@ant-design/icons';
import { useCourseInfo, useEditCourseInfo } from '@/services/course';
import { IOrderTime, IWeekCourse } from '@/utils/types';
import _ from 'lodash';
import style from './index.module.less';
import {
  DAYS, IDay, getColumns, getMaxKey, isWorkDay,
} from './constants';

interface IProps {
  id: string;
  onClose: (isReload?: boolean) => void;
  open: boolean;
}
/**
*
*/
const OrderTime = (
  {
    open,
    onClose,
    id,
  }: IProps,
) => {
  const [currentDay, setCurrentDay] = useState<IDay>(DAYS[0]);
  const { data, loading, refetch } = useCourseInfo(id);
  const [edit, editLoading] = useEditCourseInfo();
  const onTabChangeHandler = (key: string) => {
    const current = DAYS.find((item) => item.key === key) as IDay;
    console.log('currentDay', currentDay);
    setCurrentDay(current);
  };
  console.log('data?.reducibleTime', data?.reducibleTime);
  const orderTime = useMemo(() => (data?.reducibleTime || []).find((item) => item.week === currentDay.key)?.orderTime, [data, currentDay]) || [];
  const onSaveHandler = (ot: IOrderTime[]) => {
    const rt = [...(data?.reducibleTime || [])];
    const index = rt.findIndex((item) => item.week === currentDay.key);
    if (index > -1) {
      rt[index] = {
        week: currentDay.key,
        orderTime: ot,
      };
    } else {
      rt.push({
        week: currentDay.key,
        orderTime: ot,
      });
    }
    edit(id, {
      reducibleTime: rt,
    }, refetch);
  };
  const onDeleteHandler = (key: number) => {
    const newData = orderTime.filter((item) => item.key !== key);
    onSaveHandler(newData);
  };
  const allWorkDaySyncHandler = () => {
    // console.log('allWorkDaySyncHandler click');
    const rt: IWeekCourse[] = [];
    DAYS.forEach((item) => {
      if (isWorkDay(item.key)) {
        // 如果是工作日
        rt.push({
          week: item.key,
          orderTime,
        });
      }
    });
    edit(id, {
      reducibleTime: rt,
    }, () => refetch());
  };
  const allWeekSyncHandler = () => {
    const rt: IWeekCourse[] = [];
    DAYS.forEach((item) => {
      rt.push({
        week: item.key,
        orderTime,
      });
    });
    edit(id, {
      reducibleTime: rt,
    }, () => refetch());
  };
  return (
    <Drawer
      title="编辑预约时间"
      width={720}
      open={open}
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
            console.log('newData', newData);
            onSaveHandler(newData);
          },
        }}
        loading={loading || editLoading}
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
