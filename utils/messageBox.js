import {$Message} from '../components/iViewUi/base/index'

class MessageBox {
  static handleDefault({message, duration}) {
    $Message({
      content: message,
      duration: duration || 2,
    });
  }

  static handleSuccess({message, duration}) {
    $Message({
      content: message,
      type: 'success',
      duration: duration || 2,
    });
  }

  static handleWarning({message, duration}) {
    $Message({
      content: message,
      type: 'warning',
      duration: duration || 2,
    });
  }

  static handleError({message, duration}) {
    $Message({
      content: message,
      type: 'error',
      duration: duration || 2,
    });
  }
}

export {
  MessageBox
}