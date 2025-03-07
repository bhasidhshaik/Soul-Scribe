import React, { useRef } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../api/api.js";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const googleLoginButtonRef = useRef(null);
  const handleLoginSuccess = async (response) => {
    const idToken = response.credential; // Get the ID token directly from the response
    const res = await googleLogin(idToken);
    window.location.reload()
  };

  const handleLoginFailure = (error) => {
    console.log("Login failed:", error);
  };

  const triggerGoogleLogin = () => {
    // Trigger the Google login button click
    if (googleLoginButtonRef.current) {
      googleLoginButtonRef.current.click();
    }
  };
  

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 justify-center items-center login-bg relative">
      <div className="w-full h-full login-overlay absolute top-0 left-0"></div>
      <div className=" text-center z-10">
      <h2 className="text-white font-semibold text-2xl mb-2">
              No one to share your thoughts with?
            </h2>
            <h3 className="text-white font-medium text-xl">
              Shiba's all ears! Tell me about your day—I'm here for you.
            </h3>
      </div>
      <div className="bg-primary-dark p-12 rounded-xl z-10 flex flex-col items-center text-white gap-6">

        <img src={Logo} alt="Logo" className="w-16 h-16" />
        <h2 className="font-bold lg:text-3xl text-2xl">Welcome to Soul Scribe</h2>
        <p className="text-lg">Sign in to continue</p>
        <div className="btn w-full relative">
        <GoogleLogin
        // ref={googleLoginButtonRef} 
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
        {/* <button onClick={triggerGoogleLogin} className=" absolute top-0 left-0 flex items-center w-full justify-center cursor-pointer text-white gap-x-4 tracking-widest bg-primary-light px-4 py-4 rounded-3xl font-medium text-sm hover:bg-blue-800 transition-all ease-in duration-200"
>
<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width={25} height={25} fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"><path d="M32.582 370.734C15.127 336.291 5.12 297.425 5.12 256c0-41.426 10.007-80.291 27.462-114.735C74.705 57.484 161.047 0 261.12 0c69.12 0 126.836 25.367 171.287 66.793l-73.31 73.309c-26.763-25.135-60.276-38.168-97.977-38.168-66.56 0-123.113 44.917-143.36 105.426-5.12 15.36-8.146 31.65-8.146 48.64 0 16.989 3.026 33.28 8.146 48.64l-.303.232h.303c20.247 60.51 76.8 105.426 143.36 105.426 34.443 0 63.534-9.31 86.341-24.67 27.23-18.152 45.382-45.148 51.433-77.032H261.12v-99.142h241.105c3.025 16.757 4.654 34.211 4.654 52.364 0 77.963-27.927 143.592-76.334 188.276-42.356 39.098-100.305 61.905-169.425 61.905-100.073 0-186.415-57.483-228.538-141.032v-.233z" fill="#fff"/></svg>
  Signin with Google
</button> */}
        </div>


      </div>
    </div>
  );
};

export default SignIn;
