@@include('libs/jquery.validate.min.js')
@@include('libs/jquery.maskedinput.min.js')

$.validator.setDefaults({
    submitHandler: function () {
        alert("submitted!");
    }
});

$.validator.addMethod("minlenghtphone", function (value, element) {
    return value.replace(/\D+/g, '').length > 10;
});
$.validator.addMethod("requiredphone", function (value, element) {
    return value.replace(/\D+/g, '').length > 1;
});


function validateForms(form) {
    $(form).validate({
        rules: {
            name: "required",
            phone: {
                requiredphone: true,
                minlenghtphone: true,
            },
            email: {
                required: true,
                email: true,
            }
        },
        submitHandler: function () {
            $('.overlay, .popup-thanks').fadeIn('slow');
            $('.promo__form-input').removeClass('valid');
        },
    });
}

$('input').on('change', function () {
    if ($('.promo__form-input').val() !== '' && $('input[name="user-agreement"]').is(':checked')) {
        $(this).closest('form').find('button[type="submit"]').prop('disabled', false);
    } else {
        $(this).closest('form').find('button[type="submit"]').prop('disabled', true);
    }
});

validateForms('#form');


$('form').submit(function (e) {
    e.preventDefault();
    var name = $('input[name=name]').val();
    var phone = $('input[name=phone]').val();
    var email = $('input[name=email]').val();

    $.ajax({
        type: "POST",
        url: "/send.php",
        data: {
            name: name,
            phone: phone,
            email: email,
        },
    });
    $(this).find('button[type="submit"]').prop('disabled', true);
    $(this).find("input").val("");
    $('form').trigger('reset');
    return false;
});

$.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
        $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
        var range = $(this).get(0).createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
};

$("input[name=phone]").click(function () {
    $(this).setCursorPosition(4);
    $(this).removeClass('valid');
}).mask("+1 (999) 999-99-99");

$('.popup-thanks__close').on('click', function () {
    $('.overlay, .popup-thanks').fadeOut('slow');
});