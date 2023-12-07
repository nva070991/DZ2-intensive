import { memo, useCallback } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useLoaderData, useNavigate} from 'react-router-dom';
import Basket from '../../app/basket';
import {cn as bem} from '@bem-react/classname';
import "./style.css";
import {numberFormat} from "../../utils";



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
          <div className={cn()}>
      <div className={cn('description')}>{data.description}</div>
      <div className={cn('country-box')}>
        Страна производитель: <span className={cn('country')}>{data.country}</span>
      </div>
      <div className={cn('category-box')}>
        Категория: <span className={cn('category')}>{data.category}</span>
      </div>
      <div className={cn('year-box')}>
        Год выпуска: <span className={cn('year')}>{data.year}</span>
      </div>
      <div className={cn('price-box')}>
        Цена: <span className={cn('price')}>{numberFormat(data.price)} ₽</span>
      </div>
      <button className={cn('button')} onClick={callbacks.addToBasket}>Добавить</button>
    </div >
      </PageLayout>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default memo(Product);