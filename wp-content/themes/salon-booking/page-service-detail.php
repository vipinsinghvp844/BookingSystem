<?php get_header(); ?>

<div class="min-h-screen flex flex-col bg-background">

  <div class="flex-1 py-12">
    <div class="max-w-7xl mx-auto px-6">

      <a href="/e-commerce/services" class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-8">
        ← Back to Services
      </a>

      <!-- 🔥 DYNAMIC CONTAINER -->
      <div id="serviceDetailContainer">

        <!-- LOADING STATE -->
        <div class="text-center py-20 text-muted-foreground">
          Loading service...
        </div>

      </div>

    </div>
  </div>

</div>

<?php get_footer(); ?>