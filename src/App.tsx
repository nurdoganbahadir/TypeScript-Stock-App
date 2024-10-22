import { Provider } from "react-redux";
import store from "./app/store";
import AppRouter from "./router/AppRouter";
import React from "react";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
