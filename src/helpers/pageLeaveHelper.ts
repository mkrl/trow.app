const onPageLeave = (e: BeforeUnloadEvent): void => {
    e.preventDefault()
    e.returnValue = ''
}

export default onPageLeave
