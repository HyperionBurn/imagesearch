var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
     event.currentTarget.classList.add("ctive-link")
     document.getElementById(tabname).classList.add
    var selectedTab = document.querySelector(`[onclick="opentab('${tabname}')"]`);
    selectedTab.classList.add("active-link");

    var selectedContent = document.getElementById(tabname);
    selectedContent.classList.add("active-tab");
}

var sidemenu = document.getElementById("sidemenu");

function openMenu() {
    sidemenu.style.right = "0"
}
function closeMenu() {
    sidemenu.style.right = "-200px"
}
/////
// Smooth scroll function
function smoothScroll(target, duration) {
    var targetElement = document.querySelector(target);
    var targetPosition = targetElement.offsetTop;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;
  
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      var timeElapsed = currentTime - startTime;
      var scrollAmount = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, scrollAmount);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
  
    // Easing function
    function ease(t, b, c, d) {
      t /= d;
      t--;
      return -c * (t * t * t * t - 1) + b;
    }
  
    requestAnimationFrame(animation);
  }
  
  // Smooth scroll for navigation links
  var navLinks = document.querySelectorAll('#sidemenu a');
  
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var target = this.getAttribute('href');
      var duration = 1350; // Adjust the duration as needed
      smoothScroll(target, duration);
    });
  });
  