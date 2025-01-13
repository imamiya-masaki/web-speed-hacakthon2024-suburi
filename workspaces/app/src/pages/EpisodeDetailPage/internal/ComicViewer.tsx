import { useState } from 'react';
import { useInterval, useUpdate } from 'react-use';

import './ComicViewerContainer.css'

import { ComicViewerCore } from '../../../features/viewer/components/ComicViewerCore';
import { addUnitIfNeeded } from '../../../lib/css/addUnitIfNeeded';
import type { useEpisode } from '../../../features/episode/hooks/useEpisode';
type Props = {
  episodeId: string;
  episode: ReturnType<(typeof useEpisode)>["data"]  
};

export const ComicViewer: React.FC<Props> = ({ episodeId, episode }) => {
  return (
    <div  style={{position: "relative"}}  className='comic-viewer-container'>
      <div style={{display: "grid", gridTemplateColumns: "100%", gridTemplateRows: "100%" }} className="ComicViewerContainer">
        <ComicViewerCore episodeId={episodeId} episode={episode}/>
      </div>
    </div>
  );
};
