/**
 * 检测状态码
 * 0.检测没有出错
 */

const stateCode = {
  checkNullSuccess: {
    stateCode: 0,
    script: 'success object',
    message: '此对象不是一个null对象',
  },
  checkNullFalse: {
    stateCode: 1,
    script: 'error object',
    message: '小心，这是一个null对象！',
  },
  checkNullStringSuccess: {
    stateCode: 2,
    script: 'success string',
    message: '此字符串不是\'\'',
  },
  checkNullStringFalse: {
    stateCode: 3,
    script: 'false string',
    message: '小心，这个字符串是\'\''
  },
  checkNullArraySuccess: {
    stateCode: 4,
    script: 'array success',
    message: '此数组不是[]',
  },
  checkNullArrayFalse: {
    stateCode: 5,
    script: 'array false',
    message: '小心，此数组是[]'
  },
  checkBasicDataSuccess: {
    stateCode: 6,
    script: 'this is not a basic data type',
    message: '不是基本数据类型'
  },
  checkBasicDataFalse: {
    stateCode: 7,
    script: 'this is a basic data type',
    message: '基本数据类型'
  },
  checkJSON: {
    stateCode: 8,
    script: 'this is a json',
    message: 'JSON对象'
  },
  checkArray: {
    stateCode: 9,
    script: 'this is a array',
    message: 'ARRAY对象'
  },
};

export {stateCode};
