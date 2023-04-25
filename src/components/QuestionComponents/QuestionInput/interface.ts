export type QuestionInputPropsType = {
  title?: string
  placeholder?: string

  onChange?: (newProps: QuestionInputPropsType) => void
  disabled?: boolean
}

export const QuestionDefaultInputProps: QuestionInputPropsType = {
  title: 'Input Box Title',
  placeholder: 'Please enter...',
}
