<template>
  <img
    class="fli-logo"
    alt="fli Logo"
    src="/fliclassroom.png"
  >
</template>

<style>
.fli-logo {
  height: 180px;
  width: 530px;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
