///Função para validar o campo email
export function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
///função para validar o campo fone
export function validatePhone(phone)
{
  let re = /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/gm;
  return re.test(phone);
}
///função para verificar se os campos estão validos e altera a cor das bordas do telefone e email
export function validateAll()
{
  if(validatePhone(telefone.value)&&validateEmail(email.value))
  {
    return true;
  }
  else
  {
      if(!validatePhone(telefone.value))
        telefone.style = "border-color : #FB4A4A;";
      if(!validateEmail(email.value))
        email.style = "border-color :#FB4A4A ;";
      return false;
  }
}
