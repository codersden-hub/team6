import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseUrl = 'https://vwvijlosyyueozawvrak.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3dmlqbG9zeXl1ZW96YXd2cmFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzMDYzODUsImV4cCI6MjAwODg4MjM4NX0.pqpK7cJpvrNHhiIY94M9NNmgsKYpWYu1HjqIJoVcBYQ'
const supabase = createClient(supabaseUrl, supabaseKey)

let userDisplay = document.getElementById('nav-right')
console.log(userDisplay.innerHTML);

let logStat = localStorage.getItem('isLogged')
let info = JSON.parse(localStorage.getItem('userInfo'))
console.log(info);
let notUserDisp = `<button class="alt-user-disp">sign up</button>`
let notSignedInDisp = `<button class="alt-user-disp">sign in</button>`
let CreateBlogLink = `<a href="create-blog.html"><button>cb</button></a>`
 function  checkLogStat(){
    if(info !== null ){
        if (logStat == 'true') {
            let email = info[0].email
            console.log('welcome user');
            getUserProfile()
        }
        else{
            console.log('not signed in');
            userDisplay.innerHTML = notSignedInDisp
        }
    }
    else{
        console.log('guest user');
        userDisplay.innerHTML = notUserDisp     
    }
}
checkLogStat()

async function getUserData() {
    if (info !== null) {

        let emails = info.map(e => e.email )
        let {data, error} = await supabase
          .from('user_store')
          .select() 
          .eq('email',`${info[0].email}` )
          console.log(data);
          if (error) {
            console.log(error);
        }

    }
}
getUserData()

async function getUserProfile() {
    console.log(info);
    const {data, error} = await supabase
    .from('user_store')
    .select()
    .eq('email',`${info[0].email}`)
    console.log(data[0].profileUrl);
    if (error) {
        console.log(error);
    }
    let altProfile = data[0].email.split('')[0]
    let userName = data[0].name|| 'user'
    console.log(altProfile);
    if (data[0].profileUrl !== null ) {
        userDisplay = `<h1>Hey, ${userName}</h1>
                        <img src="${data[0].profileUrl}" alt="profile image of user">`
    }
    else{
        console.log(userName);
        userDisplay.innerHTML = `<h1>Hey, ${userName}</h1>`

        // profile.innerHTML = `<p class="">o</p>`
    }
}
getUserProfile()
