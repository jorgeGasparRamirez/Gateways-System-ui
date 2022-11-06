// outside of a Vue file
import { Notify } from 'quasar';

export const notify = {
  /*
   *  @param {string} message
   */
  sucess(message: string, timeout = 250): void {
    Notify.create({
      type: 'positive',
      message: message,
      position: 'center',
      icon: 'thumb_up_alt',
      iconSize: '20px',
      timeout: timeout,
    });
  },
  /*
   *  @param {string} message
   *  @param {string} caption
   */
  failed(message: string, caption?: string): void {
    Notify.create({
      type: 'negative',
      caption: caption,
      message: message,
      position: 'center',
      icon: 'error',
      iconSize: '20px',
      timeout: 1000,
    });
  },

  info(message: string): void {
    Notify.create({
      type: 'info',
      message: message,
      position: 'center',
      timeout: 5000,
    });
  },
};
