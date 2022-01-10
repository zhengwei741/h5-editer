<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    vNode: {
      type: [Object, String],
      required: true,
    },
  },
  render(props: any) {
    return props.vNode
  },
})
</script>
