import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { SignInForm } from "../components/Forms/SignIn";
import "../styles/auth.scss";
import { ErrorType, CredentialType } from "../@types";

export function SignIn() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>();

  const { signIn } = useAuth();

  function handleSignIn(values: CredentialType) {
    setError({} as ErrorType);
    setLoading(true);

    signIn({ ...values })
      .then((user) => {
        if (user === undefined) {
          setError({
            message: "Usuário ou senha inválidos",
          });
        }
      })
      .catch((error) => {
        setError({
          message: error.message || "Ocorreu um erro ao tentar logar",
        });
      })
      .finally(() => {
        setLoading(false);
        navigate("/home");
      });
  }

  return (
    <div className="sign-form">
      <main>
        <SignInForm
          handleSignIn={handleSignIn}
          loading={loading}
          error={error}
        />
      </main>
    </div>
  );
}
