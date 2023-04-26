/**
 * @description Questionnaire Info Component
 * @author wwluo
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInfoDefaultProps } from './interface'

export * from './interface'

export default {
  title: 'QuestionnaireInfo',
  type: 'questionInfo',
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
}
