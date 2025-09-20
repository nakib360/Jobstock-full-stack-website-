import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

const SignupPage = () => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    if(values.password !== values.confirmPassword){
      return toast.error("Password do not matching. Please Confirm Password.")
    }

    console.log(values);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-24 ">
      {/* Card with animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full m-20 bg-[#0b8260] backdrop-blur-lg rounded-2xl shadow-2xl p-10"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Your Account
        </h2>
        <p className="text-white/80 text-center mb-10">
          Please fill in your details to register
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            { label: "First Name", type: "text", name: "firstName" },
            { label: "Last Name", type: "text", name: "lastName" },
            { label: "Date of Birth", type: "date", name: "date" },
            { label: "Gender", type: "select", name: "gender" },
            { label: "Email", type: "email", name: "email" },
            { label: "Phone", type: "tel", name: "phone" },
            { label: "Password", type: "password", name: "password" },
            { label: "Confirm Password", type: "password", name: "confirmPassword" },
          ].map((field, i) => (
            <motion.div
              key={field.name}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2"
            >
              <label className="text-sm text-white font-medium">{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  className="px-5 py-3 rounded-xl border border-white/30 bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md"
                  required
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              ) : (
                <input
                  name={field.name}
                  type={field.type}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                  className="px-5 py-3 rounded-xl border border-white/30 bg-white/90 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md"
                  required={field.name !== "phone"}
                />
              )}
            </motion.div>
          ))}

          {/* Submit Button */}
          <motion.div
            className="col-span-2 flex justify-center mt-6"
            variants={itemVariants}
            custom={9}
            initial="hidden"
            animate="visible"
          >
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
            >
              Register
            </button>
          </motion.div>
        </form>


        {/* Divider */}
        <motion.div
          variants={itemVariants}
          custom={10}
          initial="hidden"
          animate="visible"
          className="flex items-center my-8"
        >
          <hr className="flex-grow border-white/30" />
          <span className="px-4 text-white/80 text-sm">OR</span>
          <hr className="flex-grow border-white/30" />
        </motion.div>

        {/* Social Buttons */}
        <motion.div
          variants={itemVariants}
          custom={11}
          initial="hidden"
          animate="visible"
          className="flex justify-center gap-5"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="flex items-center justify-center gap-3 w-full md:w-1/2 bg-white text-gray-700 font-medium px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 transition-all"
          >
            <FcGoogle className="text-2xl" />
            Sign up with Google
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="flex items-center justify-center gap-3 w-full md:w-1/2 bg-white text-gray-700 font-medium px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 transition-all"
          >
            <FaFacebook className="text-blue-500 text-2xl" />
            Sign up with Facebook
          </motion.button>
        </motion.div>
      </motion.div>

      <div>
        <Toaster/>
      </div>
    </div>
  );
};

export default SignupPage;
