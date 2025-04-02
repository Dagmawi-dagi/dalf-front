<script setup>
import spacer_ from '../components/Reusable/spacer_.vue'
</script>

<template>
  <div style="text-align: center;">
    <h4> 404 <span style=" color:lightseagreen ">"{{ $route.fullPath }}"</span> route  not found</h4>
    <spacer_ :m="'10px'" />
  </div>
</template>
