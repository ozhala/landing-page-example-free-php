$('.arrow-holder').on("click", function()
{
    $(this).prev(".question-text-wrapper").find(".question-parag").slideToggle("slow");
});