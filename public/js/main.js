(function ($) {
    "use strict";

    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Courses carousel
    $(".courses-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        dots: false,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });


    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
    });


    // Related carousel
    $(".related-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });

})(jQuery);


function AddNewStudent(e) {
    let s_name = document.getElementById('s-name').value;
    let s_number = document.getElementById('s-number').value;
    let s_subject = document.getElementById('s-subject').value;
    console.log('come', s_name, s_number, s_subject)

    if (s_name === '') {
        alert('Please Enter your name!')
    }
    else if (s_number === '') {
        alert('Please Enter your contact Number!')
    }
    else if (s_subject === '') {
        alert('Please Select a course!')
    } else {
        let registerQuery = new Promise((resolve, reject) => {
            let db = firebase.firestore();
            db.collection("ContactUsPortfolio").add({
                name: s_name,
                phone: s_number,
                subject: s_subject,
                createdAt: new Date().getTime(),
                project: 'decode-new'
            })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    resolve(docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                    reject(error);
                });
        });
        registerQuery.then(result => {
            console.warn('register successful')
            alert('Thank you for reaching out. We will contact you soon.')
            document.getElementById('s-name').value = ''
            document.getElementById('s-number').value = ''
            document.getElementById('s-subject').value = ''

        }).catch(error => {
            console.error(error)
        })
    }

}

function addContactUsData(e) {
    let c_name = document.getElementById('c-name').value;
    let c_number = document.getElementById('c-number').value;
    let c_subject = document.getElementById('c-subject').value;
    let c_email = document.getElementById('c-email').value;
    let c_message = document.getElementById('c-message').value;

    if (c_name === '') {
        alert('Please Enter your name!')
    }
    else if (c_number === '') {
        alert('Please Enter your contact Number!')
    }
    else if (c_subject === '') {
        alert('Please Select a course!')
    } else {
        let registerQuery = new Promise((resolve, reject) => {
            let db = firebase.firestore();
            db.collection("ContactUsPortfolio").add({
                name: c_name,
                phone: c_number,
                subject: c_subject,
                message: c_message,
                email: c_email,
                createdAt: new Date().getTime(),
                project: 'decode-contact'
            })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    resolve(docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                    reject(error);
                });
        });
        registerQuery.then(result => {
            console.warn('register successful')
            alert('Thank you for reaching out. We will contact you soon.')
            document.getElementById('c-name').value = ''
            document.getElementById('c-number').value = ''
            document.getElementById('c-subject').value = ''
            document.getElementById('c-email').value = ''
            document.getElementById('c-message').value = ''

        }).catch(error => {
            console.error(error)
        })
    }

}
