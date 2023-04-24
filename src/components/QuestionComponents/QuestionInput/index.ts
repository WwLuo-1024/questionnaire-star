/**
 * @description questionnaire input box
 * @author wwluo
 */

import Component from './Component'
import { QuestionDefaultInputProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

//Input component config
export default {
  title: 'input box',
  type: 'questionInput', //same as backend
  Component,
  PropComponent,
  defaultProps: QuestionDefaultInputProps,
}
