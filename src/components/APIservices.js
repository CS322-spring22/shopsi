//connect to signup (/signupLP)

export default class APIservice{
    static insertSignup(){
        return fetch(`http://127.0.0.1:5000/signupLP`,{
            'method':'POST',
             headers : {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
        }).then(response => response.json()).catch(error => console.log(error))
    }
}
//connect to login

//connect to enter measurements