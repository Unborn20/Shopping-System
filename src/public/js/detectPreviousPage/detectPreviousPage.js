addEventListener('pageshow', async () => {
    console.info(window.location.pathname)
    try{
        const response = await fetch('/auth/previousPage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currentRoute: window.location.pathname
            })
        })
        const { realPath, reload } = await response.json()        
        if(reload) window.location.replace(realPath)
    }catch(error){
        console.error(error)
    }
});