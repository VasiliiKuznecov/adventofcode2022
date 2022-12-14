// @ts-check

import { it } from "./modules/itertools.js"
import { readLines } from "./modules/lib.js"

/**
 * @param {string} input
 *
 * @returns {Array<() => any>}
 */
export function solve(input) {
  return [() => part1(input), () => part2(input)]
}

/**
 * @param {string[]} lines
 */
function* prepareProgram(lines) {
  let x = 1

  for (const line of lines) {
    const tokens = line.split(" ")
    yield x
    if (tokens[0] === "addx") {
      yield x
      x += Number(tokens[1])
    }
  }
}

/**
 * @param {string} input
 */
function part1(input) {
  const p = prepareProgram(readLines(input.trimEnd()))

  return it(p)
    .indexed()
    .takeEvery(40, 19)
    .map(([cycle, x]) => (cycle + 1) * x)
    .sum()
}

/**
 * @param {string} input
 */
function part2(input) {
  const p = prepareProgram(readLines(input.trimEnd()))

  const image = it(p)
    .groupsOf(40)
    .map((xs) => xs.map((x, i) => (Math.abs((i % 40) - x) <= 1 ? "█" : " ")))
    .map((xs) => xs.join(""))
    .join("\n")

  return "\n" + image + "\n"
}
