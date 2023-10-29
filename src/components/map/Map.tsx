import React, { useMemo, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import styles from './Map.module.css';
//import L from "leaflet";
import clsx from "clsx";

import { useState } from 'react';
import { useComments } from '../../hooks/useComments';
import { geopointToArray } from '../../utils/geopoint';
import { useFileUpload } from '../../hooks/useFileUpload';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../modal/Modal';

export const Map: React.FC = () => {  // 緯度軽度
  const position = [43.062, 141.3543];
  // 初期マップズームレベル
  const zoom = 15;
  const [successDisplay, setSuccessDisplay] = useState(false);

  const [content, setContent] = useState<string>("");
  const { comments, addComment, mutate } = useComments();

  const { isOpening, toggle } = useModal();

  const onAddCommentSuccesss = () => {
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
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1200px-SMPTE_Color_Bars.svg.png" />
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
              <button className="btn btn-primary " onClick={() => {toggle(); console.log("toggled", isOpening);}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                コメント
              </button>
            ), [content, isOpening])}
        </div>
      </div>
      {
        isOpening ? (
          <div className={styles.modal}>

          </div>
        )
      }

    </div>
  )
};