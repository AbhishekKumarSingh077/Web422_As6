import { Col, Row } from "react-bootstrap";
import ArtworkCardDetail from "../../components/ArtworkCardDetail";
import { useRouter } from "next/router";

export default function ArtworkByObjId(){

  const router = useRouter();

  let {objectID} = router.query;

  return (
    <Row>
      <Col>
        <ArtworkCardDetail objectID={objectID} />
      </Col>
    </Row>
  );
}
