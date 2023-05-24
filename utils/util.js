const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber).join("/")} ${[
    hour,
    minute,
    second,
  ]
    .map(formatNumber)
    .join(":")}`;
};

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

// 对象判空
const isObjectValid = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null || obj[key] === undefined || obj[key] == "") {
        return false;
      }
    }
  }
  return true;
};

// 身份证号校验
const validateIDCard = (val) => {
  // 正则表达式匹配身份证号码格式
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

  if (!reg.test(idCard)) {
    // 身份证号格式不正确
    return false;
  }

  // 验证前两位省份代码
  const provinceCode = idCard.substring(0, 2);
  const validProvinceCodes = [
    "11",
    "12",
    "13",
    "14",
    "15",
    "21",
    "22",
    "23",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "50",
    "51",
    "52",
    "53",
    "54",
    "61",
    "62",
    "63",
    "64",
    "65",
    "71",
    "81",
    "82",
    "91",
  ];

  if (validProvinceCodes.indexOf(provinceCode) === -1) {
    // 身份证号省份代码不正确
    return false;
  }

  // 验证生日格式
  const birthday = idCard.substring(6, 14);
  const year = birthday.substring(0, 4);
  const month = birthday.substring(4, 6);
  const day = birthday.substring(6, 8);
  const date = new Date(`${year}-${month}-${day}`);

  if (
    date.getFullYear() !== parseInt(year) ||
    date.getMonth() + 1 !== parseInt(month) ||
    date.getDate() !== parseInt(day)
  ) {
    // 身份证号生日格式不正确
    return false;
  }

  // 验证校验位
  if (idCard.length === 18) {
    const coefficientArr = [
      7,
      9,
      10,
      5,
      8,
      4,
      2,
      1,
      6,
      3,
      7,
      9,
      10,
      5,
      8,
      4,
      2,
    ];
    const checkCodeArr = ["1","0","X","9","8","7","6","5","4","3","2",];
    let sum = 0;

    for (let i = 0; i < 17; i++) {
      sum += parseInt(idCard.charAt(i)) * coefficientArr[i];
    }

    const checkCode = checkCodeArr[sum % 11];

    if (checkCode !== idCard.charAt(17).toUpperCase()) {
      // 身份证号校验位不正确
      return false;
    }
  }
  return true;
};

// 大陆手机号码校验
const validatePhoneNumber = (val) => {
  // 正则表达式匹配手机号码格式
  const reg = /^1[3456789]\d{9}$/;
  return reg.test(val);
}

// 以 1 开头的 10 位学号检验
const validateStuNumber = (val) => {
  var reg = /^1\d{9}$/;
  return reg.test(studentID);
}

module.exports = {
  formatTime,
  isObjectValid,
};
