import { defineStore } from 'pinia';
import { notify } from 'src/plugins/notifications';
import { device, gateways } from 'src/components/models';

export const useGatewaysStore = defineStore('gateways', {
  state: () => ({
    data: <gateways[]>[
      {
        id: '0909es2',
        name: 'CPU',
        ip: '123.34.54.67',
        devices: [
          {
            uid: 789,
            vendor: 'ET&T',
            date: '2/3/2000',
            status: 'Online',
          },
          {
            uid: 759,
            vendor: 'YT',
            date: '5/3/2010',
            status: 'Online',
          },
          {
            uid: 709,
            vendor: 'YrrT',
            date: '12/3/2020',
            status: 'Online',
          },
        ],
      },
      {
        id: '0909ef2',
        name: 'Modem',
        ip: '122.22.54.67',
        devices: [
          {
            uid: 799,
            vendor: 'ET&T',
            date: '4/3/2020',
            status: 'Offline',
          },
        ],
      },
    ],
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
  },
  actions: {
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
