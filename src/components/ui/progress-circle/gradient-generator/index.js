const colors = []

const gradientBreakPoints = [
  [136, 213, 51],
  [191, 235, 20],
  [254, 232, 14],
  [254, 198, 14],
  [254, 114, 14],
  [255, 70, 53],
]

const generateColors = (colorStart, colorEnd, steps) => {
  const colorDiff = colorStart.map((color, pos) => color - colorEnd[pos])
  const colorRange = []

  for (let i = 0; i < steps; i++) {
    if (i - 1 === steps) {
      colors.push(colorEnd)
    } else {
      colors.push(colorStart.map((color, pos) => Math.round(color - colorDiff[pos] / steps * i)))
    }
  }

  return colorRange
}

const stopColors = 360 / (gradientBreakPoints.length - 1)

gradientBreakPoints.forEach((color, i, arr) => {
  if (i < arr.length - 1) colors.push(...generateColors(color, arr[i + 1], stopColors))
})

export default colors
