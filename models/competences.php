<?php

function getCompetencesPreprofessionnelles(){
	global $bdd;
	$competences = array();
	$query = "Select nomCompetence Where idCategorie = 2";

	foreach($bdd->query($query) as $row){
		$competences[] = $row['nomCompetence'];
	}

	return $competences;
}

function getCompetencesDisciplinaires($id){
	global $bdd;
	$competences = array();
	$query = "Select nomCompetence Where idCategorie = 1 and idMention = '$id' ";

	foreach($bdd->query($query) as $row){
		$competences[] = $row['nomCompetence'];
	}

	return $competences;
}

function getCompetencesTransversalesEtLinguistiques(){
	global $bdd;
	$competences = array();
	$query = "Select nomCompetence Where idCategorie = 3";

	foreach($bdd->query($query) as $row){
		$competences[] = $row['nomCompetence'];
	}

	return $competences;
}


function getCompetences(){
    global $bdd;
    $categories = array();
	$query = "Select idCompetence, nomCompetence From competence Where idPereCompetence is NULL";

	if(!empty($bdd->query($query))){
		foreach($bdd->query($query) as $row){

			$categorie = array(
				'id' => $row['idCompetence'],
				'nom' => $row['nomCompetence'],
				'sousCategories' => getSousCategories($row['idCompetence'])
			);

			$categories[] = $categorie;
		}
	}

	return $categories;
}

function getSousCategories($idPere){
	global $bdd;
	$query = "Select idCompetence, nomCompetence From competence Where idPereCompetence = " . $idPere . " and idCompetence in (Select distinct(idPereCompetence) From competence)";
	$sousCategories = array();

	if(!empty($bdd->query($query))){
		foreach($bdd->query($query) as $row){
			$categorie = array(
				'id' => $row['idCompetence'],
				'nom' => $row['nomCompetence'],
				'sousCategories' => getSousCategories($row['idCompetence'])
			);

			$sousCategories[] = $categorie;
		}
	}

	return $sousCategories;
}

?>
