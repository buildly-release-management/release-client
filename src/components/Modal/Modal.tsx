import "./Modal.css";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface ModalProps {
  show: boolean;
}

const CustomModal = (props: ModalProps) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>New release</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form>
            {/*name*/}
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Name" />
            </Form.Group>
            {/*description*/}
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            {/*release date*/}
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Release date</Form.Label>
              <Form.Control size="sm" type="date" placeholder="Release date" />
            </Form.Group>
            {/*env*/}
            <Form.Group className="mb-3" controlId="environment">
              <Form.Label>Environment</Form.Label>
              <Form.Control size="sm" type="text" placeholder="Environment" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" size="sm" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/*<Modal show={props.show} onHide={handleClose}>*/}
      {/*  <Modal.Header closeButton>*/}
      {/*    <Modal.Title>Modal heading</Modal.Title>*/}
      {/*  </Modal.Header>*/}
      {/*  <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>*/}
      {/*  <Modal.Footer>*/}
      {/*    /!*    /!*<CustomButton variant="secondary" label="Close" btnClicked={} />*!/*!/*/}
      {/*    /!*    /!*<CustomButton variant="primary" label="Save changes" btnClicked={} />*!/*!/*/}
      {/*  </Modal.Footer>*/}
      {/*</Modal>*/}

      {/*<Modal.Dialog>*/}
      {/*  <Modal.Header closeButton>*/}
      {/*    <Modal.Title>Modal title</Modal.Title>*/}
      {/*  </Modal.Header>*/}

      {/*  <Modal.Body>*/}
      {/*    <p>Modal body text goes here.</p>*/}
      {/*  </Modal.Body>*/}

      {/*  <Modal.Footer>*/}
      {/*    /!*<CustomButton variant="secondary" label="Close" btnClicked={} />*!/*/}
      {/*    /!*<CustomButton variant="primary" label="Save changes" btnClicked={} />*!/*/}
      {/*  </Modal.Footer>*/}
      {/*</Modal.Dialog>*/}
    </div>
  );
};

export default CustomModal;
