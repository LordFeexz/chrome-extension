import { useState } from "react";
import FormSection from "../components/form";
import { Container } from "react-bootstrap";
import axios from "axios";
import { baseUrl } from "../constant";
import { swalError } from "../components/swal";
import { redirect } from "react-router-dom";
import Loading from "../components/loading";

export default function LoginPage(): JSX.Element {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev: { email: string; password: string }) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);

      const { data } = await axios({
        method: "POST",
        url: `${baseUrl}/auth/login`,
        data: state,
      });

      localStorage.setItem("access_token", data.access_token);
      redirect("/");
    } catch (err) {
      swalError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <FormSection
            onSubmit={onSubmit}
            email={state.email}
            password={state.password}
            onChangeHandler={onChangeHandler}
          />
        )}
      </Container>
    </>
  );
}
