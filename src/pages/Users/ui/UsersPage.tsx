import SearchUser from '../../../features/SearchUser/ui/SearchUser'
import UserList from '../../../features/SearchUser/ui/UserList';
import style from './UsersPage.module.scss';

export const UsersPage = (): JSX.Element => {
    return (
        <div className={style.userPage}>
            <SearchUser />
            <UserList />
        </div>
    )
}