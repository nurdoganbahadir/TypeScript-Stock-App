import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import store, { persistor } from "./app/store";
import AppRouter from "./router/AppRouter";
import React from "react";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppRouter />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
