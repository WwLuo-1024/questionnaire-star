/**
 * @description questionnaire Title
 * @author wwluo
 */

import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

//Title component config
export default {
  title: 'Title',
  type: 'questionTitle', //same as backend
  Component, //Components displayed on canvas
  PropComponent, //Edit property
  defaultProps: QuestionTitleDefaultProps,
}
