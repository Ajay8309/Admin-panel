import React from 'react';
import LeftNavigation from '../../components/LeftNav/LeftNav';
import Arrowleft from '../../assets/arrowLeft.jpeg';
import Arrowright from '../../assets/arrowRight.jpeg';
import s from './Products.module.css';
import { useProduct } from '../../context/ProductContext';
import Nav from '../../components/Navigation/Nav';
import { useNavigate, Link } from 'react-router-dom';

const Products = () => {
  const { products, setProducts } = useProduct();

  console.log(products);
 
  const navigate = useNavigate();

  return (
    <div className={s.container}>
      <LeftNavigation />

      <div className={s.rightContainer}>
        <Nav isProductsPage={true} selectAll={false}/>
        <div className={s.userList}>
          <div className={s.cardTitles}>
            <div className={s.blank}></div>
            <h2 className={s.cardTitleFirstName}>Name</h2>
            <h2 className={s.cardTitleLastName}>Weight</h2>
            <h2 className={s.cardTitleEmail}>Price</h2>
          </div>
          <div className={s.cardContainer}>
            {products && products.length > 0 ? (
              <div className={s.scrollableContainer}>
                {products.map((item) => (
                  <div className={s.card} key={item.id}>
                    <div className={s.checkBoxAndProfile}>
                      <input type="checkbox" />
                      <div className={s.profilePicture}>
                        <img src={item.image_url} alt="" />
                      </div>
                    </div>
                   
                    <div className={s.itemContainer} 
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
          <button className={s.previousPageButton}>
            <img src={Arrowleft} alt="" className={s.ArrowL} />
          </button>
          <div className={s.pageInfo}>
            <p className={s.currentPage}>page</p>
          </div>
          <button className={s.nextPageButton}>
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
