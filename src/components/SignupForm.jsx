import { useState } from "react";
import { signupUser } from "../../redux/auth/authActions";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const SignupForm = (props) => {
  const [signup, setSignup] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    monthlyLimit: 1000
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSignup({
      ...signup,
      [id]: value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    if (signup.password !== signup.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      dispatch(signupUser({
        email: signup.email,
        password: signup.password,
      }, navigate))
      .then((data) => {
        if(data.message){
          setError(data.message)
        }
        else {
          navigate('/dashboard');
          setError('')
          setSignup({
            email: "",
            password: "",
            confirmPassword: "",
          });
        }
      })
      .catch((error) => {
        setError(error)
      })
      
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <form
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6"
        onSubmit={register}
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-gray-600" data-required>Email</label>
          <input
            id="email"
            type="text"
            value={signup.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-gray-600">Create Password</label>
          <input
            id="password"
            type="password"
            value={signup.password}
            onChange={handleChange}
            required
            placeholder="Create password"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-gray-600">Re-type Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={signup.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Re-type password"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
        <label htmlFor="monthlyLimit" className="block text-gray-600">Monthly Expense Limit</label>
        <input
          id="monthlyLimit"
          type="number"
          value={signup.monthlyLimit}
          onChange={(e) => setMonthlyLimit(e.target.value)}
          placeholder="Set Monthly Limit"
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

        {/* Submit Button */}
        <div>
          <input
            type="submit"
            value="Register"
            className="w-full cursor-pointer py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          />
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
