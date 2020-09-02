import React from  'react'
import { Part } from '../types/Part';

const Total: React.FC<{ courseParts: Part[]}> = ({ courseParts }) => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry: any, part: any) => carry + part.exerciseCount, 0)}
  </p>
);

export default Total;