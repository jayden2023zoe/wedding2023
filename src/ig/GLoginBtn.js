
import React, { useEffect, useState } from 'react';
import './GLoginBtn.scss';
import { GoogleLogin } from 'react-google-login';

const GLoginBtn = () => {
  const handleSuccess = (response) => {
    // 在成功登入時處理相應的邏輯
    console.log(response);
  };

  const handleFailure = (error) => {
    // 在登入失敗時處理相應的邏輯
    console.log(error);
  };

  return (
    <GoogleLogin
      clientId="452126761417-rc3j9u22ionq8qiir8j6a940de75jhg3.apps.googleusercontent.com"
      buttonText="Sign in with Google"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GLoginBtn;