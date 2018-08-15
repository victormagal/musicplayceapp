import validator from 'validator';

export const required = (value) => {
  if(validator.isEmpty(value)){
    return 'Campo obrigatório';
  }
};

export const email = (value) => {
  if(value && !validator.isEmail(value)){
    return 'Email inválido';
  }
};

