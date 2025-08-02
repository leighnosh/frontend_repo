<template>
  <header class="header">
    <nav class="nav-container">
      <div class="nav-left">
        <div class="logo">
          <span class="logo-text">TMDB</span>
        </div>
        <ul class="nav-menu">
          <li><a href="#" class="nav-link">Movies</a></li>
          <li><a href="#" class="nav-link">TV Shows</a></li>
          <li><a href="#" class="nav-link">People</a></li>
          <li><a href="#" class="nav-link">More</a></li>
        </ul>
      </div>
      
      <div class="nav-right">
        <button class="add-btn">+</button>
        <div class="language">EN</div>
        <a href="#" class="auth-link">Login</a>
        <a href="#" class="auth-link">Join TMDB</a>
        <button class="search-btn">🔍</button>
      </div>
    </nav>
    
    <div class="sub-nav">
      <ul class="sub-menu">
        <li class="active"><a href="#" class="sub-link">Overview</a></li>
        <li><a href="#" class="sub-link">Media</a></li>
        <li><a href="#" class="sub-link">Fandom</a></li>
        <li><a href="#" class="sub-link">Share</a></li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
// Header navigation component
</script>

<style scoped>
.header {
  background-color: #0d253f;
  border-bottom: 1px solid #1e3a52;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
}

.logo-text {
  color: #01b4e4;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #01b4e4;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.add-btn, .search-btn {
  background: none;
  border: 1px solid #01b4e4;
  color: #01b4e4;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.language {
  border: 1px solid #white;
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  font-size: 0.9rem;
}

.auth-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
}

.auth-link:hover {
  color: #01b4e4;
}

.sub-nav {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0 2rem;
}

.sub-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
}

.sub-menu li {
  position: relative;
}

.sub-menu li.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #01b4e4;
}

.sub-link {
  display: block;
  padding: 1rem 0;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.sub-link:hover {
  color: #01b4e4;
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .nav-right {
    gap: 0.5rem;
  }
  
  .auth-link {
    display: none;
  }
  
  .sub-menu {
    gap: 1rem;
  }
}
</style>