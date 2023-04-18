export type QuestionTiltePropsType = {
  //? is not mandatory
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean
}

export const QuestionTitleDefaultProps: QuestionTiltePropsType = {
  text: 'Row Title',
  level: 1,
  isCenter: false,
}
