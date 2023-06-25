import { useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";

export default function FormSection({
  email,
  password,
  onChangeHandler,
  onSubmit,
}: {
  email: string;
  password: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}): JSX.Element {
  const [visible, setVisible] = useState(false);
  const seePassword = () => {
    setVisible(!visible);
  };
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              value={email}
              placeholder="email"
              name="email"
              onChange={onChangeHandler}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              name="password"
              value={password}
              type={visible ? "text" : "password"}
              placeholder="Password"
              onChange={onChangeHandler}
            />
            <Button
              type="button"
              onClick={seePassword}
              variant="secondary"
              size="sm"
            >
              {visible ? "Hide" : "Show"}
            </Button>
          </Col>
        </Form.Group>
        <Button variant="secondary" size="sm" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
