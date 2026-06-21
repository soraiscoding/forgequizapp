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

  // when we reach the final question reachedEnd will lead to the end screen being displayed
  const [reachedEnd, setReachedEnd] = useState(false);
  const [score, setScore] = useState(0);

  const onClickHandler = (isCorrect) => {
    if (isCorrect) {
      setExplanation('You got it right!');
      setScore(score + 1);
    } else {
      setExplanation('Incorrect, the correct answer is ' + `${QuestionSet[activeQuestion].correctAnswer}`);
    }

    setShowResult(true);
  }

  const onClickNext = () => {
    if (activeQuestion + 1 < QuestionSet.length) {
      setActiveQuestion(activeQuestion + 1);
      setShowResult(false);
    } else {
      setReachedEnd(true); // we reached the last question so reachedend is set to true
    }
  }

  // for restarting the game
  const onClickReplay = () => {
    setActiveQuestion(0);
    setShowResult(false);
    setScore(0);
    setExplanation('');
    setReachedEnd(false);
  }

  const { question, options, image } = QuestionSet[activeQuestion];

  return (
    <>
      {/* If reachedEnd is true we show the end screen, otherwise we just move on to the next question */}
      { reachedEnd ? (
        <Stack space="space.200" alignInline="center">
          <Heading as="h1">Final score: {score} out of {QuestionSet.length} </Heading>
          <Image src={"https://media.giphy.com/media/XROOE9NApITmCgF6dZ/giphy.gif"} alt='High-five' size = "small"/>
          <Button appearance="primary" onClick={onClickReplay}>
              Replay
          </Button>
        </Stack>
      ) : (
      <Stack space="space.200" alignInline="center">
        <Heading as="h1">{question}</Heading>

        {/* if there's no image (meaning no questions, since we try extract an image from a question) then you get the mario block gif */}
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

        {/* you got it right! or incorrect, the correct answer is "" */}
        <Text>{showResult ? explanation : null}</Text>
        
        {/* onClick we run onClickNext, isDisabled is for whether the button is greyed out and uninteractable or not */}
        <Button appearance='default' onClick={onClickNext} isDisabled={showResult ? false : true}>{ activeQuestion == QuestionSet.length-1 ? 'Finish' : 'Next Question'}</Button>
        
        {/* Question 2 of 3 (for example) */}
        <Text>Question {activeQuestion + 1} of {QuestionSet.length}</Text>
      </Stack> )
      }
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
