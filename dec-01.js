const path = require('path')
const fs = require('fs-extra')

const elves = []

function addNewElf (elves) {
  elves.push([])
  return elves[elves.length - 1]
}

let currentElf = addNewElf(elves)

const d = fs.readFileSync('input.txt', { encoding: 'utf8' })
const lines = d.split('\n')
console.log(`there are ${lines.length} lines`)

let bestTotal = 0
let currentTotal = 0
let bestElfIndex = -1
let bestLine = -1

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim()
  if (line.length) {
    currentElf.push(Number(line))
    currentTotal += Number(line)
    if (currentTotal > bestTotal) {
      bestTotal = currentTotal
      bestElfIndex = elves.length - 1
      bestLine = i
    }
  } else {
    currentElf = addNewElf(elves)
    currentTotal = 0
  }
}
if (!elves[elves.length - 1].length) elves.pop()
console.log(`there are ${elves.length} elves`)
console.log(`the best elf has ${bestTotal} at index ${bestElfIndex} ending at line ${bestLine}`)
console.dir(elves[bestElfIndex])

// post-process for the leader-board

const leaderBoard = []
for (let i = 0; i < elves.length; i++) {
  const elf = elves[i]
  const sum = 0
  const elfTotal = elf.reduce((acc, cur) => acc + cur, sum)
  leaderBoard.push({ i, elfTotal })
}
leaderBoard.sort((a, b) => { return b.elfTotal - a.elfTotal })
console.log("1st: elf", leaderBoard[0])
console.log("2nd: elf", leaderBoard[1])
console.log("3rd: elf", leaderBoard[2])
//console.dir(leaderBoard)

const top3sum = leaderBoard[0].elfTotal + leaderBoard[1].elfTotal + leaderBoard[2].elfTotal
console.log(top3sum)

console.log('THE END')
