import Main from "./main";
import useStore from "../store/use-store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Product from '../components/product'



/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  

  const store = useStore();


  const router = createBrowserRouter([
    {
      path: "/",
      Component: Main,
      loader: () => {
        return {
          page: 1
        }
      }
    },
    {
      path: "/page/:page",
      element: <Main />,
      loader: ({ params }) => {
        return {
          page: params.page || 1
        }
      }
    },
        {
      path: "/products/:_id",
      element: <Product/>,
      loader: async ({ params }) => {
        const data = await store.actions.catalog.loadProduct(params._id);
        return { data }
      }
    },
  ]);


  return (
    <>

      <RouterProvider router={router} />
    </>
  );
}

export default App;
