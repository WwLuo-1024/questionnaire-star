import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from '../components/QuestionComponents/QuestionInput/Component'

test('Default Property', () => {
  render(<Component />)
  const p = screen.getByText('Input Box Title')
  expect(p).toBeInTheDocument()

  const input = screen.getByPlaceholderText('Please enter...')
  expect(input).toBeInTheDocument()
})

test('Input Properties', () => {
  render(<Component title="hello" placeholder="world" />)
  const p = screen.getByText('hello')
  expect(p).toBeInTheDocument()

  const input = screen.getByPlaceholderText('world')
  expect(input).toBeInTheDocument()
})
