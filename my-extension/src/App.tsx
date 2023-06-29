import { useState } from "react";
import Home from "./views/home";
import LoginPage from "./views/login";
import RegisterPage from "./views/register";
import { page } from "./interfaces/props";

function App(): JSX.Element {
  const [page, setPage] = useState<page>("/");
  const access_token = localStorage.getItem("access_token");
  const redirectPage = (page: page) => {
    setPage(page);
  };

  switch (page) {
    case "/":
      return (
        <div
          style={{
            width: "400px",
            height: "300px",
          }}
        >
          <Home access_token={access_token} redirectPage={redirectPage} />
        </div>
      );
    case "/login":
      return (
        <div
          style={{
            width: "400px",
            height: "300px",
          }}
        >
          <LoginPage access_token={access_token} redirectPage={redirectPage} />
        </div>
      );
    case "/register":
      return (
        <div
          style={{
            width: "400px",
            height: "300px",
          }}
        >
          <RegisterPage
            access_token={access_token}
            redirectPage={redirectPage}
          />
        </div>
      );
  }
}

export default App;
