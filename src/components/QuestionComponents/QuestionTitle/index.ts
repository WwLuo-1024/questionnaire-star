/**
 * @description questionnaire Title
 * @author wwluo
 */

import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

//Title component config
export default {
  title: 'Title',
  type: 'questionTitle', //same as backend
  Component,
  defaultProps: QuestionTitleDefaultProps,
}
