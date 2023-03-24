import './App.css';
import React, {useEffect} from "react";
import Search from "./components/Search";
import Favourite from "./components/Favourite";
import Meals from "./components/Meals";
import Modal from "./components/Modal";
import {useGlobalContext} from "./Context";


function App() {
    const { showModal, favorites } = useGlobalContext()
  return (
      <main>
        <Search />
          {favorites.length > 0 && <Favourite />}
        <Meals />
          {showModal && <Modal />}
      </main>
  );
}

export default App;