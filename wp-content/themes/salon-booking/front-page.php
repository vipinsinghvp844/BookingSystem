<?php
/*
Template Name: Home Page
*/
?>
<?php get_header(); ?>

<div class="min-h-screen flex flex-col bg-background">

  <!-- HERO -->
  <section class="relative bg-gradient-to-br from-beige via-white to-beige-dark py-20 lg:py-32 overflow-hidden">
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 right-10 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-full mb-6">
          ✨
          <span class="text-sm">Experience Luxury & Elegance</span>
        </div>

        <h1 class="text-5xl lg:text-7xl font-semibold mb-6 leading-tight">
          Your Beauty,<br>
          <span class="text-accent">Our Passion</span>
        </h1>

        <p class="text-xl text-muted-foreground mb-8 leading-relaxed">
          Discover the ultimate salon and spa experience. Premium services tailored just for you.
        </p>

        <div class="flex flex-wrap gap-4">
          <a href="/booking/service"
            class="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-2xl hover:bg-gold-dark transition-all shadow-lg hover:shadow-xl">
            Book Appointment →
          </a>

          <a href="/services"
            class="inline-flex items-center gap-2 px-8 py-4 bg-white border border-border rounded-2xl hover:bg-secondary transition-colors">
            View Services
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURES -->
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div class="text-center">
          <div class="w-16 h-16 bg-beige rounded-2xl flex items-center justify-center mx-auto mb-4">
            🏆
          </div>
          <h3 class="font-semibold mb-2">Premium Quality</h3>
          <p class="text-sm text-muted-foreground">
            Top-tier products and expert professionals
          </p>
        </div>

        <div class="text-center">
          <div class="w-16 h-16 bg-beige rounded-2xl flex items-center justify-center mx-auto mb-4">
            ⏰
          </div>
          <h3 class="font-semibold mb-2">Flexible Scheduling</h3>
          <p class="text-sm text-muted-foreground">
            Book at your convenience, 7 days a week
          </p>
        </div>

        <div class="text-center">
          <div class="w-16 h-16 bg-beige rounded-2xl flex items-center justify-center mx-auto mb-4">
            ✨
          </div>
          <h3 class="font-semibold mb-2">Luxury Experience</h3>
          <p class="text-sm text-muted-foreground">
            Relaxing ambiance and personalized care
          </p>
        </div>

      </div>
    </div>
  </section>

  <!-- SERVICES -->
  <section class="py-20 bg-beige">
    <div class="max-w-7xl mx-auto px-6">

      <div class="text-center mb-12">
        <h2 class="text-4xl font-semibold mb-4">Our Services</h2>
        <p class="text-muted-foreground">Discover our range of premium beauty services</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <!-- CARD -->
        <div class="bg-white rounded-2xl p-6 hover:shadow-xl transition-all group">
          <div class="text-5xl mb-4">💇</div>
          <h3 class="font-semibold mb-2">Hair Styling</h3>
          <p class="text-accent mb-4">From ₹800</p>
        </div>

        <div class="bg-white rounded-2xl p-6 hover:shadow-xl transition-all group">
          <div class="text-5xl mb-4">🧖</div>
          <h3 class="font-semibold mb-2">Spa Treatments</h3>
          <p class="text-accent mb-4">From ₹1200</p>
        </div>

        <div class="bg-white rounded-2xl p-6 hover:shadow-xl transition-all group">
          <div class="text-5xl mb-4">💅</div>
          <h3 class="font-semibold mb-2">Nail Care</h3>
          <p class="text-accent mb-4">From ₹450</p>
        </div>

        <div class="bg-white rounded-2xl p-6 hover:shadow-xl transition-all group">
          <div class="text-5xl mb-4">✨</div>
          <h3 class="font-semibold mb-2">Facial Treatments</h3>
          <p class="text-accent mb-4">From ₹950</p>
        </div>

      </div>

      <div class="text-center mt-8">
        <a href="/services"
          class="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl hover:bg-gold-dark transition-colors">
          View All Services →
        </a>
      </div>

    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-6">

      <div class="text-center mb-12">
        <h2 class="text-4xl font-semibold mb-4">What Our Clients Say</h2>
        <p class="text-muted-foreground">Read reviews from our satisfied customers</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div class="bg-beige rounded-2xl p-6">
          ⭐⭐⭐⭐⭐
          <p class="text-muted-foreground mb-4">Amazing experience!</p>
          <p class="font-semibold">Emily Davis</p>
        </div>

        <div class="bg-beige rounded-2xl p-6">
          ⭐⭐⭐⭐⭐
          <p class="text-muted-foreground mb-4">Best salon ever!</p>
          <p class="font-semibold">Jessica Wilson</p>
        </div>

        <div class="bg-beige rounded-2xl p-6">
          ⭐⭐⭐⭐⭐
          <p class="text-muted-foreground mb-4">Highly recommended!</p>
          <p class="font-semibold">Sarah Miller</p>
        </div>

      </div>

    </div>
  </section>

  <!-- CTA -->
  <section class="py-20 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
    <div class="max-w-4xl mx-auto px-6 text-center">

      <h2 class="text-4xl font-semibold mb-4">Ready to Experience Luxury?</h2>

      <p class="text-xl text-primary-foreground/80 mb-8">
        Book your appointment today and discover the LuxeSalon difference
      </p>

      <div class="flex flex-wrap justify-center gap-4">

        <a href="/booking/service"
          class="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-2xl hover:bg-gold-dark transition-all shadow-lg">
          Book Now →
        </a>

        <a href="/packages"
          class="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-2xl hover:bg-secondary transition-colors">
          View Packages
        </a>

      </div>

    </div>
  </section>

</div>

<?php get_footer(); ?>