import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";

export const phoneSchema = Yup.object(
    {
    phone: Yup.string()
        .required("Phone is required")
        .test(
            "is-valid-phone",
            "Invalid phone number",
            (value) => value && isValidPhoneNumber(value)
        )
});

export const otpSchema = Yup.object(
    {
    otp: Yup.string()
        .required("OTP is required")
        .length(4, "OTP must be of 4-digits")
});
