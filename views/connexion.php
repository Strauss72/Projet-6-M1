<?php $titre = 'Connexion'; ?>

<?php ob_start(); ?>

    <div class="col-md-6 col-md-offset-3">
      <div class="panel panel-default">
          <div class="panel-heading">Connexion</div>
          <div class="panel-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label for="inputIdentifiant" class="col-sm-2 control-label">Identifiant</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control" id="inputIdentifiant" placeholder="Identifiant">
                </div>
              </div>
              <div class="form-group">
                <label for="inputMdp" class="col-sm-2 control-label">Mot de passe</label>
                <div class="col-sm-10">
                  <input type="password" class="form-control" id="inputMdp" placeholder="Mot de passe">
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                  <button type="submit" class="btn btn-default">Se connecter</button>
                </div>
              </div>
            </form>
          </div>
      </div>
    </div>

<?php $contenu = ob_get_clean(); ?>

<?php require(DOC_ROOT_PATH . '/views/layout/main.php'); ?>
