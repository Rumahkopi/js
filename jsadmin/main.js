
/* Aside: submenus toggle */
Array.from(document.getElementsByClassName('menu is-menu-main')).forEach(el => {
  Array.from(el.getElementsByClassName('has-dropdown-icon')).forEach(elA => {
    elA.addEventListener('click', e => {
      const dropdownIcon = e.currentTarget
          .getElementsByClassName('dropdown-icon')[0]
          .getElementsByClassName('mdi')[0]

      e.currentTarget.parentNode.classList.toggle('is-active')
      dropdownIcon.classList.toggle('mdi-plus')
      dropdownIcon.classList.toggle('mdi-minus')
    })
  })
})

/* Aside Mobile toggle */
Array.from(document.getElementsByClassName('jb-aside-mobile-toggle')).forEach(el => {
  el.addEventListener('click', e => {
    const dropdownIcon = e.currentTarget
        .getElementsByClassName('icon')[0]
        .getElementsByClassName('mdi')[0]

    document.documentElement.classList.toggle('has-aside-mobile-expanded')
    dropdownIcon.classList.toggle('mdi-forwardburger')
    dropdownIcon.classList.toggle('mdi-backburger')
  })
})

/* NavBar menu mobile toggle */
Array.from(document.getElementsByClassName('jb-navbar-menu-toggle')).forEach(el => {
  el.addEventListener('click', e => {
    const dropdownIcon = e.currentTarget
        .getElementsByClassName('icon')[0]
        .getElementsByClassName('mdi')[0]

    document.getElementById(e.currentTarget.getAttribute('data-target')).classList.toggle('is-active')
    dropdownIcon.classList.toggle('mdi-dots-vertical')
    dropdownIcon.classList.toggle('mdi-close')
  })
})

/* Modal: open */
Array.from(document.getElementsByClassName('jb-modal')).forEach(el => {
  el.addEventListener('click', e => {
    const modalTarget = e.currentTarget.getAttribute('data-target')

    document.getElementById(modalTarget).classList.add('is-active')
    document.documentElement.classList.add('is-clipped')
  })
});

/* Modal: close */
Array.from(document.getElementsByClassName('jb-modal-close')).forEach(el => {
  el.addEventListener('click', e => {
    e.currentTarget.closest('.modal').classList.remove('is-active')
    document.documentElement.classList.remove('is-clipped')
  })
})

/* Notification dismiss */
Array.from(document.getElementsByClassName('jb-notification-dismiss')).forEach(el => {
  el.addEventListener('click', e => {
    e.currentTarget.closest('.notification').classList.add('is-hidden')
  })
})
  // Menghilangkan overlay saat halaman selesai dimuat
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      setTimeout(function () {
        document.getElementById('loader-wrapper').style.display = 'none';
      }, 2000); // Sesuaikan timeout dengan durasi animasi CSS
    }
  };
  document.addEventListener('DOMContentLoaded', function () {
    const editCard = document.getElementById('editCard');
    const eyeIcon = document.querySelector('.card-header-icon .icon.is-primary');

    eyeIcon.addEventListener('click', function () {
      editCard.style.display = 'block';
    });
  });

  function cancelEdit() {
    // Mengambil elemen card
    const editCard = document.getElementById('editCard');
  
    // Menyembunyikan card
    editCard.style.display = 'none';
  }

  function saveChanges() {
    cancelEdit();
  }