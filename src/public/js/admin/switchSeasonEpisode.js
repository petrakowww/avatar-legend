$(document).ready(function() {
    function switchToEpisodes() {
        let seasonIndex = $(this).attr("id").split("_")[1];
        $("#seasonManagement_" + seasonIndex).addClass("hidden");
        $("#episodeManagement_" + seasonIndex).removeClass("hidden");
        $("#fileInputSeasonImage_" + seasonIndex).closest('.seasonChangeImage').addClass("hidden");
    }

    function switchToSeason() {
        let seasonIndex = $(this).attr("id").split("_")[1];
        $("#episodeManagement_" + seasonIndex).addClass("hidden");
        $("#seasonManagement_" + seasonIndex).removeClass("hidden");
        $("#fileInputSeasonImage_" + seasonIndex).closest('.seasonChangeImage').removeClass("hidden");
    }

    $(document).on("click", ".switchToEpisodes", switchToEpisodes);
    $(document).on("click", ".controlSeason", switchToSeason);
});
