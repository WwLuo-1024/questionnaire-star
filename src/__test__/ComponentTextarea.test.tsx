import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from '../components/QuestionComponents/QuestionTextarea/Component'

test('Default Property', () => {
  render(<Component />)
  const p = screen.getByText('Input Box Title')
  expect(p).toBeInTheDocument()

  const textarea = screen.getByPlaceholderText('Please enter...')
  expect(textarea).toBeInTheDocument()
})

test('Input Properties', () => {
  render(<Component title="hello" placeholder="world" />)
  const p = screen.getByText('hello')
  expect(p).toBeInTheDocument()

  const textarea = screen.getByPlaceholderText('world')
  expect(textarea).toBeInTheDocument()
})
