import './Footer.module.css'

import { useSetAtom } from 'jotai';
import React, { useId } from 'react';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { COMPANY } from '../constants/Company';
import { CONTACT } from '../constants/Contact';
import { OVERVIEW } from '../constants/Overview';
import { QUESTION } from '../constants/Question';
import { TERM } from '../constants/Term';
import { Color, Space, Typography } from '../styles/variables';

import { Button } from './Button';
import { Flex } from './Flex';
import { Spacer } from './Spacer';
import { Text } from './Text';

export const FooterButtonContent: React.FC = ( ) => {
  const termDialogA11yId = useId();
  const contactDialogA11yId = useId();
  const questionDialogA11yId = useId();
  const companyDialogA11yId = useId();
  const overviewDialogA11yId = useId();

  const updateDialogContent = useSetAtom(DialogContentAtom);

  const handleRequestToTermDialogOpen = () => {
    updateDialogContent(
      <section className='Footer___Content__styled' aria-labelledby={termDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={termDialogA11yId} typography={Typography.NORMAL16}>
          利用規約
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {TERM}
        </Text>
      </section>,
    );
  };

  const handleRequestToContactDialogOpen = () => {
    updateDialogContent(
      <section className='Footer___Content__styled' aria-labelledby={contactDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={contactDialogA11yId} typography={Typography.NORMAL16}>
          お問い合わせ
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {CONTACT}
        </Text>
      </section>,
    );
  };

  const handleRequestToQuestionDialogOpen = () => {
    updateDialogContent(
      <section className='Footer___Content__styled' aria-labelledby={questionDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={questionDialogA11yId} typography={Typography.NORMAL16}>
          Q&A
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {QUESTION}
        </Text>
      </section>,
    );
  };

  const handleRequestToCompanyDialogOpen = () => {
    updateDialogContent(
      <section className='Footer___Content__styled' aria-labelledby={companyDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={companyDialogA11yId} typography={Typography.NORMAL16}>
          運営会社
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {COMPANY}
        </Text>
      </section>,
    );
  };

  const handleRequestToOverviewDialogOpen = () => {
    updateDialogContent(
      <section className='Footer___Content__styled' aria-labelledby={overviewDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={overviewDialogA11yId} typography={Typography.NORMAL16}>
          Cyber TOONとは
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {OVERVIEW}
        </Text>
      </section>,
    );
  };


  return (<Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <Button className='Footer___Button__styled'  onClick={handleRequestToTermDialogOpen}>
            利用規約
          </Button>
          <Button className='Footer___Button__styled'  onClick={handleRequestToContactDialogOpen}>
            お問い合わせ
          </Button>
          <Button className='Footer___Button__styled'  onClick={handleRequestToQuestionDialogOpen}>
            Q&A
          </Button>
          <Button className='Footer___Button__styled'  onClick={handleRequestToCompanyDialogOpen}>
            運営会社
          </Button>
          <Button className='Footer___Button__styled' onClick={handleRequestToOverviewDialogOpen}>
            Cyber TOONとは
          </Button>
        </Flex>)
}


export default FooterButtonContent