/* eslint-disable prettier/prettier */
"use server";

const URL = `http://localhost:3000/api`;
const temuApi = "https://freeapi.miniprojectideas.com/api/BigBasket/";
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Date: "Fri, 28 Feb 2025 12:49:51 GMT",
    Server: "Kestrel",
    "X-Powered-By": "ASP.NET",
    "X-Powered-By-Plesk": "PleskWin",
  },
};

export async function getAllProducts() {
  try {
    const products = await fetch(`${URL}/products`);
    const items = await products.json();

    console.log(items);

    return items;
  } catch (error) {
    console.log(error);
  }
}

export const getSingleProduct = async (id) => {
  try {
    const products = await fetch(`${URL}/products`);
    const items = await products.json();
    const singleProduct = items.find((item) => item.id === id);

    console.log(singleProduct);

    return singleProduct;
  } catch (error) {
    console.log(error);
  }
};

export const getTemuProduct = async () => {
  try {
    const products = await fetch(`${temuApi}/GetAllProducts`, options);
    const response = await products.json(); // Parse the response as JSON
    
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleTemuProduct = async (id) => {
  try {
    if (!id) throw new Error("No such product")
      console.log(id)
    const numId  = parseInt(id)
    // const products = await fetch(`${temuApi}/GetProductById?id=${id}`, options);
    // const response = await products.json(); 

    // return response;
    const products = await getTemuProduct();
    const {data} = products
    const singleProduct = data.find((item) => item.productId === numId );
    
    console.log(singleProduct)

    return singleProduct
  } catch (error) {
    console.log(error);
  }
};
export const getTemuCategories = async () => {
  try {
    const products = await fetch(`${temuApi}/GetAllCategory`, options);
    const response = await products.json(); // Parse the response as JSON
    
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getTemuCategoriesById = async (id) => {
  try {
    const products = await fetch(
      `${temuApi}/GetAllProductsByCategoryId?id=${id}`,
      options
    );
    const response = await products.json(); // Parse the response as JSON

    return response;
  } catch (error) {
    console.log(error);
  }
};


