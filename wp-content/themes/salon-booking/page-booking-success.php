<?php get_header(); ?>

<div class="min-h-screen flex flex-col bg-background">

  <div class="flex-1 py-12">
    <div class="max-w-2xl mx-auto px-6">

      <!-- SUCCESS HEADER -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-gradient-to-br from-accent to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl">
          ✔
        </div>
        <h1 class="text-4xl font-semibold mb-3">Booking Confirmed!</h1>
        <p class="text-muted-foreground text-lg">
          Your appointment has been successfully scheduled
        </p>
      </div>

      <!-- BOOKING DETAILS -->
      <div class="bg-white rounded-2xl p-8 border border-border mb-6 shadow-lg">

        <div class="flex items-center justify-between mb-6 pb-6 border-b border-border">
          <div>
            <p class="text-sm text-muted-foreground mb-1">Booking Reference</p>
            <p id="bookingRef" class="font-semibold text-2xl"></p>
          </div>
          <div class="w-16 h-16 bg-beige rounded-2xl flex items-center justify-center text-accent text-2xl">
            📅
          </div>
        </div>

        <div class="space-y-4">

          <div>
            <p class="text-sm text-muted-foreground mb-1">Service</p>
            <p id="serviceName" class="font-semibold"></p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-muted-foreground mb-1">Date & Time</p>
              <p id="bookingDate" class="font-semibold"></p>
              <p id="bookingTime" class="text-sm"></p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground mb-1">Specialist</p>
              <p id="staffName" class="font-semibold"></p>
            </div>
          </div>

          <div>
            <p class="text-sm text-muted-foreground mb-1">Location</p>
            <p class="font-semibold">LuxeSalon</p>
            <p class="text-sm">123 Beauty Avenue</p>
          </div>

          <div class="bg-beige rounded-xl p-4">
            <p class="text-sm text-muted-foreground mb-1">Total Paid</p>
            <p id="totalPaid" class="font-semibold text-2xl text-accent"></p>
          </div>

        </div>

      </div>

      <!-- ACTION BUTTONS -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <button class="px-6 py-3 bg-white border rounded-xl hover:bg-secondary">
          Download Receipt
        </button>
        <button class="px-6 py-3 bg-white border rounded-xl hover:bg-secondary">
          Add to Calendar
        </button>
      </div>

      <!-- EMAIL NOTICE -->
      <div class="bg-gradient-to-br from-beige to-beige-dark rounded-2xl p-6 mb-6">
        <h3 class="font-semibold mb-2">📧 Confirmation Email Sent</h3>
        <p class="text-sm text-muted-foreground">
          We've sent a confirmation email with all details.
        </p>
      </div>

      <!-- ACTION LINKS -->
      <div class="space-y-3">
        <a href="/e-commerce/customer-bookings"
          class="block text-center w-full px-6 py-4 bg-accent text-white rounded-xl">
          View My Bookings
        </a>

        <a href="/e-commerce/"
          class="block text-center w-full px-6 py-4 bg-white border rounded-xl">
          Back to Home
        </a>
      </div>

      <!-- POLICY -->
      <div class="mt-8 p-6 bg-white rounded-2xl border border-border">
        <h4 class="font-semibold mb-2">Cancellation Policy</h4>
        <p class="text-sm text-muted-foreground">
          Cancel or reschedule up to 24 hours before appointment.
        </p>
      </div>

    </div>
  </div>

</div>

<?php get_footer(); ?>