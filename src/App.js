import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Item from "./components/Item";
import FavItem from "./components/FavItem";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { fetchAnother, addFav } from "./actions";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const dispatch = useDispatch();
  const current = useSelector((store) => store.current);
  const loading = useSelector((store) => store.loading);
  const favs = useSelector((store) => store.favs);

  const notify = () =>
    toast.success(
      "Favorilere eklendi. 3 saniye içerisinde başka bir tane daha yüklenecek...",
      {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      }
    );

  function addToFavs() {
    dispatch(addFav());
    notify();
    setTimeout(() => {
      dispatch(fetchAnother());
    }, 3000);
  }

  function newJoke() {
    dispatch(fetchAnother());
  }

  return (
    <div className="wrapper max-w-xl mx-auto px-4">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Rastgele
        </NavLink>
        <NavLink
          to="/favs"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Favoriler
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/">
          {loading && (
            <div className="bg-white p-6 text-center shadow-md">YÜKLENİYOR</div>
          )}
          {current && <Item />}

          <div className="flex gap-3 justify-end py-3">
            <button
              className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
              onClick={() => newJoke()}
            >
              Başka bir tane
            </button>
            {current && ( /////
              <button ///// Current null ise favorilere ekle butonu gözükmeyecek şekilde ayarlandı.
                className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white" /////
                onClick={() => addToFavs()} /////
              >
                Favorilere ekle
              </button>
            )}
          </div>
        </Route>

        <Route path="/favs">
          <div className="flex flex-col gap-3">
            {favs.length > 0 ? (
              favs.map((item) => (
                <FavItem
                  key={item.id}
                  id={item.id}
                  output={item.id}
                  title={item.setup}
                />
              ))
            ) : (
              <div className="bg-white p-6 text-center shadow-md">
                Henüz bir favoriniz yok
              </div>
            )}
          </div>
        </Route>
      </Switch>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
