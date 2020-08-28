interface ExerciseStats {
  periodLenght: number,
  trainingDays: number,
  target: number,
  averageTime: number,
  targetReached: boolean,
  rating: number,
  ratingDescription: string
}

const calculateExercises = (dailyExerciseHours:Array<number>, target:number):ExerciseStats => {
  const averageTime = dailyExerciseHours.reduce((a,b) => a+b)/dailyExerciseHours.length

  let rating = 1
  let ratingDescription = ''

  switch(true){
    case(averageTime < target):
      rating = 1
      ratingDescription = `You didn't reach the target...`
      break
    case(averageTime === target):
      rating = 2
      ratingDescription = `You've nailed it!`
      break
    case(averageTime > target):
      rating = 3
      ratingDescription = `You did more than expected!`
      break
    default:
      rating = 1
      ratingDescription = 'Did you do something?'
  }

  const stats = {
    periodLenght: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.filter(d=>d > 0).length,
    target,
    averageTime,
    targetReached: averageTime >= target,
    rating,
    ratingDescription
  }
  return stats
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2))