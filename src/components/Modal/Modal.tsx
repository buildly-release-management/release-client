import "./Modal.css";
import Modal from "react-bootstrap/Modal";
import CustomButton from "../Button";
import { useState } from "react";

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
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          {/*    /!*<CustomButton variant="secondary" label="Close" btnClicked={} />*!/*/}
          {/*    /!*<CustomButton variant="primary" label="Save changes" btnClicked={} />*!/*/}
        </Modal.Footer>
      </Modal>

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
