import { useEffect, useRef } from 'react';
import { useAsync } from 'react-use';
import './ComicViewerPage.module.css'


import { decrypt } from '@wsh-2024/image-encrypt/src/decrypt';

import { getImageUrl } from '../../../lib/image/getImageUrl';

type Props = {
  pageImageId: string;
};

export const ComicViewerPage = ({ pageImageId }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    (async() => {
      const image = new Image();
      image.src = getImageUrl({
        format: 'jpg',
        imageId: pageImageId,
      });
      // console.log('image', image.src, image)
      await image.decode();
  
      const canvas = ref.current!;
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext('2d')!;
  
      decrypt({
        exportCanvasContext: ctx,
        sourceImage: image,
        sourceImageInfo: {
          height: image.naturalHeight,
          width: image.naturalWidth,
        },
      });
      // console.log('image', image.src, image)
      canvas.setAttribute('role', 'img');
    })()
  },[pageImageId])

  // useAsync(async () => {
  //   const image = new Image();
  //   image.src = getImageUrl({
  //     format: 'jxl',
  //     imageId: pageImageId,
  //   });
  //   await image.decode();

  //   const canvas = ref.current!;
  //   canvas.width = image.naturalWidth;
  //   canvas.height = image.naturalHeight;
  //   const ctx = canvas.getContext('2d')!;

  //   decrypt({
  //     exportCanvasContext: ctx,
  //     sourceImage: image,
  //     sourceImageInfo: {
  //       height: image.naturalHeight,
  //       width: image.naturalWidth,
  //     },
  //   });
  //   console.log('image', image.src, image)
  //   canvas.setAttribute('role', 'img');
  // }, [pageImageId]);

  return <canvas className='ComicViewerPage___Canvas__styled' ref={ref} />;
};
