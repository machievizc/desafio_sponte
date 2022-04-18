import "./style.scss";
import { Header } from "../../components/Header";
import { Product, User } from "../../@types";
import { useAuth } from "../../hooks/useAuth";
import { ProductList } from "../../components/ProductList";
import { NewProductForm } from "../../components/Forms/NewProduct";
import { MenuTabs } from "../../components/TabComponent/Tab";
import { useEffect, useState } from "react";

export function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("product-list");

  function renderTabs(tab: string) {
    switch (tab) {
      case "product-list":
        return (
          <ProductList
            handleDeleteProduct={handleDeleteProduct}
            loading={loading}
            products={products}
            user={user}
          />
        );
      case "add-product":
        return (
          <NewProductForm
            loading={loading}
            handleNewProduct={handleNewProduct}
            user={user as User}
          />
        );
      default:
        return (
          <ProductList
            loading={loading}
            handleDeleteProduct={handleDeleteProduct}
            products={products}
            user={user}
          />
        );
    }
  }

  function handleDeleteProduct(productId: number) {
    setLoading(true);
    setTimeout(() => {
      let prods = getProductsFromStorage();
      if (prods && prods.length) {
        prods = prods.filter((product: Product) => product.id !== productId);
      }

      setProductsToLocal(prods);
      setProducts(prods);
      setLoading(false);
    }, 500);
  }

  function handleNewProduct(prod: any) {
    setLoading(true);

    // não consegui trabalhar com number no formik
    // então caso fosse mandar para uma api...
    prod = {
      ...prod,
      valor: parseInt(prod.valor, 10),
      altura: parseInt(prod.altura, 10),
      largura: parseInt(prod.largura, 10),
      comprimento: parseInt(prod.comprimento, 10),
      codigoBarras: parseInt(prod.codigoBarras, 10),
      peso: parseInt(prod.peso, 10),
    };

    console.log("🚀 ~ file: index.tsx ~ line 73 ~ prod=prod.map ~ prod", prod);

    if (prod.categorias !== "") {
      prod.categorias = splitCategoriesComma(prod.categorias);
    }

    // no lugar de fisicamente salvar a imagem, eu salvo em string
    if (prod.imagem) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(prod.imagem);

      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          fileReader.result;
          prod = { ...prod, imagem: fileReader.result };
        }
      };
    }

    setTimeout(() => {
      let prods = getProductsFromStorage();
      if (prods && prods.length) {
        prods = [...prods, { ...prod, id: prods.length + 1 }];
      } else {
        prods = [{ ...prod, id: 1 }];
      }

      setProductsToLocal(prods);
      setProducts(prods);
      setLoading(false);
    }, 500);
  }

  function splitCategoriesComma(categorias: string) {
    return categorias.split(",").map((categoria: string) => categoria.trim());
  }

  useEffect(() => {
    setProducts(getProductsFromStorage());
  }, []);

  function setProductsToLocal(products: Product[]) {
    localStorage.setItem("@products", JSON.stringify(products));
  }

  function getProductsFromStorage() {
    let prods = JSON.parse(localStorage.getItem("@products") as string);
    return prods || [];
  }

  return (
    <div id="page-home">
      <Header />
      <main>
        <MenuTabs setTab={setTab} />
        {renderTabs(tab)}
      </main>
    </div>
  );
}
