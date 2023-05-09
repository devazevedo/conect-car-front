import styles from './App.module.css'
import './global.css'

import { Login } from "./components/Login";

export function App() {

  return (
    <div className={styles.container}>
      <main>
        <Login>
          
        </Login>
      </main>
    </div>
  );
}

