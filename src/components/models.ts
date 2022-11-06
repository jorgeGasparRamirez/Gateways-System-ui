export interface gateways {
  id: string;
  name: string;
  ip: string;
  devices: device[] | [];
}

export interface device {
  uid: number;
  vendor: string;
  date: string;
  status: 'Online' | 'Offline';
}
