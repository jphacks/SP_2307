import React, { useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import styles from './Map.module.css';
//import L from "leaflet";

import { useState } from 'react';
import { useComments } from '../../hooks/useComments';
import { geopointToArray } from '../../utils/geopoint';

export const Map: React.FC = () => {  // 緯度軽度
  const position = [43.062, 141.3543];
  // 初期マップズームレベル
  const zoom = 15;
  const [successDisplay, setSuccessDisplay] = useState(false);

  const [content, setContent] = useState<string>("");
  const { comments, addComment, mutate } = useComments();

  const onAddCommentSuccesss = (comment: Comment) => {
    setSuccessDisplay(true);
    mutate();
  }

  if (successDisplay) {
    setTimeout(() => {
      //setSuccessDisplay(false);
    }, 7000);
  }

  return (
    <div className={styles.map}>
      <MapContainer center={position} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {
          useMemo(() => comments.map(msg => {
            if (!msg.position) return null;
            return (
              <Marker position={geopointToArray(msg.position)} key={msg.id} >
                <Tooltip permanent direction="top">
                  {msg.content}
                </Tooltip>
              </Marker>
            )
          }), [comments])
        }
      </MapContainer>

      <div className={styles.footer}>
        <div className={styles.margin}>
          {
            useMemo(() => successDisplay ? (
              <div className="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>メッセージの送信が完了しました。</span>
              </div>
            ) : null, [successDisplay])}
          {
            useMemo(() => (
              <div className={styles.sender}>
                <input className={styles.textbox}
                  value={content}
                  onInput={(e) => setContent(e.currentTarget.value)}
                />
                <button className={styles.button} onClick={() => {
                  addComment(content, onAddCommentSuccesss);
                  setContent("");
                }}>
                  <span className="material-symbols-outlined">
                    send
                  </span>
                </button>
              </div>
            ), [content])}
          </div>
      </div>

    </div>
  )
};