import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import ArtworkCard from "../components/ArtworkCard";

export default function FavouritesPage() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  if (!favouritesList) return null

  return (
    <>
      {favouritesList.length > 0 ? (
        <Row className="gy-4">
          {favouritesList?.map((id) => (
            <Col key={id} lg={3}>
              <ArtworkCard objectID={id} />
            </Col>
          ))}
        </Row>
      ) : (
        <Card>
          <Card.Body>
            <Card.Text>
              <h4>Nothing Here</h4>Try adding some new artwork to the list.
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}