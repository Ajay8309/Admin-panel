import React, { useState } from 'react';
import LeftNavigation from '../../components/LeftNav/LeftNav';
import Arrowleft from '../../assets/arrowLeft.jpeg';
import Arrowright from '../../assets/arrowRight.jpeg';
import s from './Products.module.css';
import { useProduct } from '../../context/ProductContext';
import Nav from '../../components/Navigation/Nav';
import { useNavigate, Link } from 'react-router-dom';

const Products = () => {
  const { products, setProducts, page, setPage } = useProduct();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredProducts = products && products.filter((product) => {
    const productName = product.name || '';
    const productCategory = product.category || '';
    return (
      productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      productCategory.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      console.log('Cannot go to previous page');
    }
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className={s.container}>
      <LeftNavigation />
      <div className={s.rightContainer}>
        <Nav isProductsPage={true} selectAll={false} onSearch={handleSearch} />
        <div className={s.userList}>
          <div className={s.cardTitles}>
            <div className={s.blank}></div>
            <h2 className={s.cardTitleFirstName}>Name</h2>
            <h2 className={s.cardTitleLastName}>Weight</h2>
            <h2 className={s.cardTitleEmail}>Price</h2>
          </div>
          <div className={s.cardContainer}>
            {filteredProducts && filteredProducts.length > 0 ? (
              <div className={s.scrollableContainer}>
                {filteredProducts.map((item) => (
                  <div className={s.card} key={item.id}>
                    <div className={s.checkBoxAndProfile}>
                      <input type="checkbox" />
                      <div className={s.profilePicture}>
                        <img src={item.image_url} alt="" />
                      </div>
                    </div>
                    <div
                      className={s.itemContainer}
                      onClick={() => navigate(`/edit-product/${item.product_id}`)}
                    >
                      <div className={s.UserData}>
                        <p className={s.UserData1}>{item.name}</p>
                      </div>
                      <div className={s.UserData}>
                        <p className={s.UserData2}>{item.weight}</p>
                      </div>
                      <div className={s.UserDataEmail}>
                        <p className={s.UserData3}>{item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={s.noProductsMessage}>
                <p>No products found. Add products using the + button below.</p>
              </div>
            )}
          </div>
        </div>
        <div className={s.pagination}>
          <button className={s.previousPageButton} onClick={prevPage}>
            <img src={Arrowleft} alt="" className={s.ArrowL} />
          </button>
          <div className={s.pageInfo}>
            <p className={s.currentPage}>{page} page {page + 1}</p>
          </div>
          <button className={s.nextPageButton} onClick={nextPage}>
            <img src={Arrowright} className={s.ArrowR} alt="" />
          </button>
        </div>
        <Link to={'/add-product'}>
          <div className={s.addButtonContainer}>
            <button className={s.addButton}>+</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Products;
