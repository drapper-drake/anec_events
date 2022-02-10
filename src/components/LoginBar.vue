<script></script>
<template>
  <div class="log-in relative px-6 justify-center items-center gap-4 hidden">
    <button
      class="hamburguer md:hidden text-neutral-500 w-10 h-10 relative focus:outline-none bg-white"
    >
      <span class="sr-only">Abrir menú</span>
      <div class="flex flex-col w-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span
          aria-hidden="true"
          class="bar-1 block absolute h-0.5 w-5 bg-bg-light transition duration-500 ease-in-out -translate-y-1.5"
        ></span>
        <span
          aria-hidden="true"
          class="bar-2 block absolute h-0.5 w-5 bg-bg-light transition duration-500 ease-in-out"
        ></span>
        <span
          aria-hidden="true"
          class="bar-3 block absolute h-0.5 w-5 bg-bg-light transition duration-500 ease-in-out translate-y-1.5"
        ></span>
      </div>
    </button>
    <div
      class="hidden fixed top-20 md:top-0 left-0 w-full md:w-52 flex-col justify-center md:flex-row md:justify-center md:items-center md:gap-4 md:relative bg-light md:bg-opacity-0 drop-shadow-[0_8px_10px_rgba(0,0,0,0.25)]"
    >
      <button
        class="log-in hidden md:block h-20 md:h-12 text-bg-light md:text-bg-dark font-sans text-lg cursor-pointer border-b md:border-b-0"
      >Entrar</button>
      <button
        class="sign-in hidden md:block h-16 px-2 md:h-12 text-dark font-sans text-lg md:bg-contrast-bg-dark md:border-solid md:rounded-2xl p-2.5 cursor-pointer md:duration-700 md:hover:bg-light md:hover:border-contrast-bg-light md:hover:text-contrast-bg-light"
      >
        Crear
        cuenta
      </button>
    </div>
  </div>
</template>
