import axios from "axios";
import { useState } from "react";
import cl from "./CreateGuest.module.css";
import useGuests from "./useGuests";
const CreateGuest = (props) => {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [driving, setDriving] = useState(false);
  const [sleepover, setSleepover] = useState(false);
  const [err, setError] = useState("");
  const { password } = useGuests();

  function addPerson() {
    axios
      .post(
        `${process.env.REACT_APP_URL || ""}/guest`,
        {
          guy: props.gender == "guy" ? true : false,
          name,
          driving,
          notes,
          sleepover,
        },
        { headers: { auth: password } }
      )
      .then(() => props.setShow(""))
      .catch((error) => {
        setError(error.response.data.message);
      });
  }
  return (
    <div className={cl.total}>
      <h1 className={cl.title}>Add {props.gender}</h1>
      <div className={cl.inside}>
        <label htmlFor="name" className={cl.label}>
          Name
        </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={cl.input} />
        <label htmlFor="name" className={cl.label}>
          Driving
        </label>
        <input type="checkbox" checked={driving} onChange={(e) => setDriving(e.target.checked)} className={cl.check} />
        <label htmlFor="name" className={cl.label}>
          Sleepover
        </label>
        <input type="checkbox" checked={sleepover} onChange={(e) => setSleepover(e.target.checked)} className={cl.check} />
        <label htmlFor="name" className={cl.label}>
          Notes
        </label>
        <input type="textfield" value={notes} className={cl.input} onChange={(e) => setNotes(e.target.value)} />
      </div>
      <div className={cl.buttons}>
        <button onClick={addPerson} className={cl.button}>
          Create
        </button>
        <button onClick={() => props.setShow("")} className={cl.button}>
          Cancel
        </button>
      </div>
      {err && <h1 className={cl.error}>{err}</h1>}
    </div>
  );
};

export default CreateGuest;
