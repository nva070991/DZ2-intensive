import { memo } from 'react';
import {cn as bem} from '@bem-react/classname';
import "./style.css";
import {numberFormat} from "../../utils";


function ProductInfo({data, addToBasket}) {
  const cn = bem('Product');


  return (
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
      <button className={cn('button')} onClick={addToBasket}>Добавить</button>
    </div >
  );
}

export default memo(ProductInfo);