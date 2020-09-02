
import React from  'react'
import { Part } from '../types/Part'

const Content: React.FC<{ courseParts: Part[]}> = ({ courseParts }) => (
  <>
    {courseParts.map((part) => (
      <p key={part.name}>
        {part.name} {part.exerciseCount}
      </p>
    ))}
  </>
);

export default Content;