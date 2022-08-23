import axios from "axios";
import cl from "./GuestCard.module.css";
import useGuests from "./useGuests";
// import RoundButton from "./Reusable/RoundButton";
const GuestCard = ({ data }) => {
  const { password } = useGuests();
  async function signOut() {
    const resp = await axios.patch(`${process.env.REACT_APP_URL || ""}/guest/${data?._id}`, {}, { headers: { auth: password } });
    if (resp?.status == "200") {
      console.log("successfully signedout");
    }
  }

  async function deleteUser() {
    const resp = await axios.delete(`${process.env.REACT_APP_URL || ""}/guest/${data?._id}`, { headers: { auth: password } });
    if (resp?.status == "200") {
      console.log("successfully deleted");
    }
  }
  return (
    <div className={`${cl.total} ${data.left && cl.left}`}>
      <span className={cl.text + " " + cl.id}>{data?._id?.slice(-5)}</span>
      <span className={cl.text + " " + cl.name}>{data?.name}</span>
      <span className={cl.text + " " + cl.name}>{data.guy ? "Guy" : "Girl"}</span>
      <span className={cl.text + " " + cl.time}>{data.createdBy}</span>
      <span className={cl.text + " " + cl.name}>{data.driving ? "Yes" : "No"}</span>
      <span className={cl.text + " " + cl.name}>{data.sleepover ? "Yes" : "No"}</span>

      <button className={cl.button} onClick={signOut}>
        Sign out
      </button>
      <button className={cl.button} onClick={deleteUser}>
        Delete
      </button>
    </div>
  );
};
export default GuestCard;
