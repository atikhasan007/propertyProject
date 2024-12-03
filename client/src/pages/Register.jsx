import React, { useEffect, useState } from 'react';
import { MdUpload } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {


  const navigate = useNavigate()
  const [passwordMatch, setPasswordMatch] = useState(true);



  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({
        ...formData,
        profileImage: files[0], // Handling the file separately
      });
    } else {
      setFormData({
        ...formData,
        [name]: value, // Handling text input fields normally
      });
    }
  };



const handleSubmit = async (e) =>{
  e.preventDefault();
 

try{

  const register_form = new FormData()
  for (var key in formData){
    register_form.append(key, formData[key])
  }
  const response = await fetch("http://localhost:7000/auth/register",{
    method:"POST",
    body:register_form,
  });
  
if(response.ok){
  navigate("/login")
}

}catch(err){
   console.log("Registration failed",  err.message)
}

}





useEffect(()=>{
  setPasswordMatch(
    formData.password === formData.confirmPassword || 
      formData.confirmPassword ===""

  );
}, [formData.password, formData.confirmPassword]);//added dependency array to avoid infinite loop




  //console.log(formData);

  return (
    <div className="absolute inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-4 bg-white w-[400px] p-8 rounded-xl shadow-lg text-[14px]"
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign Up</h3>

          <input
            onChange={handleChange}
            value={formData.firstName}
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            className="bg-gray-100 border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-secondary"
          />

          <input
            onChange={handleChange}
            value={formData.lastName}
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            className="bg-gray-100 border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-secondary"
          />

          <input
            onChange={handleChange}
            value={formData.email}
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="bg-gray-100 border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-secondary"
          />

          <input
            onChange={handleChange}
            value={formData.password}
            type="password"
            name="password"
            placeholder="Password"
            required
            className="bg-gray-100 border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-secondary"
          />

          <input
            onChange={handleChange}
            value={formData.confirmPassword}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            className="bg-gray-100 border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-secondary"
          />
          {!passwordMatch && <p>Password do not match</p>}

          <div className="flex items-center justify-center mt-3">
            <input
              type="file"
              id="image"
              name="profileImage"
              accept="image/*"
              hidden
              required
              onChange={handleChange} // Handle file input change
            />
            <label htmlFor="image">
              <div className="flex flex-col items-center justify-center cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-sm hover:bg-gray-200">
                {formData.profileImage ? (
                  <img
                    src={URL.createObjectURL(formData.profileImage)}
                    alt="profileImage"
                    className="p-1 h-16 object-contain aspect-square"
                  />
                ) : (
                  <MdUpload className="text-secondary text-1xl" />
                )}
                <span className="text-sm text-gray-600 mt-2">Upload Photo</span>
              </div>
            </label>
          </div>

          <button
            type="submit"
            className="bg-secondary text-white p-3 rounded-md mt-4 hover:bg-secondary-dark"
          >
            Register
          </button>

          <div className="text-gray-600 mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-secondary font-semibold">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
