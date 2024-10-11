import React from "react";
import Image from "next/image";




const PlaylistAll = ({ playlist }) => {
  console.log("playlist", playlist);

  return (
    <div>
      {playlist.map((list) => {
        return (
          <div key={list.track.id}>
            <Image src={list.track.album.images[0].url} alt={list.track.name} width="100" height="100" />
            <div>{list.track.name}</div>
            <div>{list.track.artists[0].name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default PlaylistAll;
