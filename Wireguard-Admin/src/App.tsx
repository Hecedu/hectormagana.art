import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

type ClientInformation = {
  client_name: string;
  ip_address: string;
  date_added: Date;
  allowed_ip_range: string;
  client_public_key: string;
  client_private_key: string;
}
function App() {
  var clientName = '';
  var ipAddres = '';
  var allowedIpRange = '';
  var clientPublicKey = '';
  var clientPrivateKey = '';

  function onClientNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    clientName = event.target.value;
  }
  function onIpAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    ipAddres = event.target.value;
  }
  function onAllowedIpRangeChange(event: React.ChangeEvent<HTMLInputElement>) {
    allowedIpRange = event.target.value;
  }
  function onClientPublicKeyChange(event: React.ChangeEvent<HTMLInputElement>) {
    clientPublicKey = event.target.value;
  }
  function onClientPrivateKeyChange(event: React.ChangeEvent<HTMLInputElement>) {
    clientPrivateKey = event.target.value;
  }
  function onSubmit() {
    if (clientName && ipAddres && allowedIpRange && clientPublicKey && clientPrivateKey) {
      let clientInformation: ClientInformation = { client_name: clientName, ip_address: ipAddres, date_added: new Date(), allowed_ip_range: allowedIpRange, client_public_key: clientPublicKey, client_private_key: clientPrivateKey };
      axios.post('/api/clientinformation/addclientinformation', clientInformation)
        .then(function (response) {
          alert(response)
        })
        .catch(function (error) {
          console.log(error)
        });
    }
    else {
      alert('Please fill all fields.');
    }
  }
  function onRestartWireguardService() {
    axios.post('/api/clientinformation/RestartWireguardService')
      .then(function (response) {
        alert(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    }

  return (
    <div className="App">
      <div className='container'>
        <h1>Create new user</h1>
        <div className='my-2'>
          <label className='my-1 mx-1'>Client Name:</label>
          <input type="text" name="name" onChange={onClientNameChange} />
        </div>
        <div className='my-2'>
          <label className='my-1 mx-1'>IP Address:</label>
          <input type="text" name="name" onChange={onIpAddressChange} />
        </div>
        <div className='my-2'>
          <label className='my-1 mx-1'>Allowed IP Range:</label>
          <input type="text" name="name" onChange={onAllowedIpRangeChange} />
        </div>
        <div className='my-2'>
          <label className='my-1 mx-1'>Client Public Key:</label>
          <input type="text" name="name" onChange={onClientPublicKeyChange} />
        </div>
        <div className='my-2'>
          <label className='my-1 mx-1'>Client Private Key:</label>
          <input type="text" name="name" onChange={onClientPrivateKeyChange} />
        </div>
        <div className='my-2'>
          <button className="btn btn-primary" type="submit" value="Submit" onClick={onSubmit}>Submit</button>
        </div>
        <div className='my-2'>
          <h1>Restart Wireguard Service</h1>
          <button className="btn btn-danger" onClick={onRestartWireguardService}>Restart Wireguard Service</button>
        </div>
      </div>
    </div>
  );
}

export default App;
