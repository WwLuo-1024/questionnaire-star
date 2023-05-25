import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from '../components/QuestionComponents/QuestionTitle/Component'

test('Default Property', () => {
  render(<Component />)
  const h = screen.getByText('Row Title')
  expect(h).toBeInTheDocument()
})

test('Input Properties', () => {
  render(<Component text="hello" level={2} isCenter={true} />)
  const h = screen.getByText('hello')
  expect(h).toBeInTheDocument()

  //Since we set level={2}, the tag should be h2
  expect(h.matches('h2')).toBeTruthy() //<h2> return true

  const style = h.style
  expect(style.textAlign).toBe('center')
})
