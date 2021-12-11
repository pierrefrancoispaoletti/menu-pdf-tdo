import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AppContainer,
  NavContainer,
  ProductsContainer,
  ProductTitleContainer,
} from "./document.style";
const fetchEndpoints = async (endpoint) => {
  return await axios({
    method: "GET",
    url: `https://le-tdo.com/wp-json/wp/v2/${endpoint}?status[]=publish&per_page=50&order=asc`,
  });
};

const endpoints = [
  "pizzas",
  "les_antipasti",
  "ptes_et_risottos",
  "tagliate",
  "la_carne",
  "les_desserts",
];

const types = [
  "Pizze",
  "Antipasti",
  "Pasta e Risotti",
  "Tagliates",
  "La Carne",
  "Desserts",
];
const PdFDocument = ({ setLoading }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setLoading(true);
    const fetchFunction = async () => {
      const productsArray = await axios.all(
        endpoints.map((endpoint) => fetchEndpoints(endpoint))
      );
      setProducts(
        productsArray.map((productArray) => productArray.data).flat()
      );
      setLoading(false);
    };
    fetchFunction();
  }, []);

  const styles = StyleSheet.create({
    PageContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    ProductsContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "12px",
    },
    ProductsContainerH1: {
      textDecoration: "underline",
      fontSize: "30px",
    },
    ProductTitleContainer: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      margin: "auto",
      textAlign: "center",
    },
    ProductTitleContainerH2: {
      marginBottom: "8px",
      textAlign: "center",
      fontSize: "24px",
    },

    ProductTitleContainerH3: {
      fontSize: "24px",
      textAlign: "center",
    },
    ProductContent: {
      margin: "auto",
      fontSize: "18px",
      width: "80%",
      textAlign: "center",
      padding: "8px",
    },
  });
  return (
    <Document>
      <Page>
        <View style={styles.PageContent}>
          {types.map((type, index) => (
            <View key={index} id={type} style={styles.ProductsContainer}>
              <Text style={styles.ProductsContainerH1}>
                {type === "Tagliates" ? "Pesce" : type}
              </Text>
              {products.map(
                (product) =>
                  product["type"] === type && (
                    <View key={product.id} style={styles.ProductsContainer}>
                      <View style={styles.ProductTitleContainer}>
                        <Text style={styles.ProductTitleContainerH2}>
                          {product.title.rendered}
                        </Text>
                        <Text style={styles.ProductTitleContainerH3}>
                          {product.meta.prix} <small>€</small>
                        </Text>
                      </View>
                      <Text style={styles.ProductContent}>
                        {product.content.rendered.replace(/(<([^>]+)>)/gi, "")}
                      </Text>
                    </View>
                  )
              )}
            </View>
          ))}
        </View>
        {/* <AppContainer>
          <NavContainer>
            <ul>
              {types.map((type) => (
                <li key={type}>
                  <a href={`#${type}`}>
                    {type === "Tagliates" ? "Pesce" : type}
                  </a>
                </li>
              ))}
            </ul>
          </NavContainer>
          {types.map((type, index) => (
            <ProductsContainer key={index} id={type}>
              <h1>{type === "Tagliates" ? "Pesce" : type}</h1>
              {products.map(
                (product) =>
                  product["type"] === type && (
                    <ProductsContainer key={product.id}>
                      <ProductTitleContainer>
                        <h2>{product.title.rendered}</h2>
                        <h3>
                          {product.meta.prix} <small>€</small>
                        </h3>
                      </ProductTitleContainer>
                      <p>
                        {product.content.rendered.replace(/(<([^>]+)>)/gi, "")}
                      </p>
                    </ProductsContainer>
                  )
              )}
            </ProductsContainer>
          ))}
        </AppContainer> */}
      </Page>
    </Document>
  );
};

export default PdFDocument;
