import { FC } from "react";
import Header from "./components/header/header";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/footer";
import emailjs from "@emailjs/browser";
emailjs.init("nlngvMVBbtJSBZC4z");

const App: FC = () => {
  return (
    <>
      <div className="container">
        <Header />
      </div>
      <Outlet />
      <div className="container">
        <Footer />
      </div>
    </>
  );
};

export default App;
