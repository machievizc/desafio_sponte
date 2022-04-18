import * as Yup from "yup";

const SignInValidatorSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .max(254, "Máximo de 254 caracteres")
    .required("Campo obrigatório")
    .email("Email inválido")
    .test("Email inválido", (val: any) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
    ),
  password: Yup.string()
    .trim()
    .max(30, "Máximo de 30 caracteres")
    .required("Campo obrigatório"),
});

export default SignInValidatorSchema;
