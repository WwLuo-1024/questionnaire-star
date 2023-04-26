/**
 * @description Questionnaire - Paragrah
 * @author wwluo
 */

import Component from './Component'
import { QuestionParagraphDefaultType } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: 'Paragraph',
  type: 'questionParagraph',
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultType,
}
