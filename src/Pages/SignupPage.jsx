import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDone } from "react-icons/md";
import { BiShowAlt, BiHide } from "react-icons/bi";
import AuthContext from "../Authantiation/AuthContext";
import { Navigate, useNavigate } from "react-router";
import axios from "axios";


const SignupPage = () => {
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [numberInclude, setNumberInclude] = useState(false);
  const [charMin, setCharMin] = useState();
  const [passValue, setPassValue] = useState("");
  const [verified, setVerified] = useState(false);
  const [passShow, setPassShow] = useState(!true);
  const [confirmPassShow, setConfirmPassShow] = useState(!true);

  const { signInWithGoogle, signUpUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (uppercase && lowercase && specialChar && numberInclude && charMin) {
      setVerified(true);
    }
  }, [uppercase, lowercase, specialChar, numberInclude, charMin]);

  useEffect(() => {
    if (passValue) {
      setUppercase(/[A-Z]/.test(passValue));
      setLowercase(/[a-z]/.test(passValue));
      setNumberInclude(/[0-9]/.test(passValue));
      setSpecialChar(/[^A-Za-z0-9]/.test(passValue));
      setCharMin(passValue.length >= 6);
    } else {
      setUppercase(false);
      setLowercase(false);
      setNumberInclude(false);
      setSpecialChar(false);
      setCharMin(false);
    }
  }, [passValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    if (values.password !== values.confirmPassword) {
      return toast.error("Password do not matching with confirm password.")
    }

    if (verified === false) {
      return toast.error("Please complete our password recommendation.")
    }

    signUpUser(values?.email, values?.password)
      .then((result) => {
        console.log(result);
        axios.post("http://localhost:3000/users", {
          displayName: values?.firstName && values?.lastName ? values?.firstName + " " + values?.lastName : "New User",
          email: values?.email ?? null,
          phoneNumber: values?.phone ?? null,
          gender: values?.gender ?? null,
          password: values?.password ?? null,
          birthDate: values?.date ?? null,
          bio: "",
          avatar: "",
          social: {
            website: "",
            linkedin: "",
            twitter: "",
            facebook: ""
          },
          privacy: {
            profilePublic: true,
            showEmail: false,
            showPhone: false
          },
          skills: [],
          education: [],
          createdAt: new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          }),
          updatedAt: new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          }),
        })
          .then(res => {
            console.log("User created:", res.data);
            navigate("/");
            window.scrollTo(0, 0);
          })
          .catch(err => {
            console.error("Error creating user:", err);
          })
      }).catch((err) => {
        toast.error(err)
      });
  };


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

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then((res) => {
        const user = res?.user;
        navigate("/");
        window.scrollTo(0, 0);
        axios.post("http://localhost:3000/users", {
          displayName: user?.displayName ?? "New User",
          email: user?.email ?? null,
          phoneNumber: user?.phone ?? null,
          gender: user?.gender ?? null,
          password: user?.password ?? null,
          birthDate: user?.date ?? null,
          bio: "",
          avatar: user?.photoURL ?? "",
          social: {
            website: "",
            linkedin: "",
            twitter: "",
            facebook: ""
          },
          privacy: {
            profilePublic: true,
            showEmail: false,
            showPhone: false
          },
          skills: [],
          education: [],
          createdAt: new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          }),
          updatedAt: new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          }),
        })
          .then((res) => {
            console.log(res);
          })
      })
      .catch(() => {
        toast.error("Please try again!");
      })
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
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
              <label className="text-sm text-white font-medium">{field.label}<span className="text-xl text-red-500">*</span></label>
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
              ) : field.name === "password" ? (
                <div className="relative w-full">
                  <input
                    name={field.name}
                    type={passShow ? "text" : "password"}
                    onChange={e => setPassValue(e.target.value)}
                    autoComplete="off"
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    className="px-5 py-3 rounded-xl border border-white/30 bg-white/90 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md w-full pr-12"
                    required={field.name !== "phone"}
                  />
                  <button
                    type="button"
                    onClick={() => setPassShow(!passShow)}
                    className="absolute inset-y-0 right-3 flex items-center text-black"
                  >
                    {passShow ? <BiShowAlt className="text-2xl" /> : <BiHide className="text-2xl" />}
                  </button>
                </div>
              ) : field.name === "confirmPassword" ? (
                <div className="relative w-full">
                  <input
                    name={field.name}
                    type={confirmPassShow ? "text" : "password"}
                    autoComplete="off"
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    className="px-5 py-3 rounded-xl border border-white/30 bg-white/90 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md w-full pr-12"
                    required={field.name !== "phone"}
                  />
                  <button
                    onClick={() => setConfirmPassShow(!confirmPassShow)}
                    className="absolute inset-y-0 right-3 flex items-center text-black"
                  >
                    {confirmPassShow ? <BiShowAlt className="text-2xl" /> : <BiHide className="text-2xl" />}
                  </button>
                </div>
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

          <motion.div
            initial="hidden"
            animate="visible"
            className="px-2 text-sm space-y-1">
            <p className="flex items-center gap-1">
              {uppercase ? (
                <MdOutlineDone className="text-green-500 font-bold" />
              ) : (
                <RxCross2 className="text-red-500" />
              )}
              {uppercase ? (
                <span className="text-white">Minimum one uppercase</span>
              ) : (
                <del className="text-gray-400">Minimum one uppercase</del>
              )}
            </p>

            <p className="flex items-center gap-1">
              {lowercase ? (
                <MdOutlineDone className="text-green-500 font-bold" />
              ) : (
                <RxCross2 className="text-red-500" />
              )}
              {lowercase ? (
                <span className="text-white">Minimum one lowercase</span>
              ) : (
                <del className="text-gray-400">Minimum one lowercase</del>
              )}
            </p>

            <p className="flex items-center gap-1">
              {numberInclude ? (
                <MdOutlineDone className="text-green-500 font-bold" />
              ) : (
                <RxCross2 className="text-red-500" />
              )}
              {numberInclude ? (
                <span className="text-white">Minimum one number</span>
              ) : (
                <del className="text-gray-400">Minimum one number</del>
              )}
            </p>

            <p className="flex items-center gap-1">
              {specialChar ? (
                <MdOutlineDone className="text-green-500 font-bold" />
              ) : (
                <RxCross2 className="text-red-500" />
              )}
              {specialChar ? (
                <span className="text-white">Minimum one special character</span>
              ) : (
                <del className="text-gray-400">Minimum one special character</del>
              )}
            </p>

            <p className="flex items-center gap-1">
              {charMin ? (
                <MdOutlineDone className="text-green-500 font-bold" />
              ) : (
                <RxCross2 className="text-red-500" />
              )}
              {charMin ? (
                <span className="text-white">At least 6 characters</span>
              ) : (
                <del className="text-gray-400">At least 6 characters</del>
              )}
            </p>
          </motion.div>


          {/* Submit Button */}
          <motion.div
            className="col-span-2 flex justify-center mt-2"
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            type="button"
            onClick={() => handleSignInWithGoogle()}
            className="flex items-center justify-center gap-3 w-full md:w-1/2 bg-white text-gray-700 font-medium px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 transition-all"
          >
            <FcGoogle className="text-2xl" />
            Sign up with Google
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            type="button"
            className="flex items-center justify-center gap-3 w-full md:w-1/2 bg-white text-gray-700 font-medium px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 transition-all"
          >
            <FaFacebook className="text-blue-500 text-2xl" />
            Sign up with Facebook
          </motion.button>
        </motion.div>
      </motion.div>

      <div>
        <Toaster />
      </div>
    </div>
  );
};

export default SignupPage;
