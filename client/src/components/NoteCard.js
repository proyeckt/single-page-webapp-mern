import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/Col'
import { useNavigate } from 'react-router-dom';

const NoteCard = ({ note, idx }) => {

    const navigate = useNavigate();

    const { _id } = note;

    const navigateToJob = () => {    
        navigate(`/note/${_id}`);
    }

    return (
        <Col>
            <Card className="mt-4 box-shadow" id={idx} style={{ width: '16rem', height: '19rem' }}>
                <Card.Body>
                    <Card.Title>
                        {note.title}
                    </Card.Title>
                    <Card.Text>
                        Ultima fecha modificación:{note.last_edited.substring(0,10)}
                    </Card.Text>
                    <Button onClick={() => navigateToJob()} variant="primary">Leer más</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default NoteCard;