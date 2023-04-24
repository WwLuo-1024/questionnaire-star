export type QuestionTitlePropsType = {
  //? is not mandatory
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean

  onChange?: (newProps: QuestionTitlePropsType) => void
}

export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: 'Row Title',
  level: 1,
  isCenter: false,
}
