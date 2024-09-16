const findAccount = async (findCriteria) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_HOSTURL}/user/find`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(findCriteria)

        })
        if (response.ok) {
            return response.json();
        }
    } catch (error) {
        console.log(error)
    }
}

export {
    findAccount
}
