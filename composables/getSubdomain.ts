export const getSubdomain = () => {
    let slug = ""
    let host = ""
    const headers = useRequestHeaders()
    if (process.server) {
        host = headers["host"]
    } else {
        host = window.location.host
    }

    let subdomainArr = host.split(".")
    console.log('subdomainArr: ', subdomainArr)
    return subdomainArr.length == 3 ? subdomainArr[0] : null
}