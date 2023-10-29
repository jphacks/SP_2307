import { Map } from './components/map/Map'
import 'leaflet/dist/leaflet.css';
import "./App.css";
import { useModal } from './hooks/useModal';
import { Modal } from './components/modal/Modal';
import { Footer } from './components/footer/Footer';
import { useMemo, useState } from 'react';
import { useComments } from './hooks/useComments';

function App() {
  const { isOpening, toggle } = useModal();
  const [successDisplay, setSuccessDisplay] = useState(false);

  const { comments, addComment, mutate } = useComments();
  const [content, setContent] = useState("");

  const handleAddingComment = () => {
    addComment(content, () => {
      mutate();
      setContent("");
      setSuccessDisplay(true);
      toggle();
    });
  }

  if (successDisplay) {
    setTimeout(() => {
      setSuccessDisplay(false);
    }, 7000);
  }

  return (
    <>
      {
        useMemo(() => (
          <Map comments={comments} />
        ), [comments])
      }
      <Footer>
        {
          useMemo(() => successDisplay ? (
            <div className="alert alert-success">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>メッセージの送信が完了しました。</span>
            </div>
          ) : null, [successDisplay])
        }
        <button className="btn btn-primary" onClick={() => toggle()}>
          コメント
        </button>
      </Footer>
      <Modal isOpening={isOpening} onClose={() => toggle()} onComplete={() => handleAddingComment()}>
        <textarea className="textarea" placeholder="コメントを追加..." value={content} onChange={e => setContent(e.target.value)}></textarea>
      </Modal>
    </>
  )
}

export default App
