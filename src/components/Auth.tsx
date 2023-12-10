import { authActions } from "@/valtio/auth";

const Auth = () => {
    return (
        <button className="btn" onClick={authActions.login}>
            Vui lòng đăng nhập để tiếp tục
        </button>
    );
};

export default Auth;
