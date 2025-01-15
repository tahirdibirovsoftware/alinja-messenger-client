import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from './Login'
import { RegisterPage } from './Register'
import { UsersPage } from './Users'



const Pages = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path='/users' element={<UsersPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export { Pages }