<?php get_header(); ?>

<div class="min-h-screen flex flex-col bg-background">

  <!-- Progress -->
  <div class="bg-white border-b border-border">
    <div class="max-w-4xl mx-auto px-6 py-6">
      <div class="flex justify-between mb-2">
        <span class="text-sm font-semibold text-accent">Step 4 of 4</span>
        <span class="text-sm text-muted-foreground">Review & Confirm</span>
      </div>
      <div class="h-2 bg-beige rounded-full overflow-hidden">
        <div class="h-full bg-accent rounded-full" style="width:100%"></div>
      </div>
    </div>
  </div>

  <div class="flex-1 py-12">
    <div class="max-w-4xl mx-auto px-6">

      <h1 class="text-4xl font-semibold mb-3">Review Your Booking</h1>
      <p class="text-muted-foreground mb-8">
        Please review your appointment details before confirming
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- LEFT -->
        <div class="lg:col-span-2 space-y-4">

          <!-- SERVICE DETAILS -->
          <div class="bg-white rounded-2xl p-6 border border-border">

            <div class="flex justify-between items-center mb-6">
              <h2 class="font-semibold">Service Details</h2>

              <a id="editService"
                class="text-sm text-accent hover:text-gold-dark flex items-center gap-1 cursor-pointer">
                ✏️ Edit
              </a>
            </div>

            <div class="space-y-4">

              <!-- SERVICE -->
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-beige rounded-xl flex items-center justify-center">
                  ✂️
                </div>
                <div>
                  <p class="font-semibold" id="serviceName"></p>
                  <p class="text-sm text-muted-foreground" id="serviceDuration"></p>
                </div>
              </div>

              <!-- STAFF -->
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-beige rounded-xl flex items-center justify-center">
                  👤
                </div>
                <div>
                  <p class="font-semibold" id="staffName"></p>
                  <p class="text-sm text-muted-foreground">Stylist</p>
                </div>
              </div>

              <!-- DATE -->
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-beige rounded-xl flex items-center justify-center">
                  📅
                </div>
                <div>
                  <p class="font-semibold" id="bookingDate"></p>
                  <p class="text-sm text-muted-foreground" id="bookingTime"></p>
                </div>
              </div>

            </div>
          </div>

          <!-- NOTES -->
          <div class="bg-white rounded-2xl p-6 border border-border">
            <h2 class="font-semibold mb-4">Special Requests (Optional)</h2>
            <textarea
              id="note"
              rows="4"
              class="w-full px-4 py-3 bg-background border border-border rounded-xl"
              placeholder="Any special requests or notes..."></textarea>
          </div>

        </div>

        <!-- RIGHT -->
        <div>
          <div class="bg-white rounded-2xl p-6 border border-border sticky top-6">

            <h2 class="font-semibold mb-4">Price Summary</h2>

            <div class="space-y-3 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Service Price</span>
                <span id="price" class="font-semibold"></span>
              </div>

              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Tax (8%)</span>
                <span id="tax" class="font-semibold"></span>
              </div>
            </div>

            <div class="border-t pt-4 mb-6 flex justify-between">
              <span class="font-semibold">Total</span>
              <span id="total" class="text-2xl text-accent font-semibold"></span>
            </div>

            <!-- ✅ CONTINUE BUTTON -->
            <a id="continuePayment"
              class="block text-center w-full px-6 py-4 bg-accent text-white rounded-xl hover:bg-gold-dark shadow-lg mb-3 cursor-pointer">
              Continue to Payment
            </a>

            <!-- ✅ BOTTOM TEXT -->
            <p class="text-xs text-center text-muted-foreground">
              You can cancel or reschedule up to 24 hours before your appointment
            </p>

          </div>
        </div>

      </div>

      <!-- BACK -->
      <div class="mt-6 border-t pt-6">
        <a id="backBtn"
          class="px-6 py-3 bg-white border border-border rounded-xl hover:bg-secondary cursor-pointer">
          Back
        </a>
      </div>

    </div>
  </div>

</div>

<?php get_footer(); ?>