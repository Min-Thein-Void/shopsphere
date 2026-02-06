<template>
    <section class="relative w-full h-[380px] lg:h-[420px]
            overflow-hidden mb-10">

        <!-- Background Image -->
        <img src="/public/black-friday-elements-assortment.jpg" alt="Ecommerce Hero"
            class="absolute inset-0 w-full h-full object-cover" />

        <!-- Overlay -->
        <div class="absolute inset-0 bg-slate-900/70"></div>

        <!-- Content -->
        <div class="relative z-10 h-full
             flex flex-col justify-center
             px-6 lg:px-12
             max-w-4xl">

            <span class="inline-block
               mb-4
               text-sm
               font-medium
               text-emerald-400">
                Smart Shopping Starts Here
            </span>

            <h1 class="text-3xl lg:text-5xl
               font-bold
               text-white
               leading-tight
               tracking-tight
               mb-4">
                Discover Quality Products<br />
                Designed for Everyday Life
            </h1>

            <p class="text-slate-300
               text-base lg:text-lg
               max-w-2xl
               mb-8">
                Explore a curated collection of modern essentials, tech accessories,
                and lifestyle products — all in one place, at prices you’ll love.
            </p>

            <div class="flex items-center gap-4">
                <button @click="scroll" type="button" class="bg-blue-600
                 hover:bg-blue-700
                 text-white
                 font-medium
                 px-6 py-3
                 rounded-lg
                 shadow-sm
                 transition">
                    Shop Now
                </button>

                <button class="border border-white/30
                 text-white
                 hover:bg-white/10
                 font-medium
                 px-6 py-3
                 rounded-lg
                 transition">
                    Browse Categories
                </button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'HeroSection',
    setup() {
        let scroll = () => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth' 
            });
        };
        return { scroll }
    }
}
</script>
