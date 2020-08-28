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

if(process.argv.length < 4) throw new Error('Not enought arguments')
if(process.argv.length > 4) throw new Error('Too many arguments')

if(isNaN(Number(process.argv[2])) || isNaN(Number(process.argv[3]))) throw new Error('Provided values were not numbers!')

try {
  const height = Number(process.argv[2])
  const weight = Number(process.argv[3])
  console.log(calculateBmi(height, weight))
} catch (e) {
  console.error(e.message)
}


