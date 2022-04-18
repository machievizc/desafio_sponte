import "./style.scss";
import { Product, User } from "../../@types";
import { IconButton } from "../../components/IconButton";
import { Input } from "../../components/Input";
import * as moment from "moment";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import CurrencyFormat from "react-currency-format";
import { LoadingIcon } from "../LoadingIcon";

interface Props {
  products: Array<Product>;
  user?: User;
  loading?: boolean;
  handleDeleteProduct?: (id: number) => void;
}

function Items({ ...props }: any) {
  const [backup, setBackup] = useState<Array<Product>>([]);
  // estes serão filtrados na busca
  const [items, setItems] = useState<Array<Product>>([]);
  // preciso pra pegar as categorias
  const [totalItems, setTotalItems] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setTotalItems(props.products);
    setItems(props.currentItems);
    setBackup(props.currentItems);
  }, [props.currentItems, props.products]);

  function handleSearchBox(event?: any) {
    setItems(backup);
    setDisabled(event && event !== "" ? true : false);

    if (event && event !== "") {
      let search = totalItems.filter((product: Product) => {
        return product.titulo
          .toLowerCase()
          .trim()
          .includes(event.toLowerCase().trim());
      });

      setItems(search);
    }
  }

  let categorias: Array<string> = [];

  if (totalItems && totalItems.length) {
    totalItems.map((product: Product, i: number) => {
      if (product.categorias) {
        categorias = [
          ...categorias,
          ...product.categorias.map((categoria: string) => categoria),
        ];
      }
      // fazer as categorias não se repetirem
      if (i === totalItems.length - 1) {
        categorias = [...new Set(categorias)];
      }
    });
  }

  return (
    <>
      {/* produtos */}
      <div className="row">
        <div className="column">
          <div className="filter">
            <div className="filter-form">
              <Formik
                initialValues={{
                  buscar: "",
                }}
                onSubmit={(values: any, { resetForm }) => {
                  //   resetForm();
                }}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {({ values, handleChange, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="inline">
                      <Input
                        value={values.buscar}
                        name="buscar"
                        type="text"
                        placeholder="Procurar produto"
                        onChange={(e) => {
                          handleChange(e);
                          handleSearchBox(e.target.value);
                        }}
                      />
                    </div>
                    <div className="filter-list"></div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="products">
            <ul>
              {items && items.length ? (
                items.map((product: Product, i: number) => {
                  return (
                    <li key={i}>
                      {!props.loading ? (
                        <>
                          <div className="product-card-image">
                            <img
                              src={
                                product.imagem ||
                                "https://via.placeholder.com/150"
                              }
                              alt="Produto"
                            />
                          </div>
                          <div className="items-ontop">
                            <div className="product-title">
                              <h2>{product.titulo}</h2>
                            </div>
                            <div className="product-date">
                              <span>
                                <h4>Data de aquisição: </h4>{" "}
                                {moment(product.dataAquisicao).format(
                                  "DD/MM/YYYY"
                                )}
                                <h4>Código de barras: </h4>{" "}
                                {product.codigoBarras}
                              </span>
                            </div>
                            <div className="product-categories">
                              {<h4>Categorias: </h4>}
                              {product.categorias.map(
                                (category: string, i: number) => {
                                  return (
                                    <span key={i}>
                                      {product.categorias.length === i + 1
                                        ? category
                                        : `${category}, `}
                                    </span>
                                  );
                                }
                              )}
                            </div>
                            <div className="product-description">
                              <h4>Descrição: </h4>{" "}
                              <p>
                                {product.descricao &&
                                product.descricao.length >= 120
                                  ? `${product.descricao.slice(0, 117)} ...`
                                  : product.descricao}
                              </p>
                            </div>
                          </div>
                          <div className="button-wrapper">
                            <span className="currency">
                              {
                                <CurrencyFormat
                                  value={product.valor}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"R$"}
                                  renderText={(value) => <div>{value}</div>}
                                />
                              }
                            </span>
                            {props.user && props.user.id === product.user.id && (
                              <div className="inline">
                                <IconButton
                                  onClick={() =>
                                    props.handleDeleteProduct(product.id)
                                  }
                                  children="delete"
                                  color="red"
                                />
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <LoadingIcon color="green" />
                        </>
                      )}
                    </li>
                  );
                })
              ) : (
                <div className="row">
                  <span className="no-items">Nenhum item encontrado</span>
                </div>
              )}
            </ul>
          </div>
          {items && items.length > 0 && !disabled && (
            <div className="pagination-wraper">{props.children}</div>
          )}
        </div>
      </div>
    </>
  );
}

function PaginatedItemList({ ...props }: any) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + props.itemsPerPage;

    setCurrentItems(props.products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.products.length / props.itemsPerPage));
  }, [props.products, itemOffset]);

  const handlePageClick = (event: any) => {
    const newOffset =
      (event.selected * props.itemsPerPage) % props.products.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items
        {...props}
        currentItems={currentItems}
        products={props.products}
        totalItems={props.products}
        user={props.user}
        children={
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            containerClassName="pagination"
          />
        }
      />
    </>
  );
}

export function ProductList(props: Props) {
  return PaginatedItemList({
    ...props,
    products: props.products,
    user: props.user,
    itemsPerPage: 5,
  });
}
