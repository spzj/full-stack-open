// Differentiates a click from a click-drag (e.g. copying text)
const useClickHandler = (handleOnClick) => {
  let startX = 0
  let startY = 0
  let isClick = false

  const handleMouseDown = (event) => {
    startX = event.clientX
    startY = event.clientY
    isClick = true
  }

  const handleMouseMove = (event) => {
    if (
      Math.abs(event.clientX - startX) > 3 ||
      Math.abs(event.clientY - startY) > 3
    ) {
      isClick = false
    }
  }

  const handleMouseUp = (...args) => {
    if (isClick) {
      handleOnClick(...args)
    }
  }

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  }
}

export default useClickHandler
