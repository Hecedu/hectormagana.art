import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStoreSelector } from "../Store";
import Wireguard from "../Models/Wireguard";

export default function WireguardRequest() {
  var userToken = useStoreSelector((state) => state.auth.userToken);
  var userBearerToken = useStoreSelector((state) => state.auth.bearerToken);
  //display state
  const [Email, setEmail] = useState("");
  //edit form state
  const [editIpAddress, setEditIpAddress] = useState("");
  const [editIpRange, setEditIpRange] = useState("");

  var ipValidationRegex =
    "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";
  var ipRangeValidationRegex =
    "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:/(?:16|24|32))?$";

  useEffect(() => {
    axios
      .get(`/api/UserData/GetOrAddUserDataByJwt?jwt=${userToken}`, {
        headers: { Authorization: `Bearer ${userBearerToken}` },
      })
      .then((res) => {
        //display
        setEmail(res.data.email);
        //edit form
        setEditIpAddress(res.data.username);
        setEditIpRange(res.data.favorite_videogame);
      });
  }, []);

  function onIpAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEditIpAddress(event.target.value);
  }
  function onIpRangeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEditIpRange(event.target.value);
  }

  function onSubmitForm(event: React.SyntheticEvent) {
    event.preventDefault();
    if (editIpRange && editIpAddress) {
      let userData: Wireguard = {
        client_name: Email,
        ip_address: editIpAddress,
        allowed_ip_range: editIpRange,
      };
      axios
        .post("/api/ClientInformation/AddClientInformation", userData, {
          headers: { Authorization: `Bearer ${userBearerToken}` },
        })
        .catch(function (error) {
          alert("Please fill all fields correctly or try again.");
        });
    } else {
      alert("Please fill all fields.");
    }
  }

  return (
    <div className="text-center border border-dark border-4 p-5 m-3 rounded-3 shadow bg-white">
      <h1 className="display-1 fw-bold">Wireguard Request</h1>
      <p className="small fst-italic">
        (this will submit a request to my backend for me to approve)
      </p>
      <hr />
      <div className="container border border-dark border-3 rounded p-2 mb-3 shadow text-center">
        <h1>Your E-mail</h1>
        <p>(will be used as an identifier)</p>
        <p>{Email}</p>
      </div>
      <div className="container border border-dark border-3 rounded p-2 mb-3 shadow text-center">
        <h1>Edit Data</h1>
        <hr />
        <form className="needs-validation" onSubmit={onSubmitForm}>
          <div className="form-group">
            <div className="my-2">
              <label className="m-1">Ip Address [0.0.0.0/16||24||32]</label>
              <br />
              <input
                className="form-control"
                type="text"
                name="username"
                value={editIpAddress}
                onChange={onIpAddressChange}
                pattern={ipValidationRegex}
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="my-2">
              <label className="m-1">
                Ip Range in CIDR format [0.0.0.0/16||24||32]
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                name="videogame"
                value={editIpRange}
                onChange={onIpRangeChange}
                pattern={ipRangeValidationRegex}
                required
              />
            </div>
          </div>
          <div className="my-2">
            <button className="btn btn-dark" type="submit" value="Submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
