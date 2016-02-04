
function validation(button,id) {
    idCompetence="idComp"+id
    span=document.getElementById(idCompetence)

    if(button.className == "list-group-item cursor-pointer"){
        button.style.background = "#d9ffd9";
        button.className += " validated";
        span.className="glyphicon glyphicon-remove";
        validerCompetence(id);
    }else{
        button.style.background = "#ffffff";
        button.className = "list-group-item cursor-pointer";
        span.className="glyphicon glyphicon-ok";
        invaliderCompetence(id);
    }
}

function validerCompetence(id){
    $.getJSON('api/competences.php', {
            type: 'validation',
            idCompetence: id
        });
}

function invaliderCompetence(id){
    $.getJSON('api/competences.php',{
            type: 'invalidation',
            idCompetence: id
        });
}

var lienPrecedent = null;
function afficherCompetence(lien,id){
console.log(lien)
    if(lienPrecedent != null){
        lienPrecedent.style.color = "rgb(51, 102, 153)";
    }
    lienPrecedent = lien;
    lienPrecedent.style.color = "rgb(229, 81, 43)";

    $.getJSON('api/competences.php',{
            type: 'sousCompetences',
            idPere: id
        },
        function(competences){
            $("#panel-body-competences").empty();
            $("#panel-body-competences").append('<div class="list-group-item" style="background-color: #81c0c4">'+lien.innerHTML+'</div> <div id="competences-a-valider" class="list-group"></div>');
            for (competence of competences){
                if(competence.valide == true){
                    $("#competences-a-valider").append('<div class="list-group-item validated cursor-pointer" onclick="validation(this,' + competence.id + ')" style="background-color: #d9ffd9">'+
                        '<div class="media"><div class="media-body">' +
                            competence.nom +
                        '</div><div class="media-right media-middle"><span id="idComp'+competence.id+'" class="glyphicon glyphicon-remove" aria-hidden="true"></span></div></div>' +
                    '</div>');
                }else{
                    $("#competences-a-valider").append('<div class="list-group-item cursor-pointer" onclick="validation(this,' + competence.id + ')">'+
                        '<div class="media"><div class="media-body">' +
                            competence.nom +
                        '</div><div class="media-right media-middle"><span id="idComp'+competence.id+'" class="glyphicon glyphicon-ok" aria-hidden="true"></span></div></div>' +
                    '</div>');
                }
            }
        }).fail( function(competences, textStatus, error){
            console.error("getJSON failed, status: " + textStatus + ", error: "+error)
        });
}
