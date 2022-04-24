export default class Wireguard {
  client_name: string;
  ip_address: string;
  allowed_ip_range: string;

  constructor(
    client_name: string,
    ip_address: string,
    allowed_ip_range: string
  ) {
    this.client_name = client_name;
    this.ip_address = ip_address;
    this.allowed_ip_range = allowed_ip_range;
  }
}
