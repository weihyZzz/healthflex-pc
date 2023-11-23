import style from './index.module.less';
import { useUserContext } from '../../utils/userHooks';

/**
*
*/
const Home = ({}) => {
    const { store } = useUserContext()
    return (<div className={style.container}>{store.tel}</div>);
};

export default Home;
