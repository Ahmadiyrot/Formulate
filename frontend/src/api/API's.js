const saveDocument = async (point, document) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/${point}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(document)
        })
        if (response.ok) {
            return response.json();
        }
        return response;

    } catch (error) {
        console.log(error)
    }
}

export {
    saveDocument

}