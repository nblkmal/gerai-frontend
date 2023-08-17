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

    // if ((subdomainArr.length == 3) || (subdomainArr.length == 2)) {
    //     slug = subdomainArr[0]
    // } 
    // else {
    //     throw createError({ statusCode: 404, statusMessage: "Page Not Found" })
    // }
    return slug
}