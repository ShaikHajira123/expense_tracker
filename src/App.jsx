import './App.css';
import ExpenseList from './components/ExpenseList';
import LoginForm from './components/loginForm';
import SignupForm from './components/SignupForm';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  return (
            <div className="flex flex-col min-h-screen">
                <Header />

                <main className="flex-grow p-2 bg-gray-100">
                <Routes>
                  <Route path='/auth' element={<SignupForm/>}></Route>
                  <Route path="/" element={<LoginForm />}></Route>
                  <Route path="/expense" element={<ExpenseList />}></Route>
                  <Route
                    path="/dashboard"
                    element={
                        isAuth ? <Dashboard /> : navigate('/login') 
                    }
                />
                </Routes>
                </main>

                <Footer />
            </div>
  )
}

export default App
