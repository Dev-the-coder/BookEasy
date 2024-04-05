// Room.js

import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/room.css";

function Room({ room, fromDate, toDate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="room-container">
      <div className="row">
        <div className="col-md-4">
          <img src={room.imageurls[0]} className="room-image img-fluid rounded smallimg" alt="" />
        </div>
        <div className="col-md-7">
          <div className="room-details">
            <h1>{room.name}</h1>
            <b>
              <p>Max Count: {room.maxcount}</p>
              <p>Phone Number: {room.phonenumber}</p>
              <p>Type: {room.type}</p>
            </b>
          </div>
          <div className="room-actions">
            {fromDate && toDate && (
              <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
                <button className="btn btn-primary mr-2">Book Now</button>
              </Link>
            )}
            <button className="btn btn-primary" onClick={handleShow}>
              View Detail
            </button>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {room.imageurls.map((url, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100 rounded bigimg" src={url} alt={`Slide ${index}`} />
              </Carousel.Item>
            ))}
          </Carousel>
          <p className="p-4">{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
