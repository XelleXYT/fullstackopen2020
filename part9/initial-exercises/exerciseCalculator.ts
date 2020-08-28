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

try {
  let dailyExerciseHours = [0]
  let target = 0
  if(process.argv.length > 4) {
    let auxDailyExerciseHours:Array<number> = []
    for(var i = 3; i < process.argv.length; i++){
      auxDailyExerciseHours.push(Number(process.argv[i]))
      if(isNaN(Number(process.argv[i]))) throw new Error('Provided values were not numbers!')
    }
    dailyExerciseHours = auxDailyExerciseHours
    if(isNaN(Number(process.argv[2]))) throw new Error('Provided values were not numbers!')
    target = Number(process.argv[2])
  } else {
    throw new Error('Not enough arguments');
  }
  console.log(calculateExercises(dailyExerciseHours, target))
} catch (e) {
  console.error(e.message)
}

