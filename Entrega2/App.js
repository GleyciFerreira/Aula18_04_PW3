import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Configure Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCIJpuWdKDq8T70urSypswvrKeNudE8RO8",
  authDomain: "autenticacao-3ae0e.firebaseapp.com",
  projectId: "autenticacao-3ae0e",
  storageBucket: "autenticacao-3ae0e.appspot.com",
  messagingSenderId: "906221807055",
  appId: "1:906221807055:web:06906114d3fc6e47391eba",
  measurementId: "G-XKHZ4N5EBC",
  // adicione outras configurações do Firebase aqui
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      setError(null);
      setUser(userCredential.user);
      // Login bem-sucedido, você pode redirecionar ou fazer outras ações aqui
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await firebase.auth().signInWithPopup(provider);
      setError(null);
      setUser(userCredential.user);
      // Login bem-sucedido, você pode redirecionar ou fazer outras ações aqui
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  return (
    <div>
      <h1>Firebase Authentication</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGoogleLogin}>Login com Google</button>
      {error && <p>{error}</p>}
      {user && (
        <div>
          <h2>Dados do Usuário:</h2>
          <p>Nome: {user.displayName || 'Não fornecido'}</p>
          <p>Email: {user.email}</p>
          <p>ID do Usuário: {user.uid}</p>
        </div>
      )}
    </div>
  );
}

export default App;