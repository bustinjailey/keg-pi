<template>
    <div class="col-md-3 col-md-offset-1" id="past-kegs">
        <h1>Past Kegs</h1>
        <div class="keg-list" v-if="keg1">
            <h2>
                <blockquote>{{ keg1.name }}</blockquote>
            </h2>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

document.onready = function(){
  var pastKegsVM = new Vue({
    el: '#past-kegs',
    data: {
      keg1:{
        name: "Ballast Point"
      }
    }
  });
}

</script>
