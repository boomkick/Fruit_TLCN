import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
LoginGoogle.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
function LoginGoogle(props) {
  const CLIENT_ID =
    "1044609268429-eqkujr6ojdtngp1ni7580oju1a761vhs.apps.googleusercontent.com";
  const handleCallbackRes = (res) => {
    // Submit type = 2 => Google submit
    props.onSubmit({ token: res.credential }, 2);
  };

  useEffect(() => {
    /* global google */
    if(!google){
      console.log("google: ", google)
      toast.warning("Bạn vui lòng truy cập mạng!");
      return
    }
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCallbackRes,
    });
    google.accounts.id.renderButton(document.getElementById("signInGoogleDiv"), {
      them: "filled_blue",
      size: "large",
    });
  }, []);

  return (
    <div>
      <div id="signInGoogleDiv"></div>
    </div>
  );
}
export default LoginGoogle;
