import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import styles from './Map.module.css';
//import L from "leaflet";

import { useState } from 'react';

type Message = {
  position: [ number, number ];
  content: string;
  images?: string;
  id: number;
}

const test = [
  "道路が割れています",
  "道路が陥没しています",
  "道路が汚いです",
  "雪が積もって通れません。",
  "街路灯がつかないです。",
  "停電しています",
  "騒音がひどいです",
  "大雨でマンホールが飛んでいます"
]

export const Map: React.FC = () => {
  // 緯度軽度
  const position = [43.062, 141.3543];
  // 初期マップズームレベル
  const zoom = 15;

  const _: Message[] = test.map(content => ({
    content,
    position: [ 43.062 + Math.random() / 100, 141.3543 + Math.random() / 100 ],
    id: Math.random()
  }));
  const [ messages, setMessages ] = useState<Message[]>(_); 
  const [content, setContent] = useState<string>("");

  const addMessage = ({ content: string }) => {
    setMessages([...messages, {
      content,
      position: [43.062 + Math.random() / 100, 141.3543 + Math.random() / 100],
      id: Math.random()
    }])
  }

  return (
    <div className={styles.map}>
      <MapContainer center={position} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {
          messages.map(msg => (
            <Marker position={msg.position} key={msg.id}>
              <Popup>
                {msg.content}
              </Popup>
            </Marker>
          ))
        }
      </MapContainer>
      <div className={styles.footer}>
        <div className={styles.sender}>
          <input className={styles.textbox}
            value={content}
            onInput={(e) => setContent(e.currentTarget.value)}          
          />
          <button className={styles.button} onClick={() => {
            addMessage({ content });
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