import React, { useMemo } from 'react';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import styles from './Map.module.css';

import { Comment, useComments } from '../../hooks/useComments';
import { geopointToArray } from '../../utils/geopoint';


interface MapProps {
  comments: Comment[]
}

export const Map: React.FC<MapProps> = ({ comments }) => {  // 緯度軽度
  const position = [43.062, 141.3543];
  // 初期マップズームレベル
  const zoom = 15;

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
    </div>
  )
};