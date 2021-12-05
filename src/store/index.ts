import { createStore } from 'vuex'
import user, { UserProps } from './user'
import templates, { TemplatesProps } from './templates'

export interface GlobalDataProps {
  user: UserProps
  templates: TemplatesProps
}

export default createStore<GlobalDataProps>({
  modules: {
    user,
    templates,
  },
})
