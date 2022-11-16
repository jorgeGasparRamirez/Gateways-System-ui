import { defineStore } from 'pinia';
import { notify } from 'src/plugins/notifications';
import { device, addDevice, gateways, addGateway } from 'src/components/models';
import { api } from 'boot/axios';

export const useGatewaysStore = defineStore('gateways', {
  state: () => ({
    data: <gateways[]>[],
    parameters: {
      idSelectedGateway: '',
      indexGateway: -1,
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

    addDevice(device: addDevice): Promise<device> {
      return api
        .post('/device', {
          vendor: device.vendor,
          date: device.date,
          status: device.status,
          gatewayId: device.gatewayId,
        })
        .then((res) => res.data);
    },

    refreshDevices(
      action: 'add' | 'delete',
      idGateway: string,
      device: device
    ) {
      const index = this.data.findIndex((i) => i.id === idGateway);
      if (action === 'add') {
        this.data[index].devices.push(device as never);
      } else {
        this.data[index].devices.splice(index, 1);
      }
    },

    deleteG(id: string) {
      try {
        const index = this.data.findIndex((item) => item.id === id);
        this.data.splice(index, 1);
        this.clearParameters(true);
      } catch (error) {
        notify.failed(<string>error);
      }
    },
    deleteDevice() {
      try {
        const indexDevice = this.data[
          this.parameters.indexGateway
        ].devices.findIndex(
          (item) => item.uid === this.parameters.idSelectedDevice
        );
        this.data[this.parameters.indexGateway].devices.splice(indexDevice, 1);
        this.clearParameters(false);
      } catch (error) {
        notify.failed(<string>error);
      }
    },

    clearParameters(aboutGateway: boolean) {
      if (aboutGateway) {
        this.parameters.idSelectedGateway = '';
        this.parameters.showDialogGateway = false;
      } else {
        this.parameters.idSelectedGateway = '';
        this.parameters.idSelectedDevice = -1;
        this.parameters.showDialogDevice = false;
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
        this.parameters.indexGateway = <number>id;
        this.parameters.idSelectedDevice = idDevice;
        this.parameters.showDialogDevice = true;
      }
    },
  },
});
