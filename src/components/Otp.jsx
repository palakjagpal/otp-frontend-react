import {useFormik} from "formik";
import { ToastContainer, toast } from "react-toastify";
import { otpSchema, phoneSchema } from "../validation/ValidationSchema";
import { sendOTP, verifyOTP } from "../api/OtpApi";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Otp.css";
import 'react-phone-number-input/style.css';
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import OTPInput from "react-otp-input";

function Otp(){

    const [otpsent, setotpsent] = useState(false);

    //formik to handle form values and validations
    const formik = useFormik(
        {
            initialValues : {
                phone : "",
                otp : ""
            },

            validationSchema : otpsent ? otpSchema : phoneSchema,

            onSubmit : (values) =>{
                console.log(values);
                if(otpsent){
                    verifyOTPMutation.mutate(
                        {
                            phone : values.phone,
                            otp : values.otp
                        }
                    );
                }else{
                    sendOTPMutation.mutate(values.phone);
                }
            }
        }
    )
    
    //sending OTP
    const sendOTPMutation = useMutation(
        {
            mutationFn : (phone) => sendOTP(phone),

            onMutate : () => {
                toast.info("Sending OTP...");
                console.log("Sending OTP...");
            },

            onSuccess  : () => {
                toast.success("OTP sent successfully!");
                setotpsent(true);
                console.log("OTP sent successfully!");
            },

            onError : () => {
                toast.error("Failed to send OTP");
                console.log("Failed to send OTP");
            }
        }
    )
    

    //verify OTP
    const verifyOTPMutation = useMutation(
        {
            mutationFn : (
                {
                    phone, otp
                }
            ) => verifyOTP(phone,otp),

            onMutate : () => {
                toast.info("Verifying OTP...");
                console.log("Verifying OTP...");
            },

            onSuccess : () => {
                toast.success("OTP verified successfully!");
                console.log("OTP verified successfully!");
                formik.resetForm();
                setotpsent(false);
            },

            onError : () => {
                toast.error("Failed to verify OTP");
                console.log("Failed to verify OTP");
            }
        }
    )

    
    
    
    return(
        <>  
            <div className="main">
                <h1>OTP Verification</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="phone">
                        
                        <PhoneInput
                            international 
                            defaultCountry="IN"
                            value={formik.values.phone}
                            onChange={(value) => formik.setFieldValue("phone", value)}
                            onBlur={() => formik.setFieldTouched("phone", true)}
                            className="phone-input"
                        />
                        {
                            formik.touched.phone && formik.errors.phone &&
                            <p>{formik.errors.phone}</p>
                        }
                    </div>

                    {
                        otpsent &&
                        <div className="otp">
                            <p>Enter OTP below</p>

                            <OTPInput value={formik.values.otp} 
                            onChange={(otp) => formik.setFieldValue("otp",otp)}
                            numInputs={4}
                            isInputNum={true}
                            shouldAutoFocus={true}
                            className="otp-input"
                            renderInput={(props) =>(
                                <input {...props} onBlur={() => formik.setFieldTouched("otp",true)} />
                            )
                        }
                        
                            />

                            {
                                formik.touched.otp && formik.errors.otp &&
                                <p>{formik.errors.otp}</p>
                            }
                        </div>
                    }

                    <div className="button">
                        <button type="submit" >
                            {
                                otpsent ? "Verify OTP" : "Send OTP"
                            }
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer position="top-right"/>
        </>
    )
}

export default Otp;