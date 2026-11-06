<?php
session_start();

if (!isset($_SESSION["logged_in"]) || !$_SESSION["logged_in"]) {
    header("Location: ./login.html");
    exit;
}
?>

<!DOCTYPE html>

<html lang="lv">
  <head>
    <meta charset="UTF-8">
    <title>tudu</title>
		<script type="module" src="./js/main.js" defer></script>
    <link rel="stylesheet" href="./css/app.css">
  </head>

  <body>
    <nav>
      <h2 id="home-navigator">Sākums</h2>
      <h2 id="projects-navigator">Projekti</h2>
      <button id="logout-button">izrakstities</button>
    </nav>

    <main id="app"></main>



    <!-- HOME SCREN -->
    <template id="home">
      <div id="home-div">
        <section id='urgent'>
          <h3>steidzami</h3>
          <button id="priority-button">Prioritate</button>
          <button id="dueDate-button">Termins</button>
          <ul id="urgent-list"></ul>
        </section>
        
        <section id='newest-changes'>
          <h3>jaunākās izmaiņas</h3>
          <ul id="recently-modified-list"></ul>
        </section>

        <section id='invites'>
          <h3>uzaicinājumi</h3>
          <ul id="invites-list"></ul>
        </section>
      </div>
    </template>



    <!-- PROJECTS LIST -->
    <template id="projects">
      <h1>Projekti</h1>
      <input id="project-title-input" placeholder="ievadi projekta nosaukumu">
      <button id="create-project">Izveidot projektu</button>
      <ul id="project-list"></ul>
    </template>



    <!-- TASK LIST -->
    <template id="tasks">
      <h1></h1>

      <form id="task-form">
        <input name="title" placeholder="ievadi uzdevumu">
        <input name="description" placeholder="ievadi aprakstu">
        <input name="dueDate" type="datetime-local">

        <label for="priority-select">izvēlies prioritāti:</label>
        <select name="priority" id="priority-select">
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <button id="create-task-button">Pievienot uzdevumu</button>
      </form>

			<form id="invite-form">
				<label>
					uzaicini cilvēku:
					<input name="username"/>
				</label>
				<button>uzaicināt</button>
			</form>

      <button id="filter-active">Nepabeigtie</button>
      <button id="filter-done">Pabeigtie</button>
      <button id="filter-all">Visi</button>
      <ul id="task-list"></ul>
    </template>



        <!-- an individual task -->
    <template id="task">
      <label>
        nosaukums:
        <input class="title" name="title">
      </label>

      <label>
        apraksts:
        <input class="description">
      </label>

      <label>
        termiņš:
        <input class="due_date" type="datetime-local">
      </label>

      <label>
        prioritāte:
        <select class="priority">
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </label>

      <label>
        pabeigts:
        <input class="status" type="checkbox">
      </label>

      <button class="delete-button">dzēst</button>
      <br></br>
    </template>
    
  </body>
</html>
