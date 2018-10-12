import {stateCode} from './stateCode';

// 检测对象是不是空
const checkIsNull = (data) => {
  if (data == null) {
    return stateCode.checkNullFalse;
  } else {
    return stateCode.checkNullSuccess;
  }
};

// 检测是不是一个空字符串
const checkIsNullString = (data) => {

  if (data == '' && typeof data == 'string') {
    return stateCode.checkNullStringFalse;
  } else {
    return stateCode.checkNullStringSuccess;
  }

};

// 检测是不是一个空数组
const checkIsNullArray = (data) => {

  if (data.length == 0 && data instanceof Array) {
    return stateCode.checkNullArrayFalse;
  } else {
    return stateCode.checkNullArraySuccess;
  }

};

// 检测是不是基本数据类型
const checkIsBasicDataType = (data) => {
  if (typeof data == 'string' || typeof data != 'object') {
    return stateCode.checkBasicDataFalse;
  } else {
    return stateCode.checkBasicDataSuccess;
  }
};

// 检测对象是Array还是JSON
const checkIsArrayOrJSON = (data) => {

  if (data instanceof Array) {
    return stateCode.checkArray;
  } else {
    return stateCode.checkJSON;
  }
};

// 把所有的检测柔和成一个函数，然后返回
const checkAll = (data) => {
  // 首先检测空
  if (checkIsNull(data).stateCode == stateCode.checkNullFalse.stateCode) {
    return stateCode.checkNullFalse.stateCode;
  } else if (checkIsNullArray(data).stateCode == stateCode.checkNullArrayFalse.stateCode) {
    return stateCode.checkNullArrayFalse.stateCode;
  } else if (checkIsNullString(data).stateCode == stateCode.checkNullStringFalse.stateCode) {
    return stateCode.checkNullStringFalse.stateCode;
  } else if (checkIsBasicDataType(data).stateCode == stateCode.checkBasicDataFalse.stateCode) {
    return stateCode.checkBasicDataFalse.stateCode;
  } else if (checkIsArrayOrJSON(data).stateCode == stateCode.checkJSON.stateCode) {
    return stateCode.checkJSON.stateCode;
  } else {
    return stateCode.checkArray.stateCode;
  }
};


export {checkAll};
