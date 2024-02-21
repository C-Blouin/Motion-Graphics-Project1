// Ensure the document loads before executing any jQuery code
$(document).ready(function () {

    // Trigger the fade-in animation on the moon after the document has loaded, with a delay of 0.3 seconds
    $('.moon').delay(300).addClass('fade-in moon-active');
    // Add the stars class from my CSS to the main element to display the stars in the background
    $('main').addClass('stars');

    // Inner Switch On-Click Functionality.
    $('.inner-switch').click(function () {
        // Toggle the active class on the inner-switch and the on and off classes
        $(this).toggleClass('active');
        $('.on, .off').toggleClass('active');

        // Here I am clearing the animation queue to prevent ongoing animations using the stop function, any animations that are not in queue will be removed to prevent animation conflicts.
        $('.moon, .sun, main').clearQueue();

        // IF the inner-switch has the active class, remove the fade-in and moon-active classes from the Moon and add the fade-in and sun-active classes to the Sun. Change the background color of the main element to an off white and remove the stars class.
        if ($('.inner-switch').hasClass('active')) {
            $('.moon').removeClass('fade-in moon-active');
            // Delay adding the fade-in and sun-active classes by 0.15 seconds, and the queue allows for all chained function to be executed in sequence.
            $('.sun').delay(150).queue(function (next) {
                $(this).addClass('fade-in sun-active')
                    // Changing the stroke and fill of my sun graphic using my root CSS variables.
                    .css({ 'stroke': 'var(--sun-active)', 'fill': 'var(--on-colour)' })
                    // The next() function proceeds to the next item in queue, if there are no more items in queue, it ensures the actions in the primary queue were executed.
                    .queue(next);
            });
            // Removing the stars class from the main element and transitioning to an off-white background when the active class is present.
            $('main').css('background-color', '#f0f0f0').removeClass('stars');
        } 
        // ELSE, add the fade-in and moon-active classes to the Moon and remove the fade-in and sun-active classes from the sun. Change the background color of the main element to black and add the stars class.
        else {
            $('.moon').delay(150).queue(function (next) {
                $(this).addClass('fade-in moon-active').css('fill', 'var(--moon-active)').queue(next);
            });
            $('.sun').removeClass('fade-in sun-active');
            $('main').css('background-color', '#0a0a0a').addClass('stars');
        }
    });
});