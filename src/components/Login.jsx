import styles from './Login.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ReCAPTCHA } from 'react-google-recaptcha';
import Keydown from 'react-keydown';
import { Link } from 'react-router-dom';

export function Login({}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState('');

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleLogin = async () => {

    // if (!recaptchaValue) {
    //   alert('Por favor, preencha o reCAPTCHA.');
    //   return;
    // }
    // o captcha nao funciona em local

    try {
      const response = await axios.post('http://localhost:3000/api/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // salva o token em localStorage
      // alert(token)
      // redireciona o usuário para a página principal
      window.location.href = '/pagina-principal';
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : 'Ocorreu um erro ao fazer login. Tente novamente mais tarde.';
        // verifique se há uma mensagem de erro personalizada na resposta da API. Se não houver, use uma mensagem genérica.
        alert(errorMessage);
    }
  };

  return (
    <div className={styles.divLogin}>
      <img
        src="src\assets\logo_main.png"
        alt=""
      />
      <div className={styles.divInputs}>
        <label className={styles.label} htmlFor="login">
          Login:
        </label>
        <input className={styles.input} name="login" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
  
        <label className={styles.label} htmlFor="senha">
          Senha:
        </label>
        <input
          className={styles.input}
          name="senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              handleLogin();
            }
          }}
        />
  
        <ReCAPTCHA
          sitekey="6LfLWj4mAAAAAHM9dOwZwQ40P9M90HF6NQ1UagtM"
          onChange={handleRecaptchaChange}
        />
        <button className={styles.loginButton} onClick={handleLogin}>Login</button>
  
        <div className={styles.actions}>
          <a href="#">Esqueci minha senha</a>
          <Link to="/cadastro-usuario">Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
}
