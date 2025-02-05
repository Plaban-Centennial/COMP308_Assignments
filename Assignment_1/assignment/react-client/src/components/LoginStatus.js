const isLoggedIn = () => {

    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");;

    return token !== '';

}



export default isLoggedIn;