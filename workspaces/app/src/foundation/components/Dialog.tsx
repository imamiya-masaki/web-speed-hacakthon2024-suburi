import { useAtom } from 'jotai';
import './Dialog.module.css';
import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { Color } from '../styles/variables';

import { Button } from './Button';

export const Dialog: React.FC = () => {
  const [content, updateContent] = useAtom(DialogContentAtom);
  return content != null ? (
    <div className='Dialog___Overlay__styled'>
      <div className='Dialog___Wrapper__styled'>
        <Button className='Dialog___CloseButton__styled' onClick={() => updateContent(null)}>
          <svg fill={Color.MONO_A} height={32} width={32} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon" ><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
        </Button>
        <div className='Dialog___Container__styled'>{content}</div>
      </div>
    </div>
  ) : null;
};
