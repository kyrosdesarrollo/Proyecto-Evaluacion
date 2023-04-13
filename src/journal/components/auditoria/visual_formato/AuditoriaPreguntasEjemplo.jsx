import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function EncuestaModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmitEncuesta = (event) => {
    event.preventDefault();
    // Aquí se podría enviar la encuesta a un servidor o almacenarla en el estado de la aplicación
    handleCloseModal();
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Abrir encuesta</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Encuesta Modal"
      >
        <h2>Encuesta</h2>
        <form onSubmit={handleSubmitEncuesta}>
          <div>
            <label>
              ¿Cumple el ejecutivo con la velocidad al contestar?
              <select>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              ¿Cumple el ejecutivo con el saludo e identificación?
              <select>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              ¿Cumple el ejecutivo con la validación de información privada?
              <select>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Comentario:
              <textarea></textarea>
            </label>
          </div>
          <button type="submit">Enviar encuesta</button>
        </form>
      </Modal>
    </div>
  );
}

export default EncuestaModal;
