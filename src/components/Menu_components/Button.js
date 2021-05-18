import React from 'react'
import styled from 'styled-components'
import { IoMdNavigate } from 'react-icons/io'

const Button = styled.button`
  padding: 0.75em 1em;
  background-color: hsl(35, 100%, 50%);
  border: 0;
  border-radius: 10px;
  color: hsl(35, 80%, 98%);
  font-size: 15px;
  font-weight: bold;
  font-family:Copperplate, Papyrus, fantasy;
  text-align: center;
  width: ${({ wide }) => wide && '100%'};

  &:hover {
    background-color: hsl(35, 100%, 40%);
  }
`

Button.Map = props => (
  <Button {...props}>
    <IoMdNavigate />
  </Button>
)

export default Button