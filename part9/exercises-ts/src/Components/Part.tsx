import React from 'react'
import { CoursePart } from '../types/CoursePart';

const Part: React.FC<{ part: CoursePart}> = ({ part }) => (
  <>
    <p>
      {part.name} {part.exerciseCount}
    </p>
  </>
);

export default Part;