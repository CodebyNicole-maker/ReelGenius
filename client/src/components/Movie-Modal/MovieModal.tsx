//Todo: Import RecsContainer from RecsContainer
//Todo: Import styles as needed
//Todo: Import OMDBcontainer to fetch movie data
//Todo: Create a container to display OMDBContainer data
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import OmdbContainer from "../OMDBcontainer";
// import SearchForm from "../SearchForm";

interface MovieModalProps {
  show: boolean;
  onHide: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ show, onHide }) => {
  return (
    <section className="movie-modal">
      <Modal
        show={show}
        onHide={onHide}
        centered
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>Movie Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OmdbContainer />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default MovieModal;

// function MovieModal() {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);

//   function MyVerticallyCenteredModal(props) {
//     return (
//       <Modal
//         {...props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter">
//             Modal heading
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <h4>Centered Modal</h4>

//           <OmdbContainer />
//           <p>
//             Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//             dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
//             ac consectetur ac, vestibulum at eros.
//           </p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={props.onHide}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     );
//   }

//   function App() {
//     const [modalShow, setModalShow] = React.useState(false);

//     return (
//       <>
//         <Button variant="primary" onClick={() => setModalShow(true)}>
//           Launch vertically centered modal
//         </Button>

//         <MyVerticallyCenteredModal
//           show={modalShow}
//           onHide={() => setModalShow(false)}
//         />
//       </>
//     );
//   }

//   render(<App />);
//   return (
//     <div>
//       <Button variant="primary" onClick={toggle}>
//         Send
//       </Button>
//       <MyModal isOpen={isOpen} toggle={toggle}>
//         <p>This is the content.</p>
//       </MyModal>
//     </div>
//   );
// }

//Todo: Stylize the container to match the wireframe

//Todo: Add Recscontainer to display movie recommendations

//Todo: Add like buttons to add to User's favorite movies

//Todo: HTML for exporting the MovieModal component

//Todo: export MovieMod
