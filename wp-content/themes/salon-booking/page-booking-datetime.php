<?php get_header(); ?>

<div class="min-h-screen flex flex-col bg-background">

  <!-- Progress -->
  <div class="bg-white border-b border-border">
    <div class="max-w-4xl mx-auto px-6 py-6">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-semibold text-accent">Step 3 of 4</span>
        <span class="text-sm text-muted-foreground">Select Date & Time</span>
      </div>
      <div class="h-2 bg-beige rounded-full overflow-hidden">
        <div class="h-full bg-accent rounded-full" style="width:75%"></div>
      </div>
    </div>
  </div>

  <div class="flex-1 py-12">
    <div class="max-w-4xl mx-auto px-6">

      <h1 class="text-4xl font-semibold mb-3">Select Date & Time</h1>
      <p class="text-muted-foreground mb-8">Choose your preferred appointment slot</p>

      <!-- DATE -->
      <div id="dateContainer" class="bg-white rounded-2xl p-6 border border-border mb-6"></div>

      <!-- TIME -->
      <div id="timeContainer" class="hidden bg-white rounded-2xl p-6 border border-border mb-8"></div>

      <!-- SUMMARY -->
      <div id="summaryContainer" class="hidden bg-gradient-to-br from-beige to-beige-dark rounded-2xl p-6 mb-6"></div>

      <!-- ACTION -->
      <div class="flex justify-between items-center pt-6 border-t border-border">

        <button id="backBtn"
          class="px-6 py-3 bg-white border border-border rounded-xl hover:bg-secondary">
          Back
        </button>

        <button id="continueBtn"
          class="px-8 py-3 rounded-xl bg-muted text-muted-foreground cursor-not-allowed">
          Continue
        </button>

      </div>

    </div>   
  </div>

</div>

<?php get_footer(); ?>