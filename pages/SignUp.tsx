import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpForm } from "../components/Forms/SignUp";
import { SignUpUser } from "../@types";
import API from "../services/API";

export function SignUp() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  function handleSignUp(values: SignUpUser) {
    // loading...
    setLoading(true);

    const newUser: SignUpUser = {
      name: values.name,
      email: values.email,
      password: values.password,
      avatar: `avatar${Math.floor(Math.random() * 17) + 1}.svg`,
    };

    API.post("6755e4cb-4ff5-4f00-b965-f82999e627c4", newUser)
      .then((result) => {
        createUser(result, newUser);
      })
      .finally(() => {
        // só pra dar um loading
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 800);
      });
  }

  async function createUser(result: any, newUser: SignUpUser) {
    // simulando a criação de usuário
    // não estou validando duplicados
    let userList: Array<any> = JSON.parse(
      localStorage.getItem("@userlist") as string
    );

    userList = userList
      ? [
          ...userList,
          { ...newUser, token: result.data.token, id: userList.length + 1 },
        ]
      : [{ ...newUser, token: result.data.token, id: 1 }];

    localStorage.setItem("@userlist", JSON.stringify(userList));
  }

  return (
    <div className="sign-form">
      <main>
        <SignUpForm handleSignUp={handleSignUp} loading={loading} />
      </main>
    </div>
  );
}
