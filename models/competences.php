<?php

function getCompetencesPreprofessionnelles(){
	$competences = array();
	$query = "Select nomCompetence Where idCategorie = 2";
	$result = mysql_query($query);

	while($row = mysql_fetch_array($result)){
		$competences[] = $row[0];
	}

	return $competences;
}

function getCompetencesDisciplinaires($id){
	$competences = array();
	$query = "Select nomCompetence Where idCategorie = 1 and idMention = '$id' ";
	$result = mysql_query($query);

	while($row = mysql_fetch_array($result)){
		$competences[] = $row[0];
	}

	return $competences;
}

function getCompetencesTransversalesEtLinguistiques(){
	$competences = array();
	$query = "Select nomCompetence Where idCategorie = 3";
	$result = mysql_query($query);

	while($row = mysql_fetch_array($result)){
		$competences[] = $row[0];
	}

	return $competences;
}


function getNomsMentions(){
    global $bdd;
	$mentions = array();
	$query = "Select nomMention From mention";
	//$result = mysqli_query($query);

	//while($row = mysql_fetch_array($result)){
		//$mentions[] = $row[0];
	//}

	foreach($bdd->query($query) as $row){
		$mentions[] = $row['nomMention'];
	}

	return $mentions;
}

?>
