import axios from "axios";

export const api_url = axios.create(
    {
        baseURL : import.meta.env.VITE_API_URL
    }
)

export const sendOTP = async(phone) =>{
    try{
        console.time("OtpSendTime");
        const response = await api_url.post("/send-otp",{
            phone
        })
        console.log("OTP sent");
        console.timeEnd("OtpSendTime");
        return response.data;
    }catch(err){
        console.log("Failed to send OTP");
        console.error(err);
    }
}

export const verifyOTP = async(phone,otp) =>{
    try{
        console.time("VerifyTime")
        console.log("Verifying OTP");
        const response = await api_url.post("/verify-otp", {
            phone, otp
        })
        console.log("OTP verified!");
        console.timeEnd("VerifyTime");
        return response.data;
    }catch(err){
        console.log("Failed to veridy OTP");
        console.error(err);
    }
}