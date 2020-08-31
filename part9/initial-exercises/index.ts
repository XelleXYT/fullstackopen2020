import express from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()

app.get('/ping', (_req, res) => {
  res.send('pong')
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/hello', (_req,res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req,res) => {
  try {
    const weight = Number(req.query.weight) | 0
    const height = Number(req.query.height) | 0
    if(weight && height){
      const response = {
        weight,
        height,
        bmi: calculateBmi(height,weight)
      }
      res.send(response)
    } else {
      res.send({error: "malformatted parameters"})
    }
  } catch (e) {
    console.error(e.message)
    res.send({error: e.message})
  }
  
})
/*
const calculateBmi = (height:number, weight:number):string => {
  const bmi = weight/ ((height/100)^2)

  switch(true){
    case(bmi < 15):
      return `Very severely underweight - BMI:${bmi}`
    case(bmi < 16):
      return `Severely underweight - BMI:${bmi}`
    case(bmi < 18.5):
      return `Underweight - BMI:${bmi}`
    case(bmi < 25):
      return`Normal (healthy weight) - BMI:${bmi}`
    case(bmi < 30):
      return `Overweight - BMI:${bmi}`
    case(bmi < 35):
      return `Obese Class I (Moderately obese) - BMI:${bmi}`
    case(bmi < 40):
      return `Obese Class II (Severely obese) - BMI:${bmi}`
    case(bmi >= 40):
      return `Obese Class III (Very severely obese) - BMI:${bmi}`
    default:
      return `BMI: ${bmi}`
  }
}
*/