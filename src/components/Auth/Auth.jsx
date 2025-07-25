import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login submitted:", {
        email: formData.email,
        password: formData.password,
      });
    } else {
      console.log("Register submitted:", formData);
    }
  };

  const goToHome = () => {
    console.log("Navigating to home...");
    alert("Would navigate to home page!");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-5"
      style={{ backgroundColor: "#F5F5DC" }}
    >
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FF6262] via-[#D8FF50] to-[#FFEA58] px-8 py-12 text-center text-gray-600">
          <h1 className="text-3xl font-bold mb-3">Welcome</h1>
          <p className="opacity-90">
            Please {isLogin ? "sign in" : "create an account"} to continue
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="p-8 pb-0">
          <div className="bg-gray-100 rounded-xl p-1 flex relative">
            <div
              className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-[#FF6262] via-[#D8FF50] to-[#FFEA58] rounded-lg transition-transform duration-300 ${
                isLogin ? "translate-x-0" : "translate-x-full"
              }`}
            />
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors duration-300 relative z-10 ${
                isLogin ? "text-black" : "text-gray-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors duration-300 relative z-10 ${
                !isLogin ? "text-white" : "text-gray-600"
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 bg-gray-50 focus:bg-white"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 bg-gray-50 focus:bg-white"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 bg-gray-50 focus:bg-white"
                placeholder="Enter your password"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 bg-gray-50 focus:bg-white"
                  placeholder="Confirm your password"
                  required={!isLogin}
                />
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-[#FF6262] via-[#D8FF50] to-[#FFEA58] text-gray-600 py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>

            <button
              onClick={goToHome}
              className="w-full border-2 border-red-400 text-blue-400 py-3 px-6 rounded-xl font-medium hover:bg-blue-500 hover:text-white hover:-translate-y-0.5 transition-all duration-300"
            >
              Go to Home
            </button>

            {isLogin && (
              <div className="text-center mt-4">
                <button
                  className="text-blue-500 text-sm hover:text-blue-600 transition-colors bg-transparent border-none cursor-pointer"
                  onClick={() => console.log("Forgot password clicked")}
                >
                  Forgot your password?
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
