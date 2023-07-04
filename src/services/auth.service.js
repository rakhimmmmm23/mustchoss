class AuthService {
    login(user) {
        // let raw = JSON.stringify({
        //     "login": "+7 (444)-444-44-44",
        //     "pwd": "1234"
        // })
        let raw = JSON.stringify({
            "login": user.login,
            "pwd": user.pwd
        })
        let requestOptions = {
            method: 'POST',
            headers: {
                'api-key': process.env.VUE_APP_COCKPIT_API_TOKEN,
                'Content-Type': 'application/json'
            },
            body: raw,
            redirect: 'follow'
        }
        
        return fetch(process.env.VUE_APP_COCKPIT_ENDPOINT + 'api/musatos/auth', requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.status === 'success') {
                localStorage.setItem('user', JSON.stringify(result.data))
            }
            return result
        })
    }
  
    logout() {
        localStorage.removeItem('user')
    }
  
    // register(user) {
    //     // return axios.post(API_URL + 'signup', {
    //     //     username: user.username,
    //     //     email: user.email,
    //     //     password: user.password
    //     // })
    // }
}
  
export default new AuthService()