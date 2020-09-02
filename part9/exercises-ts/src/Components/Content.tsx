
import React from  'react'
import { CoursePart } from '../types/CoursePart'
import Part from './Part';

const Content: React.FC<{ courseParts: CoursePart[]}> = ({ courseParts }) => (
  <>
    {courseParts.map((part) => (
      <Part key={part.name} part={part} />
    ))}
  </>
);

export default Content;