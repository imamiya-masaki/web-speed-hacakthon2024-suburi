import './Footer.module.css'

import { useSetAtom } from 'jotai';
import React, { useId, useRef } from 'react';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
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

  const cache = useRef({company: '', contact: '',overview: '', question: '', term: ''})

  const handleRequestToTermDialogOpen = async() => {
    let term = cache.current.term
    if (term === '' ) {
     const json = (await (await fetch('/server/term')).json() ) as {value: string}
     cache.current.term = json.value
     term = cache.current.term
    }
    updateDialogContent(
      <section className='Footer___Content__styled' aria-labelledby={termDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={termDialogA11yId} typography={Typography.NORMAL16}>
          利用規約
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {term}
        </Text>
      </section>,
    );
  };

  const handleRequestToContactDialogOpen = async() => {
    let contact = cache.current.contact
    if (contact === '' ) {
     const json = (await (await fetch('/server/contact')).json() ) as {value: string}
     cache.current.contact = json.value
     contact = cache.current.contact
    }
    updateDialogContent(
      <section className='Footer___Content__styled' aria-labelledby={contactDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={contactDialogA11yId} typography={Typography.NORMAL16}>
          お問い合わせ
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {contact}
        </Text>
      </section>,
    );
  };

  const handleRequestToQuestionDialogOpen = async() => {
    let question = cache.current.question
    if (question === '' ) {
     const json = (await (await fetch('/server/question')).json() ) as {value: string}
     cache.current.question = json.value
     question = cache.current.question
    }
    updateDialogContent(
      <section className='Footer___Content__styled' aria-labelledby={questionDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={questionDialogA11yId} typography={Typography.NORMAL16}>
          Q&A
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {question}
        </Text>
      </section>,
    );
  };

  const handleRequestToCompanyDialogOpen = async() => {
    let company = cache.current.company
    if (company === '' ) {
     const json = (await (await fetch('/server/company')).json() ) as {value: string}
     cache.current.company = json.value
     company = cache.current.company
    }
    updateDialogContent(
      <section className='Footer___Content__styled' aria-labelledby={companyDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={companyDialogA11yId} typography={Typography.NORMAL16}>
          運営会社
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {company}
        </Text>
      </section>,
    );
  };

  const handleRequestToOverviewDialogOpen = async() => {
    let overview = cache.current.overview
    if (overview === '' ) {
     const json = (await (await fetch('/server/overview')).json() ) as {value: string}
     cache.current.overview = json.value
     overview = cache.current.overview
    }
    updateDialogContent(
      <section className='Footer___Content__styled' aria-labelledby={overviewDialogA11yId} role="dialog">
        <Text as="h2" color={Color.MONO_100} id={overviewDialogA11yId} typography={Typography.NORMAL16}>
          Cyber TOONとは
        </Text>
        <Spacer height={Space * 1} />
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
          {overview}
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