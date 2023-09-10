import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseUrl = 'https://vwvijlosyyueozawvrak.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3dmlqbG9zeXl1ZW96YXd2cmFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzMDYzODUsImV4cCI6MjAwODg4MjM4NX0.pqpK7cJpvrNHhiIY94M9NNmgsKYpWYu1HjqIJoVcBYQ'
const supabase = createClient(supabaseUrl, supabaseKey)
let ghbBtn = document.getElementById('si-gh')
let signIn = document.getElementById('si-si')
let email = document.getElementById('email')
let password = document.getElementById('password')
let pModal = document.getElementById('password-modal')
let eModal = document.getElementById('email-modal')
let e_or_p_modal = document.getElementById('e-or-p')
let infoSvg = `<span><img src="./assets/info.svg" alt=""></span>`

ghbBtn.addEventListener('click', (e)=>{
    console.log('sdfghjkl');
    e.preventDefault()
    isUser()
    async function signInWithGitHub() {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'github',
        })
      }
      signInWithGitHub()
   
})
signIn.addEventListener('click',(e)=>{
  e.preventDefault()
  eModal.style.visibility = 'hidden'
  pModal.style.visibility = 'hidden'
  // signIn.disabled = true
  if (!(email.value.length > 1 && password.value.length > 1)) {
    console.log(signIn.disabled )
    checkInput('no_input')
  }
  else if (!email.value.includes('@')) {
    checkInput('invalid_email')
    console.log(3);
    }
    else{  
      isUser()
      async function sign_in() {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value2,
        })
        if (error){
          console.log(error);
          checkInput('e-or-p')
        }
      }
      sign_in()
    }

})

function checkInput(type){
  // if ('no_input') {
  //   console.log(eModal.style.visibility);
  //   eModal.style.visibility = 'unset'
  //   pModal.style.visibility = 'unset'
  //   console.log(eModal.style.visibility);
  //   eModal.innerHTML = `${infoSvg} input email`
  //   pModal.innerHTML = `${infoSvg}input password`
  //   console.log(eModal.value);
  //   console.log(pModal.value);
  // }
  switch (type) {
    case 'no_input':
      console.log(eModal.style.visibility);
    eModal.classList.add('show')
    pModal.classList.add('show')
    // pModal.style.visibility = 'unset'
    // [pModal.style.visibility, eModal.style.visibility] = 'unset'
    console.log(eModal.style.visibility);
    eModal.innerHTML = `${infoSvg} input email`
    pModal.innerHTML = `${infoSvg}input password`
      break;
    case 'no_password':
      pModal.innerHTML = `${infoSvg} input password`
      break
    case 'invalid_email':
      eModal.style.visibility = 'unset'
      eModal.innerHTML = `${infoSvg} invalid email`
      break
    case 'e-or-p':
      e_or_p_modal.style.visibility = `unset`
      e_or_p_modal.innerHTML = `${infoSvg} email or password incorrect`
    default:
      break;
  }

}
// checkInput()
async function isUser(){
  let {data, error} = await supabase
    .from('user_store')
    .select() 
    let mails = data.map(e => e.email)
    if(mails.includes(email.value)){
      console.log('yoooou are a user');
      saveToLocal()
    }
    else{
      console.log(`email does'nt exist`);
    }

}
async function saveToLocal() {
  let {data, error} = await supabase
  .from('user_store')
  .select('id,name,email,userId')
  .eq('email',`${email.value}`)
  localStorage.clear()
  localStorage.setItem("userInfo", JSON.stringify(data));
  localStorage.setItem("isLogged", "true");  
  localStorage.setItem("userId", JSON.stringify(data[0].userId))
}
// saveToLocal()