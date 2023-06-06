import React, { useState, useEffect } from 'react';
import styles from './CadastroUsuarios.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import InputMask from 'react-input-mask';
import axios from 'axios';

export function CadastroUsuario() {
  const [password, setSenha] = useState('');
  const [username, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');

  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmaSenha, setMostrarConfirmaSenha] = useState(false);
  const [cpfValido, setCpfValido] = useState(true);
  const [inputsPreenchidos, setInputsPreenchidos] = useState(false);
  const [touchedInputs, setTouchedInputs] = useState({});

  useEffect(() => {
    const inputsPreenchidos = validarInputs();
    setInputsPreenchidos(inputsPreenchidos);
  }, [username, email, cpf, password, confirmaSenha]);

  const validarInputs = () => {
    if (
      username.trim() === '' ||
      email.trim() === '' ||
      cpf.trim() === '' ||
      password.trim() === '' ||
      confirmaSenha.trim() === ''
    ) {
      return false;
    }
    return true;
  };

  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos do CPF

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  }

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
    setInputsPreenchidos(validarInputs());
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setInputsPreenchidos(validarInputs());
  };

  const handleCpfChange = async (event) => {
    const isCpfValid = validarCPF(event.target.value);
    setCpf(event.target.value);

    if (event.target.value.length === 14) {
      if (!isCpfValid) {
        setCpfValido(false);
        toast.error('CPF inválido!');
        setInputsPreenchidos(false);
        return;
      } else {
        setCpfValido(true);
      }
    }

    setInputsPreenchidos(validarInputs());
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
    setInputsPreenchidos(validarInputs());
  };

  const handleConfirmaSenhaChange = (event) => {
    setConfirmaSenha(event.target.value);
    setInputsPreenchidos(validarInputs());
  };

  const handleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleMostrarConfirmaSenha = () => {
    setMostrarConfirmaSenha(!mostrarConfirmaSenha);
  };

  const handleCadastroClick = async () => {
    setBotaoDesabilitado(true);

    if (!cpfValido) {
      toast.error('Por favor, corrija os erros antes de cadastrar.');
      setBotaoDesabilitado(false);
      return;
    }

    if (!inputsPreenchidos) {
      toast.error('Por favor, preencha todos os campos antes de cadastrar.');
      setBotaoDesabilitado(false);
      return;
    }

    if (password === confirmaSenha) {
      if (password.length < 8) {
        toast.error('A senha deve ter pelo menos 8 caracteres!');
      } else if (!/[A-Z]/.test(password)) {
        toast.error('A senha deve conter pelo menos uma letra maiúscula!');
      } else if (!/[a-z]/.test(password)) {
        toast.error('A senha deve conter pelo menos uma letra minúscula!');
      } else if (!/[0-9]/.test(password)) {
        toast.error('A senha deve conter pelo menos um número!');
      } else if (!/[@#$%^&*]/.test(password)) {
        toast.error('A senha deve conter pelo menos um caractere especial!');
      } else {
        try {
          const response = await axios.post('http://localhost:3000/api/users', {
            username,
            cpf,
            email,
            password,
          });
          toast.success('Cadastro efetuado com sucesso!');
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        } catch (error) {
          const errorMessage = error.response
            ? error.response.data.message
            : 'Ocorreu um erro ao fazer login. Tente novamente mais tarde.';
          // verifique se há uma mensagem de erro personalizada na resposta da API. Se não houver, use uma mensagem genérica.
          toast.error(errorMessage);
        }
      }
    } else {
      toast.error('Senhas diferentes!');
    }

    setTimeout(() => {
      setBotaoDesabilitado(false);
    }, 3000);
  };

  const handleInputBlur = (inputName) => {
    setTouchedInputs((prevTouchedInputs) => ({ ...prevTouchedInputs, [inputName]: true }));
  };

  return (
    <div className={styles.divCadastro}>
      <img src="src\assets\logo_main.png" alt="" />
      <div className={styles.divInputs}>
        <label htmlFor="login">Login:</label>
        <input
          name="login"
          type="text"
          value={username}
          onChange={handleLoginChange}
          onBlur={() => handleInputBlur('username')}
          className={touchedInputs.username && username.trim() === '' ? styles.inputInvalido : ''}
        />

        <label htmlFor="email">E-mail:</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={() => handleInputBlur('email')}
          className={touchedInputs.email && email.trim() === '' ? styles.inputInvalido : ''}
        />

        <label htmlFor="cpf">CPF:</label>
        <InputMask
          mask="999.999.999-99"
          maskChar=""
          name="cpf"
          type="text"
          onChange={handleCpfChange}
          onBlur={() => handleInputBlur('cpf')}
          className={
            (touchedInputs.cpf && (!cpfValido || cpf.trim() === '')) || (!touchedInputs.cpf && cpf.trim() === '')
              ? styles.inputInvalido
              : ''
          }
        />

        <label htmlFor="senha">Senha:</label>
        <div className={styles.inputWithButton}>
          <input
            name="senha"
            type={mostrarSenha ? 'text' : 'password'}
            value={password}
            onChange={handleSenhaChange}
            onBlur={() => handleInputBlur('password')}
            className={
              touchedInputs.password && password.trim() === '' ? styles.inputInvalido : ''
            }
          />
          <button className={styles.eyeButton} onClick={handleMostrarSenha}>
            {mostrarSenha ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <label htmlFor="confirmaSenha">Confirmar Senha:</label>
        <div className={styles.inputWithButton}>
          <input
            name="confirmaSenha"
            type={mostrarConfirmaSenha ? 'text' : 'password'}
            value={confirmaSenha}
            onChange={handleConfirmaSenhaChange}
            onBlur={() => handleInputBlur('confirmaSenha')}
            className={
              touchedInputs.confirmaSenha && confirmaSenha.trim() === '' ? styles.inputInvalido : ''
            }
          />
          <button className={styles.eyeButton} onClick={handleMostrarConfirmaSenha}>
            {mostrarConfirmaSenha ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <div className={styles.requisitosSenha}>
          <p>Requisitos da senha:</p>
          <ul>
            <li>Pelo menos 8 caracteres</li>
            <li>Pelo menos uma letra maiúscula</li>
            <li>Pelo menos uma letra minúscula</li>
            <li>Pelo menos um número</li>
            <li>Pelo menos um caractere especial</li>
          </ul>
        </div>

        <button
          className={styles.cadastroButton}
          onClick={handleCadastroClick}
          disabled={botaoDesabilitado || !inputsPreenchidos}
        >
          Cadastrar-se
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}