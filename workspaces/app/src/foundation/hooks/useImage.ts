import './image.css'
import { getImageUrl } from '../../lib/image/getImageUrl';
import { useEffect, useState } from 'react';

export const useImage = ({ height, imageId, width }: { height: number; imageId: string; width: number }) => {
  
  const [devicePixel, setDevicePixel] = useState<number>(2);
  useEffect(() => {
    if (window.devicePixelRatio !== 2) {
      setDevicePixel(2)
    }
  },[])

  return getImageUrl({
    format: 'webp',
    height: height * devicePixel,
    imageId,
    width: width * devicePixel,
  });
}
