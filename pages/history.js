import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Row, Col, Card, Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "../styles/History.module.css";
import { render } from "react-dom";
import { removeFromHistory } from "../lib/UserData";
import { searchHistoryAtom } from "../store";

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();
  if (!searchHistory) return null; 
  let parsedHistory = [];
  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });
  function historyClicked(e, index) {
    router.push("artwork?" + searchHistory[index]);
    
  }

  async function removeHistoryClicked(e, index) {
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index])) 
  }
  return (
    <>
      <Row>
        <Col>
          {parsedHistory.length == 0 ? (
            <Card>
              <h4>Nothing Here</h4>
            </Card>
          ) : (
            <ListGroup>
              {parsedHistory.map((history, index) => (
                <ListGroup.Item
                  action
                  onClick={(e) => historyClicked(e, index)}
                  key={index}
                >
                  <Row>
                    <Col>
                      {Object.keys(history).map((key) => (
                        <>
                          {key}: <strong>{history[key]}</strong>&nbsp;
                        </>
                      ))}
                    </Col>
                    <Col>
                      <Button
                        className="float-end"
                        variant="danger"
                        onClick={(e) => removeHistoryClicked(e, index)}
                      >
                        &times;
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </>
  );
}
