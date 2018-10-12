import {checkAll} from './checkMethod';
import {returnMsg} from './errorMsg';
import {getUrlsFromString} from '../utils/getUrlsFromString';

const record = [];

const forEachArray = (arrayData) => {
  for (let i = 0; i < arrayData.length; i++) {
    record.push(i);
    checkData(arrayData[i]);
    record.pop();
  }
};

const forEachJSON = (JSONData) => {
  for (const key in JSONData) {
    record.push(key);
    checkData(JSONData[key]);
    record.pop();
  }
};

// 把错误信息拼接起来的公共方法
const concatMsg = () => {
  let errorMsg = 'JSON';

  record.forEach((item) => {
    if (typeof item === 'number') {
      errorMsg += `[${item}]`;
    } else {
      errorMsg += '->' + item;
    }
  });

  return errorMsg;
};

// 如果是空对象，拼接错误信息
const concatNUllObjMsg = () => {
  const nullObjMsg = concatMsg();

  returnMsg.errorMsg.nullObjMsg.push(nullObjMsg);
};

// 拼接空字符串
const concatNullStringMsg = () => {
  const nullStringMsg = concatMsg();
  returnMsg.errorMsg.nullStringMsg.push(nullStringMsg);
};

// 拼接空数组的信息
const concatNullArrayMsg = () => {
  const nullArrayMsg = concatMsg();
  returnMsg.errorMsg.nullArrayMsg.push(nullArrayMsg);
};

const checkData = (data) => {
  const code = checkAll(data);
  switch (code) {
    // 空对象
    case 1: {
      concatNUllObjMsg();
      break;
    }
    // 空字符串
    case 3: {
      concatNullStringMsg();
      break;
    }
    // 空数组
    case 5: {
      concatNullArrayMsg();
      break;
    }
    // 基本数据类型
    case 7: {
      const urls = getUrlsFromString(data);

      if (urls.length !== 0) {
        const obj = {
          imgID: concatMsg(),
          imgUrls: urls
        };

        returnMsg.imgsUrlMsg.push(obj);
      }

      break;
    }
    // json对象
    case 8: forEachJSON(data); break;
    // 数组对象
    case 9: forEachArray(data); break;
  }

  return returnMsg;
};

export {checkData};
