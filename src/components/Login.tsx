import { authActions } from "@/valtio/auth";

const Login = () => {
    return (
        <div>
            <button className="btn" onClick={authActions.login}>
                Login with Google
            </button>
        </div>
    );
};

export default Login;
