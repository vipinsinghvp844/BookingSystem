<?php
/*
Template Name: Services Page
*/
get_header();
?>

<div class="min-h-screen flex flex-col bg-background">

  <!-- HEADER SECTION -->
  <div class="py-12 bg-gradient-to-br from-beige to-white">
    <div class="max-w-7xl mx-auto px-6">
      <h1 class="text-4xl lg:text-5xl font-semibold mb-4">Our Services</h1>
      <p class="text-muted-foreground text-lg">
        Explore our comprehensive range of beauty and wellness services
      </p>
    </div>
  </div>

  <div class="flex-1 py-12">
    <div class="max-w-7xl mx-auto px-6">

      <!-- Search and Filters -->
      <div class="flex flex-col lg:flex-row gap-4 mb-8">
        
        <div class="flex-1 relative">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
          <input
            id="serviceSearch"
            type="text"
            placeholder="Search services..."
            class="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <button class="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-border rounded-2xl hover:bg-secondary transition-colors">
          ⚙️ <span>Filters</span>
        </button>

      </div>

      <!-- Category Filters -->
      <div id="categoryContainer" class="flex flex-wrap gap-3 mb-8">

        <!-- dynamic categories here by js -->

      </div>

      <!-- SERVICES GRID (IMPORTANT FIXED: 3 columns + proper card) -->
      <div id="servicesContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <!-- CARDS data by js -->
        
      </div>

    </div>
  </div>

</div>

<?php get_footer(); ?>