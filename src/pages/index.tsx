import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../widgets/Login'
import { Register } from '../widgets/Register'


const Pages = (): JSX.Element => {
    return (
        <Routes>
            <Route path='/' index element={<Navigate to='/login' />}></Route>
            <Route path='/login' index element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
        </Routes>
    )
}

export { Pages }