export const timerHelper = (seconds) => {
  const pad = (val) => {
    const secondsString = Math.floor(val).toString();

    if (secondsString.length < 2) {
      return "0" + secondsString;
    } else {
      return secondsString;
    }
  };

  const getMinutes = () => {
    return pad(seconds / 60);
  };
  const getSeconds = () => {
    return pad(seconds % 60);
  };

  return {
    getMinutes,
    getSeconds,
  };
};

export const recordsHelper = (record) => {
  const userName = record.name.toLowerCase();
  let leadersBoard = JSON.parse(localStorage.getItem("records")) || [];

  const userExist = leadersBoard.some(
    (rec) => rec.name.toLowerCase() === userName
  );

  if (userExist) {
    leadersBoard.forEach((el, i) => {
      if (el.name.toLowerCase() === userName) {
        leadersBoard.splice(i, 1, record);
      }
    });
  } else {
    leadersBoard.push(record);
  }

  localStorage.setItem("records", JSON.stringify(leadersBoard));
};
