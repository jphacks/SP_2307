import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import styles from './Map.module.css';
//import L from "leaflet";

import { useState } from 'react';
import { useComments } from '../../hooks/useComments';
import { geopointToArray } from '../../utils/geopoint';
import { useGeopoint } from '../../hooks/useGeopoint';

type Message = {
  position: [number, number];
  content: string;
  images?: string;
  id: number;
}


export const Map: React.FC = () => {  // 緯度軽度
  const position = [43.062, 141.3543];
  // 初期マップズームレベル
  const zoom = 15;
  const [ successDisplay, setSuccessDisplay ] = useState(false);

  const [content, setContent] = useState<string>("");
  const { comments, addComment } = useComments();
  /*
  const onAddCommentSuccesss = () => {
    setSuccessDisplay(true);
  }

  if (successDisplay) {
    setTimeout(() => {
      setSuccessDisplay(false);
    }, 1000);
  }

  useEffect(() => {
    return () => {
      
    }
  }, []);

  */

  
  return (
    <div className={styles.map}>
      <MapContainer center={position} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {
          comments.map(msg => {
            if (!msg.position) return null;
            return (
              <Marker position={geopointToArray(msg.position)} key={msg.id}>
                <Popup>
                  {msg.content}
                </Popup>
              </Marker>
            )
          })
        }
      </MapContainer>

      <div className={styles.footer}>
        <div className={styles.sender}>
          <input className={styles.textbox}
            value={content}
            onInput={(e) => setContent(e.currentTarget.value)}
          />
          <button className={styles.button} onClick={() => {
            addComment(content);
            setContent("");
          }}>
            <span className="material-symbols-outlined">
              send
            </span>
          </button>
        </div>
      </div>
    </div>
  )
};