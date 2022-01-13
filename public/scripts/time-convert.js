function convertTime() {
    document.querySelectorAll(".time-convert").forEach(time => {
        const inner = time.innerHTML.toString().trim()
        const timeConverted = new Date(inner).toLocaleString('en-JM')
        
        time.innerHTML = timeConverted
    })
}

convertTime()