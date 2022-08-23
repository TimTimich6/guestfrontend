import axios from "axios";
import { useEffect } from "react";
import GuestCard from "./GuestCard";
import cl from "./GuestList.module.css";
import useGuests from "./useGuests";
const GuestList = (props) => {
  const { guests, password, setGuests, totalCount, sleepoverCount, guyCount, girlCount } = useGuests();
  useEffect(() => {
    async function getGuests() {
      const resp = await axios.get(`${process.env.REACT_APP_URL || ""}/guest`, { headers: { auth: password } });
      if (resp?.data) {
        setGuests(resp.data);
      }
    }
    getGuests();
  }, []);
  return (
    <div className={cl.total}>
      <div className={cl.stats}>
        <div className={cl.slot}>
          <h1 className={cl.statlabel}>Total Count</h1>
          <h3 className={cl.statcount}>{totalCount}</h3>
        </div>
        <div className={cl.slot}>
          <h1 className={cl.statlabel}>Sleepover Count</h1>
          <h3 className={cl.statcount}>{sleepoverCount}</h3>
        </div>
        <div className={cl.slot}>
          <h1 className={cl.statlabel}>Girl Count</h1>
          <h3 className={cl.statcount}>{girlCount}</h3>
        </div>
        <div className={cl.slot}>
          <h1 className={cl.statlabel}>Guy Count</h1>
          <h3 className={cl.statcount}>{guyCount}</h3>
        </div>
      </div>

      <div className={cl.list}>
        <div className={cl.card}>
          <span className={cl.text + " " + cl.id}>ID</span>
          <span className={cl.text + " " + cl.name}>Name</span>
          <span className={cl.text + " " + cl.name}>Gender</span>

          <span className={cl.text + " " + cl.time}>Admin</span>
          <span className={cl.text + " " + cl.name}>Driving</span>
          <span className={cl.text + " " + cl.name}>Sleepover</span>
        </div>
        {guests
          ?.slice(0)
          .reverse()
          .map((guest) => (
            <GuestCard data={guest} key={guest._id} />
          ))}
      </div>
    </div>
  );
};

export default GuestList;
