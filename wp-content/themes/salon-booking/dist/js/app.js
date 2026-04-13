const $=document.getElementById("notificationBtn"),b=document.getElementById("notificationDropdown");$&&$.addEventListener("click",()=>{b.classList.toggle("hidden")});const I=document.getElementById("profileBtn"),y=document.getElementById("profileDropdown");I&&I.addEventListener("click",()=>{y.classList.toggle("hidden")});document.addEventListener("click",e=>{!($!=null&&$.contains(e.target))&&!(b!=null&&b.contains(e.target))&&(b==null||b.classList.add("hidden")),!(I!=null&&I.contains(e.target))&&!(y!=null&&y.contains(e.target))&&(y==null||y.classList.add("hidden"))});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("menuToggle"),u=document.getElementById("mobileMenu"),c=document.getElementById("menuPanel"),l=document.getElementById("menuOverlay"),a=document.getElementById("menuClose");function d(){u.classList.remove("hidden"),setTimeout(()=>{c.classList.remove("-translate-x-full")},10)}function s(){c.classList.add("-translate-x-full"),setTimeout(()=>{u.classList.add("hidden")},300)}e==null||e.addEventListener("click",d),a==null||a.addEventListener("click",s),l==null||l.addEventListener("click",s)});document.addEventListener("DOMContentLoaded",function(){const e=document.querySelectorAll(".category-btn"),u=document.querySelectorAll(".service-card");e.forEach(c=>{c.addEventListener("click",()=>{const l=c.getAttribute("data-category");e.forEach(a=>{a.classList.remove("bg-accent","text-white","shadow-lg"),a.classList.add("bg-white","border","border-border")}),c.classList.add("bg-accent","text-white","shadow-lg"),u.forEach(a=>{const d=a.getAttribute("data-category");l==="All"||d===l?a.style.display="block":a.style.display="none"})})})});document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("servicesContainer"),u=document.getElementById("categoryContainer"),c=document.getElementById("serviceSearch");if(!e||!u)return;let l=[],a="All",d="";fetch("/e-commerce/wp-json/vp/v1/categories").then(t=>t.json()).then(t=>{const r=t.data;u.innerHTML=`
        <button class="category-btn px-6 py-2.5 rounded-xl bg-accent text-white shadow-lg" data-category="All">
          All
        </button>
      `,r.forEach(h=>{u.insertAdjacentHTML("beforeend",`
          <button class="category-btn px-6 py-2.5 rounded-xl bg-white border border-border hover:bg-secondary transition-all" data-category="${h.name}">
            ${h.name}
          </button>
        `)}),m()}),fetch("/e-commerce/wp-json/vp/v1/services").then(t=>t.json()).then(t=>{l=t.data,s(l)});function s(t){if(e.innerHTML="",t.length===0){e.innerHTML=`
        <p class="text-center text-muted-foreground col-span-full">
          No services found
        </p>
      `;return}t.forEach(r=>{const h=`
        <div class="service-card bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all group">
          
          <div class="bg-gradient-to-br from-beige to-beige-dark h-48 flex items-center justify-center text-6xl">
            💇
          </div>

          <div class="p-6">

            <span class="inline-block px-3 py-1 bg-secondary text-xs rounded-full mb-2">
              ${r.category_name}
            </span>

            <h3 class="font-semibold group-hover:text-accent transition-colors">
              ${r.name}
            </h3>

            <p class="text-sm text-muted-foreground mb-4">
              ${r.description??""}
            </p>

            <div class="flex items-center gap-4 text-sm text-muted-foreground">
              <span>⏱ ${r.duration} min</span>
              <span>💰 ${r.price}</span>
            </div>

            <a href="/e-commerce/service-detail?id=${r.id}" 
              class="block w-full mt-4 text-center px-4 py-2.5 bg-accent text-white rounded-xl hover:bg-gold-dark transition-colors">
              Book Now
            </a>

          </div>
        </div>
      `;e.insertAdjacentHTML("beforeend",h)})}function m(){const t=document.querySelectorAll(".category-btn");t.forEach(r=>{r.addEventListener("click",()=>{a=r.dataset.category,t.forEach(h=>{h.classList.remove("bg-accent","text-white","shadow-lg"),h.classList.add("bg-white","border","border-border")}),r.classList.add("bg-accent","text-white","shadow-lg"),i()})})}c&&c.addEventListener("input",t=>{d=t.target.value.toLowerCase(),i()});function i(){let t=l;a!=="All"&&(t=t.filter(r=>r.category_name===a)),d!==""&&(t=t.filter(r=>r.name.toLowerCase().includes(d)||r.description&&r.description.toLowerCase().includes(d))),s(t)}});document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("serviceDetailContainer");if(!e)return;const c=new URLSearchParams(window.location.search).get("id");if(!c){e.innerHTML="<p class='text-center'>Service not found</p>";return}fetch(`/e-commerce/wp-json/vp/v1/services/${c}`).then(a=>a.json()).then(a=>{const d=a.data;if(console.log(d,"servi"),!d){e.innerHTML="<p class='text-center'>Service not found</p>";return}fetch("/e-commerce/wp-json/vp/v1/services").then(s=>s.json()).then(s=>{const m=s.data;l(d,m)})});function l(a,d){const s=JSON.parse(a.includes||"[]"),m=JSON.parse(a.benefits||"[]"),i=d.filter(t=>t.category_name===a.category_name&&t.id!=a.id).slice(0,3);e.innerHTML=`
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

      <!-- IMAGE -->
      <div class="bg-gradient-to-br from-beige to-beige-dark rounded-3xl h-[500px] flex items-center justify-center text-9xl shadow-xl">
        💇
      </div>

      <!-- DETAILS -->
      <div>

        <span class="inline-block px-4 py-2 bg-secondary text-sm rounded-full mb-4">
          ${a.category_name}
        </span>

        <h1 class="text-4xl font-semibold mb-4">
          ${a.name}
        </h1>

        <div class="flex items-center gap-6 mb-6">

          <div class="flex items-center gap-2">
            ⭐ <span class="font-semibold">4.9</span>
            <span class="text-sm text-muted-foreground">(127 reviews)</span>
          </div>

          <div class="flex items-center gap-2 text-muted-foreground">
            ⏱ ${a.duration} min
          </div>

        </div>

        <div class="flex items-baseline gap-2 mb-6">
          <span class="text-4xl font-semibold text-accent">
            ₹${a.price}
          </span>
          <span class="text-muted-foreground">per session</span>
        </div>

        <p class="text-muted-foreground mb-8 leading-relaxed">
          ${a.description??""}
        </p>

        <a href="/e-commerce/booking-staff?service_id=${a.id}"
          class="inline-flex items-center justify-center w-full px-8 py-4 bg-accent text-white rounded-2xl hover:bg-gold-dark transition-all shadow-lg mb-8">
          Book This Service →
        </a>

        <!-- 🔥 INCLUDES -->
        ${s.length>0?`
        <div class="bg-white rounded-2xl p-6 border border-border mb-6">
          <h3 class="font-semibold mb-4">What's Included</h3>
          <ul class="space-y-3">
            ${s.map(t=>`
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 bg-beige rounded-full flex items-center justify-center mt-0.5">
                  ✓
                </div>
                <span class="text-sm">${t}</span>
              </li>
            `).join("")}
          </ul>
        </div>
        `:""}

        <!-- 🔥 BENEFITS -->
        ${m.length>0?`
        <div class="bg-beige rounded-2xl p-6">
          <h3 class="font-semibold mb-4">Benefits</h3>
          <ul class="space-y-3">
            ${m.map(t=>`
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 bg-accent text-white rounded-full flex items-center justify-center mt-0.5">
                  ✓
                </div>
                <span class="text-sm">${t}</span>
              </li>
            `).join("")}
          </ul>
        </div>
        `:""}

      </div>
    </div>
<!--  RELATED SERVICES -->

    ${i.length>0?`
  <div class="mt-20">
    <h2 class="text-3xl font-semibold mb-8">Related Services</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      ${i.map(t=>`
        <a href="/service-detail?id=${t.id}"
          class="bg-white rounded-2xl p-6 border border-border hover:shadow-xl transition-all">

          <div class="text-5xl mb-4">💇</div>

          <h3 class="font-semibold mb-2">
            ${t.name}
          </h3>

          <div class="flex items-center gap-4 text-sm text-muted-foreground">
            <span>₹${t.price}</span>
            <span>•</span>
            <span>${t.duration} min</span>
          </div>

        </a>
      `).join("")}

    </div>
  </div>
`:""}
  `}});document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("staffContainer"),u=document.getElementById("continueBtn");if(!e)return;let c=null;const a=new URLSearchParams(window.location.search).get("service_id");fetch(`/e-commerce/wp-json/vp/v1/staff?service_id=${a}`).then(s=>s.json()).then(s=>{let m=s.data;m.unshift({id:0,name:"Any Available",bio:"First available specialist"}),d(m)});function d(s){e.innerHTML="",s.forEach(m=>{const i=document.createElement("button");i.className="text-left bg-white rounded-2xl p-6 border-2 border-border hover:border-accent/50 transition-all",i.dataset.id=m.id,i.innerHTML=`
        <div class="flex items-start gap-4">

          <div class="bg-gradient-to-br from-beige to-beige-dark w-20 h-20 rounded-2xl flex items-center justify-center text-4xl">
            👤
          </div>

          <div class="flex-1">

            <div class="flex items-start justify-between mb-2">

              <div>
                <h3 class="font-semibold">${m.name}</h3>
                <p class="text-sm text-muted-foreground">
                  ${m.bio??""}
                </p>
              </div>

              <div class="check hidden w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                ✓
              </div>

            </div>

          </div>
        </div>
      `,i.addEventListener("click",()=>{c=m.id,document.querySelectorAll("#staffContainer button").forEach(t=>{var r;t.classList.remove("border-accent","shadow-lg"),(r=t.querySelector(".check"))==null||r.classList.add("hidden")}),i.classList.add("border-accent","shadow-lg"),i.querySelector(".check").classList.remove("hidden"),u.classList.remove("bg-muted","text-muted-foreground","cursor-not-allowed"),u.classList.add("bg-accent","text-white")}),e.appendChild(i)})}u.addEventListener("click",()=>{c!==null&&(window.location.href=`/e-commerce/booking-datetime?service_id=${a}&staff_id=${c}`)})});document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("dateContainer"),u=document.getElementById("timeContainer"),c=document.getElementById("summaryContainer"),l=document.getElementById("continueBtn"),a=document.getElementById("backBtn");if(!e)return;const d=new URLSearchParams(window.location.search),s=d.get("service_id"),m=d.get("staff_id");let i=null,t=null,r=[];fetch(`/e-commerce/wp-json/vp/v1/availability?staff_id=${m}`).then(n=>n.json()).then(n=>{r=n.data,h()});function h(){const n=new Date;let o=[];for(let f=0;f<7;f++){let g=new Date;g.setDate(n.getDate()+f);const B=g.toLocaleDateString("en-US",{weekday:"long"}),x=r.find(_=>_.day_of_week===B);o.push({fullDate:g.toISOString().split("T")[0],dayShort:g.toLocaleDateString("en-US",{weekday:"short"}),date:g.getDate(),available:!!x,availability:x||null})}T(o)}function T(n){e.innerHTML=`
      <div class="grid grid-cols-7 gap-3">
        ${n.map(o=>`
          <button 
            class="date-btn p-4 rounded-xl text-center ${o.available?"bg-beige hover:bg-beige-dark":"bg-muted opacity-50 cursor-not-allowed"}"
            ${o.available?"":"disabled"}
            data-date="${o.fullDate}"
          >
            <div class="text-xs">${o.dayShort}</div>
            <div class="font-semibold">${o.date}</div>
          </button>
        `).join("")}
      </div>
    `,v(n)}function v(n){document.querySelectorAll(".date-btn").forEach(o=>{o.addEventListener("click",()=>{i=o.dataset.date,document.querySelectorAll(".date-btn").forEach(g=>{g.classList.remove("bg-accent","text-white")}),o.classList.add("bg-accent","text-white");const f=n.find(g=>g.fullDate===i);p(f.availability)})})}function p(n){u.classList.remove("hidden");const o=n.start_time,f=n.end_time,g=n.slot_duration;let B=[],x=k(o),_=k(f);for(;x<_;)B.push(j(x)),x+=g;fetch(`/e-commerce/wp-json/vp/v1/bookings?staff_id=${m}&date=${i}`).then(M=>M.json()).then(M=>{const C=M.data.map(D=>L(D.booking_time));S(B,C)})}function S(n,o){u.innerHTML=`
      <h2 class="font-semibold mb-4">Available Times</h2>

      <div class="grid grid-cols-3 md:grid-cols-5 gap-3">
        ${n.map(f=>{const g=o.includes(f);return`
            <button 
              class="time-btn px-4 py-3 rounded-xl ${g?"bg-muted text-muted-foreground cursor-not-allowed opacity-50":"bg-beige hover:bg-beige-dark"}"
              ${g?"disabled":""}
            >
              ${f}
            </button>
          `}).join("")}
      </div>
    `,E()}function E(){document.querySelectorAll(".time-btn").forEach(n=>{n.disabled||n.addEventListener("click",()=>{t=n.innerText,document.querySelectorAll(".time-btn").forEach(o=>{o.classList.remove("bg-accent","text-white")}),n.classList.add("bg-accent","text-white"),w()})})}function w(){c.classList.remove("hidden"),c.innerHTML=`
      <h3 class="font-semibold mb-2">Your Appointment</h3>
      <p class="text-muted-foreground">
        ${i} at ${t}
      </p>
    `,l.classList.remove("bg-muted","text-muted-foreground","cursor-not-allowed"),l.classList.add("bg-accent","text-white")}a.addEventListener("click",()=>{window.location.href=`/e-commerce/booking-staff?service_id=${s}`}),l.addEventListener("click",()=>{!i||!t||(window.location.href=`/e-commerce/booking-summary?service_id=${s}&staff_id=${m}&date=${i}&time=${encodeURIComponent(t)}`)});function k(n){const[o,f]=n.split(":");return parseInt(o)*60+parseInt(f)}function j(n){let o=Math.floor(n/60),f=n%60,g=o>=12?"PM":"AM";return o=o%12||12,`${o}:${f.toString().padStart(2,"0")} ${g}`}function L(n){let[o,f]=n.split(":");o=parseInt(o);let g=o>=12?"PM":"AM";return o=o%12||12,`${o}:${f} ${g}`}});document.addEventListener("DOMContentLoaded",function(){if(!document.getElementById("serviceName"))return;const e=new URLSearchParams(window.location.search),u=e.get("service_id"),c=e.get("staff_id"),l=e.get("date"),a=e.get("time");fetch(`/e-commerce/wp-json/vp/v1/services/${u}`).then(d=>d.json()).then(d=>{const s=d.data;document.getElementById("serviceName").innerText=s.name,document.getElementById("serviceDuration").innerText=s.duration+" min";const m=parseFloat(s.price),i=m*.08,t=m+i;document.getElementById("price").innerText="₹"+m,document.getElementById("tax").innerText="₹"+i.toFixed(2),document.getElementById("total").innerText="₹"+t.toFixed(2)}),fetch(`/e-commerce/wp-json/vp/v1/staff/${c}`).then(d=>d.json()).then(d=>{document.getElementById("staffName").innerText=d.data.name}),document.getElementById("bookingDate").innerText=l,document.getElementById("bookingTime").innerText=a});document.addEventListener("DOMContentLoaded",function(){if(!document.getElementById("serviceName"))return;const e=new URLSearchParams(window.location.search),u=e.get("service_id"),c=e.get("staff_id"),l=e.get("date"),a=e.get("time");document.getElementById("bookingDate").innerText=l,document.getElementById("bookingTime").innerText=a,document.getElementById("backBtn").onclick=()=>{window.location.href=`/e-commerce/booking-datetime?service_id=${u}&staff_id=${c}`},document.getElementById("continuePayment").onclick=()=>{window.location.href=`/e-commerce/booking-checkout?service_id=${u}&staff_id=${c}&date=${l}&time=${encodeURIComponent(a)}`}});document.addEventListener("DOMContentLoaded",function(){if(!document.getElementById("payBtn"))return;const e=new URLSearchParams(window.location.search),u=e.get("service_id"),c=e.get("staff_id"),l=e.get("date"),a=e.get("time");let d="razorpay",s=null,m=null,i=0,t=0,r=0;const h=document.getElementById("summaryBox"),T=document.getElementById("totalAmount"),v=document.getElementById("stripeForm"),p=document.getElementById("codMessage");Promise.all([fetch(`/e-commerce/wp-json/vp/v1/services/${u}`).then(n=>n.json()),fetch(`/e-commerce/wp-json/vp/v1/staff/${c}`).then(n=>n.json())]).then(([n,o])=>{if(!n.success||!o.success){h.innerHTML="Error loading data";return}s=n.data,m=o.data,i=parseFloat(s.price),t=i*.08,r=i+t,S()}).catch(()=>{h.innerHTML="API error"});function S(){h.innerHTML=`
      <div>
        <p class="font-semibold text-lg">${s.name}</p>
        <p class="text-sm text-muted-foreground">${l} at ${a}</p>
        <p class="text-sm text-muted-foreground">with ${m.name}</p>
      </div>

      <div class="space-y-2 text-sm mt-4">
        <div class="flex justify-between">
          <span>Subtotal</span>
          <span>₹${i}</span>
        </div>

        <div class="flex justify-between">
          <span>Tax (8%)</span>
          <span>₹${t.toFixed(2)}</span>
        </div>
      </div>
    `,T.innerText="₹"+r.toFixed(2)}document.querySelectorAll(".payment-method").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll(".payment-method").forEach(o=>{o.classList.remove("border-accent","bg-accent/5"),o.classList.add("border-border")}),n.classList.add("border-accent","bg-accent/5"),d=n.dataset.method,v==null||v.classList.add("hidden"),p==null||p.classList.add("hidden"),d==="stripe"&&(v==null||v.classList.remove("hidden")),d==="cod"&&(p==null||p.classList.remove("hidden"))})});let E,w;document.getElementById("card-element")&&(E=Stripe("pk_test_51TEOaUD6j3IAZDzdz2PlA6KdKCyvE2tZKYnX9y4hbL4H3XhkWw7sz66QQ2pDdlLFTFf7yZPBpyK2naJugXugQF5v00GSv31xZG"),w=E.elements().create("card"),w.mount("#card-element"));function k(){E.createToken(w).then(n=>{if(n.error){alert(n.error.message);return}L("stripe",n.token.id)})}function j(){new Razorpay({key:"rzp_test_SWGgS01VJnivZc",amount:Math.round(r*100),currency:"INR",name:"Salon Booking",handler:function(o){L("razorpay",o.razorpay_payment_id)}}).open()}document.getElementById("payBtn").addEventListener("click",()=>{if(!s||!m){alert("Please wait...");return}d==="razorpay"?j():d==="stripe"?k():L("cod","offline_"+Date.now())});function L(n,o){fetch("/e-commerce/wp-json/vp/v1/complete-booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({service_id:u,staff_id:c,date:l,time:a,amount:r,method:n,transaction_id:o})}).then(f=>f.json()).then(()=>{window.location.href=`/e-commerce/booking-success?service_id=${u}&staff_id=${c}&date=${l}&time=${encodeURIComponent(a)}&amount=${r}`})}});document.addEventListener("DOMContentLoaded",function(){if(!document.getElementById("bookingRef"))return;const e=new URLSearchParams(window.location.search),u=e.get("service_id"),c=e.get("staff_id"),l=e.get("date"),a=e.get("time"),d=e.get("amount");Promise.all([fetch(`/e-commerce/wp-json/vp/v1/services/${u}`).then(s=>s.json()),fetch(`/e-commerce/wp-json/vp/v1/staff/${c}`).then(s=>s.json())]).then(([s,m])=>{const i=s.data,t=m.data;document.getElementById("serviceName").innerText=i.name,document.getElementById("staffName").innerText=t.name,document.getElementById("bookingDate").innerText=l,document.getElementById("bookingTime").innerText=a,document.getElementById("totalPaid").innerText="₹"+d,document.getElementById("bookingRef").innerText="BK-"+Math.floor(Math.random()*1e6)})});
