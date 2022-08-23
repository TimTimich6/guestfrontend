import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
export const GuestContext = createContext();

export const GuestContextProvider = (props) => {
  const [guests, setGuests] = useState([]);
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [sleepoverCount, setSleepoverCount] = useState(0);
  const [guyCount, setGuyCount] = useState(0);
  const [girlCount, setGirlCount] = useState(0);

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_URL || "http://localhost:3080"}`);
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("new-guest", (guest) => {
      console.log(guest);
      setGuests((prev) => prev.concat([guest]));
    });
    socket.on("delete-guest", (id) => {
      console.log("delete guest", id);
      setGuests((prev) => prev.filter((guest) => guest._id != id));
    });
    socket.on("signout-guest", (guest) => {
      console.log("signout guest", guest);
      setGuests((prev) => {
        return prev.map((guest1) => {
          if (guest1._id == guest._id) return guest;
          return guest1;
        });
      });
    });
    const gotpassword = localStorage.getItem("password");

    console.log(gotpassword);
    if (gotpassword) {
      setPassword(gotpassword);
      axios
        .get(`${process.env.REACT_APP_URL || ""}/login`, { headers: { auth: gotpassword } })
        .then((res) => {
          setAuthed(true);
        })
        .catch(() => setAuthed(false));
    }

    socket.on("tweet", (data) => {});
  }, []);
  useEffect(() => {
    setTotalCount(guests.length);
    const sleepover = guests.filter((guest) => guest.sleepover == true).length;
    const guys = guests.filter((guest) => guest.guy == true).length;
    const girls = guests.filter((guest) => guest.guy == false).length;

    setSleepoverCount(sleepover);
    setGuyCount(guys);
    setGirlCount(girls);
  }, [guests]);
  return (
    <GuestContext.Provider
      value={{
        guests,
        setGuests,
        authed,
        setAuthed,
        password,
        setPassword,
        totalCount,
        setTotalCount,
        sleepoverCount,
        setSleepoverCount,
        guyCount,
        setGuyCount,
        girlCount,
        setGirlCount,
      }}
    >
      {props.children}
    </GuestContext.Provider>
  );
};
