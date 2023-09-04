import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
// import {v4 as uuid} from './node_modules/uuid'
const supabaseUrl = 'https://vwvijlosyyueozawvrak.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3dmlqbG9zeXl1ZW96YXd2cmFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzMDYzODUsImV4cCI6MjAwODg4MjM4NX0.pqpK7cJpvrNHhiIY94M9NNmgsKYpWYu1HjqIJoVcBYQ'
const supabase = createClient(supabaseUrl, supabaseKey)
let cdnUrl = 'https://vwvijlosyyueozawvrak.supabase.co/storage/v1/object/public/images/'

let publish = document.getElementById('ca-p')
let profile = document.getElementById('ca-profile')
let pfp = document.getElementById('ca-pfp')
let title = document.getElementById('ca-it')
let uplaodImg = document.getElementById('ca-ui')
let imgBox = document.getElementById('ca-img')
let textArea = document.getElementById('ca-ta')

let logStat = localStorage.getItem('isLogged')
let info = JSON.parse(localStorage.getItem('userInfo'))
let userID = JSON.parse(localStorage.getItem('userId'))

let imageFile = null;
let imgUrl = null;

function  checkLogStat(){
    if(info !== null ){
        // console.log(info);
        if (logStat  == 'true'){
            // console.log(logStat);
        }
        else{
            window.location.pathname = "/sign-in.html"
            // console.log(logStat);
        }
    }
    else{
        window.location.pathname = "/sign-up.html"
        // console.log(info);
    }
}

window.addEventListener('load', (e)=>{
    localStorage.removeItem('imgFile')
    localStorage.removeItem('imgUrl')
    imgBox.style.display = 'none'
    checkLogStat()
})
function uuid() {
    return ('10000000-1000-4000-8000-100000000000').replace(/[018]/g, c => (
        c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
}    
console.log(uuid());

// console.log(userID());
// let id = userID()
// console.log(id);



function localUploadFile(e) {
    const file  = e.target.files[0]

    if (file) {
        imageFile = file; 
        const imgName = file.name
        localStorage.setItem('imgFile', JSON.stringify(file))
        const imgVal = URL.createObjectURL(file);
        console.log(imgVal);
        imgBox.src = imgVal
        if (imgBox.src === imgVal) {
            imgBox.style.display = 'block'
        }
        else{
            imgBox.style.display = 'none'
        }
        console.log(file);
        console.log('upload')
    }
}
// console.log(imgFile);


async function uploadFile(e) {
    e.prevetDefault
    imgUrl = cdnUrl+userID+imageFile.name
    console.log(imgUrl);
    const {data, error} = await supabase.storage
        .from('images')
        .upload(userID+imageFile.name, imageFile);
    if(error){

        console.log(error);
        alert("e no upload, hard luck");
    }
}

async function getFile() {
    const {data, error} = await supabase.storage
        .from('images')
        .list('')    

    if (data !== null ) {
        setState({files: data})
        return state.files
    }
    else{
        console.log(error);
        console.log(error);;
    }
}

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
    console.log(altProfile);
    if (data[0].profileUrl !== null ) {
        pfp.src = data[0].profileUrl   
    }
    else{
        profile.innerHTML = `<p class="alt-pfp">${altProfile}</p>`

        // profile.innerHTML = `<p class="">o</p>`
    }
}
getUserProfile()


async function puplishPost(e) {
    uploadFile(e)
    if (imageFile !== null){
        console.log('yes');
        let { data, error } = await supabase
        .from('blog_store')
        .insert({ name:'test' , imgUrl: imgUrl, tittle: textArea.value, authorUUID: userID})
    if (error) {
        console.error(error)
        return
        }
    } else console.log('no')

}


uplaodImg.addEventListener('change', (e) =>{localUploadFile (e)})
publish.addEventListener('click' ,(e) => {puplishPost(e)})