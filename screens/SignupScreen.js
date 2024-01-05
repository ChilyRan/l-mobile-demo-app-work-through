import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../util/auth";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuthentication, setIsAuthentucation] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signupHanlder({ email, password }) {
    setIsAuthentucation(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "You could create user, Please check your input try again later."
      );
      setIsAuthentucation(false);
    }
  }
  if (isAuthentication) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return <AuthContent onAuthenticate={signupHanlder} />;
}

export default SignupScreen;
