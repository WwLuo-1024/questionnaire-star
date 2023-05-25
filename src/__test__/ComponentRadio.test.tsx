import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from '../components/QuestionComponents/QuestionRadio/Component'

test('Default Property', () => {
  render(<Component />)

  const p = screen.getByText('Single-selected title')
  expect(p).toBeInTheDocument()

  for (let i = 1; i <= 3; i++) {
    const radio = screen.getByDisplayValue(`item${i}`)
    expect(radio).toBeInTheDocument()

    const label = screen.getByText(`option${i}`)
    expect(label).toBeInTheDocument()
  }
})

test('Input Properties', () => {
  const opts = [
    { value: 'v1', text: 't1' },
    { value: 'v2', text: 't2' },
    { value: 'v3', text: 't3' },
  ]

  const value = 'v1'
  render(<Component title="hello" options={opts} value={value} />)

  const p = screen.getByText('hello')
  expect(p).toBeInTheDocument()

  for (let i = 1; i <= 3; i++) {
    const curVal = `v${i}`
    const radio = screen.getByDisplayValue(curVal)
    expect(radio).toBeInTheDocument()

    const label = screen.getByText(`t${i}`)
    expect(label).toBeInTheDocument()

    //Selected option
    if (curVal === value) {
      expect(radio.getAttribute('checked')).not.toBeNull()
    }
  }
})
