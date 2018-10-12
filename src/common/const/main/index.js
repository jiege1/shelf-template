
import bg from 'assets/images/bg.jpg';
import close from 'assets/images/close.png';

export default {
  goodsList: {
    padding: 24,
    background: bg,
    // background: 'http://localhost:8008/images/bg.jpg',
    card: {
      padding: 20,
      width: 333,
      height: 437,
      borderRadius: 10,
      background: '#ffffff',
      borderWidth: 1,
      borderColor: '#af6ef1',
      marginBottom: 14,
    },
  },
  detail: {
    closeImg: {
      src: close,
      // src: 'http://localhost:8008/images/close.png',
      width: 90,
      height: 90,
    }
  }
};