import { useEffect, useRef, useState } from 'react';
import './Separator.module.css'
import { Color } from '../styles/variables';


export const Separator: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    const width = wrapperRef.current?.clientWidth;

    const canvas = document.createElement('canvas');
    canvas.width = width ?? 0;
    canvas.height = 1;

    const ctx = canvas.getContext('2d');

    if (ctx == null) {
      return;
    }

    ctx.moveTo(0, 0);
    ctx.lineTo(width ?? 0, 0);

    ctx.strokeStyle = Color.MONO_30;
    ctx.lineWidth = 1;

    ctx.stroke();

    setImgUrl(canvas.toDataURL('image/png'));
  }, []);

  return (
    <div className='Separator___Wrapper__styled' ref={wrapperRef}>
      {imgUrl != null ? <img className='Separator___Separator__styled' aria-hidden={true} height={1} src={imgUrl} width="100%" /> : null}
    </div>
  );
};
