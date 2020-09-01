import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/hello', (_req,res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req,res) => {
  try {
    const weight = Number(req.query.weight) | 0;
    const height = Number(req.query.height) | 0;
    if(weight && height){
      const response = {
        weight,
        height,
        bmi: calculateBmi(height,weight)
      };
      res.send(response);
    } else {
      res.send({error: "malformatted parameters"});
    }
  } catch (e) {
    console.error(e);
    res.send({error: "Error"});
  }
  
});

app.post('/exercises', (req,res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    if(!req.body.target || !req.body.daily_exercises){
      res.status(400).json({error: 'parametes missing'});
      throw new Error('parametes missing');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const target = req.body.target;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const dailyExerciseHours: Array<string> = req.body.daily_exercises;

    if(isNaN(Number(target))){
      res.status(400).json({error: 'malformatted parameters'});
      throw new Error('malformatted parameters');
    }

    dailyExerciseHours.forEach(e => {
      if(isNaN(Number(e))){
        res.status(400).json({error: 'malformatted parameters'});
        throw new Error('malformatted parameters');
      }
    });

    const parsedTarget = Number(target);
    const parsedDailyExerciseHours = dailyExerciseHours.map(e=>Number(e));

    const result = calculateExercises(parsedDailyExerciseHours,parsedTarget);

    res.status(200).json(result);

  } catch (e) {
    throw new Error(e);
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
);