/**
 * @description questionnaire input box
 * @author wwluo
 */

import Component from './Component'
import { QuestionDefaultInputProps } from './interface'

export * from './interface'

//Input component config
export default {
  title: 'input box',
  type: 'questionInput', //same as backend
  Component,
  defaultProps: QuestionDefaultInputProps,
}
