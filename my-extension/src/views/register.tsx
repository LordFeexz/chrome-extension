import { useEffect, useState } from "react";
import { baseUrl } from "../constant";
import { swalError } from "../components/swal";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Loading from "../components/loading";
import FormSection from "../components/form";
import { props } from "../interfaces/props";
import { encrypt } from "../helpers/encryption";

export default function RegisterPage({
  access_token,
  redirectPage,
}: props): JSX.Element {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (access_token) redirectPage("/");
  }, [access_token, redirectPage]);

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
        data: {
          email: encrypt(state.email),
          password: encrypt(state.password),
        },
      });

      redirectPage("/login");
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
          <Col md="12" sm="12" lg="12">
            <a
              href="#"
              onClick={() => {
                redirectPage("/login");
              }}
            >
              <span>have an account ?</span>Login
            </a>
          </Col>
        </Row>
      </Container>
    </>
  );
}
