import React, { useState } from 'react';
import ForgeReconciler, { Heading, Image, Button, Text, Inline, Stack } from '@forge/react';
import { QuestionSet } from '../data/questions';

const App = () => {

  // this is essentially a counter to go through the questions one by one
  // it gets incremented by one every time you answer a question
  const [activeQuestion, setActiveQuestion] = useState(0);

  // i added placeholder explanation instead of leaving it at ''
  // to see what would happen but i don't think anything would happen
  const [explanation, setExplanation] = useState('placeholder explanation')
  const [showResult, setShowResult] = useState(false);

  const onClickHandler = (isCorrect) => {
    if (isCorrect) {
      setExplanation('You got it right!');
    } else {
      setExplanation('Incorrect, the correct answer is ' + `${QuestionSet[activeQuestion].correctAnswer}`);
    }

    setShowResult(true);
  }

  const onClickNext = () => {
    if (activeQuestion + 1 < QuestionSet.length) {
      setActiveQuestion(activeQuestion + 1);
      setShowResult(false);
    }
  }

  const { question, options, image } = QuestionSet[activeQuestion];

  return (
    <>
      <Stack space="space.200" alignInline="center">
        <Heading as="h1">{question}</Heading>

        {/* if there's no image then you get the mario block gif */}
        <Image src={image ? image : "https://media.giphy.com/media/xUOxfjsW9fWPqEWouI/giphy.gif"} alt="Founders" size="xsmall" />
        <Inline space="space.200" alignBlock="center" alignInline="center">
          <Stack space="space.200" grow="hug">
            <Button appearance="primary" onClick={() => onClickHandler(options[0].isCorrect)} isDisabled={showResult ? true : false}>
              {options[0].option}
            </Button>
            <Button appearance="primary" onClick={() => onClickHandler(options[2].isCorrect)} isDisabled={showResult ? true : false}>
              {options[2].option}
            </Button>
          </Stack>
          <Stack space="space.200" grow="hug">
            <Button appearance="primary" onClick={() => onClickHandler(options[1].isCorrect)} isDisabled={showResult ? true : false}>
              {options[1].option}
            </Button>
            <Button appearance="primary" onClick={() => onClickHandler(options[3].isCorrect)} isDisabled={showResult ? true : false}>
              {options[3].option}
            </Button>
          </Stack>
        </Inline>
        <Text>{showResult ? explanation : null}</Text>
        <Button appearance='default' onClick={onClickNext} isDisabled={showResult ? false : true}>{ activeQuestion == QuestionSet.length-1 ? 'Finish' : 'Next Question'}</Button>
        <Text>Question {activeQuestion + 1} of {QuestionSet.length}</Text>
      </Stack>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
