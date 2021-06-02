//authentication font-end
const loginCheck = () => {
  if (!document.cookie) {
    alert("Hello! Please login first!!");
    afterClick();
  }
}
