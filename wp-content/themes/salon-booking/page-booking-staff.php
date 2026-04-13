<?php get_header(); ?>

<div class="min-h-screen flex flex-col bg-background">

  <!-- Progress -->
  <div class="bg-white border-b border-border">
    <div class="max-w-4xl mx-auto px-6 py-6">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-semibold text-accent">Step 2 of 4</span>
        <span class="text-sm text-muted-foreground">Select Staff</span>
      </div>
      <div class="h-2 bg-beige rounded-full overflow-hidden">
        <div class="h-full bg-accent rounded-full" style="width:50%"></div>
      </div>
    </div>
  </div>

  <div class="flex-1 py-12">
    <div class="max-w-4xl mx-auto px-6">

      <h1 class="text-4xl font-semibold mb-3">Choose Your Specialist</h1>
      <p class="text-muted-foreground mb-8">
        Select a preferred staff member or let us assign the next available
      </p>

      <!-- 🔥 STAFF LIST -->
      <div id="staffContainer" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <p>Loading staff...</p>
      </div>

      <!-- ACTION -->
      <div class="flex justify-between items-center pt-6 border-t border-border">

        <a href="/services"
          class="px-6 py-3 bg-white border border-border rounded-xl hover:bg-secondary">
          Back
        </a>

        <button id="continueBtn"
          class="px-8 py-3 rounded-xl bg-muted text-muted-foreground cursor-not-allowed">
          Continue
        </button>

      </div>

    </div>
  </div>

</div>

<?php get_footer(); ?>