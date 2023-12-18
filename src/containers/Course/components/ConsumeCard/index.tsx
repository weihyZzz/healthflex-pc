import { Drawer } from 'antd';
import { EditableProTable } from '@ant-design/pro-components';
import { ICard } from '@/utils/types';
import { useCards, useDeleteCard, useEditCardInfo } from '@/services/card';
import style from './index.module.less';
import { getColumns } from './constants';

interface IProps {
  id: string;
  onClose: (isReload?: boolean) => void;
}
/**
*
*/
const ConsumeCard = (
  {
    onClose,
    id,
  }: IProps,
) => {
  const { data, loading, refetch } = useCards(id);
  const [edit, editLoading] = useEditCardInfo();
  const [del, delLoading] = useDeleteCard();
  const onDeleteHandler = (key: string) => {
    del(key, refetch);
  };
  const onSaveHandler = (d: ICard) => {
    edit(d.id, id, {
      name: d.name,
      type: d.type,
      time: d.time,
      validityDay: d.validityDay,
    }, refetch);
  };
  return (
    <div className={style.container}>
      <Drawer
        title="关联消费卡"
        width="70vw"
        open
        onClose={() => onClose()}
      >
        <EditableProTable<ICard>
          headerTitle="请管理该课程的消费卡"
          rowKey="id"
          loading={loading || editLoading || delLoading}
          recordCreatorProps={{
            record: () => ({
              id: 'new',
              name: '',
              type: 'time',
              time: 0,
              validityDay: 0,
            }),
          }}
          value={data}
          columns={getColumns(onDeleteHandler)}
          editable={{
            onSave: async (rowKey, d) => {
              onSaveHandler(d);
            },
            onDelete: async (key) => {
              onDeleteHandler(key as string);
            },
          }}
        />
      </Drawer>
    </div>
  );
};

export default ConsumeCard;
