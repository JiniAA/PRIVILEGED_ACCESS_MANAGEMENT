import { motion } from "framer-motion";
import LoginForm from "./Login_Form";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-300">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-blue-600 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            <LoginForm />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
