import { memo, useCallback } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useLoaderData, useNavigate} from 'react-router-dom';
import Basket from '../basket';
import {cn as bem} from '@bem-react/classname';
import "./style.css";
import ProductInfo from '../../components/product-info';


function Product() {
  const cn = bem('Product');
  const store = useStore();
  const navigate = useNavigate();
  const { data } = useLoaderData();
  const activeModal = useSelector(state => state.modals.name);
  



  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      () => store.actions.basket.addToBasket(data._id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    
  };

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));


  return (
    <>
      <PageLayout>
        <Head title={data.title} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
          sum={select.sum} />
          <ProductInfo addToBasket={callbacks.addToBasket} data={data}/>
      </PageLayout>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default memo(Product);