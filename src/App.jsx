import styles from './App.module.css';
import './global.css';
import backgroundImage from './assets/banner.png'; // Importe a imagem aqui
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { Login } from './components/Login';
import { CadastroUsuario } from './components/CadastroUsuario';

export function App() {
  return (
    <div className={styles.container} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/cadastro-usuario" component={CadastroUsuario} />
        </Switch>
      </Router>
    </div>
  );
}
