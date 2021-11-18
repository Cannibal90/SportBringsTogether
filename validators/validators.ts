export const validateMinThreeSigns = (value: any) => {
  let message = "";
  if (value.length < 3) {
    message = "Field needs to have minimum 3 signs";
  }
  return message;
};

export const validateEmail = (value: any) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let check = re.test(String(value).toLowerCase());
  let message = "";
  if (!check) {
    message = "Input proper email";
  }
  return message;
};

export const validatePasswords = (basic: any, retype: any) => {
  let message = "";
  if (retype !== basic) {
    message = "Retype and password must be the same";
  }
  return message;
};
