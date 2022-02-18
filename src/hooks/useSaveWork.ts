import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { saveWork } from '@/api/templates'

const useSaveWork = () => {
  const router = useRoute()
  const id = router.params.id
  const store = useStore()
  const page = computed(() => store.state.editer.page)
  const components = computed(() => store.state.editer.components)
  const save = () => {
    const { title, props, coverImg, desc, setting } = page.value
    const payload = {
      id: Number(id),
      title,
      coverImg,
      desc,
      content: {
        components: components.value,
        props,
        setting,
      },
    }
    saveWork(payload).then(() => {
      store.commit('saveWork')
    })
  }
  const saveLoading = computed(() => store.getters.isOpLoading('/work'))

  return {
    save,
    saveLoading,
  }
}

export default useSaveWork
