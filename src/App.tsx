import { Map } from './components/map/Map'
import 'leaflet/dist/leaflet.css';
import "./App.css";
import { useModal } from './hooks/useModal';
import { Modal } from './components/modal/Modal';

function App() {
  const { isOpening } = useModal();
  return (
    <>
      <Map />
      <Modal isOpening={isOpening}>
        <></>
      </Modal>
    </>
  )
}

export default App
