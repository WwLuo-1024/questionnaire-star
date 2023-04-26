/**
 * @description Multiple line input
 * @author wwluo
 */

import Component from './Component'
import { QuestionTextareaDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

//Textarea component config
export default {
  title: 'Multiple line input',
  type: 'questionTextarea', //same as backend
  Component,
  PropComponent,
  defaultProps: QuestionTextareaDefaultProps,
}
