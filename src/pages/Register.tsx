// import React from "react";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [username, setUsername] = useState("");

//   const handleRegister = (e) => {
//     e.preventDefault();
//     // Handle login logic here
    
//   };
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div>
//             <img src="cct.jpg" alt="cct photo" className=""/>
//         </div>
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
//         <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
//           Register
//         </h2>
//         <form onSubmit={handleRegister}>
//             <div className="flex gap-4">
//             <input
//             type="text"
//             placeholder="First Name"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             className="py-4 px-6 mb-6 font-bold text-black w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             className="py-4 px-6 mb-6 font-bold text-black w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
//           />
//             </div>
//             <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="py-4 px-6 mb-6 font-bold text-black w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
//           />
//           <input
//             type="email"
//             placeholder="E-mail"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="py-4 px-6 mb-6 font-bold text-black w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="py-4 px-6 font-bold text-black w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
//           />
//           <p className="mb-8">
//             Already have an account,{" "}
//             <Link
//               className="text-blue-800 hover:cursor-pointer hover:underline"
//               to={"/login"}
//             >
//               Login
//             </Link>{" "}
//             as User.
//           </p>
//           <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;






import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (!email || !password || !firstName || !lastName || !username) {
      setMessage("Please fill in all fields");
      return;
    }
    // Handle register logic here
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Image Section */}
      <div className="w-[60%] flex items-center justify-center bg-gray-200">
        <img
          src="cct.jpg"
          alt="cct photo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Section */}
      <div className="w-[70%] flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Register
          </h2>
          <form onSubmit={handleRegister}>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="py-4 px-6 mb-6 font-bold text-black w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="py-4 px-6 mb-6 font-bold text-black w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="py-4 px-6 mb-6 font-bold text-black w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-4 px-6 mb-6 font-bold text-black w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-4 px-6 mb-6 font-bold text-black w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="py-4 px-6 font-bold text-black w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <p className="mb-8">
              Already have an account?{" "}
              <Link
                className="text-blue-800 hover:cursor-pointer hover:underline"
                to={"/login"}
              >
                Login
              </Link>{" "}
              as User.
            </p>
        {message && <span className="text-red-700 font-bold">{message}</span>}
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

