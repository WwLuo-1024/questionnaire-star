import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from '../components/QuestionComponents/QuestionCheckbox/Component'

test('Default Property', () => {
  render(<Component />)
  const p = screen.getByText('Multiple Selected Ttitile')
  expect(p).toBeInTheDocument()

  for (let i = 1; i <= 3; i++) {
    const checkbox = screen.getByDisplayValue(`item${i}`)
    expect(checkbox).toBeInTheDocument()

    const label = screen.getByText(`option${i}`)
    expect(label).toBeInTheDocument()

    expect(checkbox.getAttribute('checked')).toBeNull() //Each checkbox is not checked by default
  }
})

test('Input Properties', () => {
  const list = [
    { value: 'v1', text: 't1', checked: false },
    { value: 'v2', text: 't2', checked: true },
    { value: 'v3', text: 't3', checked: true },
  ]

  render(<Component title="hello" list={list} />)
  const p = screen.getByText('hello')
  expect(p).toBeInTheDocument()

  const checkbox1 = screen.getByDisplayValue(`v1`)
  expect(checkbox1).toBeInTheDocument()
  expect(checkbox1.getAttribute('checked')).toBeNull() //Not Selected - checked:false

  const checkbox2 = screen.getByDisplayValue(`v2`)
  expect(checkbox2).toBeInTheDocument()
  expect(checkbox2.getAttribute('checked')).not.toBeNull()

  const checkbox3 = screen.getByDisplayValue(`v3`)
  expect(checkbox3).toBeInTheDocument()
  expect(checkbox3.getAttribute('checked')).not.toBeNull()
})
