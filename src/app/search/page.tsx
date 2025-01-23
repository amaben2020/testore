import React from 'react';
import { searchProducts } from './action';
import { fetchAPI } from '../../lib/fetchAPI';
import { getCategoryByHandle, listCategories } from '../../lib/data/categories';

const fetchProducts = async (queryParams: string) => {
  const url = `/store/products?q=black`;
  return fetchAPI(url);
};

const page = async ({ searchParams }: { searchParams: any }) => {
  // const queryParams = new URLSearchParams(searchParams);
  const queryParams = await searchParams;

  console.log('queryParams', queryParams);

  const products = await fetchProducts(String(queryParams));

  const category = await getCategoryByHandle(['watches']);
  const listCategory = await listCategories({});
  console.log('category', category);
  console.log('listCategory', listCategory);

  return (
    <div>
      <form action={searchProducts}>
        <input type="text" name="q" placeholder="Search products" />
        <select name="category">
          <option value="">All Categories</option>
          <option value="cat_01">Category 1</option>
          <option value="cat_02">Category 2</option>
        </select>
        <input type="number" name="priceMin" placeholder="Min Price" />
        <input type="number" name="priceMax" placeholder="Max Price" />
        <select name="sort">
          <option value="variants.calculated_price">Price (Low to High)</option>
          <option value="-variants.calculated_price">
            Price (High to Low)
          </option>
        </select>
        <button type="submit">Search</button>
      </form>
      <main>
        {JSON.stringify(products)}
        <h1>Search Results</h1>
        {products?.length > 0 ? (
          <ul>
            {products?.map((product: any) => (
              <li key={product.id}>{product.title}</li>
            ))}
          </ul>
        ) : (
          <p>No products found.</p>
        )}
      </main>
    </div>
  );
};

export default page;
