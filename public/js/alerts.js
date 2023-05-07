export const showAlert = (type,msg)=>{
    console.log('show')
    const markUp = `<div class="alert alert--${type}>${msg}</div>`
    document.querySelector('body').insertAdjacentHTML('afterbegin',markUp)
}

export const hideAlert  = ()=>{
    hideAlert();
    const el = document.querySelector('.alert');
    if(el) el.parentElement.removeChild(el);
    window.setTimeout(hideAlert(),5000)
}