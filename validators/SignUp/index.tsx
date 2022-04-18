import * as Yup from "yup";

const SignUpValidatorSchema = Yup.object().shape({
  name: Yup.string()
    .max(254, "Máximo de 254 caracteres")
    .required("Campo obrigatório"),
  email: Yup.string()
    .min(8, "O e-mail deve ter no mínimo 8 caracteres")
    .max(254, "Máximo de 254 caracteres")
    .required("Campo obrigatório")
    .email("Email inválido")
    .test("Email inválido", (val: any) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
    ),
  password: Yup.string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(30, "Máximo de 30 caracteres")
    .required("Campo obrigatório"),
  confirm: Yup.string().oneOf([Yup.ref("password")], "Senhas não conferem"),
});

export default SignUpValidatorSchema;
