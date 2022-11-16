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
  gatewayId: string;
}

export interface addGateway {
  name: string;
  ip: string;
  vendor: string;
  date: string;
  status: 'Online' | 'Offline';
}

export interface addDevice {
  vendor: string;
  date: string;
  status: 'Online' | 'Offline';
  gatewayId: string;
}
