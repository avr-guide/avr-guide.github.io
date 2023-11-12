// Get the body wrapper element
const wrapper = document.getElementById('wrapper');

$(document).ready(function () {
// Get the dropdown menu
  const dropdownMenu = document.getElementById('darkMoodDropdownMenu');

  // Event listener for dropdown menu items
  dropdownMenu.addEventListener('click', function (event) {
    event.preventDefault();

    // Get the selected theme from the data-mode attribute
    const selectedTheme = event.target.getAttribute('data-mode');

    // Set the theme
    setTheme(selectedTheme);

  });

});


// Function to set the theme
function setTheme(theme) {
  setActiveButton(theme)
  // Store the selected theme in localStorage
  localStorage.setItem('selectedTheme', theme);

  if (theme === 'auto') {
    theme = detectSystemColorScheme();
  }

  if (theme === 'dark') {
    // Add the selected theme class
    wrapper.classList.add('dark-mode');
  } else {
    // Remove existing theme classes
    wrapper.classList.remove('dark-mode');
  }
}

// Function to retrieve the selected theme from localStorage
function retrieveTheme() {
  const savedTheme = localStorage.getItem('selectedTheme');

  // Set the saved theme if it exists
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme('auto');
  }
}

// Function to detect system color scheme
function detectSystemColorScheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  } else {
    return 'light';
  }
}

function setActiveButton(selectedTheme) {
  $('#darkMoodDropdownMenu .dropdown-item').each(function () {
    const dataMode = $(this).attr('data-mode');

    if (dataMode === selectedTheme) {
      $(this).addClass('active');
      $(this).attr('aria-pressed', 'true');
    } else {
      $(this).removeClass('active');
      $(this).attr('aria-pressed', 'false');
    }
  });

  let themeIcon = '#circle-half'

  if (selectedTheme === 'light') {
    themeIcon = '#sun-fill'
  }

  if (selectedTheme === 'dark') {
    themeIcon = '#moon-stars-fill'
  }

  $('#darkMoodDropdown #theme svg use').attr('href', themeIcon);
}

// Call the retrieveTheme function when the page loads
window.addEventListener('load', retrieveTheme);