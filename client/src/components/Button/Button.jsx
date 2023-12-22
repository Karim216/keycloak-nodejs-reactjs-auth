import React from 'react'

const Button = ({btnType = "submit", label = "Label", handleSubmit = {}, icon = "", iconLoading = "", cssCustom=""}) => {
  return (
    <button type={btnType} className={`btn-primary w-full flex items-center justify-center gap-2 ${cssCustom}`} onClick={() => handleSubmit()}>
      <div>{icon}</div>
      <div>{label}</div>
    </button>
  )
}

export default Button