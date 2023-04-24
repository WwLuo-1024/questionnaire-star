export type QuestionInputPropsType = {
  title?: string
  placeholder?: string

  onChange?: (newProps: QuestionInputPropsType) => void
}

export const QuestionDefaultInputProps: QuestionInputPropsType = {
  title: 'Input Box Title',
  placeholder: 'Please enter...',
}
