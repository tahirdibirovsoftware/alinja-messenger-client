import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from './Login'
import { RegisterPage } from './Register'



const Pages = (): JSX.Element => {
    return (
        <Routes>
            <Route path='/' index element={<Navigate to='/login' />}></Route>
            <Route path='/login' index element={<LoginPage />}></Route>
            <Route path='/register' element={<RegisterPage />}></Route>
        </Routes>
    )
}

export { Pages }