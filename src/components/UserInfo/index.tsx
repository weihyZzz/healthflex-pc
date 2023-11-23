import { IPropChild } from '../../utils/types';
import { connect, useGetUser } from '../../utils/userHooks';

/**
*
*/
const UserInfo = ({ children }: IPropChild) => {
    // const { store, setStore } = useUserContext();
    useGetUser()
    return (
        <div>
            { children }
        </div>
    )
}
export default connect(UserInfo);
