import { useState } from "react";
import { baseUrl } from "../constant";
import { redirect } from "react-router-dom";
import { swalError } from "../components/swal";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Loading from "../components/loading";
import FormSection from "../components/form";

export default function RegisterPage(): JSX.Element {
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

      await axios({
        method: "POST",
        url: `${baseUrl}/auth/register`,
        data: state,
      });

      redirect("/login");
    } catch (err) {
      swalError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col md="12" sm="12" lg="12">
            <h1>Register page</h1>
          </Col>
          <Col md="12" sm="12" lg="12">
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
          </Col>
        </Row>
      </Container>
    </>
  );
}
