import axios from "axios";
import { useState } from "react";
import CreateGuest from "./CreateGuest";
import GuestList from "./GuestList";
import cl from "./MainPage.module.css";
const MainPage = (props) => {
  const [showCreation, setShowCreation] = useState("");
  const [guy, setGuy] = useState(true);
  return (
    <div className={cl.total}>
      <h1 className={cl.title}>Tim's Guest Manager</h1>
      {!showCreation && (
        <div className={cl.buttons}>
          <button className={cl.button} onClick={() => setShowCreation("girl")}>
            Add Girl
          </button>
          <button className={cl.button} onClick={() => setShowCreation("guy")}>
            Add Guy
          </button>
        </div>
      )}
      {showCreation && <CreateGuest gender={showCreation} setShow={setShowCreation} />}
      <GuestList />
    </div>
  );
};

export default MainPage;
