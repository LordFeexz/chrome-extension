import News from "../interfaces/news";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NewsCard({ news }: { news: News }): JSX.Element {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={news.urlToImage} />
        <Card.Body>
          <Card.Title>{news.title}</Card.Title>
          <Card.Text>{news.description}</Card.Text>
          <Link to={news.url} target="_blank">
            <Button variant="primary">See News</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}
