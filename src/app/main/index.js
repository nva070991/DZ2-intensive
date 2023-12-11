import { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Basket from "../basket";
import Menu from "../../components/menu";
import ToolsLayout from "../../components/tools-layout";

function Main() {
  const activeModal = useSelector((state) => state.modals.name);

  const store = useStore();
  const navigate = useNavigate();

  const loaderData = useLoaderData();
  const page = Number(loaderData.page) || 1;

  useEffect(() => {
    store.actions.catalog.load(page);
  }, [page]);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    count: state.catalog.count,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    onNavigate: useCallback((_id) => {
      navigate(`/products/${_id}`);
    }, []),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onNavigate={callbacks.onNavigate}
            onAdd={callbacks.addToBasket}
          />
        );
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" />
        <ToolsLayout>
          <Menu />
          <BasketTool
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
          />
        </ToolsLayout>
        <List list={select.list} renderItem={renders.item} />
        <Pagination
          maxPages={Math.ceil(Number(select.count) / 10)}
          currentPage={page}
        />
      </PageLayout>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default memo(Main);
