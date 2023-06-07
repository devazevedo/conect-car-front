import styles from './App.module.css';
import './global.css';
import backgroundImage from './assets/banner.png'; // Importe a imagem aqui
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { Login } from './components/Login';
import { CadastroUsuario } from './components/CadastroUsuario';
import { EmailValidation } from './components/EmailValidation'; // Importe o componente de validação de email

export function App() {
  return (
    <div className={styles.container} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/cadastro-usuario" component={CadastroUsuario} />
          <Route path="/email-validation/:id" component={EmailValidation} />
        </Switch>
      </Router>
    </div>
  );
}
