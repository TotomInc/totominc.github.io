var lastname = '1';

function tabclick(name) {
    $("#content-" + name).attr('style', 'display: block');
    $("#content-" + lastname).attr('style', 'display: none');

    lastname = name;
};

tabclick(lastname);