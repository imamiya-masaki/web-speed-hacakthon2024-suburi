import { useAtom } from 'jotai';
import './Dialog.module.css';
import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { Color } from '../styles/variables';

import { Close } from '@mui/icons-material';

export const Dialog: React.FC = () => {
  const [content, updateContent] = useAtom(DialogContentAtom);

  return content != null ? (
    <div className='Dialog___Overlay__styled'>
      <div className='Dialog___Wrapper__styled'>
        <button className='Dialog___CloseButton__styled' onClick={() => updateContent(null)}>
          <Close style={{color: Color.MONO_A, height: 32, width:32}}/>
        </button>
        <div className='Dialog___Container__styled'>{content}</div>
      </div>
    </div>
  ) : null;
};
