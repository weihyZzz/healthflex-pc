/* eslint-disable no-empty-pattern */
import { useEffect } from 'react';

import style from './index.module.less';

interface IProp {
  id: string;
  onClose: () => void;
}
/**
*
*/
const EditOrg = ({ id, onClose } : IProp) => {
  useEffect(() => {
    console.log(id, onClose);
  }, []);
  return (<div className={style.container}>sss</div>);
};

export default EditOrg;
