import { User } from "../../../@types";
import styled from "styled-components";
import { Formik, Form } from "formik";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { ImageInput } from "../../ImageInput";
import { Toolbar } from "../../Toolbar";
import { StyledDatePicker } from "../../DatePicker";
import NewProductValidatorSchema from "../../../validators/NewProduct/index";
import "react-datepicker/dist/react-datepicker.css";

// Título do produto (limitado à 100 caracteres);
// Descrição longa (caracteres ilimitados);
// Medidas (Altura/largura/comprimento em centímetros);
// Peso do produto (KG);
// Código de barras (numérico);
// Categoria (Pode ser mais de uma);
// Valor (monetário/R$);
// Data de aquisição (Não deve ser superior à data atual);
// Imagem do produto (exibir imagem miniatura);
// Pode inserir mais atributos se julgar necessário.
// A Listagem deve conter:
// Apenas as informações que você julgar relevante do produto.

interface Props {
  user: User;
  loading?: boolean;
  handleNewProduct: (product: any) => void;
}

export function NewProductForm(props: Props) {
  const FormikToBeStyled = ({ className, ...props }: any) => (
    <div className={className}>
      <Formik
        initialValues={{
          titulo: "",
          descricao: "",
          altura: "",
          largura: "",
          comprimento: "",
          peso: "",
          codigoBarras: "",
          valor: "",
          dataAquisicao: new Date(),
          categorias: "",
        }}
        validationSchema={NewProductValidatorSchema}
        onSubmit={(values: any, { resetForm }) => {
          props.handleNewProduct({ ...values, user: props.user });
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="form-column">
              <h4>CADASTRAR PRODUTO</h4>
              <Input
                disabled={props.loading}
                value={values.titulo}
                name="titulo"
                type="text"
                placeholder="Titulo"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                disabled={props.loading}
                value={values.categorias}
                name="categorias"
                type="text"
                placeholder="Categorias separadas por vírgula, ex: categoria1, categoria2..."
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="form-inline">
                <div className="form-column">
                  <Input
                    disabled={props.loading}
                    value={values.codigoBarras}
                    name="codigoBarras"
                    type="text"
                    placeholder="Código de barras"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-column">
                  <StyledDatePicker
                    disabled={props.loading}
                    value={values.dataAquisicao}
                    name="dataAquisicao"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-inline">
                <div className="form-column">
                  <Input
                    disabled={props.loading}
                    value={values.altura}
                    name="altura"
                    type="text"
                    placeholder="Altura"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-column">
                  <Input
                    disabled={props.loading}
                    value={values.largura}
                    name="largura"
                    type="text"
                    placeholder="Largura"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-column">
                  <Input
                    disabled={props.loading}
                    value={values.comprimento}
                    name="comprimento"
                    type="text"
                    placeholder="Comprimento"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-column">
                  <Input
                    disabled={props.loading}
                    value={values.peso}
                    name="peso"
                    type="text"
                    placeholder="Peso"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="form-column">
                  <Input
                    disabled={props.loading}
                    value={values.valor}
                    name="valor"
                    type="text"
                    placeholder="Valor"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <Input
                disabled={props.loading}
                value={values.descricao}
                name="descricao"
                type="text"
                as="textarea"
                placeholder="Descrição..."
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ImageInput
                disabled={props.loading}
                name="file"
                type="file"
                onChange={(event: any) => {
                  setFieldValue("imagem", event.currentTarget.files[0]);
                }}
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
                  children="CADASTRAR"
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
    padding: 1rem;

    form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 16px;
      width: 700px;
      min-height: 400px;
      height: auto;
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

        @media screen and (max-width: 550px) {
          flex-wrap: wrap;
        }
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

  return <StyledFormik {...props} />;
}
