import { defineStore } from 'pinia';
import {
  device,
  addDevice,
  gateways,
  addGateway,
  resCreateDevice,
} from 'src/components/models';
import { api } from 'boot/axios';

export const useGatewaysStore = defineStore('gateways', {
  state: () => ({
    data: <gateways[]>[],
    parameters: {
      idSelectedGateway: '',
      idSelectedDevice: -1,
      showDialogGateway: false,
      showDialogDevice: false,
    },
  }),
  getters: {
    getData: (state) => state.data,
    getParameters: (state) => state.parameters,
    getDevicesLength: (state) => {
      return (id: string) =>
        state.data.find((item) => item.id === id)
          ? state.data.find((item) => item.id === id)?.devices.length
          : -1;
    },
    getDetails: (state) => {
      return (index: string) => state.data[parseInt(index)];
    },
  },
  actions: {
    obtainDataFromBack() {
      return api.get('/gateways').then((res) => {
        (res.data as gateways[]).forEach((item: gateways) =>
          this.data.findIndex((it: gateways) => it.id === item.id) === -1
            ? this.data.push(item)
            : ''
        );
      });
    },

    add(gateteway: addGateway): Promise<gateways> {
      return api
        .post('/gateways', {
          name: gateteway.name,
          ip: gateteway.ip,
          vendor: gateteway.vendor,
          date: gateteway.date,
          status: gateteway.status,
        })
        .then((res) => <gateways>res.data);
    },

    getById(id: string): Promise<gateways> {
      return api.get(`/gateways/${id}`).then((res) => res.data);
    },

    addDevice(device: addDevice): Promise<resCreateDevice> {
      return api
        .post('/device', {
          vendor: device.vendor,
          date: device.date,
          status: device.status,
          gatewayId: device.gatewayId,
        })
        .then((res) => <resCreateDevice>res.data);
    },

    refreshGateway(
      action: 'add' | 'delete',
      idGateway: string,
      gateteway?: gateways
    ) {
      const index = this.data.findIndex((i) => i.id === idGateway);
      if (action === 'add' && gateteway) {
        this.data.push(gateteway);
      } else {
        this.data.splice(index, 1);
      }
    },

    refreshDevices(
      action: 'add' | 'delete',
      idGateway: string,
      device?: device
    ) {
      console.log(device);
      const index = this.data.findIndex((i) => i.id === idGateway);
      if (action === 'add' && device) {
        this.data[index].devices.push(device as never);
      } else {
        const indexDevice = this.data[index].devices.findIndex(
          (i) => i.uid === this.parameters.idSelectedDevice
        );
        this.data[index].devices.splice(indexDevice, 1);
      }
    },

    deleteGateway(id: string) {
      return api.delete(`/gateways/${id}`).then((res) => res.data);
    },

    deleteDevice(idGateway: string, idDevice: string) {
      return api
        .delete(`/device/${idGateway}/${idDevice}`)
        .then((res) => res.data);
    },

    clearParameters(aboutGateway: boolean) {
      if (aboutGateway) {
        this.parameters.idSelectedGateway = '';
        this.parameters.showDialogGateway = false;
      } else {
        this.parameters.idSelectedGateway = '';
        this.parameters.idSelectedDevice = -1;
        this.parameters.showDialogDevice = false;
        console.log(this.parameters);
      }
    },

    saveParameters(
      aboutGateway: boolean,
      id: string | number,
      idDevice: number
    ) {
      if (aboutGateway) {
        this.parameters.idSelectedGateway = <string>id;
        this.parameters.showDialogGateway = true;
      } else {
        console.log('entro aqui');
        this.parameters.idSelectedGateway = id.toString();
        this.parameters.idSelectedDevice = idDevice;
        this.parameters.showDialogDevice = true;
        console.log(this.parameters);
      }
    },
  },
});
