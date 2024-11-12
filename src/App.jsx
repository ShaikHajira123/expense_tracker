import './App.css';
import ExpenseList from './components/ExpenseList';
import LoginForm from './components/loginForm';
import SignupForm from './components/SignupForm';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
     <div>
       <h1>Expense Tracker</h1>
        <Routes>
         <Route path='/auth' element={<SignupForm/>}></Route>
         <Route path="/" element={<LoginForm />}></Route>
         <Route path="/expense" element={<ExpenseList />}></Route>
        </Routes>
     </div>
  )
}

export default App
