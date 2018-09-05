import validator from 'validator';

const isEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const required = (value) => {
  if(validator.isEmpty(value)){
    return 'Campo obrigatório';
  }
};

export const email = (value) => {
  if(value && !isEmail(value)){
    return 'Email inválido';
  }
};

