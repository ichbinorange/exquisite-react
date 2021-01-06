import React, { useState } from 'react';
import './Game.css';
import PlayerSubmissionForm from './PlayerSubmissionForm';
import FinalPoem from './FinalPoem';
import RecentSubmission from './RecentSubmission';

const Game = () => {
  const [recentLine, setRecentLine] = useState('')
  const [finalPoem, setFinalPoem] = useState([])
  const [finalSubmitted, setFinalSubmitted] = useState(false)
  const [currentplayer, setCurrentPlayer] = useState(1)

  const exampleFormat = FIELDS.map((field) => {
    if (field.key) {
      return field.placeholder;
    } else {
      return field;
    }
  }).join(' ');

  const sendSubmission = (newLine) => {
    // update RecentSubmission
    const updateRecentLine = [...recentLine]
    for (const element in newLine) {
      if (element.key) {
        updateRecentLine.push(element.key)
        } else {
          updateRecentLine.push(element)
        }
    };
    setRecentLine(updateRecentLine);

    // update current player
    setCurrentPlayer(currentplayer+1);
  }

  const showFinalPoem = () => {
    // update FinalPoem
    const updateFinalPoem = finalPoem.push(recentLine)
    setFinalPoem(updateFinalPoem)
  }

  return (
    <div className="Game">
      <h2>Game</h2>

      <p>Each player should take turns filling out and submitting the form below. Each turn should be done individually and <em>in secret!</em> Take inspiration from the revealed recent submission. When all players are finished, click the final button on the bottom to reveal the entire poem.</p>

      <p>Please follow the following format for your poetry submission:</p>

      <p className="Game__format-example">
        { exampleFormat }
      </p>

      <RecentSubmission submission={recentLine}/>

      <PlayerSubmissionForm index={currentplayer}
                            sendSubmission={sendSubmission} 
                            fields={FIELDS} // hardcode data
      />

      <FinalPoem isSubmitted={finalSubmitted} //true/false
                 submissions={finalPoem} // Array
                 revealPoem={showFinalPoem} // Function
      />

    </div>
  );
}


const FIELDS = [
  'The',
  {
    key: 'adj1',
    placeholder: 'adjective',
  },
  {
    key: 'noun1',
    placeholder: 'noun',
  },
  {
    key: 'adv',
    placeholder: 'adverb',
  },
  {
    key: 'verb',
    placeholder: 'verb',
  },
  'the',
  {
    key: 'adj2',
    placeholder: 'adjective',
  },
  {
    key: 'noun2',
    placeholder: 'noun',
  },
  '.',
];

export default Game;
