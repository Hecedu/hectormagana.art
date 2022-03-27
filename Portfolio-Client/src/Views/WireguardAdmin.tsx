import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ClientInformation } from '../Types/ClientInformation';

export default function WireguardAdmin() {
    const [systemStatus, setSystemStatus] = useState<string>('Loading...');
    var clientName = '';
    var ipAddres = '';
    var allowedIpRange = '';
    var clientPublicKey = '';
    var clientPrivateKey = '';

    useEffect(() => {
        axios.get('/api/clientinformation/WireguardSystemStatus')
            .then(function (response) {
                console.log(response);
                setSystemStatus(response.data);
            })
            .catch(function (error) {
                console.log(error)
            })
    }, []);

    function onSubmitForm() {
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
        axios.get('/api/clientinformation/RestartWireguardService')
            .then(function (response) {
                console.log(response)
                axios.get('/api/clientinformation/WireguardSystemStatus')
                    .then(function (response) {
                        console.log(response);
                        setSystemStatus(response.data);
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

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

    return (
        <div className="text-center">
            <div className='container border border-dark border-5 rounded p-2 my-2 shadow-sm'>
                <h1>Restart Wireguard Service</h1>
                <h5>Status:</h5>
                <p>{systemStatus}</p>
                <div className='my-2'>
                    <button className="btn btn-danger" onClick={onRestartWireguardService}>Restart Wireguard Service</button>
                </div>
            </div>
            <div className='container border border-dark border-5 rounded p-2 my-2 shadow-sm'>
                <h1>Create new wireguard user</h1>
                <div className='my-2'>
                    <label className='m-1'>Client Name:</label>
                    <input type="text" name="name" onChange={onClientNameChange} />
                </div>
                <div className='my-2'>
                    <label className='m-1'>IP Address:</label>
                    <input type="text" name="name" onChange={onIpAddressChange} />
                </div>
                <div className='my-2'>
                    <label className='m-1'>Allowed IP Range:</label>
                    <input type="text" name="name" onChange={onAllowedIpRangeChange} />
                </div>
                <div className='my-2'>
                    <label className='m-1'>Client Public Key:</label>
                    <input type="text" name="name" onChange={onClientPublicKeyChange} />
                </div>
                <div className='my-2'>
                    <label className='m-1'>Client Private Key:</label>
                    <input type="text" name="name" onChange={onClientPrivateKeyChange} />
                </div>
                <div className='my-2'>
                    <button className="btn btn-primary" type="submit" value="Submit" onClick={onSubmitForm}>Submit</button>
                </div>
            </div>
        </div>
    )
}
