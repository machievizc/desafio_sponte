import * as Yup from "yup";

const NewProductValidatorSchema = Yup.object().shape({
  titulo: Yup.string()
    .required("Campo obrigatório")
    .max(100, "Máximo de 100 caracteres"),
  descricao: Yup.string(),
  altura: Yup.number()
    .required("Campo obrigatório")
    .typeError("Apenas números"),
  categorias: Yup.string()
    .required("Campo obrigatório")
    .typeError("Campo deve ser uma string"),
  largura: Yup.number()
    .required("Campo obrigatório")
    .typeError("Apenas números"),
  comprimento: Yup.number()
    .required("Campo obrigatório")
    .typeError("Apenas números"),
  peso: Yup.number().required("Campo obrigatório").typeError("Apenas números"),
  valor: Yup.number().required("Campo obrigatório").typeError("Apenas números"),
  codigoBarras: Yup.number()
    .required("Campo obrigatório")
    .typeError("Apenas números")
    .min(91111111, "Minimo de 8 dígitos")
    .max(99999999999999, "Máximo de 14 dígitos"),
});

export default NewProductValidatorSchema;
