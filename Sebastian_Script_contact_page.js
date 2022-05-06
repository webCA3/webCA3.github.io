//Author: Sebastian Konefal student No. 21197458

const MANDATORYCONTACTINPUTS = document.querySelectorAll('.contact_mandatory_input');
const CONTACTFORM = document.querySelector('.contact_form');
const REGEXPATTERNS = {
  name: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
  'telephone number': /^\d{9,12}$/,
  email: /^([\w\.-]+)@([\w-]+)\.([a-zA-Z]{2,8})(\.[a-zA-Z]{2,8})?$/,
  //messege: /^(\d+\.?\d+){2,200}$/ //work in progress for messege length other than html maxlength
}
// regEx validation function
function validate(input, regex){
  if(regex.test(input.value)){
    input.className = 'valid';
  }else {
    input.className = 'invalid';
  }
}
//loop for inserting invalid class name to invalid mandatory inputs upon any user keyup
MANDATORYCONTACTINPUTS.forEach((input) =>{
  input.addEventListener('keyup', 
    (e) =>{
      validate(e.target, REGEXPATTERNS[e.target.attributes.name.value]);
    });
});

//main function for evaluating validation and informing user on submit
CONTACTFORM.addEventListener('submit', e => {
  e.preventDefault();//Preventing default setting to refresh the page on submit:
  let messeges = [];
  MANDATORYCONTACTINPUTS.forEach( //loop to check input and add to messeges[] if invalid class present 
      (input) =>{
        if(input.value===""){ //if input is empty
          return messeges.push(input.attributes.name.value);
        }else if(input.className==="invalid"){ //if input is invalid
          return messeges.push(input.attributes.name.value);
        } 
    });
    if(messeges.length!==0){ //displaying a warrning only when incorect input was submitted
      toastr.error('Please enter a valid: ' + messeges.join(', '));
    }else {
      toastr.info('Your contact form was sent succesfully');
      //CONTACTFORM.reset(); //reseting form inputs after successfull submit
      
    }

});