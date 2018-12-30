document.addEventListener('DOMContentLoaded', function () {

    if (document.getElementById("firstText") != null) {
        var test = document.getElementById("firstText").innerHTML;
        document.getElementById("secondText").innerHTML = test;
    }
});
