/**
 * @description Questionnaire Radio
 * @author wwluo
 */

import Component from './Component'
import { QuestionRadioDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: 'Singe-select',
  type: 'questionRadio',
  Component,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps,
}
