import { defineStore } from 'pinia';
import { notify } from 'src/plugins/notifications';
import { device, gateways } from 'src/components/models';
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
      return (index: number) => state.data[index]?.devices?.length;
    },
    getDetails: (state) => {
      return (index: string) => state.data[parseInt(index)];
    },
  },
  actions: {
    obtainDataFromBack() {
      return api.get('/gateways').then((res) => this.data.push(...res.data));
    },

    add(gateway: gateways) {
      try {
        this.data.push(gateway);
        notify.sucess('Successful operation');
      } catch (error) {
        notify.failed(<string>error);
      }
    },

    addDevice(index: number, device: device) {
      try {
        this.data[index].devices?.push(device as never);
        notify.sucess('Successful operation');
      } catch (error) {
        notify.failed(<string>error);
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
