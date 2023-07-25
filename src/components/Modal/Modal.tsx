import "./Modal.css";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "../Select";
import { ReleaseService } from "../../services/release.service";
import { Release } from "../../interfaces/release";

const releaseService = new ReleaseService();

interface ModalProps {
  show: boolean;
  products: { label: string; value: string }[];
}

const CustomModal = (props: ModalProps) => {
  const [formData, setFormData] = useState({} as Release);
  const updateFormData = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitRelease = (e: any) => {
    e.preventDefault();
    console.log("formData : ", formData);
    releaseService.submitRelease(formData);
  };

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
              <Form.Control
                size="sm"
                type="text"
                placeholder="Name"
                name="name"
                onChange={(event) => updateFormData(event)}
              />
            </Form.Group>
            {/*description*/}
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                onChange={(event) => updateFormData(event)}
              />
            </Form.Group>
            {/*release date*/}
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Release date</Form.Label>
              <Form.Control
                size="sm"
                type="date"
                placeholder="Release date"
                name="release_date"
                onChange={(event) => updateFormData(event)}
              />
            </Form.Group>
            {/*product*/}
            <Form.Group className="mb-3" controlId="product">
              <Select
                name="product_uuid"
                label="Select a product"
                options={props.products}
                onChange={(event) => updateFormData(event)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" size="sm" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="submit"
            onClick={(event) => submitRelease(event)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomModal;
