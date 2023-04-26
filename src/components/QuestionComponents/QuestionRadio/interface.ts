export type OptionType = {
  value: string
  text: string
}

export type QuestionRadioPropsType = {
  title?: string
  isVertical?: boolean
  options?: OptionType[]
  value?: string

  onChange?: (newProps: QuestionRadioPropsType) => void
  disabled?: boolean
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: 'Single-selected title',
  isVertical: false,
  options: [
    { value: 'item1', text: 'option1' },
    { value: 'item2', text: 'option2' },
    { value: 'item3', text: 'option3' },
  ],
  value: '', //默认没选中
}
