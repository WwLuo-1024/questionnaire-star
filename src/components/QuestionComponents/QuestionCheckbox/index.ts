/**
 * @description Questionnaire Checkbox
 * @author wwluo
 */

import Component from './Component'
import PropComponent from './PropsComponent'
import { QuestionCheckboxDefaultProps } from './interface'

export * from './interface'

export default {
  title: 'Multiple Select',
  type: 'questionCheckbox',
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
}
