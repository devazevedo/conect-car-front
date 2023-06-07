import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function EmailValidation() {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const validateEmail = async () => {


      try {

        const userId = decodeURIComponent(id);
        const response = await axios.post('http://localhost:3000/api/email-validation/', { userId });

        toast.success('Email validado com sucesso!');
        setTimeout(() => {
          history.push('/');
        }, 3000);
      } catch (error) {
        history.push('/email-validation-error');
      }
    };

      validateEmail();
  }, [id, history]);

  return (
    <div>
      <p>Validando o email...</p>
    </div>
  );
}