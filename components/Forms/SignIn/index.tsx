import styled from "styled-components";
import SignInValidatorSchema from "../../../validators/SignIn/index";
import { Formik, Form } from "formik";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { Link } from "../../Link";
import { Toolbar } from "../../Toolbar";

interface Props {
  handleSignIn?: (values: any) => void;
  loading?: boolean;
  error?: any;
}

const FormikToBeStyled = ({ className, ...props }: any) => (
  <div className={className}>
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={SignInValidatorSchema}
      onSubmit={(values: any, { resetForm }) => {
        props.handleSignIn(values);
        resetForm();
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className="form-column">
            <h4>LOGIN</h4>
            <Input
              value={values.email}
              name="email"
              type="email"
              placeholder="E-mail"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              value={values.password}
              placeholder="Senha"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {props.error && (
              <span className="error">{props.error.message}</span>
            )}
          </div>
          <div className="form-column">
            <Toolbar justifyContent="center" alignItems="center">
              <Button
                type="submit"
                disabled={props.loading}
                children="ENTRAR"
              />
            </Toolbar>
            <Toolbar justifyContent="center" alignItems="center">
              <Link
                children="Não sou cadastrado"
                to={props.loading ? "#" : "/signup"}
              />
            </Toolbar>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

const StyledFormik = styled(FormikToBeStyled)`
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
    min-width: 400px;
    min-height: 400px;
    border: 1px solid #0693e3;
    background-color: #fff;
    border-radius: 15px;
    padding: 16px 26px;

    .form-column {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
    }

    .form-inline {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 10px;
    }

    h4 {
      padding: 20px 0 40px;
      color: #0693e3;
      font-size: 22px;
      align-self: center;
    }
  }

  .error {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: red;
  }
`;

export function SignInForm(props: Props) {
  return <StyledFormik {...props} />;
}
