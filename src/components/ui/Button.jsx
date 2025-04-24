import React from 'react'
import { FiArrowRight } from 'react-icons/fi';

function Button(props) {
  return (
    <a className={`inline-flex items-center justify-center ${props.className}`} href={`${props.href}`}>
      <span>{ props.children }</span>
      <FiArrowRight />
    </a>
  )
}

export default Button
