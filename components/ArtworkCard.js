import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import useSWR from 'swr';
import Error from 'next/error';

export default function ArtworkCard({objectID}){

  const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)

  if(error){
    return <Error statusCode={404} /> 
  }

  if(data){
    return (<>
      <Card>
          <Card.Img variant="top" src={data.primaryImageSmall ? data.primaryImageSmall : 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]' } />
          <Card.Body>
            <Card.Title>{data?.title || "N/A"}</Card.Title>
            <Card.Text>
              <strong>Date: </strong>{data.objectDate || "N/A"}<br />
              <strong>Classification: </strong>{data.classification || "N/A"}<br />
              <strong>Medium: </strong>{data.medium || "N/A"}<br /><br />
              <Link href={`/artwork/${objectID}`} passHref><Button variant="outline-primary"><strong>ID: </strong> {objectID}</Button></Link>
              
            </Card.Text>
            
          </Card.Body>
        </Card>
    </>);
  }else{
    return null;
  }

}
