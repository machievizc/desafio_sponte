import styled from "styled-components";
import SignUpValidationSchema from "../../../validators/SignUp/index";
import { Formik, Form } from "formik";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { Link } from "../../Link";
import { Toolbar } from "../../Toolbar";

interface Props {
  handleSignUp?: (values: any) => void;
  loading?: boolean;
}

const FormikToBeStyled = ({ className, ...props }: any) => (
  <div className={className}>
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirm: "",
      }}
      validationSchema={SignUpValidationSchema}
      onSubmit={(values: any, { resetForm }) => {
        props.handleSignUp(values);
        resetForm();
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className="form-column">
            <h4>CADASTRAR-SE</h4>
            <Input
              value={values.name}
              name="name"
              type="text"
              placeholder="Nome"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              value={values.email}
              placeholder="E-mail"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="form-inline">
              <div className="form-column">
                <Input
                  value={values.password}
                  placeholder="Senha"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="form-column">
                <Input
                  value={values.confirm}
                  placeholder="Confirmar senha"
                  type="password"
                  name="confirm"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          </div>
          <div className="form-column">
            <Toolbar justifyContent="center" alignItems="center">
              <Button
                type="submit"
                disabled={props.loading}
                children="ENVIAR"
              />
            </Toolbar>
            <Toolbar justifyContent="center" alignItems="center">
              <Link
                children="Ja sou cadastrado"
                to={props.loading ? "#" : "/"}
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
    min-width: 50%;
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
`;

export function SignUpForm(props: Props) {
  return <StyledFormik {...props} />;
}
