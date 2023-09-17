"use client";

import { ServerRes } from "@/app/market/[id]/models";
import axios from "@/lib/axios";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function SignInForm() {
  const [formValue, setFormValue] = useState({
    mobile: "",
    password: "",
    otp: "",
  });

  const [token, setToken] = useState("");

  const { executeRecaptcha } = useGoogleReCaptcha();

  async function onSubmit() {
    if (!executeRecaptcha) {
      return;
    }

    const token = await executeRecaptcha("onSubmit");

    const res = await axios.post<ServerRes<{ token: string }>>("auth/login/", {
      mobile: formValue.mobile,
      password: btoa(formValue.password),
      recaptcha_response: token,
    });

    setToken(res.data.message.token);
  }

  async function submitOtp() {
    let res = await axios.post("auth/login/verify/otp/", {
      code: formValue.otp,
      mobile: formValue.mobile,
      tracking_id: token,
    });

    console.log(res.data)
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-5">
      {!token ? (
        <>
          <TextField
            id="outlined-basic"
            label="شماره موبایل"
            variant="outlined"
            value={formValue.mobile}
            onChange={(e) =>
              setFormValue((state) => ({ ...state, mobile: e.target.value }))
            }
          />
          <TextField
            id="outlined-basic"
            label="رمز عبور"
            variant="outlined"
            type="password"
            value={formValue.password}
            onChange={(e) =>
              setFormValue((state) => ({ ...state, password: e.target.value }))
            }
          />

          <Button variant="outlined" onClick={onSubmit}>
            ثبت
          </Button>
        </>
      ) : (
        <>
          <TextField
            id="outlined-basic"
            label="otp"
            variant="outlined"
            value={formValue.otp}
            onChange={(e) =>
              setFormValue((state) => ({ ...state, otp: e.target.value }))
            }
          />

          <Button variant="outlined" onClick={submitOtp}>
            ثبت
          </Button>
        </>
      )}
    </div>
  );
}
