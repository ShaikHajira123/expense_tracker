import { useState } from "react";
import { signupUser } from "../../redux/auth/authActions";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const SignupForm = (props) => {
  const [signup, setSignup] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
      alert("Registration successful!");
      setError('');
      setSignup({
        email: "",
        password: "",
        confirmPassword: "",
      });
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
          <label htmlFor="email" className="block text-gray-600">Email</label>
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

        {/* Submit Button */}
        <div>
          <input
            type="submit"
            value="Register"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          />
        </div>
      </form>

      {/* Google Connect Section */}
      <div id="goog2" className="text-center mt-6">
        <p className="text-gray-600">or Connect via</p>
        <img
          src="https://blog.hubspot.com/hubfs/image8-2.jpg"
          alt="Google Connect"
          className="mt-2 mx-auto w-32"
        />
      </div>
    </div>
  );
};

export default SignupForm;
