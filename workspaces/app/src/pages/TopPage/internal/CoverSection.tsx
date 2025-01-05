import './CoverSection.module.css'

import { Link } from '../../../foundation/components/Link';
import { Text } from '../../../foundation/components/Text';
import { Color, Typography } from '../../../foundation/styles/variables';

import { HeroImage } from './HeroImage';
import { Search } from '@mui/icons-material';

export const CoverSection: React.FC = () => {
  return (
    <div className='CoverSection___Wrapper__styled'>
      <HeroImage />
      <Link className='CoverSection___SearchLink__styled' href="/search">
        <Search style={{color: Color.MONO_A, height: 24, width: 24}} />
        <Text color={Color.MONO_A} typography={Typography.NORMAL16}>
          検索
        </Text>
      </Link>
    </div>
  );
};
