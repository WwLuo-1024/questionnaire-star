import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from '../components/QuestionComponents/QuestionInfo/Component'

//Test Cases
test('Default Property', () => {
  render(<Component />) //Render Component
  const h = screen.getByText('Questionnaire Title')
  expect(h).toBeInTheDocument() //Assert
})

test('Input Properties', () => {
  render(<Component title="hello" desc="world" />)
  const h = screen.getByText('hello')
  expect(h).toBeInTheDocument()

  const p = screen.getByText('world')
  expect(p).toBeInTheDocument()
})

test('Multi-Line Text', () => {
  render(<Component desc={'a\nb\nc'} />)
  const span = screen.getByText('a')
  expect(span).toBeInTheDocument()

  expect(span).toHaveTextContent('a')
  expect(span).not.toHaveTextContent('ab')
})
