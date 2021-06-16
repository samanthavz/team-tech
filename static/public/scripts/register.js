function passwordCheck() {
  if (
    document.getElementById('password').value ==
    document.getElementById('confirm_password').value
  ) {
    document.getElementByClassName('registerBtn2').disabled = false;
  } else {
    document.getElementByClassName('registerBtn2').disabled = true;
  }
}
