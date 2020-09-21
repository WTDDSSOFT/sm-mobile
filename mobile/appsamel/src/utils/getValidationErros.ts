/** Recebe o object com os erros  */
import { ValidationError } from 'yup';

interface Erros {
  // Qual quer propriedade, o objeto pode ser qualquer coisa
  [key: string]: string;
}
export default function getValidationErros(err: ValidationError): Erros {
  const validationErros: Erros = {};
  /** Percore o arry  */
  err.inner.forEach(error => {
    validationErros[error.path] = error.message;
  });

  return validationErros;
}
