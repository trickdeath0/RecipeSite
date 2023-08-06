<template>
  <div class="container-nfn" :style="{ 'background-image': 'url(' + imageURL + ')' }">
    <h1 class="color-h1">Four Oh Four you didn't</h1>
    <router-link to="/" exact><h3 class="color-h3">ET Go Home</h3></router-link>

    <br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageURL: '',
      imageUrls: [
        require('@/assets/FNF.jpg'),
        require('@/assets/FNF1.jpg'),
      ],
    };
  },
  created() {
    const randomIndex = Math.floor(Math.random() * this.imageUrls.length);
    this.imageURL = this.imageUrls[randomIndex];
  },
};
</script>

<style>
.container-nfn {
  background-repeat: no-repeat;
  background-size: cover;
}
.color-h1{
  color: white;
  text-align: center;
  font-size: 100px;
  font-family: 'Press Start 2P', cursive;
  text-shadow: 2px 2px 5px black;
}
.color-h3{
  color: rgb(255, 0, 0);
  text-align: center;
  font-size: 50px;
  font-family: 'Press Start 2P', cursive;
  text-shadow: 2px 2px 5px black;
}
</style>