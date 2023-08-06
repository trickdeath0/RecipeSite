<template>
  <div class="about-page">

    <div id="background"></div>

    <h1 class="about-title"><b>👨‍💻The development team👨‍💻</b></h1>

    <!-- about out website -->
    <div class="about-content">
      <p>
        Welcome to Grandma's Recipes and Others!
        Prepare yourself for a culinary adventure that will transport you back to the nostalgic flavors of homemade meals and cherished family traditions.
        Our page is a treasure trove of delightful recipes passed down through generations, infused with love and secret ingredients.
        From Grandma's classic apple pie to exotic dishes from around the world, we've curated an exquisite collection that promises to tantalize your taste buds and ignite your passion for cooking.
        Join us as we embark on a gastronomic journey, exploring the rich tapestry of flavors, techniques, and stories that make each recipe unique.
        Whether you're an aspiring chef, a seasoned home cook, or simply a lover of good food, Grandma's Recipes and Others will inspire you to create unforgettable culinary masterpieces and create new memories with every bite.
        Get ready to unleash your inner chef and savor the magic of Grandma's recipes and more.
      </p>

      <!-- about previous projects -->
      <div class="about-section">
        <h2 class="section-title">A little about previous projects</h2>
        <div class="previous-projects">
          <a href="https://web-development-environments-2023.github.io/315572677/" class="previous-link">First Assignment - Shay👴</a><br>
          <a href="https://web-development-environments-2023.github.io/318872215/" class="previous-link">First Assignment - Oran👴</a><br>
          <a href="https://web-development-environments-2023.github.io/assignment2-315572677_318872215/#" class="previous-link">Second Assignment - StarShip Game🚀</a><br><br>
        </div>
      </div>

      <!-- about our team -->
      <div class="about-section">
        <h2 class="section-title">Our Team</h2>
        <div class="team-section">
          <div v-for="member in team" :key="member.name" class="member-card">
            <img :src="member.img" :alt="member.name" class="avatar img-fluid" />
            <h3 class="member-name">{{ member.name }}</h3>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  data(){
    return {
      team: [
        {
          name: "Shay",
          img: "https://avatars.githubusercontent.com/u/315572677?v=4"
        },
        {
          name: "Oran",
          img: "https://avatars.githubusercontent.com/u/318872215?v=4"
        }
      ]
    }
  },
};
</script>

<style scoped>
.about-page {
  padding: 40px;
  text-align: center;
}
.about-title {
  font-size: 32px;
  margin-bottom: 20px;
  color: #160303;
  font-family: "Red Hat Mono", monospace;
}
.about-content {
  font-family: "Rockwell Nova";
  font-size: 20px;
  line-height: 1.6;
  color: #160303;
  text-align: left;
  margin-bottom: 20px;
  padding: 0 150px;
}
.section-title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #160303;
}
.about-section {
  text-align: center;
  margin-top: 40px;
}
.previous-link {
  font-size: 18px;
  line-height: 1.6;
  color: #160303;
  text-decoration: none;
  display: inline-block;
  padding: 5px 10px;
  background-color: #fab3b3;
  border: 0px solid #ddd;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;
}

.previous-link:hover {
  background-color: #e0e0e0;
  color: #333;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}


.team-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
.member-card {
  width: 200px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
}
.member-name {
  font-size: 18px;
  color: #333;
}

#background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(../assets/food-background.jpg);
  background-size: cover;
  background-position: center;
  z-index: -1;
  opacity: 0.5;
}
</style>
