function genererBoutonGestion(competence, dataType, title, classGlyphicon) {
  'use strict';
  var html = '';

  if (dataType === 'setCompetencesVisibles') {
    html += ' <span id="competence-' + competence.idCompetence + '-button-visibilite" data-toggle="modal"';
  } else {
    html += ' <span data-toggle="modal" data-target="#genericModal" data-type="' + dataType +
      '" data-id-competence="' + competence.idCompetence +
      '" data-nom-competence="' + competence.nomCompetence + '"';
  }

  html += ' data-placement="top"' +
    ' data-original-title="' + title +
    '" class="glyphicon cursor-pointer ' + classGlyphicon +
    '" aria-hidden="true"></span>';

  return html;
}

function genererLigneCompetenceGestion(competence, display) {
  'use strict';

  var html = '';
  html += '<li id="competence-' + competence.idCompetence + '"';

  if ((competence.visible !== undefined) && (!competence.visible)) {
    html += ' class="couleur-grise"';
  }

  if (display === 'display-none') {
    html += ' style="display: none;">';
  } else {
    html += '>';
  }

  html += '<a href="#">' + competence.nomCompetence + '</a>';

  html += genererBoutonGestion(competence, 'ajouterCompetence', 'Ajouter une compétence', 'glyphicon-plus couleur-verte');
  html += genererBoutonGestion(competence, 'ajouterPlusieursCompetences', 'Ajouter plusieurs compétences', 'glyphicon-th-list couleur-verte');
  html += genererBoutonGestion(competence, 'modifierCompetence', 'Modifier une compétence', 'glyphicon-pencil couleur-jaune');
  if (competence.visible || (competence.visible === undefined)) {
    html += genererBoutonGestion(competence, 'setCompetencesInvisibles', 'Rendre la compétence invisible', 'glyphicon-eye-close couleur-bleue');
  } else {
    html += genererBoutonGestion(competence, 'setCompetencesVisibles', 'Rendre la compétence visible', 'glyphicon-eye-open couleur-bleue');
  }

  html += genererBoutonGestion(competence, 'supprimerCompetence', 'Supprimer une compétence', 'glyphicon-remove couleur-rouge');

  return html;
}

function genererListeCompetences(parent, niveau, competencesJson, typeAffichage) {
  'use strict';

  var html = '';
  var niveauPrecedent = 0;

  if (!niveau && !niveauPrecedent) {
    html += '\n<ul>\n';
  }

  for (var competence of competencesJson) {
    if (parent === competence.idPereCompetence) {
      if (niveauPrecedent < niveau) {
        html += '\n<ul>\n';
      }

      if (typeAffichage === 'gestionCompetences') {
        var competenceObject = {
          idCompetence: competence.idCompetence,
          nomCompetence: competence.nomCompetence,
          visible: competence.visible,
          feuille: competence.feuille,
        };
        html += genererLigneCompetenceGestion(competenceObject, 'display-normal');
      } else {
        html += '<li id="competence-' + competence.idCompetence + '"';
        if (competence.valide) {
          html += ' class="text-validated">';
        } else {
          html += ' class="text-default">';
        }
        html += '<a href="#">' + competence.nomCompetence + '</a>';
      }

      niveauPrecedent = niveau;
      html += genererListeCompetences(competence.idCompetence, (niveau + 1), competencesJson, typeAffichage);
    }
  }

  if ((niveauPrecedent === niveau) && (niveauPrecedent !== 0)) {
    html += '</ul>\n</li>\n';
  } else if (niveauPrecedent === niveau) {
    html += '</ul>\n';
  } else {
    html += '</li>\n';
  }

  return html;
}

// Mise a jour de l'arbre
function majArbre(arbre) {
  'use strict';
  $(arbre).each(function() {
    $(this).treeview();
  });
}
