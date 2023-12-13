import { Link } from "react-router-dom";
import styles from "./login.module.css";
import GoogleLogin from "react-google-login";

export default function Login(props: {
  projectUser: string;
  setProjectUser: (user: string) => void;
}) {
  const unsuccessfulLogin = (response: any) => {
    console.log("Login process terminated");
  };

  const handleLogin = (response: any) => {
    // For the purpose of this example, setting a hardcoded email value
    const hardcodedEmail = "example@example.com";
    props.setProjectUser(hardcodedEmail);
  };

  return (
    <div className={styles.container}>
      <div></div>
      <div className={styles.login}>
        <div className={styles.loginBox}>
          <h1>hello</h1>
          <Link to="/">
            {/* <img className={styles.logo} src="/logo192.png" alt="Logo" /> */}
          </Link>
          {/* <button className={styles.button} title="Sign in with Google">
              <img className={styles.google} src="/google.svg"/> Sign in with Google
          </button> */}
          <GoogleLogin
            clientId="956647101334-784vc8rakg2kbaeil4gug1ukefc9vehk.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                className={styles.button}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                title="Sign in with Google"
              >
                <img
                  className={styles.google}
                  src="/google.svg"
                  alt="Google Logo"
                />{" "}
                Sign in with Google
              </button>
            )}
            buttonText="Login"
            onSuccess={handleLogin}
            onFailure={unsuccessfulLogin}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    </div>
  );
}
