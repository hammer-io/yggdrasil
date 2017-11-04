'use strict'

const constants = {}

export default function createConstant (str) {
  if (constants[str]) {
    throw new Error(`already created a constant for ${str}`)
  } else {
    constants[str] = true
  }
  return str
}
