var randomAppendix = [
    "находится в полной конвергенции.",
    "четко коррелирует с экономической ситуацией.",
    "соотносится с общими ожиданиями.",
    "стабилизировалась благодаря синергетическому эффекту."

];

$(document).ready(function () {

    var $form = $("#speech-gen__form"),
        $rows = $(".speech-gen__row", $form),
        $inputs = $(".speech-gen__radio", $form),
        $resultPhrase = $("#result-phrase", $form),
        $reset = $("#speech-gen__reset", $form);


    function generateRandomAnswer(answers) {
        var max = answers.length;
        return answers[Math.floor(Math.random() * max)];
    }

    function animateHideShow(hideObj, showObj) {
        var $dfd = new $.Deferred(),
            $promise = $dfd.promise();

        if (hideObj) {
            hideObj
                .animate({
                    opacity: 0,
                    top: -20
                }, {
                    duration: 600,
                    complete: function () {
                        hideObj.hide();
                        $dfd.resolve();
                    }
                });
        } else {
            $dfd.resolve();
        }

        $.when($promise).then(function () {
            showObj.css({
                opacity: 0,
                top: 20
            });

            showObj
                .show()
                .animate({
                    opacity: 1,
                    top: 0
                }, 600);
        });

    }



    $form.change(function () {
        var answersArr = [];

        $(".speech-gen__radio:checked").each(function () {
            var $thisInput = $(this),
                dataAnswer = $thisInput.data("answer"),
                hasAppendix = $thisInput.data("appendix"),
                answer = [];

            answer.push($.isArray(dataAnswer) ? generateRandomAnswer(dataAnswer) : dataAnswer);

            if (hasAppendix) {
                answer.push(generateRandomAnswer(randomAppendix))
            }

            answersArr.push(answer.join(" "));
        });

        $resultPhrase.text(answersArr.join(" "));

    });

    $inputs.change(function () {
        var $thisInput = $(this),
            $parent = $thisInput.parents(".speech-gen__row"),
            $next = $parent.next(".speech-gen__row");



        if ($next.is(":hidden")) {
            animateHideShow($parent, $next);

        }

    });

    $reset.click(function () {
        animateHideShow($rows.last(), $rows.eq(0));
    });

    animateHideShow(null, $rows.eq(0));


});