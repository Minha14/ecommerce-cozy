// Function to set a cookie with a given name, value, and expiration date
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
  
  // Function to read a cookie with a given name
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) {
        return cookieValue;
      }
    }
    return null;
  }
  
  // Example usage to set and read a cookie
  setCookie("exampleCookie", "cookieValue", 30); // Set a cookie that expires in 30 days
  const storedValue = getCookie("exampleCookie");
  if (storedValue) {
    console.log("Cookie value:", storedValue);
  } else {
    console.log("Cookie not found.");
  }
  