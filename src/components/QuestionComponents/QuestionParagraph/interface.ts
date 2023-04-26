export type QuestionParagraphPropsType = {
  text?: string
  isCenter?: boolean

  onChange?: (newProps: QuestionParagraphPropsType) => void
  disabled?: boolean
}

export const QuestionParagraphDefaultType: QuestionParagraphPropsType = {
  text: 'Row Paragraph',
  isCenter: false,
}
