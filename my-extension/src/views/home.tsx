import { useEffect, useState } from "react";
import News from "../interfaces/news";
import { getData, saveData } from "../func/idb";
import axios from "axios";
import { baseUrl } from "../constant";
import { swalError } from "../components/swal";
import Loading from "../components/loading";
import NewsCard from "../components/newsCard";
import { Container, Row, Col } from "react-bootstrap";

export default function Home(): JSX.Element {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const news = await getData();

        if (news.length) {
          setNews(news);
          return;
        }

        const access_token = localStorage.getItem("access_token");

        const { data } = await axios<{ totalData: number; articles: News[] }>({
          method: "GET",
          headers: {
            access_token,
          },
          url: `${baseUrl}/news`,
        });

        setNews(data.articles);

        const saveToDb = await saveData(data.articles);

        if (!saveToDb) throw { name: "Failed to save data" };
      } catch (err) {
        swalError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : news.length ? (
        <Container>
          <Row>
            {news.map((item, idx) => {
              return (
                <Col md="4" sm="4" lg="4" key={idx}>
                  <NewsCard news={item} key={idx} />
                </Col>
              );
            })}
          </Row>
        </Container>
      ) : (
        <div>no data</div>
      )}
    </>
  );
}
