<template>
  <div class="vp-raw">
    <DdtwCarousel
      :pictures="pictures"
      slide
    />
  </div>
</template>

<script setup>
import { DdtwCarousel } from '../../../../src/index'

const pictures = [
  {
    alt: 'Picture 1',
    src: 'https://flowbite.com/docs/images/carousel/carousel-1.svg',
  },
  {
    alt: 'Picture 2',
    src: 'https://flowbite.com/docs/images/carousel/carousel-2.svg',
  },
  {
    alt: 'Picture 3',
    src: 'https://flowbite.com/docs/images/carousel/carousel-3.svg',
  },
]
</script>
