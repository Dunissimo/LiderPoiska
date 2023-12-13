import { FC } from "react";
import Header from "./components/header/header";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/footer";
import emailjs from "@emailjs/browser";
import { Provider } from "react-redux";
import { store } from "./store";
emailjs.init("nlngvMVBbtJSBZC4z");

const App: FC = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <Header />
      </div>
      <Outlet />
      <div className="container">
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
