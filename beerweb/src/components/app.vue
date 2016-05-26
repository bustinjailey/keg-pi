<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container">
        <a class="navbar-brand" href="#">Keg Pi Beerweb</a>
        <ul class="nav navbar-nav">
          <li><a v-link="'home'">Home</a></li>
          <li><a v-link="'current-keg'">Current Keg</a></li>
          <li><a v-link="'past-kegs'">Past Kegs</a></li>
          <li><a v-link="'stats'">Stats</a></li>
        </ul>
      </div>    
    </nav>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
