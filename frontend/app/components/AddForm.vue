<script setup>
// incoming programme to add/edit, whether the page is busy ot not and the submit button title
const { doc} = defineProps(['doc'])

const colours = [ ['#B71C1C', '#880E4F', '#4A148C', '#311B92', '#1A237E', '#0D47A1', '#01579B', '#006064'], ['#004D40', '#1B5E20', '#33691E', '#827717', '#F57F17',
    '#FF6F00', '#E65100', '#BF360C'], ['#3E2723', '#263238','#E53935', '#D81B60', '#8E24AA', '#7E57C2', '#5C6BC0', '#42A5F5'], ['#039BE5', '#00ACC1', '#00897B', '#66BB6A',
  '#7CB342', '#C0CA33', '#FDD835', '#FFB300'], ['#FB8C00', '#F4511E', '#6D4C41', '#546E7A', '#757575']]

</script>
<style>
.gap {
  margin-bottom: 10px;
  display: block important!;
}
</style>
<template>
  <v-form>
    <v-text-field v-model="doc.title" label="Title" required autofocus></v-text-field>    
    <v-text-field v-model="doc.tags" label="Tags"></v-text-field>
    <v-field>
      <v-color-picker swatches-max-height="220" height="200" :swatches="colours" class="ma-2" show-swatches v-model="doc.colour" hide-canvas hide-eye-dropper hide-header hide-inputs hide-sliders hide-title></v-color-picker>
    </v-field>
    <v-textarea v-model="doc.body" label="Body" style="height: 600px"></v-textarea>
  </v-form>
</template>
