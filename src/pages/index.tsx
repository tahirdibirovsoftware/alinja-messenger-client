import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from './Login'
import { RegisterPage } from './Register'
import { UsersPage } from './Users'
import style from './index.module.scss';
import { Dashboard } from './Dashboard';
import { Notifications } from './Notifications';
import { Chats } from './Chats';



const Pages = (): JSX.Element => {
    return (
        <div className={style.pageContainer}>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path='/dashboard' element={<Dashboard />}>
                    <Route path='users' element={<UsersPage />} />
                    <Route path='chats' element={<Chats />} />
                    <Route path='notifications' element={<Notifications />} />
                </Route>
            </Routes>
        </div>
    )
}

export { Pages }