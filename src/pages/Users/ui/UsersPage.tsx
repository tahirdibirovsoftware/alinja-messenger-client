import SearchUser from '../../../features/SearchUser/ui/SearchUser'
import style from './UsersPage.module.scss';

export const UsersPage = (): JSX.Element => {
    return (
        <div className={style.userPage}>
            <SearchUser />
        </div>
    )
}