import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from '../components/QuestionComponents/QuestionParagraph/Component'

test('Default Properties', () => {
  render(<Component />)
  const span = screen.getByText('Row Paragraph')
  expect(span).toBeInTheDocument()
})

test('Input Properties', () => {
  render(<Component text="hello" isCenter={true} />)
  const span = screen.getByText('hello')
  expect(span).toBeInTheDocument()

  const p = span.parentElement //Obtain parent element
  expect(p).not.toBeNull()

  const style = p!.style || {}
  //   console.log('style...', style)
  expect(style.textAlign).toBe('center')
})

test('Mulit-text', () => {
  render(<Component text={'a\nb\nc'} />)
  const span = screen.getByText('a')

  expect(span).toBeInTheDocument()
  expect(span).toHaveTextContent('a')
  expect(span).not.toHaveTextContent('ab')
})
