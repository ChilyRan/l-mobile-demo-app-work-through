import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/auth";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isAuthentication, setIsAuthentucation] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHanlder({ email, password }) {
    setIsAuthentucation(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your creadentials or try again later."
      );
      setIsAuthentucation(false);
    }
  }

  if (isAuthentication) {
    return <LoadingOverlay message="Logging you in..." />;
  }
  return <AuthContent isLogin onAuthenticate={loginHanlder} />;
}

export default LoginScreen;
