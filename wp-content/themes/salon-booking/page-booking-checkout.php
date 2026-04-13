<?php get_header(); ?>

<div class="min-h-screen flex flex-col bg-background">

  <div class="flex-1 py-12">
    <div class="max-w-4xl mx-auto px-6">

      <h1 class="text-4xl font-semibold mb-3">Payment</h1>
      <p class="text-muted-foreground mb-8">Complete your booking with secure payment</p>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- LEFT -->
        <div class="lg:col-span-2 space-y-6">

          <!-- PAYMENT METHOD -->
          <div class="bg-white rounded-2xl p-6 border border-border">

            <h2 class="font-semibold mb-4">Payment Method</h2>

            <div class="space-y-3 mb-6">

              <button data-method="razorpay"
                class="payment-method w-full p-4 border border-border rounded-xl flex items-center justify-between hover:bg-secondary transition-colors">
                <span>💳 Razorpay (UPI/Card)</span>
              </button>

              <button data-method="stripe"
                class="payment-method w-full p-4 border border-border rounded-xl flex items-center justify-between hover:bg-secondary transition-colors">
                <span>💳 Stripe</span>
              </button>

              <button data-method="cod"
                class="payment-method w-full p-4 border border-border rounded-xl flex items-center justify-between hover:bg-secondary transition-colors">
                <span>💵 Pay at Salon</span>
              </button>

            </div>

            <!-- STRIPE -->
            <div id="stripeForm" class="hidden">
              <div id="card-element" class="p-3 border rounded-xl"></div>
            </div>

            <!-- COD -->
            <div id="codMessage" class="hidden text-green-600 mt-3">
              You will pay at the salon.
            </div>

          </div>

          <!-- ADDRESS -->
          <div class="bg-white rounded-2xl p-6 border border-border">
            <h2 class="font-semibold mb-4">Billing Address</h2>

            <input type="text" placeholder="Street"
              class="w-full px-4 py-3 border rounded-xl mb-4">

            <div class="grid grid-cols-2 gap-4">
              <input type="text" placeholder="City" class="px-4 py-3 border rounded-xl">
              <input type="text" placeholder="ZIP" class="px-4 py-3 border rounded-xl">
            </div>
          </div>

        </div>

        <!-- RIGHT -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl p-6 border border-border sticky top-6">

            <h2 class="font-semibold mb-4">Order Summary</h2>

            <div id="summaryBox" class="space-y-4 mb-6"></div>

            <div class="border-t pt-4 mb-6">
              <div class="flex justify-between">
                <span class="font-semibold">Total</span>
                <span id="totalAmount" class="font-semibold text-2xl text-accent"></span>
              </div>
            </div>

            <button id="payBtn"
              class="w-full px-6 py-4 bg-accent text-white rounded-xl">
              Complete Booking
            </button>

            <p class="text-xs text-center mt-3 text-muted-foreground">
              🔒 Secure payment
            </p>

          </div>
        </div>

      </div>

      <div class="mt-6">
        <a href="/e-commerce/booking-summary"
          class="px-6 py-3 border rounded-xl">
          Back
        </a>
      </div>

    </div>
  </div>

</div>

<?php get_footer(); ?>